import React, { useState } from "react";
import { FaFilePowerpoint, FaTrash } from "react-icons/fa";
import PdfToolWrapper from "../components/PdfToolWrapper";
import BackButton from "../components/BackButton"; // ✅ Import BackButton

// Strict PDF → PowerPoint conversion simulation
const processFiles = async (files, setProgress, outputName, setError, setFile) => {
  try {
    const file = files[0];
    if (!file || !file.name.endsWith(".pdf")) {
      throw new Error("Invalid file type. Please upload a PDF file.");
    }

    // Default output name
    let defaultName = file.name.replace(/\.pdf$/i, ".pptx");
    let finalName = outputName && outputName.trim() !== "" ? outputName : defaultName;
    if (!finalName.toLowerCase().endsWith(".pptx")) finalName = finalName + ".pptx";

    setProgress(30);
    await new Promise((r) => setTimeout(r, 1200));
    setProgress(80);

    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer], {
      type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    });

    setProgress(100);

    setFile(null); // reset after success

    return { url: URL.createObjectURL(blob), name: finalName }; // ✅ modal will trigger
  } catch (err) {
    setError(err.message);
    setProgress(0);
    throw err;
  }
};

export default function PdfToPpt() {
  const [outputName, setOutputName] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
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
        
        {/* Header + Back Button */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            📽️ PDF → PowerPoint
          </h1>
          <BackButton to="/dashboard/convert" />
        </div>

        <p className="text-gray-700 dark:text-gray-200 mb-6">
          Convert PDF slides into editable PowerPoint presentations. Only PDF files are accepted.
        </p>

        {/* File Preview */}
        {file && (
          <div className="mb-4 flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
            <div className="flex items-center gap-2">
              <FaFilePowerpoint className="text-orange-500" />
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
            placeholder="Enter output file name.pptx"
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Default will follow original PDF file name.
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
          title="PDF to PowerPoint"
          description="Convert your PDF into a PowerPoint presentation"
          actionLabel="Convert Now"
          processFiles={handleProcess}
          multiple={false}
          outputName={outputName || "converted.pptx"}
          accept=".pdf"
          setFile={setFile}
        />
      </div>
    </div>
  );
}
