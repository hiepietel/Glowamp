@echo off
cd /d "%~dp0"
if not exist node_modules call npm install
echo Glowamp: http://127.0.0.1:8888/
call npm run dev -- --open
