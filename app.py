import os
import json
from flask import Flask, render_template, request, jsonify, session
from datetime import datetime
import anthropic
import logging
from pathlib import Path
import markdown
import re

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AssessmentBot:
    def __init__(self, api_key):
        self.client = anthropic.Anthropic(api_key=api_key)
        self.knowledge_base = self.load_knowledge_base()

    def load_knowledge_base(self):
        """Load all markdown files from Instructional Design Principles"""
        knowledge = {}

        try:
            base_path = Path('./Instructional Design Principles')
            if not base_path.exists():
                logger.warning("Instructional Design Principles directory not found")
                return {}

            for md_file in base_path.rglob('*.md'):
                try:
                    with open(md_file, 'r', encoding='utf-8') as f:
                        content = f.read()

                    # Convert relative path to key
                    relative_path = md_file.relative_to(base_path)
                    key = str(relative_path).replace('\\', '/').replace('.md', '')

                    knowledge[key] = {
                        'title': self.extract_title(content),
                        'content': content,
                        'path': str(md_file),
                        'category': self.determine_category(relative_path)
                    }

                except Exception as e:
                    logger.error(f"Error loading {md_file}: {e}")

        except Exception as e:
            logger.error(f"Error loading knowledge base: {e}")

        logger.info(f"Loaded {len(knowledge)} knowledge base documents")
        return knowledge

    def extract_title(self, content):
        """Extract title from markdown content"""
        lines = content.split('\n')
        for line in lines:
            if line.startswith('# '):
                return line[2:].strip()
        return "Untitled"

    def determine_category(self, path):
        """Determine category based on file path"""
        path_str = str(path).lower()
        if 'educational principles' in path_str:
            return 'principles'
        elif 'ai development' in path_str:
            return 'ai_development'
        elif 'quick reference' in path_str:
            return 'quick_reference'
        elif 'tool templates' in path_str:
            return 'templates'
        else:
            return 'general'

    def get_relevant_context(self, query):
        """Find relevant knowledge base entries for the query"""
        query_lower = query.lower()
        relevant_docs = []

        # Keywords mapping
        keywords = {
            'udl': ['universal design', 'accessibility', 'multiple means'],
            'quality matters': ['qm', 'quality matters', 'standards'],
            'inclusive': ['inclusive', 'diversity', 'cultural'],
            'assessment': ['assessment', 'evaluation', 'quiz', 'test', 'rubric'],
            'ai': ['artificial intelligence', 'ai', 'prompt', 'claude'],
            'prompt': ['prompt', 'template', 'example']
        }

        # Score documents based on keyword matches
        for key, doc in self.knowledge_base.items():
            score = 0
            content_lower = doc['content'].lower()
            title_lower = doc['title'].lower()

            # Check for direct query terms
            for word in query_lower.split():
                if len(word) > 3:  # Skip short words
                    if word in content_lower:
                        score += 2
                    if word in title_lower:
                        score += 3

            # Check for keyword categories
            for category, terms in keywords.items():
                if any(term in query_lower for term in terms):
                    if any(term in content_lower for term in terms):
                        score += 5

            if score > 0:
                relevant_docs.append((score, doc))

        # Sort by relevance and return top 3
        relevant_docs.sort(key=lambda x: x[0], reverse=True)
        return [doc for score, doc in relevant_docs[:3]]

    def create_system_prompt(self):
        """Create the system prompt for Claude"""
        return """You are an AI assistant specialized in educational assessment design for Ivey Business School. You help faculty create effective, inclusive, and pedagogically sound assessments.

Your expertise includes:
- Universal Design for Learning (UDL) principles
- Quality Matters standards
- Inclusive teaching practices
- AI-enhanced assessment strategies
- Business education best practices

Guidelines:
1. Always prioritize educational effectiveness and student learning
2. Ensure assessments are accessible and inclusive
3. Recommend evidence-based practices
4. Provide specific, actionable advice
5. Consider the context of business education
6. Suggest AI tools and prompts when appropriate
7. Emphasize academic integrity

Response format:
- Be concise but comprehensive
- Use bullet points for lists
- Provide specific examples when helpful
- Reference relevant frameworks (UDL, QM) when applicable
- End with follow-up questions or next steps"""

    def generate_response(self, user_query, conversation_history=[]):
        """Generate response using Claude API with knowledge base context"""
        try:
            # Get relevant context from knowledge base
            relevant_docs = self.get_relevant_context(user_query)

            # Build context string
            context = ""
            if relevant_docs:
                context = "\n\nRelevant Knowledge Base Information:\n"
                for doc in relevant_docs:
                    context += f"\n--- {doc['title']} ---\n"
                    # Include first 1000 characters to avoid token limits
                    content_preview = doc['content'][:1000]
                    if len(doc['content']) > 1000:
                        content_preview += "..."
                    context += content_preview + "\n"

            # Build conversation context
            conversation_context = ""
            if conversation_history:
                conversation_context = "\n\nPrevious conversation context:\n"
                for msg in conversation_history[-3:]:  # Last 3 messages
                    role = "User" if msg['role'] == 'user' else "Assistant"
                    conversation_context += f"{role}: {msg['content']}\n"

            # Create the full prompt
            full_prompt = f"""User Question: {user_query}

{context}
{conversation_context}

Please provide a helpful response based on the knowledge base information and educational assessment best practices."""

            # Call Claude API
            response = self.client.messages.create(
                model="claude-sonnet-4-5-20250929",
                max_tokens=1500,
                system=self.create_system_prompt(),
                messages=[
                    {"role": "user", "content": full_prompt}
                ]
            )

            return response.content[0].text

        except Exception as e:
            logger.error(f"Error generating response: {e}")
            return f"I apologize, but I encountered an error processing your request. Please try again or rephrase your question."

