import React, { useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";
import BackButton from "../components/BackButton"; // ✅ Import back button

// Dummy Delete Pages
const processFiles = async (files, setProgress, mode, pages) => {
  setProgress(25);
  await new Promise((r) => setTimeout(r, 1000));
  setProgress(70);

  const file = files[0];
  const arrayBuffer = await file.arrayBuffer();
  const blob = new Blob([arrayBuffer], { type: "application/pdf" });

  setProgress(100);
  return { url: URL.createObjectURL(blob), name: "deleted.pdf" };
};

export default function DeletePagesPdf() {
  const [mode, setMode] = useState("specific");
  const [pages, setPages] = useState("");

  const handleProcess = (files, setProgress) =>
    processFiles(files, setProgress, mode, pages);

  return (
    <div className="flex justify-center items-start mt-16 px-4">
      <div className="w-full max-w-xl p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">

        {/* Header + Back Button */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            🗑️ Delete Pages PDF
          </h1>
          <BackButton to="/dashboard/edit" />
        </div>

        <p className="text-gray-700 dark:text-gray-200 mb-6">
          Remove specific pages (manual) or auto-delete odd/even pages.
        </p>

        {/* Mode Buttons */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setMode("specific")}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold shadow ${
              mode === "specific"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            ✏️ Specific Pages
          </button>
          <button
            onClick={() => setMode("odd-even")}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold shadow ${
              mode === "odd-even"
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            ⚡ Odd/Even
          </button>
        </div>

        {/* Inputs */}
        {mode === "specific" && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
              Pages
            </label>
            <input
              type="text"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              placeholder="e.g. 1, 3, 5-7"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
            />
          </div>
        )}
        {mode === "odd-even" && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
              Choose Mode
            </label>
            <select
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
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
    </div>
  );
}
