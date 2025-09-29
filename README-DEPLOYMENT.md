# AI Assessment Bot - Deployment Guide

## Quick Deploy to Render

### 1. Prerequisites
- GitHub account
- Render account (free tier available)
- Claude API key from Anthropic

### 2. Deploy Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - AI Assessment Bot"
   git remote add origin https://github.com/yourusername/ai-assessment-bot.git
   git push -u origin main
   ```

2. **Deploy on Render**
   - Go to [render.com](https://render.com)
   - Connect your GitHub account
   - Click "New" → "Web Service"
   - Connect this repository
   - Render will automatically detect the `render.yaml` configuration

3. **Set Environment Variables**
   - In Render dashboard, go to your service
   - Navigate to "Environment" tab
   - Add: `CLAUDE_API_KEY` = your actual Claude API key
   - `SECRET_KEY` will be auto-generated

4. **Deploy**
   - Click "Deploy" - it will take 2-3 minutes
   - Your bot will be available at `https://your-service-name.onrender.com`

### 3. Local Development

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set Environment Variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your Claude API key
   ```

3. **Run Locally**
   ```bash
   python app.py
   ```
   - Visit `http://localhost:5000`

### 4. Configuration

#### Environment Variables
- `CLAUDE_API_KEY`: Your Anthropic Claude API key (required)
- `SECRET_KEY`: Flask session secret (auto-generated on Render)
- `PORT`: Port number (auto-set by Render)

#### Knowledge Base
The bot automatically loads all markdown files from:
- `./Instructional Design Principles/`
- All subdirectories are included
- Files are categorized automatically

### 5. Features

- **Chat Interface**: Clean, responsive web interface
- **Knowledge Base**: Trained on your educational assessment resources
- **Context Awareness**: Maintains conversation history
- **Quick Start**: Pre-defined questions for common use cases
- **Mobile Friendly**: Works on all devices
- **Error Handling**: Graceful error messages and recovery

### 6. API Endpoints

- `GET /`: Main chat interface
- `POST /api/chat`: Send message to bot
- `GET /api/knowledge-base`: Get knowledge base structure
- `POST /api/clear-conversation`: Clear chat history
- `GET /health`: Health check for monitoring

### 7. Cost Estimates

#### Render (Free Tier)
- **Cost**: Free for 750 hours/month
- **Limitations**: Sleeps after 15 min inactivity
- **Good for**: Development and demonstration

#### Render (Paid)
- **Cost**: $7/month
- **Features**: Always on, custom domain, more resources
- **Good for**: Production use

#### Claude API
- **Cost**: ~$0.01 per 1000 characters
- **Estimate**: $10-50/month depending on usage
- **Note**: Monitor usage in Anthropic console

### 8. Customization

#### Adding New Knowledge
1. Add markdown files to `Instructional Design Principles/`
2. Redeploy (automatic on git push)
3. Bot will automatically index new content

#### Modifying System Prompt
Edit the `create_system_prompt()` method in `app.py`:
```python
def create_system_prompt(self):
    return """Your custom system prompt here..."""
```

#### Styling Changes
Modify the `<style>` section in `templates/chat.html`

### 9. Monitoring

#### Health Check
- URL: `/health`
- Returns bot status and knowledge base size

#### Logs
- View logs in Render dashboard
- Monitor API usage in Anthropic console
- Check error rates and response times

### 10. Security

#### Best Practices
- Never commit API keys to git
- Use environment variables for secrets
- Monitor API usage for unexpected spikes
- Regularly update dependencies

#### FERPA Compliance
- No student data is stored
- Conversations are session-based only
- No logging of personal information
- Clear conversation history feature

### 11. Troubleshooting

#### Common Issues

**Bot not responding:**
- Check Claude API key is set correctly
- Verify API key has sufficient credits
- Check Render logs for errors

**Knowledge base empty:**
- Ensure markdown files are in correct directory
- Check file permissions and encoding (UTF-8)
- Review logs for loading errors

**Slow responses:**
- Normal for free Render tier after sleep
- Consider upgrading to paid tier
- Monitor Claude API response times

#### Support
- Check Render documentation
- Review Claude API documentation
- Contact: jkruck@ivey.ca

### 12. Next Steps

#### Enhancements
- Add user authentication
- Implement conversation persistence
- Add more sophisticated RAG (Retrieval-Augmented Generation)
- Integration with LMS systems
- Analytics dashboard

#### Scaling
- Database for conversation history
- Redis for caching
- Load balancing for high traffic
- Custom domain and SSL

---

**Built for Ivey Business School EdTech Lab**
*Demonstrating AI-powered educational assessment guidance*