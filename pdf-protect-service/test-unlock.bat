@echo off
set FILE=C:/A_PROJECTS/PROJECTS_WEB_BASED/QuickTools/PDFHub/pdf-tools-react/protected.pdf
set PASS=abc123
set URL=http://localhost:8080/unlock

echo [INFO] Unlocking %FILE% with password %PASS% ...

curl.exe -X POST -H "x-proxy-secret: supersecret-change-this" -F "file=@%FILE%" -F "password=%PASS%" %URL% --output unlocked.pdf

if %errorlevel% neq 0 (
  echo [FAILED] Unlock request failed.
) else (
  echo [DONE] unlocked.pdf generated successfully!
)

pause
