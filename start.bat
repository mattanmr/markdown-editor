@echo off
echo ========================================
echo  Markdown Editor - Local Server Launcher
echo ========================================
echo.

REM Check for Python
where python >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] Python found - Starting server...
    echo.
    echo Server running at: http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    start http://localhost:8000
    python -m http.server 8000
    goto :end
)

REM Check for Node.js
where node >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] Node.js found - Starting server...
    echo.
    echo Server running at: http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    start http://localhost:8000
    npx http-server -p 8000
    goto :end
)

REM Check for PHP
where php >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] PHP found - Starting server...
    echo.
    echo Server running at: http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    start http://localhost:8000
    php -S localhost:8000
    goto :end
)

REM No server found - open directly
echo [!] No local server found (Python/Node.js/PHP)
echo [i] Opening app directly in browser...
echo [i] For full PWA features, install Python, Node.js, or PHP
echo.
start index.html

:end
pause
