@echo off
title AnabhiDev Smart Study - Local Web Server
echo ===================================================
echo Memulai Server Web Lokal untuk AnabhiDev Smart Study
echo ===================================================
echo.
echo Membuka http://localhost:3000 di browser...
start http://localhost:3000
echo.
where npx >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  echo Menjalankan server via npx serve di port 3000...
  npx serve -l 3000 .
  goto end
)
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  echo Menjalankan server via python http.server di port 3000...
  python -m http.server 3000
  goto end
)
echo Server lokal tidak dapat dijalankan otomatis.
pause
:end
