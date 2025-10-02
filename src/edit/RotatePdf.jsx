import React, { useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";
import BackButton from "../components/BackButton";

// Call Supabase API rotate-pdf
const processFiles = async (files, setProgress, mode, angle, pages, outputName, setError) => {
  try {
    const file = files[0];
    if (!file || !file.name.endsWith(".pdf")) {
      throw new Error("Invalid file type. Please upload a PDF file.");
    }

    let finalName = outputName && outputName.trim() !== "" ? outputName : "rotated.pdf";
    if (!finalName.toLowerCase().endsWith(".pdf")) finalName += ".pdf";

    setProgress(25);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("angle", angle);
    formData.append("mode", mode);
    if (mode === "selected" && pages.trim() !== "") {
      formData.append("pages", pages);
    }

    const res = await fetch(
      "https://pmvbnfhfryeuxyvcwqxu.functions.supabase.co/rotate-pdf",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error("Failed to rotate PDF. Please try again.");
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

export default function RotatePdf() {
  const [mode, setMode] = useState("all"); // all / selected
  const [angle, setAngle] = useState(90);
  const [pages, setPages] = useState("");
  const [outputName, setOutputName] = useState("");
  const [error, setError] = useState("");
  const [resetKey, setResetKey] = useState(0);

  const handleProcess = (files, setProgress) =>
    processFiles(files, setProgress, mode, angle, pages, outputName, setError);

  const handleClear = () => {
    setOutputName("");
    setPages("");
    setError("");
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className="flex justify-center items-start mt-16 px-4">
      <div className="w-full max-w-xl p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        
        {/* Header + Back Button */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            🔄 Rotate PDF – Rotate pages in your document
          </h1>
          <BackButton to="/dashboard/edit" />
        </div>

        <p className="text-gray-700 dark:text-gray-200 mb-6">
          Rotate all pages (Auto) or specific pages (Manual). Works fast and securely on any device.
        </p>

        {/* Mode Buttons */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setMode("all")}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold shadow transition ${
              mode === "all"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            ⚡ Rotate All
          </button>
          <button
            onClick={() => setMode("selected")}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold shadow transition ${
              mode === "selected"
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            ✏️ Rotate Selected
          </button>
        </div>

        {/* Angle Dropdown */}
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

        {/* Page Input kalau manual */}
        {mode === "selected" && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
              Pages to Rotate
            </label>
            <input
              type="text"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              placeholder="e.g. 1,3,5-7"
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
            placeholder="rotated.pdf"
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Error Box */}
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
          description="Drag & Drop your PDF file here, or click Upload to select from your device."
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
