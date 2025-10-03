import React, { useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";
import BackButton from "../components/BackButton";

// Call Supabase API organize-pdf
const processFiles = async (files, setProgress, mode, order, outputName, setError) => {
  try {
    const file = files[0];
    if (!file || !file.name.endsWith(".pdf")) {
      throw new Error("Invalid file type. Please upload a PDF file.");
    }

    let finalName = outputName && outputName.trim() !== "" ? outputName : "organized.pdf";
    if (!finalName.toLowerCase().endsWith(".pdf")) finalName += ".pdf";

    setProgress(25);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("mode", mode);
    if (mode === "custom") {
      if (!order.trim()) throw new Error("Please provide a page order, e.g. 3,1,2 or 1-3,5,4");
      formData.append("order", order);
    }

    const res = await fetch(
      "https://pmvbnfhfryeuxyvcwqxu.functions.supabase.co/organize-pdf",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Organize API Error:", res.status, text);
      throw new Error(`Organize API failed: ${res.status} ${text}`);
    }

    setProgress(70);
    const blob = await res.blob();

    setProgress(100);
    return { url: URL.createObjectURL(blob), name: finalName };
  } catch (err) {
    console.error("OrganizePdf Error:", err);
    setError(err.message);
    setProgress(0);
    throw err;
  }
};

export default function OrganizePdf() {
  const [mode, setMode] = useState("custom"); // "custom" | "reverse"
  const [order, setOrder] = useState("3,1,2");
  const [outputName, setOutputName] = useState("");
  const [error, setError] = useState("");
  const [resetKey, setResetKey] = useState(0);

  const handleProcess = (files, setProgress) =>
    processFiles(files, setProgress, mode, order, outputName, setError);

  const handleClear = () => {
    setOrder("");
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
            📑 Organize PDF – Reorder Pages
          </h1>
          <BackButton to="/dashboard/edit" />
        </div>

        <p className="text-gray-700 dark:text-gray-200 mb-6">
          Reorder pages by entering a custom sequence (e.g. <b>3,1,2</b> or <b>1-3,5,4</b>) or simply reverse all pages.
        </p>

        {/* Mode Buttons */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setMode("custom")}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold shadow transition ${
              mode === "custom"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            ✏️ Custom Order
          </button>
          <button
            onClick={() => setMode("reverse")}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold shadow transition ${
              mode === "reverse"
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            🔁 Reverse All
          </button>
        </div>

        {/* Order Input (only for custom) */}
        {mode === "custom" && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
              Page Order
            </label>
            <input
              type="text"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              placeholder="e.g. 3,1,2 or 1-3,5,4"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Use commas and ranges. Pages are 1-based (first page is 1).
            </p>
          </div>
        )}

        {/* Output File Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
            Output File Name
          </label>
          <input
            type="text"
            value={outputName}
            onChange={(e) => setOutputName(e.target.value)}
            placeholder="organized.pdf"
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
          title="Organize PDF"
          description="Upload your PDF and reorder pages as you like."
          actionLabel="Organize Now"
          processFiles={handleProcess}
          multiple={false}
          outputName={outputName || "organized.pdf"}
          accept=".pdf"
        />
      </div>
    </div>
  );
}
