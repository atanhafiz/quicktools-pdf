import React, { useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";
import BackButton from "../components/BackButton";

// Call Supabase API to compress PDF
const processFiles = async (files, setProgress, outputName, setError) => {
  try {
    if (!files.length) throw new Error("Please upload at least one PDF file.");
    files.forEach((f) => {
      if (!f.name.endsWith(".pdf"))
        throw new Error("Invalid file type. Only PDF files are allowed.");
    });

    let finalName =
      outputName && outputName.trim() !== "" ? outputName : "compressed.pdf";
    if (!finalName.toLowerCase().endsWith(".pdf")) finalName += ".pdf";

    setProgress(25);

    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));

    const res = await fetch(
      "https://pmvbnfhfryeuxyvcwqxu.functions.supabase.co/compress-pdf",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error("Failed to compress PDF. Please try again.");
    }

    setProgress(70);
    const blob = await res.blob();

    setProgress(100);
    return { url: URL.createObjectURL(blob), name: finalName };
  } catch (err) {
    setError(err.message);
    setProgress(0);
    throw err;
  }
};

export default function CompressPdf() {
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
            📉 Compress PDF – Reduce file size instantly
          </h1>
          <BackButton to="/dashboard/convert" />
        </div>

        <p className="text-gray-700 dark:text-gray-200 mb-6">
          Make your PDF smaller without losing quality. Fast, secure, and works
          on any device.
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
            placeholder="compressed.pdf"
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          />
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
          title="Compress PDF"
          description="Drag & Drop your PDF files here, or click Upload to select from your device."
          actionLabel="Compress Now"
          processFiles={handleProcess}
          multiple={false}
          outputName={outputName || "compressed.pdf"}
          accept=".pdf"
        />
      </div>
    </div>
  );
}
