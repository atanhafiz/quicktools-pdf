@echo off
:MENU
cls
echo ==============================
echo QuickTools PDF - Supabase Test
echo ==============================
echo [1] Protect PDF (Encrypt)
echo [2] Unlock PDF (Decrypt)
echo [0] Exit
echo ==============================
set /p choice=Choose option: 

if "%choice%"=="1" goto PROTECT
if "%choice%"=="2" goto UNLOCK
if "%choice%"=="0" exit
goto MENU

:PROTECT
set FILE=C:/A_PROJECTS/PROJECTS_WEB_BASED/QuickTools/PDFHub/pdf-tools-react/sample.pdf
set PASS=abc123
set URL=https://pmvbnfhfryeuxyvcwqxu.functions.supabase.co/protect-pdf

echo [INFO] Protecting %FILE% with password %PASS% ...
curl.exe -X POST -H "x-proxy-secret: supersecret-change-this" -F "file=@%FILE%" -F "password=%PASS%" %URL% --output protected.pdf

if %errorlevel% neq 0 (
  echo [FAILED] Protect request failed.
) else (
  echo [DONE] protected.pdf generated successfully!
)
pause
goto MENU

:UNLOCK
set FILE=C:/A_PROJECTS/PROJECTS_WEB_BASED/QuickTools/PDFHub/pdf-tools-react/protected.pdf
set PASS=abc123
set URL=https://pmvbnfhfryeuxyvcwqxu.functions.supabase.co/unlock-pdf

echo [INFO] Unlocking %FILE% with password %PASS% ...
curl.exe -X POST -H "x-proxy-secret: supersecret-change-this" -F "file=@%FILE%" -F "password=%PASS%" %URL% --output unlocked.pdf

if %errorlevel% neq 0 (
  echo [FAILED] Unlock request failed.
) else (
  echo [DONE] unlocked.pdf generated successfully!
)
pause
goto MENU
