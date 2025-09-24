import React from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";

// Dummy converter: PDF → Excel
const processFiles = async (files, setProgress) => {
  setProgress(25);
  const file = files[0];
  await new Promise((r) => setTimeout(r, 1000));
  setProgress(70);

  const arrayBuffer = await file.arrayBuffer();
  const blob = new Blob([arrayBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  setProgress(100);
  return URL.createObjectURL(blob);
};

export default function PdfToExcel() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">PDF ➝ Excel Converter</h1>
      <p className="text-gray-600 mb-6">
        Upload fail <b>PDF</b> anda dan extract jadual ke format <b>Excel (.xlsx)</b>.
      </p>
      <PdfToolWrapper
        actionLabel="Convert to Excel"
        processFiles={processFiles}
        multiple={false}
        outputName="converted.xlsx"
        accept=".pdf"
      />
    </div>
  );
}
