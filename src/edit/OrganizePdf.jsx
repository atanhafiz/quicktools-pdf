import React, { useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";

// Dummy Organize
const processFiles = async (files, setProgress, mode) => {
  setProgress(25);
  await new Promise((r) => setTimeout(r, 1000));
  setProgress(70);

  const file = files[0];
  const arrayBuffer = await file.arrayBuffer();

  // NOTE: mode simulate only
  const blob = new Blob([arrayBuffer], { type: "application/pdf" });

  setProgress(100);
  return URL.createObjectURL(blob);
};

export default function OrganizePdf() {
  const [mode, setMode] = useState("manual");

  const handleProcess = (files, setProgress) => {
    return processFiles(files, setProgress, mode);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📑 Organize PDF</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Reorder PDF pages manually or auto sort pages instantly.
      </p>

      {/* Mode Buttons */}
      <div className="flex gap-3 mb-4">
        {/* Manual Reorder */}
        <div className="relative group flex-1">
          <button
            onClick={() => setMode("manual")}
            className={`w-full px-4 py-2 rounded-lg shadow font-semibold ${
              mode === "manual"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            }`}
            title="Manual: Drag & drop page thumbnails to reorder"
          >
            ✏️ Manual Reorder
          </button>
          <p className="text-xs text-gray-500 mt-1">
            Drag & drop thumbnails to reorder.
          </p>
          <div className="absolute left-0 mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
            Manual: custom reorder pages
          </div>
        </div>

        {/* Auto Sort */}
        <div className="relative group flex-1">
          <button
            onClick={() => setMode("auto")}
            className={`w-full px-4 py-2 rounded-lg shadow font-semibold ${
              mode === "auto"
                ? "bg-green-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            }`}
            title="Auto: Automatically sort pages ascending"
          >
            ⚡ Auto Sort
          </button>
          <p className="text-xs text-gray-500 mt-1">
            Auto arrange all pages in order.
          </p>
          <div className="absolute left-0 mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
            Auto: sort pages ascending
          </div>
        </div>
      </div>

      {/* Placeholder UI */}
      {mode === "manual" && (
        <div className="mb-4 border rounded-lg p-3 text-gray-600 dark:text-gray-300 text-sm">
          📌 Drag & drop page thumbnails here (demo placeholder).  
          <br /> (In real implementation, thumbnails of PDF pages will appear.)
        </div>
      )}

      {mode === "auto" && (
        <div className="mb-4 border rounded-lg p-3 text-gray-600 dark:text-gray-300 text-sm">
          ⚡ Pages will be auto sorted ascending by default.
        </div>
      )}

      <PdfToolWrapper
        title="Organize PDF"
        description="Reorder or auto sort PDF pages"
        actionLabel="Organize Now"
        processFiles={handleProcess}
        multiple={false}
        outputName="organized.pdf"
        accept=".pdf"
      />
    </div>
  );
}
