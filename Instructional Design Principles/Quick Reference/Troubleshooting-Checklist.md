# Quick Reference: Troubleshooting Checklist

*Fast solutions for common educational tool development problems*

---

## 🚨 Emergency Quick Fixes

### Tool Won't Load or is Broken
**Try this first:**
1. **Refresh the page** - Clear cache with Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
2. **Check browser console** - Press F12, look for red error messages
3. **Try different browser** - Chrome, Firefox, Safari, Edge
4. **Check internet connection** - Test with other websites

**Ask Claude Code:**
```
"My tool isn't loading properly. Here's the error message: [paste error]. 
Can you help me fix this step by step?"
```

### Features Not Working as Expected
**Quick diagnostic:**
1. **Test on mobile** - Many issues are device-specific
2. **Try without browser extensions** - Ad blockers can interfere
3. **Check if it's one feature** - Isolate the problem area
4. **Test with different user inputs** - Invalid data can break tools

**Ask Claude Code:**
```
"The [specific feature] isn't working correctly. When I [describe action], 
it should [expected result] but instead [actual result]. Here's my code: [paste code]"
```

---

## 🔧 Development Problems

### Claude Code Not Understanding My Prompts

**Symptoms:**
- Generic tools that don't match your educational needs
- Missing key features you requested
- Overly complex or overly simple results

**Quick Fix:**
Make your prompts more specific using the CLEAR framework:

```
Instead of: "Create a quiz tool"
Try: "Create a financial analysis quiz for MBA students that helps them practice 
ROI calculations with immediate feedback and progress tracking. Include keyboard 
navigation and mobile-responsive design."
```

**Better Prompt Template:**
```
Create a [specific tool type] for [specific user group] that helps them [specific learning objective].

Must include:
- [Essential feature 1]
- [Essential feature 2]
- [Accessibility requirement]
- [Technical requirement]

Success criteria: [How will users know they succeeded?]
```

### Tool Missing Educational Focus

**Symptoms:**
- Looks like generic app, not learning tool
- No connection to learning objectives
- Missing feedback or assessment features

**Quick Fix:**
Add educational elements to existing tool:

```
"Add educational features to this tool:
- Clear learning objectives displayed to users
- Progress tracking toward specific skills
- Immediate feedback that explains correct answers
- Self-reflection prompts for metacognitive development
- Connection to real-world applications"
```

### Accessibility Problems

**Common Issues:**
- Can't navigate with keyboard only
- Poor color contrast
- Missing alt text for images
- Confusing for screen readers

**Quick Fix:**
```
"Make this tool fully accessible by adding:
- Keyboard navigation (Tab, Enter, Arrow keys)
- ARIA labels for all interactive elements
- Alt text for images and icons
- High contrast color mode option
- Screen reader compatible headings and structure
Test it by navigating without using a mouse."
```

**Quick Test:**
1. **Tab through entire interface** - Can you reach everything?
2. **Use high contrast mode** - Is text still readable?
3. **Zoom to 200%** - Does layout still work?
4. **Test with screen reader** - Use browser's built-in reader

---

## 📱 Device and Browser Issues

### Mobile Problems

**Symptoms:**
- Tiny buttons and text on phone
- Horizontal scrolling required
- Features don't work with touch
- Slow loading on mobile data

**Quick Fix:**
```
"Optimize this tool for mobile devices:
- Make all buttons at least 44px for touch
- Ensure text is readable without zooming
- Add touch gestures where appropriate
- Optimize images and loading for slow connections
- Test on actual phones, not just browser resize"
```

**Mobile Testing Checklist:**
- [ ] Works on phone in portrait mode
- [ ] Buttons are finger-friendly size
- [ ] No horizontal scrolling needed
- [ ] Loads in under 5 seconds on 3G
- [ ] Touch interactions feel natural

### Browser Compatibility Issues

**Symptoms:**
- Works in Chrome but not Safari/Firefox
- Missing features in older browsers
- Different appearance across browsers

**Quick Fix:**
```
"Ensure cross-browser compatibility:
- Test in Chrome, Firefox, Safari, and Edge
- Use standard web technologies, avoid experimental features
- Include fallbacks for newer features
- Test on both desktop and mobile browsers
- Use vendor prefixes for CSS when needed"
```

---

## 💾 Data and Storage Problems

### Progress Not Saving

**Symptoms:**
- Users lose work when page refreshes
- Settings don't persist between sessions
- Data disappears after closing browser

**Quick Fix:**
```
"Add data persistence to this tool:
- Use localStorage to save user progress automatically
- Save every 30 seconds or after major actions
- Show clear indicators when data is being saved
- Handle storage limit errors gracefully
- Provide export/import options for backup"
```

### Performance Issues

**Symptoms:**
- Slow loading times
- Browser freezing or crashing
- High memory usage
- Sluggish interactions