# Initialize bot
api_key = os.environ.get('CLAUDE_API_KEY')
if not api_key:
    logger.error("CLAUDE_API_KEY environment variable not set")
    bot = None
else:
    bot = AssessmentBot(api_key)

@app.route('/')
def index():
    """Main chat interface"""
    return render_template('chat.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    """Handle chat messages"""
    if not bot:
        return jsonify({
            'error': 'Bot not initialized. Please check API key configuration.'
        }), 500

    try:
        data = request.get_json()
        user_message = data.get('message', '').strip()

        if not user_message:
            return jsonify({'error': 'Message cannot be empty'}), 400

        # Get conversation history from session
        if 'conversation' not in session:
            session['conversation'] = []

        conversation_history = session['conversation']

        # Generate response
        response = bot.generate_response(user_message, conversation_history)

        # Update conversation history
        conversation_history.append({
            'role': 'user',
            'content': user_message,
            'timestamp': datetime.now().isoformat()
        })
        conversation_history.append({
            'role': 'assistant',
            'content': response,
            'timestamp': datetime.now().isoformat()
        })

        # Keep only last 10 messages to manage session size
        session['conversation'] = conversation_history[-10:]

        return jsonify({
            'response': response,
            'timestamp': datetime.now().isoformat()
        })

    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        return jsonify({'error': 'An error occurred processing your message'}), 500

@app.route('/api/knowledge-base')
def knowledge_base():
    """Get knowledge base structure for reference"""
    if not bot:
        return jsonify({'error': 'Bot not initialized'}), 500

    # Return simplified structure
    structure = {}
    for key, doc in bot.knowledge_base.items():
        structure[key] = {
            'title': doc['title'],
            'category': doc['category']
        }

    return jsonify(structure)

@app.route('/api/clear-conversation', methods=['POST'])
def clear_conversation():
    """Clear conversation history"""
    session['conversation'] = []
    return jsonify({'status': 'cleared'})

@app.route('/health')
def health():
    """Health check endpoint for Render"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'bot_initialized': bot is not None,
        'knowledge_base_size': len(bot.knowledge_base) if bot else 0
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)