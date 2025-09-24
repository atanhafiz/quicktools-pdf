import React from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";

// Dummy converter: Image(s) → PDF
const processFiles = async (files, setProgress) => {
  setProgress(35);
  await new Promise((r) => setTimeout(r, 1500)); // simulate
  setProgress(85);

  // Combine images → dummy PDF
  const arrayBuffers = await Promise.all(files.map(f => f.arrayBuffer()));
  const blob = new Blob(arrayBuffers, { type: "application/pdf" });

  setProgress(100);
  return URL.createObjectURL(blob);
};

export default function ImageToPdf() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Image ➝ PDF Converter</h1>
      <p className="text-gray-600 mb-6">
        Upload beberapa <b>gambar</b> dan combine jadi satu <b>fail PDF</b>.
      </p>
      <PdfToolWrapper
        actionLabel="Convert to PDF"
        processFiles={processFiles}
        multiple={true}
        outputName="converted.pdf"
        accept=".png,.jpg,.jpeg,image/*"
      />
    </div>
  );
}
