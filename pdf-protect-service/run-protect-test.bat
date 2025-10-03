@echo off
REM ==========================================================
REM QuickTools - Run PDF Protect Service + Test Protect API
REM ==========================================================

set IMAGE=pdf-protect-service
set PORT=8080
set SECRET=supersecret-change-this

echo [STEP 1] Stop old container on port %PORT% if exists...
FOR /F "tokens=*" %%i IN ('docker ps -q --filter "publish=%PORT%"') DO docker stop %%i

echo [STEP 2] Run new container...
start cmd /c "docker run --rm -p %PORT%:8080 -e PROXY_SECRET=%SECRET% %IMAGE%"

REM Wait 2 seconds for service to start
timeout /t 2 /nobreak >nul

echo [STEP 3] Check service health...
curl.exe http://localhost:%PORT%/health

echo [STEP 4] Protect sample.pdf...
if exist "..\sample.pdf" (
  curl.exe -X POST -H "x-proxy-secret: %SECRET%" -F "file=@../sample.pdf" -F "password=abc123" http://localhost:%PORT%/protect --output protected.pdf
) else (
  curl.exe -X POST -H "x-proxy-secret: %SECRET%" -F "file=@sample.pdf" -F "password=abc123" http://localhost:%PORT%/protect --output protected.pdf
)

echo [DONE] Check protected.pdf in current folder.
pause
