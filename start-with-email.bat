@echo off
REM Runs the site through Vercel's local runtime so the contact form's
REM serverless function (/api/contact) actually works and sends real email.
REM
REM Plain `start.bat` runs Vite only, which serves the pages but returns 404
REM for /api/contact -- use this one when you want to test the form.
REM
REM Credentials are read from .env.local. The first run asks you to log in
REM and link the folder to a Vercel project.
title VINFOTEC - Dev Server with Email
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

if not exist ".env.local" (
  echo.
  echo [ERROR] .env.local is missing, so the contact form cannot send mail.
  echo         Copy .env.example to .env.local and fill in the SMTP values.
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
echo Starting Vercel dev at http://localhost:3000
echo The contact form will send real email to the address in CONTACT_TO.
echo Press Ctrl+C in this window to stop it.
echo.
call npx --yes vercel@latest dev

pause
