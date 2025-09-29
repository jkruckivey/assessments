// Assessment Design State
let assessmentDesign = {
    type: null,
    udlCompliance: {},
    qmAlignment: {},
    inclusiveDesign: {},
    aiPrompt: null,
    progress: 0
};

// Initialize smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Start Journey Function
function startJourney() {
    document.getElementById('assessment-type').scrollIntoView({ behavior: 'smooth' });
    updateProgress(10);
}

// Assessment Type Selection
function selectAssessmentType(type) {
    assessmentDesign.type = type;
    const detailPanel = document.getElementById('assessment-details');
    const selectedType = document.getElementById('selected-type');
    const recommendations = document.getElementById('type-recommendations');

    selectedType.textContent = type.charAt(0).toUpperCase() + type.slice(1) + ' Assessment';

    const typeRecommendations = {
        formative: `
            <h4>Recommended Practices for Formative Assessment:</h4>
            <ul>
                <li>Provide immediate feedback to support learning</li>
                <li>Use varied question types to check understanding</li>
                <li>Allow multiple attempts for mastery</li>
                <li>Focus on growth rather than grades</li>
                <li>Include self-reflection components</li>
            </ul>
            <h4>AI Enhancement Opportunities:</h4>
            <ul>
                <li>Automated feedback generation</li>
                <li>Adaptive questioning based on responses</li>
                <li>Pattern recognition in student misconceptions</li>
                <li>Personalized learning path suggestions</li>
            </ul>
        `,
        summative: `
            <h4>Recommended Practices for Summative Assessment:</h4>
            <ul>
                <li>Align directly with learning objectives</li>
                <li>Use clear rubrics and grading criteria</li>
                <li>Ensure academic integrity measures</li>
                <li>Provide comprehensive instructions</li>
                <li>Include variety in assessment methods</li>
            </ul>
            <h4>AI Enhancement Opportunities:</h4>
            <ul>
                <li>Automated grading for objective questions</li>
                <li>Plagiarism detection and originality checking</li>
                <li>Performance analytics and reporting</li>
                <li>Question bank generation with difficulty levels</li>
            </ul>
        `,
        authentic: `
            <h4>Recommended Practices for Authentic Assessment:</h4>
            <ul>
                <li>Connect to real-world applications</li>
                <li>Use industry-relevant scenarios</li>
                <li>Encourage critical thinking and problem-solving</li>
                <li>Allow for creative solutions</li>
                <li>Include stakeholder perspectives</li>
            </ul>
            <h4>AI Enhancement Opportunities:</h4>
            <ul>
                <li>Scenario generation based on current events</li>
                <li>Industry data integration</li>
                <li>Simulation and modeling tools</li>
                <li>Multi-perspective analysis assistance</li>
            </ul>
        `,
        peer: `
            <h4>Recommended Practices for Peer Assessment:</h4>
            <ul>
                <li>Provide clear evaluation criteria</li>
                <li>Train students in feedback techniques</li>
                <li>Ensure anonymity when appropriate</li>
                <li>Include calibration exercises</li>
                <li>Monitor for bias and fairness</li>
            </ul>
            <h4>AI Enhancement Opportunities:</h4>
            <ul>
                <li>Automated peer matching algorithms</li>
                <li>Feedback quality monitoring</li>
                <li>Bias detection in evaluations</li>
                <li>Aggregation and normalization of scores</li>
            </ul>
        `
    };

    recommendations.innerHTML = typeRecommendations[type];
    detailPanel.style.display = 'block';

    // Highlight selected card
    document.querySelectorAll('.card').forEach(card => card.classList.remove('selected'));
    event.target.closest('.card').classList.add('selected');

    updateProgress(20);
}

