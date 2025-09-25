import React, { useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";

// Dummy: simulate apply watermark text/logo ke PDF
const processFiles = async (files, setProgress, watermark) => {
  setProgress(20);
  await new Promise((r) => setTimeout(r, 1000));
  setProgress(60);

  const file = files[0];
  const arrayBuffer = await file.arrayBuffer();

  // NOTE: watermark value tak betul² digunakan (simulate only)
  // Real case: API embed watermark text/image ke dalam PDF
  const blob = new Blob([arrayBuffer], { type: "application/pdf" });

  setProgress(100);
  return URL.createObjectURL(blob);
};

export default function WatermarkPdf() {
  const [watermark, setWatermark] = useState("");

  // Bungkus watermark sekali untuk wrapper
  const handleProcess = (files, setProgress) => {
    return processFiles(files, setProgress, watermark);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">💧 Watermark PDF</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Insert a custom text or logo watermark into your PDF file.
      </p>

      {/* Input watermark */}
      <input
        type="text"
        placeholder="Enter watermark text or logo URL"
        value={watermark}
        onChange={(e) => setWatermark(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
      />

      <PdfToolWrapper
        title="Watermark PDF"
        description="Add a visible text or logo watermark to your PDF"
        actionLabel="Apply Watermark"
        processFiles={handleProcess}
        multiple={false}
        outputName="watermarked.pdf"
        accept=".pdf"
      />
    </div>
  );
}
