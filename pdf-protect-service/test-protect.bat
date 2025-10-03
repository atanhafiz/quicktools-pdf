@echo off
set FILE=C:/A_PROJECTS/PROJECTS_WEB_BASED/QuickTools/PDFHub/pdf-tools-react/sample.pdf
set PASS=abc123
set URL=http://localhost:8080/protect

echo [INFO] Protecting %FILE% with password %PASS% ...

curl.exe -X POST -H "x-proxy-secret: supersecret-change-this" -F "file=@%FILE%" -F "password=%PASS%" %URL% --output protected.pdf

if %errorlevel% neq 0 (
  echo [FAILED] Protect request failed.
) else (
  echo [DONE] protected.pdf generated successfully!
)

pause