// Generate UDL Compliance Report
function generateUDLReport() {
    const report = document.getElementById('udl-report');
    const checkboxes = document.querySelectorAll('#udl-compliance input[type="checkbox"]');

    let checkedCount = 0;
    let uncheckedItems = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkedCount++;
            assessmentDesign.udlCompliance[checkbox.id] = true;
        } else {
            uncheckedItems.push(checkbox.nextElementSibling.textContent);
            assessmentDesign.udlCompliance[checkbox.id] = false;
        }
    });

    const compliancePercentage = Math.round((checkedCount / checkboxes.length) * 100);

    let reportHTML = `
        <h3>UDL Compliance Report</h3>
        <div class="compliance-score">
            <h4>Overall Compliance: ${compliancePercentage}%</h4>
            <div class="progress-bar-inline">
                <div class="progress-fill-inline" style="width: ${compliancePercentage}%"></div>
            </div>
        </div>
    `;

    if (uncheckedItems.length > 0) {
        reportHTML += `
            <h4>Areas for Improvement:</h4>
            <ul>
                ${uncheckedItems.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <h4>Recommendations:</h4>
            <ul>
                ${generateUDLRecommendations(uncheckedItems).map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        `;
    } else {
        reportHTML += `
            <p class="success-message">Excellent! Your assessment meets all UDL compliance criteria.</p>
        `;
    }

    report.innerHTML = reportHTML;
    report.style.display = 'block';
    updateProgress(40);
}

// Generate UDL Recommendations
function generateUDLRecommendations(missing) {
    const recommendations = [];

    missing.forEach(item => {
        if (item.includes('Visual')) {
            recommendations.push('Add diagrams, infographics, or video content to support visual learners');
        }
        if (item.includes('Audio')) {
            recommendations.push('Include audio narration or podcast-style content options');
        }
        if (item.includes('Text alternatives')) {
            recommendations.push('Provide transcripts for all media and alternative text for images');
        }
        if (item.includes('translation')) {
            recommendations.push('Consider multilingual support or simplified language options');
        }
        if (item.includes('choice')) {
            recommendations.push('Allow students to choose topics or assessment formats that interest them');
        }
        if (item.includes('feedback')) {
            recommendations.push('Implement automated immediate feedback systems');
        }
        if (item.includes('Assistive technology')) {
            recommendations.push('Test with screen readers and ensure keyboard navigation');
        }
        if (item.includes('timing')) {
            recommendations.push('Provide extended time options or untimed assessments');
        }
    });

    return [...new Set(recommendations)].slice(0, 3);
}

// Check Quality Matters Alignment
function checkQMAlignment() {
    const feedback = document.getElementById('qm-feedback');
    const objectives = document.getElementById('qm-objectives').value;
    const alignment = document.getElementById('qm-alignment').value;
    const rubricChecked = document.getElementById('qm-rubric').checked;
    const criteriaChecked = document.getElementById('qm-criteria').checked;

    assessmentDesign.qmAlignment = {
        objectives,
        alignment,
        rubric: rubricChecked,
        criteria: criteriaChecked
    };

    let feedbackHTML = '<h3>Quality Matters Alignment Feedback</h3>';
    let score = 0;
    let maxScore = 5;

    if (objectives.length > 50) {
        score++;
        feedbackHTML += '<p class="success">✓ Learning objectives are clearly defined</p>';
    } else {
        feedbackHTML += '<p class="warning">⚠ Please provide more detailed learning objectives</p>';
    }

    if (alignment.length > 50) {
        score++;
        feedbackHTML += '<p class="success">✓ Assessment alignment is documented</p>';
    } else {
        feedbackHTML += '<p class="warning">⚠ Please explain how the assessment measures the objectives</p>';
    }

    if (rubricChecked) {
        score++;
        feedbackHTML += '<p class="success">✓ Clear rubric provided</p>';
    } else {
        feedbackHTML += '<p class="warning">⚠ Consider adding a detailed rubric</p>';
    }

    if (criteriaChecked) {
        score++;
        feedbackHTML += '<p class="success">✓ Specific evaluation criteria defined</p>';
    } else {
        feedbackHTML += '<p class="warning">⚠ Add specific evaluation criteria</p>';
    }

    const supportCheckboxes = document.querySelectorAll('.support-options input[type="checkbox"]:checked');
    if (supportCheckboxes.length >= 2) {
        score++;
        feedbackHTML += '<p class="success">✓ Adequate learner support provided</p>';
    } else {
        feedbackHTML += '<p class="warning">⚠ Add more learner support resources</p>';
    }

    const alignmentScore = Math.round((score / maxScore) * 100);
    feedbackHTML = `
        <div class="alignment-score">
            <h4>QM Alignment Score: ${alignmentScore}%</h4>
            <div class="progress-bar-inline">
                <div class="progress-fill-inline" style="width: ${alignmentScore}%"></div>
            </div>
        </div>
    ` + feedbackHTML;

    if (alignmentScore === 100) {
        feedbackHTML += '<p class="success-message">Excellent! Your assessment fully aligns with Quality Matters standards.</p>';
    } else {
        feedbackHTML += '<h4>Next Steps:</h4><ul><li>Address the warnings above to improve alignment</li><li>Review QM rubric for additional guidance</li><li>Consider peer review of your assessment design</li></ul>';
    }

    feedback.innerHTML = feedbackHTML;
    feedback.style.display = 'block';
    updateProgress(60);
}

