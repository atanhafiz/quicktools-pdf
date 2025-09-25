import React, { useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";

// Dummy Delete Pages
const processFiles = async (files, setProgress, mode, pages) => {
  setProgress(25);
  await new Promise((r) => setTimeout(r, 1000));
  setProgress(70);

  const file = files[0];
  const arrayBuffer = await file.arrayBuffer();

  // NOTE: mode/pages simulate only
  const blob = new Blob([arrayBuffer], { type: "application/pdf" });

  setProgress(100);
  return URL.createObjectURL(blob);
};

export default function DeletePagesPdf() {
  const [mode, setMode] = useState("specific");
  const [pages, setPages] = useState("");

  const handleProcess = (files, setProgress) => {
    return processFiles(files, setProgress, mode, pages);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🗑️ Delete Pages PDF</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Remove specific pages (manual) or auto-delete odd/even pages.
      </p>

      {/* Mode Buttons */}
      <div className="flex gap-3 mb-4">
        {/* Manual mode */}
        <div className="relative group flex-1">
          <button
            onClick={() => setMode("specific")}
            className={`w-full px-4 py-2 rounded-lg shadow font-semibold ${
              mode === "specific"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            }`}
            title="Manual: Enter page numbers/ranges (e.g. 1, 3, 5-7)"
          >
            ✏️ Specific Pages
          </button>
          <p className="text-xs text-gray-500 mt-1">
            Enter page numbers/ranges (e.g. 1, 3, 5-7).
          </p>
          <div className="absolute left-0 mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
            Manual: delete chosen pages
          </div>
        </div>

        {/* Odd/Even mode */}
        <div className="relative group flex-1">
          <button
            onClick={() => setMode("odd-even")}
            className={`w-full px-4 py-2 rounded-lg shadow font-semibold ${
              mode === "odd-even"
                ? "bg-green-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            }`}
            title="Auto: Delete all odd or even pages"
          >
            ⚡ Odd/Even
          </button>
          <p className="text-xs text-gray-500 mt-1">
            Auto-delete all odd or even pages.
          </p>
          <div className="absolute left-0 mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
            Auto: delete odd/even pages
          </div>
        </div>
      </div>

      {/* Inputs */}
      {mode === "specific" && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Pages</label>
          <input
            type="text"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            placeholder="e.g. 1, 3, 5-7"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
          />
        </div>
      )}

      {mode === "odd-even" && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Choose Mode</label>
          <select
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
          >
            <option value="odd">Delete Odd Pages</option>
            <option value="even">Delete Even Pages</option>
          </select>
        </div>
      )}

      <PdfToolWrapper
        title="Delete Pages"
        description="Remove unwanted pages from your PDF"
        actionLabel="Delete Now"
        processFiles={handleProcess}
        multiple={false}
        outputName="deleted.pdf"
        accept=".pdf"
      />
    </div>
  );
}
