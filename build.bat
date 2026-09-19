@echo off
REM Builds the production bundle into dist\ and then serves it locally
REM so you can check exactly what Vercel will deploy.
title VINFOTEC - Production Build
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
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo.
    echo [ERROR] npm install failed. See the messages above.
    pause
    exit /b 1
  )
)

echo.
echo Building for production...
call npm run build
if errorlevel 1 (
  echo.
  echo [ERROR] Build failed. See the messages above.
  pause
  exit /b 1
)

echo.
echo Build complete. Output is in the dist folder.
echo Serving the build at http://localhost:4173
echo Press Ctrl+C in this window to stop it.
echo.
start "" http://localhost:4173
call npm run preview

pause
