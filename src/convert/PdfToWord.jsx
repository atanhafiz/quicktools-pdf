import React from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";

// Dummy converter: rename PDF jadi DOCX
// Real case: integrate API (contoh CloudConvert / iLovePDF)
const processFiles = async (files, setProgress) => {
  setProgress(20);

  const file = files[0];
  await new Promise((r) => setTimeout(r, 1000)); // simulate
  setProgress(60);

  // tukar blob → Word file
  const arrayBuffer = await file.arrayBuffer();
  const blob = new Blob([arrayBuffer], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });

  setProgress(100);
  return URL.createObjectURL(blob);
};

export default function PdfToWord() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">PDF ➝ Word Converter</h1>
      <p className="text-gray-600 mb-6">
        Upload fail <b>PDF</b> anda dan convert ke format <b>Word (.docx)</b>.
      </p>
      <PdfToolWrapper
        title="PDF to Word"
        description="Convert your PDF to editable Word document"
        actionLabel="Convert to Word"
        processFiles={processFiles}
        multiple={false}
        outputName="converted.docx"
        accept=".pdf"   // ✅ Confirm button jadi Choose PDF File
      />
    </div>
  );
}
