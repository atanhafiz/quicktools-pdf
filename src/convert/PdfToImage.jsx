import React from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";

// Dummy converter: PDF → Image (simulate JPG)
const processFiles = async (files, setProgress) => {
  setProgress(40);
  const file = files[0];
  await new Promise((r) => setTimeout(r, 1000));
  setProgress(80);

  const arrayBuffer = await file.arrayBuffer();
  const blob = new Blob([arrayBuffer], { type: "image/jpeg" });

  setProgress(100);
  return URL.createObjectURL(blob);
};

export default function PdfToImage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">PDF ➝ Image Converter</h1>
      <p className="text-gray-600 mb-6">
        Export setiap page dalam <b>PDF</b> anda sebagai <b>gambar (JPG/PNG)</b>.
      </p>
      <PdfToolWrapper
        actionLabel="Convert to Image"
        processFiles={processFiles}
        multiple={false}
        outputName="converted.jpg"
        accept=".pdf"
      />
    </div>
  );
}
