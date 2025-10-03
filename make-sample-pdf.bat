@echo off
REM ==========================================================
REM QuickTools - Generate sample.pdf (Hello QuickTools)
REM ==========================================================

echo [INFO] Creating sample.pdf with Node.js and pdf-lib ...

:: check kalau node ada
where node >nul 2>nul
if %errorlevel% neq 0 (
  echo [ERROR] Node.js not found. Please install Node.js first.
  pause
  exit /b
)

:: buat file JS sementara
set SCRIPT=make-sample.js

echo import { PDFDocument, StandardFonts, rgb } from "pdf-lib"; > %SCRIPT%
echo import { writeFileSync } from "fs"; >> %SCRIPT%
echo. >> %SCRIPT%
echo const createPDF = async () => { >> %SCRIPT%
echo   const pdfDoc = await PDFDocument.create(); >> %SCRIPT%
echo   const page = pdfDoc.addPage([600, 400]); >> %SCRIPT%
echo   const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold); >> %SCRIPT%
echo   page.drawText("Hello QuickTools!", { >> %SCRIPT%
echo     x: 200, >> %SCRIPT%
echo     y: 200, >> %SCRIPT%
echo     size: 24, >> %SCRIPT%
echo     font, >> %SCRIPT%
echo     color: rgb(0, 0.53, 0.71), >> %SCRIPT%
echo   }); >> %SCRIPT%
echo   const pdfBytes = await pdfDoc.save(); >> %SCRIPT%
echo   writeFileSync("sample.pdf", pdfBytes); >> %SCRIPT%
echo   console.log("✅ sample.pdf created"); >> %SCRIPT%
echo }; >> %SCRIPT%
echo. >> %SCRIPT%
echo createPDF(); >> %SCRIPT%

:: run node
node %SCRIPT%

echo [DONE] sample.pdf generated in current folder.
pause