// Generate Inclusive Design Report
function generateInclusiveReport() {
    const report = document.getElementById('inclusive-report');
    const checkboxes = document.querySelectorAll('#inclusive-design input[type="checkbox"]');

    let checkedCount = 0;
    let categories = {
        cultural: { checked: 0, total: 4 },
        accessibility: { checked: 0, total: 4 },
        participation: { checked: 0, total: 4 },
        language: { checked: 0, total: 4 }
    };

    checkboxes.forEach(checkbox => {
        const category = checkbox.id.split('-')[1];
        if (checkbox.checked) {
            checkedCount++;
            if (category === 'diverse' || category === 'global' || category === 'bias' || category === 'cultural') {
                categories.cultural.checked++;
            } else if (category === 'screen' || category === 'keyboard' || category === 'captions' || category === 'contrast') {
                categories.accessibility.checked++;
            } else if (category === 'async' || category === 'time' || category === 'bandwidth' || category === 'mobile') {
                categories.participation.checked++;
            } else if (category === 'clear' || category === 'glossary' || category === 'multilingual' || category === 'idioms') {
                categories.language.checked++;
            }
        }
    });

    const overallScore = Math.round((checkedCount / checkboxes.length) * 100);

    let reportHTML = `
        <h3>Inclusive Design Report</h3>
        <div class="inclusivity-score">
            <h4>Overall Inclusivity Score: ${overallScore}%</h4>
            <div class="progress-bar-inline">
                <div class="progress-fill-inline" style="width: ${overallScore}%"></div>
            </div>
        </div>
        <h4>Category Breakdown:</h4>
        <ul>
            <li>Cultural Sensitivity: ${Math.round((categories.cultural.checked / categories.cultural.total) * 100)}%</li>
            <li>Accessibility Features: ${Math.round((categories.accessibility.checked / categories.accessibility.total) * 100)}%</li>
            <li>Flexible Participation: ${Math.round((categories.participation.checked / categories.participation.total) * 100)}%</li>
            <li>Language Support: ${Math.round((categories.language.checked / categories.language.total) * 100)}%</li>
        </ul>
    `;

    if (overallScore < 100) {
        reportHTML += `
            <h4>Recommendations for Improvement:</h4>
            <ul>
                ${generateInclusiveRecommendations(categories).map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        `;
    } else {
        reportHTML += '<p class="success-message">Outstanding! Your assessment design is fully inclusive.</p>';
    }

    report.innerHTML = reportHTML;
    report.style.display = 'block';

    assessmentDesign.inclusiveDesign = categories;
    updateProgress(80);
}

