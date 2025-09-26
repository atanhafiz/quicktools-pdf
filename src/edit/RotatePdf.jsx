import React, { useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";
import BackButton from "../components/BackButton";

// Dummy Rotate
const processFiles = async (files, setProgress, mode, angle, pages, outputName, setError) => {
  try {
    const file = files[0];
    if (!file || !file.name.endsWith(".pdf")) {
      throw new Error("Invalid file type. Please upload a PDF file.");
    }

    // Default output name
    let finalName = outputName && outputName.trim() !== "" ? outputName : "rotated.pdf";
    if (!finalName.toLowerCase().endsWith(".pdf")) finalName += ".pdf";

    setProgress(30);
    await new Promise((r) => setTimeout(r, 1000));
    setProgress(70);

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

export default function RotatePdf() {
  const [mode, setMode] = useState("all");
  const [angle, setAngle] = useState(90);
  const [pages, setPages] = useState("");
  const [outputName, setOutputName] = useState("");
  const [error, setError] = useState("");
  const [resetKey, setResetKey] = useState(0);

  const handleProcess = (files, setProgress) =>
    processFiles(files, setProgress, mode, angle, pages, outputName, setError);

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
            🔄 Rotate PDF
          </h1>
          <BackButton to="/dashboard/edit" />
        </div>

        <p className="text-gray-700 dark:text-gray-200 mb-6">
          Rotate all pages at once (auto) or rotate selected pages (manual).
        </p>

        {/* Mode Buttons with Tooltip */}
        <div className="flex gap-3 mb-4">
          <div className="relative group flex-1">
            <button
              onClick={() => setMode("all")}
              className={`w-full px-4 py-2 rounded-lg font-semibold shadow transition ${
                mode === "all"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              ⚡ Rotate All
            </button>
            <div className="absolute left-0 mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow">
              Rotate all pages in the PDF
            </div>
          </div>

          <div className="relative group flex-1">
            <button
              onClick={() => setMode("selected")}
              className={`w-full px-4 py-2 rounded-lg font-semibold shadow transition ${
                mode === "selected"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              ✏️ Rotate Selected
            </button>
            <div className="absolute left-0 mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow">
              Enter specific page numbers to rotate
            </div>
          </div>
        </div>

        {/* Angle Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
            Angle
          </label>
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
            <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
              Pages
            </label>
            <input
              type="text"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              placeholder="e.g. 1, 3-4"
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
            Default will be <b>rotated.pdf</b> if left empty.
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
          title="Rotate PDF"
          description="Rotate pages in your PDF document"
          actionLabel="Rotate Now"
          processFiles={handleProcess}
          multiple={false}
          outputName={outputName || "rotated.pdf"}
          accept=".pdf"
        />
      </div>
    </div>
  );
}
