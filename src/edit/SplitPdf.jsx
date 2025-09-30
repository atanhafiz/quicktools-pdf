import React, { useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";
import BackButton from "../components/BackButton";

// Dummy Split: simulate split PDF
const processFiles = async (files, setProgress, mode, pageRange, outputName, setError) => {
  try {
    const file = files[0];
    if (!file || !file.name.endsWith(".pdf")) {
      throw new Error("Invalid file type. Please upload a PDF file.");
    }

    // Default output name
    let finalName = outputName && outputName.trim() !== "" ? outputName : "split.pdf";
    if (!finalName.toLowerCase().endsWith(".pdf")) finalName += ".pdf";

    setProgress(20);
    await new Promise((r) => setTimeout(r, 1000));
    setProgress(60);

    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: "application/pdf" });

    setProgress(100);
    return { url: URL.createObjectURL(blob), name: finalName };
  } catch (err) {
    setError(err.message);
    setProgress(0);
    throw err;
  }
};

export default function SplitPdf() {
  const [mode, setMode] = useState("manual");
  const [pageRange, setPageRange] = useState("1-2");
  const [outputName, setOutputName] = useState("");
  const [error, setError] = useState("");
  const [resetKey, setResetKey] = useState(0);

  const handleProcess = (files, setProgress) =>
    processFiles(files, setProgress, mode, pageRange, outputName, setError);

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
            ✂️ Split PDF – Extract pages easily
          </h1>
          <BackButton to="/dashboard/edit" />
        </div>

        <p className="text-gray-700 dark:text-gray-200 mb-6">
          Fast, secure, and works on any device. Works on desktop, tablet, and mobile.
        </p>

        {/* Mode Buttons with Tooltip */}
        <div className="flex gap-3 mb-4">
          <div className="relative group flex-1">
            <button
              onClick={() => setMode("manual")}
              className={`w-full px-4 py-2 rounded-lg font-semibold shadow transition ${
                mode === "manual"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              ✏️ Manual Mode
            </button>
            <div className="absolute left-0 mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow">
              Enter specific page ranges (e.g. 1-2, 3, 4-6)
            </div>
          </div>
          <div className="relative group flex-1">
            <button
              onClick={() => setMode("auto")}
              className={`w-full px-4 py-2 rounded-lg font-semibold shadow transition ${
                mode === "auto"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              ⚡ Auto Mode
            </button>
            <div className="absolute left-0 mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow">
              Each page will be saved as a separate PDF
            </div>
          </div>
        </div>

        {/* Page Range Input */}
        {mode === "manual" && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
              Page Range
            </label>
            <input
              type="text"
              value={pageRange}
              onChange={(e) => setPageRange(e.target.value)}
              placeholder="e.g. 1-2, 3, 4-6"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
            />
          </div>
        )}

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
            Default will be <b>split.pdf</b> if left empty.
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

        {/* Wrapper */}
        <PdfToolWrapper
          key={resetKey}
          title="Split PDF"
          description="Split your PDF into smaller documents"
          actionLabel="Split Now"
          processFiles={handleProcess}
          multiple={false}
          outputName={outputName || "split.pdf"}
          accept=".pdf"
        />
      </div>
    </div>
  );
}
