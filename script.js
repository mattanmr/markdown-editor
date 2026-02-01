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
let syncScroll = true; // Enable sync scrolling by default
let folderHandle = null; // Directory handle for folder mode
let fileHandles = {}; // Map of filename to file handle
let currentFileHandle = null; // Currently open file handle

// DOM elements
const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const editorContainer = document.getElementById('editorContainer');
const charCount = document.getElementById('charCount');
const wordCount = document.getElementById('wordCount');
const fileNameDisplay = document.getElementById('fileName');
const viewModeDisplay = document.getElementById('viewMode');
const syncScrollModeDisplay = document.getElementById('syncScrollMode');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const fileListContent = document.getElementById('fileListContent');

// Buttons
const newBtn = document.getElementById('newBtn');
const openBtn = document.getElementById('openBtn');
const openFolderBtn = document.getElementById('openFolderBtn');
const saveBtn = document.getElementById('saveBtn');
const toggleBtn = document.getElementById('toggleBtn');
const syncScrollBtn = document.getElementById('syncScrollBtn');
const closeFolderBtn = document.getElementById('closeFolderBtn');

// Load saved content from localStorage
function loadFromStorage() {
    const savedContent = localStorage.getItem('markdownContent');
    if (savedContent) {
        editor.value = savedContent;
        updatePreview();
    }
    
    // Load sync scroll preference
    const savedSyncScroll = localStorage.getItem('syncScroll');
    if (savedSyncScroll !== null) {
        syncScroll = savedSyncScroll === 'true';
        updateSyncScrollDisplay();
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
    
    // Save to localStorage for non-folder mode
    if (!currentFileHandle) {
        saveToStorage();
    }
}

// Auto-save to file handle (debounced)
let autoSaveTimeout = null;
editor.addEventListener('input', () => {
    if (currentFileHandle) {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
            saveToFileHandle();
        }, 1000); // Save 1 second after user stops typing
    }
});

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
    // If we have a file handle (folder mode), write to it
    if (currentFileHandle) {
        saveToFileHandle();
        return;
    }
    
    // Otherwise, download as new file (traditional mode)
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

// Save content to file handle
async function saveToFileHandle() {
    if (!currentFileHandle) return;
    
    try {
        const writable = await currentFileHandle.createWritable();
        await writable.write(editor.value);
        await writable.close();
        console.log('File saved:', currentFileName);
    } catch (err) {
        console.error('Failed to save file:', err);
        alert('Failed to save file. Please check permissions.');
    }
}

// Open folder
async function openFolder() {
    // Check if File System Access API is supported
    if (!('showDirectoryPicker' in window)) {
        alert('Your browser does not support folder access. Please use Chrome, Edge, or another Chromium-based browser.');
        return;
    }
    
    try {
        folderHandle = await window.showDirectoryPicker({
            mode: 'readwrite'
        });
        
        await loadFilesFromFolder();
        fileList.style.display = 'flex';
    } catch (err) {
        if (err.name !== 'AbortError') {
            console.error('Failed to open folder:', err);
            alert('Failed to open folder: ' + err.message);
        }
    }
}

// Load all markdown files from folder
async function loadFilesFromFolder() {
    if (!folderHandle) return;
    
    fileHandles = {};
    fileListContent.innerHTML = '';
    
    try {
        const files = [];
        
        for await (const entry of folderHandle.values()) {
            if (entry.kind === 'file') {
                const name = entry.name;
                if (name.endsWith('.md') || name.endsWith('.markdown')) {
                    files.push({ name, handle: entry });
                }
            }
        }
        
        // Sort files alphabetically
        files.sort((a, b) => a.name.localeCompare(b.name));
        
        // Display files
        for (const { name, handle } of files) {
            fileHandles[name] = handle;
            
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `<span class="file-item-name" title="${name}">${name}</span>`;
            fileItem.addEventListener('click', () => loadFileFromHandle(name, handle));
            fileListContent.appendChild(fileItem);
        }
        
        // Load first file if available
        if (files.length > 0) {
            loadFileFromHandle(files[0].name, files[0].handle);
        } else {
            alert('No markdown files found in the selected folder.');
        }
    } catch (err) {
        console.error('Failed to load files:', err);
        alert('Failed to load files from folder.');
    }
}

