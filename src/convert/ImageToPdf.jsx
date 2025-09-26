import React, { useState } from "react";
import { FaFileImage, FaTrash } from "react-icons/fa";
import PdfToolWrapper from "../components/PdfToolWrapper";

// Strict Image → PDF conversion simulation
const processFiles = async (files, setProgress, outputName, setError, setFile) => {
  try {
    if (!files.length) throw new Error("Please upload at least one image file.");

    // Check all files are images
    for (const f of files) {
      if (!f.type.startsWith("image/")) {
        throw new Error("Invalid file type. Only image files are accepted.");
      }
    }

    // Default output name
    let finalName = outputName && outputName.trim() !== "" ? outputName : "converted.pdf";
    if (!finalName.toLowerCase().endsWith(".pdf")) finalName = finalName + ".pdf";

    setProgress(20);
    await new Promise((r) => setTimeout(r, 1200));
    setProgress(70);

    // Simulate combine images → PDF
    const blob = new Blob([], { type: "application/pdf" });

    setProgress(100);

    setFile(null); // reset after success

    return { url: URL.createObjectURL(blob), name: finalName };
  } catch (err) {
    setError(err.message);
    setProgress(0);
    throw err;
  }
};

export default function ImageToPdf() {
  const [outputName, setOutputName] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState(null); // preview first file
  const [resetKey, setResetKey] = useState(0);

  const handleProcess = (files, setProgress) =>
    processFiles(files, setProgress, outputName, setError, setFile);

  const handleClear = () => {
    setOutputName("");
    setError("");
    setFile(null);
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className="flex justify-center items-start mt-16 px-4">
      <div className="w-full max-w-xl p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          🖼️ Image → PDF
        </h1>
        <p className="text-gray-700 dark:text-gray-200 mb-6">
          Combine one or more images into a single PDF file. Only image files are accepted.
        </p>

        {/* File Preview (only first file shown for simplicity) */}
        {file && (
          <div className="mb-4 flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
            <div className="flex items-center gap-2">
              <FaFileImage className="text-blue-500" />
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </span>
            </div>
            <button
              onClick={handleClear}
              className="text-red-500 hover:text-red-700 dark:hover:text-red-300"
            >
              <FaTrash />
            </button>
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
            Default will be <b>converted.pdf</b> if left empty.
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
          title="Image to PDF"
          description="Merge images into PDF format"
          actionLabel="Convert Now"
          processFiles={handleProcess}
          multiple={true}
          outputName={outputName || "converted.pdf"}
          accept="image/*"
          setFile={setFile}
        />
      </div>
    </div>
  );
}
