@echo off
REM Starts the development server and opens the site in your browser.
title VINFOTEC - Dev Server
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo [ERROR] Node.js was not found on your PATH.
  echo         Install it from https://nodejs.org then run this file again.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Installing dependencies for the first time. This may take a minute...
  call npm install
  if errorlevel 1 (
    echo.
    echo [ERROR] npm install failed. See the messages above.
    pause
    exit /b 1
  )
)

echo.
echo Starting the dev server at http://localhost:5173
echo Press Ctrl+C in this window to stop it.
echo.
start "" http://localhost:5173
call npm run dev

pause
