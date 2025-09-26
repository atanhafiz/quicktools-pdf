import React, { useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";
import BackButton from "../components/BackButton"; // ✅ Import BackButton

// Dummy OCR: simulate extract text dari PDF
const processFiles = async (files, setProgress, outputName, setError) => {
  try {
    if (!files.length) throw new Error("Please upload a PDF file.");
    const file = files[0];
    if (!file.name.endsWith(".pdf")) throw new Error("Invalid file type. Only PDF files are allowed.");

    // Default output name
    let finalName = outputName && outputName.trim() !== "" ? outputName : "ocr-result.txt";
    if (!finalName.toLowerCase().endsWith(".txt")) finalName = finalName + ".txt";

    setProgress(30);
    await new Promise((r) => setTimeout(r, 1000));
    setProgress(70);

    // Simulate output text file
    const content = "This is extracted text from the scanned PDF (dummy).";
    const blob = new Blob([content], { type: "text/plain" });

    setProgress(100);
    return { url: URL.createObjectURL(blob), name: finalName };
  } catch (err) {
    setError(err.message);
    setProgress(0);
    throw err;
  }
};

export default function OcrPdf() {
  const [outputName, setOutputName] = useState("");
  const [error, setError] = useState("");
  const [resetKey, setResetKey] = useState(0);

  const handleProcess = (files, setProgress) =>
    processFiles(files, setProgress, outputName, setError);

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
            🔎 OCR PDF
          </h1>
          <BackButton to="/dashboard/smartai" />
        </div>

        <p className="text-gray-700 dark:text-gray-200 mb-6">
          Extract text content from scanned PDF files.
        </p>

        {/* Output Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
            Output File Name
          </label>
          <input
            type="text"
            value={outputName}
            onChange={(e) => setOutputName(e.target.value)}
            placeholder="Enter output file name.txt"
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Default will be <b>ocr-result.txt</b> if left empty.
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
          title="OCR PDF"
          description="Convert scanned PDF pages into editable text"
          actionLabel="Run OCR"
          processFiles={handleProcess}
          multiple={false}
          outputName={outputName || "ocr-result.txt"}
          accept=".pdf"
        />
      </div>
    </div>
  );
}
