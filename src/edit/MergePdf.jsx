import React, { useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";

// Dummy Merge: simulate merge PDF files
const processFiles = async (files, setProgress, mode) => {
  setProgress(25);
  await new Promise((r) => setTimeout(r, 1000));
  setProgress(70);

  // NOTE: mode & order simulate only
  const mergedBlob = new Blob([], { type: "application/pdf" });

  setProgress(100);
  return URL.createObjectURL(mergedBlob);
};

export default function MergePdf() {
  const [mode, setMode] = useState("auto");

  const handleProcess = (files, setProgress) => {
    return processFiles(files, setProgress, mode);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📎 Merge PDF</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Combine multiple PDF files into a single document.
      </p>

      {/* Mode Buttons */}
      <div className="flex gap-3 mb-4">
        {/* Auto Merge */}
        <div className="relative group flex-1">
          <button
            onClick={() => setMode("auto")}
            className={`w-full px-4 py-2 rounded-lg shadow font-semibold ${
              mode === "auto"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            }`}
            title="Auto: Merge files instantly in the order uploaded"
          >
            ⚡ Auto Merge
          </button>
          <p className="text-xs text-gray-500 mt-1">
            Merge files in the order uploaded.
          </p>
          <div className="absolute left-0 mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
            Auto: merge instantly
          </div>
        </div>

        {/* Manual Merge */}
        <div className="relative group flex-1">
          <button
            onClick={() => setMode("manual")}
            className={`w-full px-4 py-2 rounded-lg shadow font-semibold ${
              mode === "manual"
                ? "bg-green-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            }`}
            title="Manual: Drag & drop files to choose merge order"
          >
            ✏️ Manual Merge
          </button>
          <p className="text-xs text-gray-500 mt-1">
            Drag & drop to reorder before merging.
          </p>
          <div className="absolute left-0 mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
            Manual: choose merge order
          </div>
        </div>
      </div>

      {/* Placeholder UI */}
      {mode === "manual" && (
        <div className="mb-4 border rounded-lg p-3 text-gray-600 dark:text-gray-300 text-sm">
          📌 Drag & drop uploaded files here to reorder (demo placeholder).
          <br /> (In real implementation, file list with reorder handles will appear.)
        </div>
      )}

      <PdfToolWrapper
        title="Merge PDF"
        description="Combine multiple PDFs into one file"
        actionLabel="Merge Now"
        processFiles={handleProcess}
        multiple={true}
        outputName="merged.pdf"
        accept=".pdf"
      />
    </div>
  );
}
