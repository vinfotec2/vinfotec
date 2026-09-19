@echo off
REM Deploys the site to Vercel. The first run will prompt you to log in
REM and link this folder to a Vercel project.
title VINFOTEC - Deploy to Vercel
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

echo.
echo Deploying to Vercel production...
echo (Running via npx - no global install needed.)
echo.
call npx --yes vercel@latest --prod
if errorlevel 1 (
  echo.
  echo [ERROR] Deploy failed. See the messages above.
)

echo.
pause
