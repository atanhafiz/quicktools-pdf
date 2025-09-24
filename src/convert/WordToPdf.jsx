import React from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";

// Dummy converter: rename Word jadi PDF
// Real case: integrate API / backend untuk proper conversion
const processFiles = async (files, setProgress) => {
  setProgress(20);

  const file = files[0];
  await new Promise((r) => setTimeout(r, 1000)); // simulate
  setProgress(60);

  // tukar blob → PDF file
  const arrayBuffer = await file.arrayBuffer();
  const blob = new Blob([arrayBuffer], { type: "application/pdf" });

  setProgress(100);
  return URL.createObjectURL(blob);
};

export default function WordToPdf() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Word ➝ PDF Converter</h1>
      <p className="text-gray-600 mb-6">
        Upload dokumen <b>Word (.docx / .doc)</b> dan convert ke format PDF.
      </p>
      <PdfToolWrapper
        title="Word to PDF"
        description="Convert your Word document to PDF"
        actionLabel="Convert to PDF"
        processFiles={processFiles}
        multiple={false}
        outputName="converted.pdf"
        accept=".docx,.doc"   // ✅ Confirm button jadi Choose Word File
      />
    </div>
  );
}
