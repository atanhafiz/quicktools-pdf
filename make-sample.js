import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { writeFileSync } from "fs";

const createPDF = async () => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  page.drawText("Hello QuickTools!", { 
    x: 200, 
    y: 200, 
    size: 24, 
    font, 
    color: rgb(0, 0.53, 0.71) 
  });
  const pdfBytes = await pdfDoc.save();
  writeFileSync("sample.pdf", pdfBytes);
  console.log("✅ sample.pdf created");
};

createPDF();
