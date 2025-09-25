import React from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";

// Dummy OCR: simulate extract text dari PDF
const processFiles = async (files, setProgress) => {
  setProgress(30);
  await new Promise((r) => setTimeout(r, 1000));
  setProgress(70);

  // Simulate output text file
  const content = "This is extracted text from the scanned PDF (dummy).";
  const blob = new Blob([content], { type: "text/plain" });

  setProgress(100);
  return URL.createObjectURL(blob);
};

export default function OcrPdf() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔎 OCR PDF</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Extract text content from scanned PDF files.
      </p>

      <PdfToolWrapper
        title="OCR PDF"
        description="Convert scanned PDF pages into editable text"
        actionLabel="Run OCR"
        processFiles={processFiles}
        multiple={false}
        outputName="ocr-result.txt"
        accept=".pdf"
      />
    </div>
  );
}
