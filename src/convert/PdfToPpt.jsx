import React from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";

// Dummy converter: PDF → PowerPoint
const processFiles = async (files, setProgress) => {
  setProgress(30);
  const file = files[0];
  await new Promise((r) => setTimeout(r, 1000));
  setProgress(75);

  const arrayBuffer = await file.arrayBuffer();
  const blob = new Blob([arrayBuffer], {
    type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  });

  setProgress(100);
  return URL.createObjectURL(blob);
};

export default function PdfToPpt() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">PDF ➝ PowerPoint Converter</h1>
      <p className="text-gray-600 mb-6">
        Upload fail <b>PDF</b> anda dan convert ke format <b>PowerPoint (.pptx)</b>.
      </p>
      <PdfToolWrapper
        actionLabel="Convert to PPT"
        processFiles={processFiles}
        multiple={false}
        outputName="converted.pptx"
        accept=".pdf"
      />
    </div>
  );
}
