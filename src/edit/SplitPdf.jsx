import React, { useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";
import BackButton from "../components/BackButton";

// Call Supabase API to split PDF
const processFiles = async (files, setProgress, mode, pageRange, outputName, setError) => {
  try {
    const file = files[0];
    if (!file || !file.name.endsWith(".pdf")) {
      throw new Error("Invalid file type. Please upload a PDF file.");
    }

    // Default output name
    let finalName =
      outputName && outputName.trim() !== "" ? outputName : "split.pdf";
    if (!finalName.toLowerCase().endsWith(".pdf")) finalName += ".pdf";

    setProgress(25);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("mode", mode); // auto or manual
    if (mode === "manual" && pageRange) {
      formData.append("pages", pageRange);
    }

    const res = await fetch(
      "https://pmvbnfhfryeuxyvcwqxu.functions.supabase.co/split-pdf",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error("Failed to split PDF. Please try again.");
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
          Extract pages from your PDF. Example input: <b>1,3-5</b>. In Auto mode, each page will be saved as a separate PDF.
        </p>

        {/* Mode Buttons */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setMode("manual")}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold shadow transition ${
              mode === "manual"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            ✏️ Manual Mode
          </button>
          <button
            onClick={() => setMode("auto")}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold shadow transition ${
              mode === "auto"
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            ⚡ Auto Mode
          </button>
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
            placeholder="split.pdf"
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
          title="Split PDF"
          description="Upload a PDF and select pages to extract"
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
