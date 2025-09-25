import React, { useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";

// Dummy Rotate
const processFiles = async (files, setProgress, mode, angle, pages) => {
  setProgress(30);
  await new Promise((r) => setTimeout(r, 1000));
  setProgress(70);

  const file = files[0];
  const arrayBuffer = await file.arrayBuffer();
  const blob = new Blob([arrayBuffer], { type: "application/pdf" });

  setProgress(100);
  return URL.createObjectURL(blob);
};

export default function RotatePdf() {
  const [mode, setMode] = useState("all");
  const [angle, setAngle] = useState(90);
  const [pages, setPages] = useState("");

  const handleProcess = (files, setProgress) => {
    return processFiles(files, setProgress, mode, angle, pages);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔄 Rotate PDF</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Rotate all pages at once (auto) or rotate selected pages (manual).
      </p>

      {/* Mode Buttons */}
      <div className="flex gap-3 mb-4">
        <div className="relative group flex-1">
          <button
            onClick={() => setMode("all")}
            className={`w-full px-4 py-2 rounded-lg shadow font-semibold ${
              mode === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            }`}
            title="Auto: Rotate all pages in the PDF"
          >
            ⚡ Rotate All
          </button>
          <p className="text-xs text-gray-500 mt-1">Rotate all pages at once.</p>
          <div className="absolute left-0 mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
            Auto: rotate entire PDF
          </div>
        </div>

        <div className="relative group flex-1">
          <button
            onClick={() => setMode("selected")}
            className={`w-full px-4 py-2 rounded-lg shadow font-semibold ${
              mode === "selected"
                ? "bg-green-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            }`}
            title="Manual: Rotate only selected pages"
          >
            ✏️ Rotate Selected
          </button>
          <p className="text-xs text-gray-500 mt-1">Rotate only chosen pages.</p>
          <div className="absolute left-0 mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
            Manual: rotate chosen page numbers
          </div>
        </div>
      </div>

      {/* Extra Options */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Angle</label>
        <select
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
        >
          <option value={90}>90°</option>
          <option value={180}>180°</option>
          <option value={270}>270°</option>
        </select>
      </div>

      {mode === "selected" && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Pages</label>
          <input
            type="text"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            placeholder="e.g. 1, 3-4"
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          />
        </div>
      )}

      <PdfToolWrapper
        title="Rotate PDF"
        description="Rotate pages in your PDF document"
        actionLabel="Rotate Now"
        processFiles={handleProcess}
        multiple={false}
        outputName="rotated.pdf"
        accept=".pdf"
      />
    </div>
  );
}
