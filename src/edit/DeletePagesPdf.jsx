import React, { useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";
import BackButton from "../components/BackButton";

// Call Supabase Edge Function delete-pdf
const processFiles = async (files, setProgress, mode, pages, outputName, setError) => {
  try {
    const file = files[0];
    if (!file || !file.name.endsWith(".pdf")) {
      throw new Error("Invalid file type. Please upload a PDF file.");
    }

    let finalName = outputName && outputName.trim() !== "" ? outputName : "deleted.pdf";
    if (!finalName.toLowerCase().endsWith(".pdf")) finalName += ".pdf";

    setProgress(25);

    // Create FormData
    const formData = new FormData();
    formData.append("file", file);
    formData.append("mode", mode);
    if (pages && pages.trim() !== "") {
      formData.append("pages", pages);
    }

    // Call API
    const res = await fetch(
      "https://pmvbnfhfryeuxyvcwqxu.functions.supabase.co/delete-pdf",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(`Delete API failed: ${res.status} ${msg}`);
    }

    setProgress(70);
    const blob = await res.blob();

    setProgress(100);
    return { url: URL.createObjectURL(blob), name: finalName };
  } catch (err) {
    console.error("DeletePages Error:", err);
    setError(err.message);
    setProgress(0);
    throw err;
  }
};

export default function DeletePagesPdf() {
  const [mode, setMode] = useState("specific"); // "specific" | "odd-even"
  const [pages, setPages] = useState("");
  const [outputName, setOutputName] = useState("");
  const [error, setError] = useState("");
  const [resetKey, setResetKey] = useState(0);

  const handleProcess = (files, setProgress) =>
    processFiles(files, setProgress, mode, pages, outputName, setError);

  const handleClear = () => {
    setPages("");
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
            🗑️ Delete Pages – Remove unwanted pages
          </h1>
          <BackButton to="/dashboard/edit" />
        </div>

        <p className="text-gray-700 dark:text-gray-200 mb-6">
          Choose specific pages to delete, or auto-delete odd/even pages.
        </p>

        {/* Mode Buttons */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setMode("specific")}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold shadow transition ${
              mode === "specific"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            ✏️ Specific Pages
          </button>
          <button
            onClick={() => setMode("odd-even")}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold shadow transition ${
              mode === "odd-even"
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            ⚡ Odd/Even
          </button>
        </div>

        {/* Inputs */}
        {mode === "specific" && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
              Pages
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

        {mode === "odd-even" && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
              Choose Mode
            </label>
            <select
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
            >
              <option value="">-- Select --</option>
              <option value="odd">Delete Odd Pages</option>
              <option value="even">Delete Even Pages</option>
            </select>
          </div>
        )}

        {/* Output Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
            Output File Name
          </label>
          <input
            type="text"
            value={outputName}
            onChange={(e) => setOutputName(e.target.value)}
            placeholder="deleted.pdf"
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
          title="Delete Pages"
          description="Upload your PDF and choose which pages to delete."
          actionLabel="Delete Now"
          processFiles={handleProcess}
          multiple={false}
          outputName={outputName || "deleted.pdf"}
          accept=".pdf"
        />
      </div>
    </div>
  );
}