// Generate Inclusive Design Recommendations
function generateInclusiveRecommendations(categories) {
    const recommendations = [];

    Object.entries(categories).forEach(([category, scores]) => {
        const percentage = (scores.checked / scores.total) * 100;
        if (percentage < 100) {
            switch(category) {
                case 'cultural':
                    recommendations.push('Add more diverse examples from different cultures and regions');
                    break;
                case 'accessibility':
                    recommendations.push('Implement additional accessibility features for diverse abilities');
                    break;
                case 'participation':
                    recommendations.push('Provide more flexible options for student participation');
                    break;
                case 'language':
                    recommendations.push('Enhance language support and clarity for non-native speakers');
                    break;
            }
        }
    });

    return recommendations;
}

// Generate AI Prompt
function generateAIPrompt() {
    const courseLevel = document.getElementById('course-level').value;
    const subjectArea = document.getElementById('subject-area').value;
    const learningOutcome = document.getElementById('learning-outcome').value;
    const context = document.getElementById('context-specifics').value;

    if (!courseLevel || !subjectArea || !learningOutcome) {
        alert('Please fill in all required fields: Course Level, Subject Area, and Learning Outcome');
        return;
    }

    const assessmentType = assessmentDesign.type || 'general';

    const prompt = `Create a ${assessmentType} assessment for ${courseLevel} students in ${subjectArea}.

Learning Outcome: ${learningOutcome}

Requirements:
- Follow Universal Design for Learning (UDL) principles with multiple means of representation, engagement, and expression
- Ensure WCAG 2.1 AA accessibility compliance
- Include culturally diverse examples and perspectives
- Provide clear rubrics and evaluation criteria aligned with Quality Matters standards
- Design for both synchronous and asynchronous participation
- Support mobile devices and low-bandwidth connections

Assessment Components:
1. Clear instructions and expectations
2. Multiple question types or activity formats
3. Immediate feedback mechanisms where appropriate
4. Scaffolding for different skill levels
5. Connection to real-world applications

${context ? `Additional Context: ${context}` : ''}

Please provide:
- Detailed assessment structure
- Specific questions or tasks
- Grading rubric
- Student support resources
- Technology requirements
- Time estimates for completion`;

    assessmentDesign.aiPrompt = prompt;

    document.getElementById('prompt-text').textContent = prompt;
    document.getElementById('generated-prompt').style.display = 'block';

    // Generate variations
    generatePromptVariations();
    updateProgress(100);

    // Show summary
    generateSummary();
}

// Generate Prompt Variations
function generatePromptVariations() {
    const variations = [
        {
            title: 'Quick Version',
            prompt: assessmentDesign.aiPrompt.split('\n').slice(0, 3).join('\n') + '\n\nCreate a simple, accessible assessment with clear instructions and rubric.'
        },
        {
            title: 'Detailed Version',
            prompt: assessmentDesign.aiPrompt + '\n\nAdditionally, include:\n- Pre-assessment preparation guide\n- Post-assessment reflection prompts\n- Peer review components\n- Extension activities for advanced students\n- Remediation paths for struggling students'
        },
        {
            title: 'AI-Enhanced Version',
            prompt: assessmentDesign.aiPrompt + '\n\nIncorporate AI tools for:\n- Automated feedback generation\n- Adaptive questioning\n- Performance analytics\n- Plagiarism detection\n- Personalized learning recommendations'
        }
    ];

    const variationsList = document.getElementById('variations-list');
    variationsList.innerHTML = variations.map(v => `
        <div class="variation-item">
            <h4>${v.title}</h4>
            <p>${v.prompt.substring(0, 200)}...</p>
            <button class="btn-secondary" onclick="useVariation('${v.title}')">Use This Version</button>
        </div>
    `).join('');

    document.getElementById('prompt-variations').style.display = 'block';
}

// Copy Prompt to Clipboard
function copyPrompt() {
    const promptText = document.getElementById('prompt-text').textContent;
    navigator.clipboard.writeText(promptText).then(() => {
        alert('Prompt copied to clipboard!');
    });
}