**Quick Fix:**
```
"Optimize this tool's performance:
- Reduce image sizes and use modern formats (WebP)
- Implement lazy loading for content
- Minimize JavaScript file sizes
- Add loading indicators for slow operations
- Cache frequently used data
- Profile memory usage and fix leaks"
```

---

## 🎯 User Experience Problems

### Confusing Interface

**Symptoms:**
- Users can't find key features
- Multiple ways to do the same thing
- Unclear instructions or labeling
- Too many options overwhelming users

**Quick Fix:**
```
"Simplify this tool's interface:
- Use clear, descriptive labels for all buttons and sections
- Group related features together
- Hide advanced options until needed
- Add a quick start guide or tutorial
- Use consistent design patterns throughout
- Test with actual users and observe confusion points"
```

### Poor Learning Experience

**Symptoms:**
- Students don't engage with tool
- No clear connection to course objectives
- Missing feedback or guidance
- Tool feels like busy work

**Quick Fix:**
```
"Enhance the educational value:
- Add clear learning objectives that students can see
- Provide immediate, specific feedback on all interactions
- Include real-world examples and applications
- Add self-assessment and reflection opportunities
- Connect activities to broader course goals
- Show progress toward mastery of specific skills"
```

---

## 🔍 Debugging Techniques

### Finding Error Messages
1. **Open browser console** (F12)
2. **Look for red error messages**
3. **Note line numbers and descriptions**
4. **Check Network tab** for failed requests
5. **Copy exact error text** for Claude Code

### Testing User Flows
1. **Start with fresh browser session**
2. **Follow complete user journey** from start to finish
3. **Try different types of input** (valid, invalid, edge cases)
4. **Test on different devices** and screen sizes
5. **Document where problems occur**

### Isolating Problems
1. **Disable features one by one** to find what breaks
2. **Test with minimal data** first
3. **Use browser's private/incognito mode**
4. **Clear all cache and cookies**
5. **Test without browser extensions**

---

## 📋 Pre-Launch Testing Checklist

### Functionality Testing
- [ ] All buttons and links work correctly
- [ ] Forms submit and validate properly
- [ ] Data saves and loads correctly
- [ ] Error messages are helpful and clear
- [ ] Tool works without JavaScript (graceful degradation)

### Accessibility Testing
- [ ] Full keyboard navigation possible
- [ ] Screen reader announces content properly
- [ ] Color contrast meets WCAG standards
- [ ] Text is readable when zoomed to 200%
- [ ] Alternative formats available for media

### Performance Testing
- [ ] Loads in under 3 seconds on fast connection
- [ ] Works acceptably on 3G mobile connection
- [ ] Doesn't consume excessive memory or CPU
- [ ] Handles multiple concurrent users
- [ ] Recovers gracefully from network interruptions

### Educational Testing
- [ ] Learning objectives are clear to users
- [ ] Assessment aligns with stated objectives
- [ ] Feedback is immediate and helpful
- [ ] Tool connects to real-world applications
- [ ] Students can track their progress

### Device Testing
- [ ] Works on desktop computers
- [ ] Functions properly on tablets  
- [ ] Mobile phone experience is optimized
- [ ] Cross-browser compatibility verified
- [ ] Offline functionality works when available

---

## 🆘 When to Ask for Help

### Contact Technical Support When:
- Error messages don't make sense after research
- Tool works locally but fails when deployed
- Performance issues persist after optimization attempts
- Security concerns about data handling
- Integration with institutional systems needed

### Get Educational Design Help When:
- Students aren't engaging with the tool
- Learning outcomes aren't being achieved
- Assessment doesn't measure intended skills
- Accessibility needs require specialized expertise
- Cultural sensitivity concerns arise

### Community Resources:
- **Workshop forums** - Connect with other tool builders
- **Documentation** - Check official Claude Code resources
- **User groups** - Local educational technology communities
- **Office hours** - Regular support sessions

---

## 💡 Prevention Best Practices

### Start Right:
1. **Test early and often** with real users
2. **Build accessibility in** from the beginning
3. **Start simple** and add complexity gradually
4. **Document your prompts** for future reference
5. **Plan for mobile** from the first design decisions

### Maintain Quality:
1. **Regular user feedback** sessions
2. **Periodic accessibility audits**
3. **Performance monitoring** and optimization
4. **Content freshness** reviews
5. **Security updates** as needed

### Scale Thoughtfully:
1. **Monitor usage patterns** and adjust accordingly
2. **Plan for increased load** before it becomes a problem
3. **Keep backups** of working versions
4. **Document successful patterns** for reuse
5. **Train others** to maintain and improve tools

---

**Remember:** Most problems have been solved before. When in doubt, ask Claude Code for specific help with error messages, and don't hesitate to reach out to the community. Troubleshooting skills improve with practice!

---

*This troubleshooting guide evolves based on community experience. Share your solutions and common problems to help everyone build better educational tools.*

**Built with ❤️ for smooth development at Ivey Business School**