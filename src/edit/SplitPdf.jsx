import React, { useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";

// Dummy Split: simulate split PDF
const processFiles = async (files, setProgress, mode, pageRange) => {
  setProgress(20);
  await new Promise((r) => setTimeout(r, 1000));
  setProgress(60);

  const file = files[0];
  const arrayBuffer = await file.arrayBuffer();

  // NOTE: mode/pageRange tak betul² digunakan (simulate only)
  const blob = new Blob([arrayBuffer], { type: "application/pdf" });

  setProgress(100);
  return URL.createObjectURL(blob);
};

export default function SplitPdf() {
  const [mode, setMode] = useState("manual");
  const [pageRange, setPageRange] = useState("1-2");

  const handleProcess = (files, setProgress) => {
    return processFiles(files, setProgress, mode, pageRange);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">✂️ Split PDF</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Split your PDF by <b>page range</b> (manual) or split every page into separate files (auto).
      </p>

      {/* Mode Buttons */}
      <div className="flex gap-3 mb-4">
        <div className="relative group flex-1">
          <button
            onClick={() => setMode("manual")}
            className={`w-full px-4 py-2 rounded-lg shadow font-semibold ${
              mode === "manual"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            }`}
            title="Manual: Enter specific page ranges (e.g. 1-2, 3, 4-6)"
          >
            ✏️ Manual Mode
          </button>
          <p className="text-xs text-gray-500 mt-1">
            Enter specific page ranges (e.g. 1-2, 3, 4-6).
          </p>
          {/* Tooltip */}
          <div className="absolute left-0 mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
            Manual: choose your own page ranges
          </div>
        </div>

        <div className="relative group flex-1">
          <button
            onClick={() => setMode("auto")}
            className={`w-full px-4 py-2 rounded-lg shadow font-semibold ${
              mode === "auto"
                ? "bg-green-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            }`}
            title="Auto: Each page will be saved as a separate PDF"
          >
            ⚡ Auto Mode
          </button>
          <p className="text-xs text-gray-500 mt-1">
            Each page will be saved as a separate PDF.
          </p>
          {/* Tooltip */}
          <div className="absolute left-0 mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
            Auto: split every page into separate files
          </div>
        </div>
      </div>

      {/* Page Range Input (only for manual mode) */}
      {mode === "manual" && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Page Range</label>
          <input
            type="text"
            value={pageRange}
            onChange={(e) => setPageRange(e.target.value)}
            placeholder="e.g. 1-2, 3, 4-6"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
          />
        </div>
      )}

      <PdfToolWrapper
        title="Split PDF"
        description="Split your PDF into smaller documents"
        actionLabel="Split Now"
        processFiles={handleProcess}
        multiple={false}
        outputName="split.pdf"
        accept=".pdf"
      />
    </div>
  );
}