// Refine Prompt
function refinePrompt() {
    document.getElementById('context-specifics').focus();
    alert('Add more specific requirements in the Additional Context field, then regenerate the prompt.');
}

// Use Variation
function useVariation(title) {
    alert(`${title} selected. You can copy this variation or continue refining.`);
}

// Generate Summary
function generateSummary() {
    const summaryContent = document.getElementById('summary-content');

    const summary = `
        <h3>Assessment Type: ${assessmentDesign.type ? assessmentDesign.type.charAt(0).toUpperCase() + assessmentDesign.type.slice(1) : 'Not selected'}</h3>

        <h4>UDL Compliance:</h4>
        <p>${Object.values(assessmentDesign.udlCompliance).filter(v => v).length} of 12 criteria met</p>

        <h4>Quality Matters Alignment:</h4>
        <p>Learning objectives: ${assessmentDesign.qmAlignment.objectives ? 'Defined' : 'Not defined'}</p>
        <p>Assessment alignment: ${assessmentDesign.qmAlignment.alignment ? 'Documented' : 'Not documented'}</p>

        <h4>Inclusive Design:</h4>
        <p>Overall inclusivity score calculated based on checklist completion</p>

        <h4>AI Prompt:</h4>
        <p>${assessmentDesign.aiPrompt ? 'Generated and ready to use' : 'Not yet generated'}</p>
    `;

    summaryContent.innerHTML = summary;
    document.getElementById('summary').style.display = 'block';
}

// Export Assessment Plan
function exportAssessmentPlan(format = 'pdf') {
    const exportData = {
        timestamp: new Date().toISOString(),
        design: assessmentDesign
    };

    if (format === 'json') {
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

        const exportFileDefaultName = `assessment-plan-${Date.now()}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    } else {
        alert('PDF export would require a server-side implementation. For now, use JSON export or print this page to PDF using your browser\'s print function (Ctrl+P or Cmd+P).');
    }
}

// Start Over
function startOver() {
    assessmentDesign = {
        type: null,
        udlCompliance: {},
        qmAlignment: {},
        inclusiveDesign: {},
        aiPrompt: null,
        progress: 0
    };

    // Reset all forms
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('textarea').forEach(ta => ta.value = '');
    document.querySelectorAll('select').forEach(s => s.selectedIndex = 0);
    document.querySelectorAll('input[type="text"]').forEach(i => i.value = '');

    // Hide all reports
    document.querySelectorAll('.report-section, .feedback-section, #assessment-details, #generated-prompt, #prompt-variations, #summary').forEach(el => {
        el.style.display = 'none';
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateProgress(0);
}

// Update Progress Bar
function updateProgress(percentage) {
    assessmentDesign.progress = percentage;
    document.getElementById('progress-fill').style.width = percentage + '%';
}

// Add styles for selected card
const style = document.createElement('style');
style.textContent = `
    .card.selected {
        border-color: var(--secondary-color);
        background: var(--bg-light);
    }

    .progress-bar-inline {
        height: 20px;
        background: var(--border-color);
        border-radius: 10px;
        overflow: hidden;
        margin: 1rem 0;
    }

    .progress-fill-inline {
        height: 100%;
        background: linear-gradient(90deg, var(--success-color), var(--secondary-color));
        transition: width 0.5s ease;
    }

    .success {
        color: var(--success-color);
        margin: 0.5rem 0;
    }

    .warning {
        color: var(--warning-color);
        margin: 0.5rem 0;
    }

    .success-message {
        background: var(--success-color);
        color: white;
        padding: 1rem;
        border-radius: 4px;
        margin: 1rem 0;
        text-align: center;
        font-weight: bold;
    }

    .compliance-score, .alignment-score, .inclusivity-score {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        box-shadow: var(--shadow);
    }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateProgress(0);
});