# Markdown Editor

A simple, lightweight, cross-platform markdown viewer and editor.

## Features

- ✨ Real-time markdown preview
- 💾 Save and open `.md` files
- 📱 Responsive design (works on mobile and desktop)
- 🎨 Clean, modern interface
- ⌨️ Keyboard shortcuts
- 💡 Auto-save to local storage
- 👁️ Three view modes: Split, Editor-only, Preview-only
- 📊 Character and word count
- 🌐 Works offline (PWA-ready)

## Usage

### Desktop

1. Open `index.html` in your web browser
2. Start writing markdown in the left pane
3. See the rendered preview in the right pane
4. Use the toolbar buttons or keyboard shortcuts to manage files

### Mobile/Android

You can install this as a Progressive Web App (PWA) on Android:

1. Open the app in Chrome or Firefox on Android
2. Tap the menu (⋮) and select "Add to Home Screen" or "Install"
3. The app will work like a native app with offline support

## Keyboard Shortcuts

- `Ctrl/Cmd + S` - Save file
- `Ctrl/Cmd + O` - Open file
- `Ctrl/Cmd + N` - New file
- `Ctrl/Cmd + E` - Toggle view mode (Split/Editor/Preview)
- `Tab` - Insert 4 spaces (in editor)

## View Modes

- **Split View**: See editor and preview side-by-side
- **Editor Only**: Focus on writing without preview
- **Preview Only**: See only the rendered markdown

## Local Storage

Your work is automatically saved to browser local storage every 30 seconds and on each edit. When you reopen the app, your last session will be restored.

## Technology Stack

- HTML5
- CSS3
- Vanilla JavaScript
- [Marked.js](https://marked.js.org/) - Markdown parser

## Browser Support

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Installation for Development

No build process required! Just open `index.html` in a web browser.

For a better development experience, you can use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

## Future Enhancements

- [ ] Dark mode toggle
- [ ] Export to PDF
- [ ] Multiple file tabs
- [ ] Syntax highlighting for code blocks
- [ ] Table of contents generation
- [ ] Custom themes
- [ ] File system API integration
- [ ] Cloud sync options

## License

MIT License - feel free to use and modify as needed.

## Contributing

This is a simple project meant to be lightweight and easy to understand. Feel free to fork and customize for your needs!
