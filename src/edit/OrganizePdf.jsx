import React, { useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";
import BackButton from "../components/BackButton"; // ✅ Import back button

// Dummy Organize
const processFiles = async (files, setProgress, mode) => {
  setProgress(25);
  await new Promise((r) => setTimeout(r, 1000));
  setProgress(70);

  const file = files[0];
  const arrayBuffer = await file.arrayBuffer();
  const blob = new Blob([arrayBuffer], { type: "application/pdf" });

  setProgress(100);
  return { url: URL.createObjectURL(blob), name: "organized.pdf" };
};

export default function OrganizePdf() {
  const [mode, setMode] = useState("manual");

  const handleProcess = (files, setProgress) =>
    processFiles(files, setProgress, mode);

  return (
    <div className="flex justify-center items-start mt-16 px-4">
      <div className="w-full max-w-xl p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        
        {/* Header + Back Button */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            📑 Organize PDF
          </h1>
          <BackButton to="/dashboard/edit" />
        </div>

        <p className="text-gray-700 dark:text-gray-200 mb-6">
          Reorder PDF pages manually or auto sort pages instantly.
        </p>

        {/* Mode Buttons with hover effect */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setMode("manual")}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold shadow transition ${
              mode === "manual"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            ✏️ Manual Reorder
          </button>
          <button
            onClick={() => setMode("auto")}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold shadow transition ${
              mode === "auto"
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            ⚡ Auto Sort
          </button>
        </div>

        {/* Placeholders */}
        {mode === "manual" && (
          <div className="mb-4 border rounded-lg p-3 text-sm text-gray-600 dark:text-gray-300">
            📌 Drag & drop page thumbnails here (demo placeholder).
          </div>
        )}
        {mode === "auto" && (
          <div className="mb-4 border rounded-lg p-3 text-sm text-gray-600 dark:text-gray-300">
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
    </div>
  );
}
