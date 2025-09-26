import React, { useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";
import BackButton from "../components/BackButton";

// Dummy Merge: simulate merge PDF files
const processFiles = async (files, setProgress, mode, outputName, setError) => {
  try {
    if (!files.length) throw new Error("Please upload at least one PDF file.");
    files.forEach(f => {
      if (!f.name.endsWith(".pdf")) throw new Error("Invalid file type. Only PDF files are allowed.");
    });

    // Default output name
    let finalName = outputName && outputName.trim() !== "" ? outputName : "merged.pdf";
    if (!finalName.toLowerCase().endsWith(".pdf")) finalName += ".pdf";

    setProgress(25);
    await new Promise((r) => setTimeout(r, 1000));
    setProgress(70);

    const mergedBlob = new Blob([], { type: "application/pdf" });

    setProgress(100);
    return { url: URL.createObjectURL(mergedBlob), name: finalName };
  } catch (err) {
    setError(err.message);
    setProgress(0);
    throw err;
  }
};

export default function MergePdf() {
  const [mode, setMode] = useState("auto");
  const [outputName, setOutputName] = useState("");
  const [error, setError] = useState("");
  const [resetKey, setResetKey] = useState(0);

  const handleProcess = (files, setProgress) =>
    processFiles(files, setProgress, mode, outputName, setError);

  const handleClear = () => {
    setOutputName("");
    setError("");
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className="flex justify-center items-start mt-16 px-4">
      <div className="w-full max-w-xl p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        
        {/* Header + Back Button */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            📎 Merge PDF
          </h1>
          <BackButton to="/dashboard/edit" />
        </div>

        <p className="text-gray-700 dark:text-gray-200 mb-6">
          Combine multiple PDF files into a single document.
        </p>

        {/* Mode Buttons with Tooltip */}
        <div className="flex gap-3 mb-4">
          {/* Auto Merge */}
          <div className="relative group flex-1">
            <button
              onClick={() => setMode("auto")}
              className={`w-full px-4 py-2 rounded-lg font-semibold shadow transition ${
                mode === "auto"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              ⚡ Auto Merge
            </button>
            <div className="absolute left-0 mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow">
              Merge files instantly in the order uploaded
            </div>
          </div>

          {/* Manual Merge */}
          <div className="relative group flex-1">
            <button
              onClick={() => setMode("manual")}
              className={`w-full px-4 py-2 rounded-lg font-semibold shadow transition ${
                mode === "manual"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              ✏️ Manual Merge
            </button>
            <div className="absolute left-0 mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow">
              Drag & drop files to reorder before merging
            </div>
          </div>
        </div>

        {/* Output Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
            Output File Name
          </label>
          <input
            type="text"
            value={outputName}
            onChange={(e) => setOutputName(e.target.value)}
            placeholder="Enter output file name.pdf"
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Default will be <b>merged.pdf</b> if left empty.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200 flex justify-between items-center">
            <span>⚠️ {error}</span>
            <button
              onClick={handleClear}
              className="ml-4 px-3 py-1 rounded bg-red-600 text-white text-xs hover:bg-red-700"
            >
              Clear
            </button>
          </div>
        )}

        {/* Manual Mode Placeholder */}
        {mode === "manual" && (
          <div className="mb-4 border rounded-lg p-3 text-sm text-gray-600 dark:text-gray-300">
            📌 Drag & drop uploaded files here to reorder (demo placeholder).
          </div>
        )}

        {/* Wrapper */}
        <PdfToolWrapper
          key={resetKey}
          title="Merge PDF"
          description="Combine multiple PDFs into one file"
          actionLabel="Merge Now"
          processFiles={handleProcess}
          multiple={true}
          outputName={outputName || "merged.pdf"}
          accept=".pdf"
        />
      </div>
    </div>
  );
}
