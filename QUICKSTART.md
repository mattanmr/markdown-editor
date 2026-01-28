# Markdown Editor - Quick Start Guide

## How to Run

### Option 1: Direct Browser Open (Simplest)
1. Navigate to the project folder
2. Double-click `index.html` to open it in your default browser
3. Start editing!

### Option 2: Local Server (Recommended for PWA features)

The app works best with a local server to enable all PWA features. Choose one:

**Python (if installed):**
```bash
cd C:\Users\mattan\Documents\markdown-editor
python -m http.server 8000
```
Then open: http://localhost:8000

**Node.js (if installed):**
```bash
cd C:\Users\mattan\Documents\markdown-editor
npx http-server -p 8000
```
Then open: http://localhost:8000

**PHP (if installed):**
```bash
cd C:\Users\mattan\Documents\markdown-editor
php -S localhost:8000
```
Then open: http://localhost:8000

### Option 3: VS Code Live Server Extension
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

## Installing on Android

1. Open the app in Chrome on your Android device
2. Tap the menu (⋮) in the top-right
3. Select "Add to Home Screen" or "Install app"
4. The app will appear on your home screen like a native app
5. It will work offline!

## Features Quick Reference

### Toolbar Buttons
- 📄 **New** - Create a new file (Ctrl+N)
- 📂 **Open** - Open an existing .md file (Ctrl+O)
- 💾 **Save** - Download your markdown file (Ctrl+S)
- 👁️ **View Mode** - Toggle between Split/Editor/Preview (Ctrl+E)

### View Modes
1. **Split View** - See editor and preview side-by-side (default)
2. **Editor Only** - Full-screen editing
3. **Preview Only** - Full-screen preview

### Auto-Save
Your work is automatically saved to your browser's local storage:
- Every 30 seconds
- After each edit
- When you reload the page, your work is restored

### Keyboard Shortcuts
- `Ctrl/Cmd + S` - Save file
- `Ctrl/Cmd + O` - Open file
- `Ctrl/Cmd + N` - New file
- `Ctrl/Cmd + E` - Toggle view mode
- `Tab` - Insert 4 spaces (in editor)

## Markdown Syntax Quick Reference

```markdown
# Heading 1
## Heading 2
### Heading 3

**bold text**
*italic text*
***bold and italic***

- Unordered list item
- Another item

1. Ordered list item
2. Another item

[Link text](https://example.com)
![Image alt text](image-url.jpg)

> Blockquote

`inline code`

\`\`\`
code block
\`\`\`

| Table | Header |
|-------|--------|
| Cell  | Cell   |
```

## Troubleshooting

### Service Worker Issues
If PWA features aren't working:
1. Make sure you're running via a local server (not just opening the file)
2. Clear your browser cache
3. Unregister the service worker in DevTools (Application > Service Workers)
4. Reload the page

### File Won't Save
The Save button downloads the file to your default downloads folder. Check your browser's download settings if you can't find it.

### Lost Work
Your work is auto-saved to browser local storage. However:
- Clearing browser data will delete saved content
- Each browser has its own storage (Chrome ≠ Firefox)
- Use the Save button to create permanent .md files

## Tips & Tricks

1. **Use keyboard shortcuts** for faster workflow
2. **Press Ctrl+E** to switch views based on your task:
   - Writing mode: Editor Only
   - Reading mode: Preview Only
   - Default: Split View
3. **Save frequently** to create backup .md files
4. **Install as PWA** on mobile for app-like experience
5. **Works offline** once cached - perfect for writing on the go

## Support

This is a standalone, self-contained app with no dependencies except:
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection only needed for first load (downloads Marked.js library)

Enjoy your markdown editing! 📝