// Load a specific file from handle
async function loadFileFromHandle(fileName, handle) {
    try {
        const file = await handle.getFile();
        const content = await file.text();
        
        editor.value = content;
        currentFileName = fileName;
        currentFileHandle = handle;
        fileNameDisplay.textContent = fileName;
        
        updatePreview();
        updateActiveFileItem(fileName);
    } catch (err) {
        console.error('Failed to load file:', err);
        alert('Failed to load file: ' + fileName);
    }
}

// Update active file in list
function updateActiveFileItem(fileName) {
    const items = fileListContent.querySelectorAll('.file-item');
    items.forEach(item => {
        const name = item.querySelector('.file-item-name').textContent;
        if (name === fileName) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Close folder
function closeFolder() {
    folderHandle = null;
    fileHandles = {};
    currentFileHandle = null;
    fileList.style.display = 'none';
    fileListContent.innerHTML = '';
    
    // Reset to default state
    newFile();
}

// Toggle view mode
function toggleViewMode() {
    const modes = ['split', 'editor', 'preview'];
    const currentIndex = modes.indexOf(viewMode);
    viewMode = modes[(currentIndex + 1) % modes.length];
    
    editorContainer.className = 'editor-container';
    
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

// Toggle sync scrolling
function toggleSyncScroll() {
    syncScroll = !syncScroll;
    localStorage.setItem('syncScroll', syncScroll);
    updateSyncScrollDisplay();
}

// Update sync scroll display
function updateSyncScrollDisplay() {
    syncScrollModeDisplay.textContent = syncScroll ? 'Sync: On' : 'Sync: Off';
}

// Sync scrolling between editor and preview
let isScrolling = false;

function syncEditorToPreview() {
    if (!syncScroll || isScrolling || viewMode !== 'split') return;
    
    isScrolling = true;
    const editorScrollableHeight = editor.scrollHeight - editor.clientHeight;
    const previewScrollableHeight = preview.scrollHeight - preview.clientHeight;
    
    // Only sync if both panes have scrollable content
    if (editorScrollableHeight > 0 && previewScrollableHeight > 0) {
        const editorScrollPercentage = editor.scrollTop / editorScrollableHeight;
        const previewScrollTop = editorScrollPercentage * previewScrollableHeight;
        preview.scrollTop = previewScrollTop;
    }
    
    setTimeout(() => {
        isScrolling = false;
    }, 50);
}

function syncPreviewToEditor() {
    if (!syncScroll || isScrolling || viewMode !== 'split') return;
    
    isScrolling = true;
    const previewScrollableHeight = preview.scrollHeight - preview.clientHeight;
    const editorScrollableHeight = editor.scrollHeight - editor.clientHeight;
    
    // Only sync if both panes have scrollable content
    if (previewScrollableHeight > 0 && editorScrollableHeight > 0) {
        const previewScrollPercentage = preview.scrollTop / previewScrollableHeight;
        const editorScrollTop = previewScrollPercentage * editorScrollableHeight;
        editor.scrollTop = editorScrollTop;
    }
    
    setTimeout(() => {
        isScrolling = false;
    }, 50);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + S: Save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveFile();
    }
    
    // Ctrl/Cmd + O: Open
    if ((e.ctrlKey || e.metaKey) && e.key === 'o' && !e.shiftKey) {
        e.preventDefault();
        openFile();
    }
    
    // Ctrl/Cmd + Shift + O: Open Folder
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'O') {
        e.preventDefault();
        openFolder();
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
editor.addEventListener('scroll', syncEditorToPreview);
preview.addEventListener('scroll', syncPreviewToEditor);
newBtn.addEventListener('click', newFile);
openBtn.addEventListener('click', openFile);
openFolderBtn.addEventListener('click', openFolder);
saveBtn.addEventListener('click', saveFile);
toggleBtn.addEventListener('click', toggleViewMode);
syncScrollBtn.addEventListener('click', toggleSyncScroll);
closeFolderBtn.addEventListener('click', closeFolder);

// Initialize
loadFromStorage();
updateStats();
updateSyncScrollDisplay(); // Initialize sync button display

// Auto-save every 30 seconds
setInterval(saveToStorage, 30000);

console.log('Markdown Editor initialized');
console.log('Keyboard shortcuts:');
console.log('  Ctrl/Cmd + S: Save file');
console.log('  Ctrl/Cmd + O: Open file');
console.log('  Ctrl/Cmd + Shift + O: Open folder');
console.log('  Ctrl/Cmd + N: New file');
console.log('  Ctrl/Cmd + E: Toggle view mode');
console.log('Sync scrolling: ' + (syncScroll ? 'Enabled' : 'Disabled'));
