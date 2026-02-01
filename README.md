# Markdown Editor

A simple, lightweight, cross-platform markdown viewer and editor.

## Features

- ✨ Real-time markdown preview
- 💾 Save and open `.md` files
- 📁 **Folder mode**: Auto-load all markdown files from a folder
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

### Folder Mode (Chrome/Edge recommended)

The app now supports automatic folder loading, which allows you to:

1. Click the **"Folder"** button (📁) or press `Ctrl/Cmd + Shift + O`
2. Select a folder containing `.md` or `.markdown` files
3. The app will:
   - Display all markdown files in a sidebar
   - Load the first file automatically
   - Auto-save changes back to the original files (with 1-second debounce)
4. Click any file in the sidebar to switch between files
5. All edits are automatically saved to the original files in the folder

**Note**: Folder mode uses the [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API), which is currently supported in Chrome, Edge, and other Chromium-based browsers. You'll need to grant permission for the app to access the folder.

### Mobile/Android

You can install this as a Progressive Web App (PWA) on Android:

1. Open the app in Chrome or Firefox on Android
2. Tap the menu (⋮) and select "Add to Home Screen" or "Install"
3. The app will work like a native app with offline support

## Keyboard Shortcuts

- `Ctrl/Cmd + S` - Save file
- `Ctrl/Cmd + O` - Open file
- `Ctrl/Cmd + Shift + O` - Open folder
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
- **Chrome/Edge** (recommended) - Full support including folder mode
- Firefox - Basic features only (no folder mode)
- Safari - Basic features only (no folder mode)
- Opera - Basic features only (no folder mode)

**Folder Mode Requirements**: Chrome 86+, Edge 86+, or other Chromium-based browsers that support the File System Access API.

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
- [ ] Create new files from UI in folder mode
- [ ] Syntax highlighting for code blocks
- [ ] Table of contents generation
- [ ] Custom themes
- [ ] Cloud sync options
- [ ] Search within files

## License

MIT License - feel free to use and modify as needed.

## Contributing

This is a simple project meant to be lightweight and easy to understand. Feel free to fork and customize for your needs!
