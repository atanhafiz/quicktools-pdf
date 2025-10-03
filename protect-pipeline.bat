@echo off
REM ==========================================================
REM QuickTools - Auto Generate & Protect PDF (One Click + Auto Open)
REM ==========================================================

set FUNC_URL=https://pmvbnfhfryeuxyvcwqxu.functions.supabase.co/protect-pdf
set PASS=abc123

echo [STEP 1] Check if sample.pdf exists...
if not exist sample.pdf (
  echo [INFO] sample.pdf not found, creating new one with Node.js...

  where node >nul 2>nul
  if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found. Please install Node.js first.
    pause
    exit /b
  )

  set SCRIPT=make-sample.js

  > %SCRIPT% echo import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
  >> %SCRIPT% echo import { writeFileSync } from "fs";
  >> %SCRIPT% echo const createPDF = async () => {
  >> %SCRIPT% echo   const pdfDoc = await PDFDocument.create();
  >> %SCRIPT% echo   const page = pdfDoc.addPage([600, 400]);
  >> %SCRIPT% echo   const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  >> %SCRIPT% echo   page.drawText("Hello QuickTools!", { x: 200, y: 200, size: 24, font, color: rgb(0, 0.53, 0.71) });
  >> %SCRIPT% echo   const pdfBytes = await pdfDoc.save();
  >> %SCRIPT% echo   writeFileSync("sample.pdf", pdfBytes);
  >> %SCRIPT% echo   console.log("✅ sample.pdf created");
  >> %SCRIPT% echo };
  >> %SCRIPT% echo createPDF();

  node %SCRIPT%
)

echo [STEP 2] Uploading sample.pdf to Supabase Protect Function...
curl.exe -X POST -F "file=@sample.pdf" -F "password=%PASS%" %FUNC_URL% --output protected.pdf

if %errorlevel% neq 0 (
  echo [FAILED] Upload error.
) else (
  echo [DONE] protected.pdf generated successfully!
  start protected.pdf
)

pause
