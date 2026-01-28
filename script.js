// Configure marked options
marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    mangle: false
});

// State management
let currentFile = null;
let currentFileName = 'Untitled.md';
let viewMode = 'split'; // 'split', 'editor', 'preview'

// DOM elements
const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const editorContainer = document.getElementById('editorContainer');
const charCount = document.getElementById('charCount');
const wordCount = document.getElementById('wordCount');
const fileNameDisplay = document.getElementById('fileName');
const viewModeDisplay = document.getElementById('viewMode');
const fileInput = document.getElementById('fileInput');

// Buttons
const newBtn = document.getElementById('newBtn');
const openBtn = document.getElementById('openBtn');
const saveBtn = document.getElementById('saveBtn');
const toggleBtn = document.getElementById('toggleBtn');

// Load saved content from localStorage
function loadFromStorage() {
    const savedContent = localStorage.getItem('markdownContent');
    if (savedContent) {
        editor.value = savedContent;
        updatePreview();
    }
}

// Save content to localStorage
function saveToStorage() {
    localStorage.setItem('markdownContent', editor.value);
}

// Update preview
function updatePreview() {
    const markdown = editor.value;
    preview.innerHTML = marked.parse(markdown);
    updateStats();
    saveToStorage();
}

// Update statistics
function updateStats() {
    const text = editor.value;
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    
    charCount.textContent = `${chars} character${chars !== 1 ? 's' : ''}`;
    wordCount.textContent = `${words} word${words !== 1 ? 's' : ''}`;
}

// New file
function newFile() {
    if (editor.value && !confirm('Create new file? Unsaved changes will be lost.')) {
        return;
    }
    
    editor.value = '';
    currentFile = null;
    currentFileName = 'Untitled.md';
    fileNameDisplay.textContent = currentFileName;
    updatePreview();
}

// Open file
function openFile() {
    fileInput.click();
}

// Handle file selection
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    currentFile = file;
    currentFileName = file.name;
    fileNameDisplay.textContent = currentFileName;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        editor.value = event.target.result;
        updatePreview();
    };
    reader.readAsText(file);
    
    // Reset file input
    fileInput.value = '';
});

// Save file
function saveFile() {
    const content = editor.value;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Toggle view mode
function toggleViewMode() {
    const modes = ['split', 'editor', 'preview'];
    const currentIndex = modes.indexOf(viewMode);
    viewMode = modes[(currentIndex + 1) % modes.length];
    
    editorContainer.className = '';
    
    switch (viewMode) {
        case 'editor':
            editorContainer.classList.add('editor-only');
            viewModeDisplay.textContent = 'Editor';
            break;
        case 'preview':
            editorContainer.classList.add('preview-only');
            viewModeDisplay.textContent = 'Preview';
            break;
        default:
            viewModeDisplay.textContent = 'Split';
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + S: Save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveFile();
    }
    
    // Ctrl/Cmd + O: Open
    if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
        e.preventDefault();
        openFile();
    }
    
    // Ctrl/Cmd + N: New
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        newFile();
    }
    
    // Ctrl/Cmd + E: Toggle view
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        toggleViewMode();
    }
    
    // Tab in editor: Insert tab
    if (e.target === editor && e.key === 'Tab') {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(end);
        editor.selectionStart = editor.selectionEnd = start + 4;
        updatePreview();
    }
});

// Event listeners
editor.addEventListener('input', updatePreview);
newBtn.addEventListener('click', newFile);
openBtn.addEventListener('click', openFile);
saveBtn.addEventListener('click', saveFile);
toggleBtn.addEventListener('click', toggleViewMode);

// Initialize
loadFromStorage();
updateStats();

// Auto-save every 30 seconds
setInterval(saveToStorage, 30000);

console.log('Markdown Editor initialized');
console.log('Keyboard shortcuts:');
console.log('  Ctrl/Cmd + S: Save file');
console.log('  Ctrl/Cmd + O: Open file');
console.log('  Ctrl/Cmd + N: New file');
console.log('  Ctrl/Cmd + E: Toggle view mode');
