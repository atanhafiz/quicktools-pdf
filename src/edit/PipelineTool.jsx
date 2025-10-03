import React, { useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";
import BackButton from "../components/BackButton";

export default function PipelineTool() {
  const [error, setError] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [orgMode, setOrgMode] = useState("reverse");   // ✅ pilihan default
  const [customOrder, setCustomOrder] = useState("");  // ✅ kalau mode custom

  const handleProcess = async (files, setProgress) => {
    try {
      if (!files.length) throw new Error("Please upload at least one PDF file.");

      // STEP 1: MERGE
      setProgress(10);
      const mergeForm = new FormData();
      files.forEach((f) => mergeForm.append("files", f));
      const mergeRes = await fetch("https://pmvbnfhfryeuxyvcwqxu.functions.supabase.co/merge-pdf", {
        method: "POST",
        body: mergeForm,
      });
      if (!mergeRes.ok) throw new Error("Merge step failed");
      const mergedBlob = await mergeRes.blob();

      // STEP 2: ORGANIZE
      setProgress(40);
      const orgForm = new FormData();
      orgForm.append("file", mergedBlob, "merged.pdf");
      orgForm.append("mode", orgMode);
      if (orgMode === "custom") {
        if (!customOrder.trim()) throw new Error("Please provide custom order (e.g. 3,1,2 or 1-3,5,4)");
        orgForm.append("order", customOrder);
      }
      const orgRes = await fetch("https://pmvbnfhfryeuxyvcwqxu.functions.supabase.co/organize-pdf", {
        method: "POST",
        body: orgForm,
      });
      if (!orgRes.ok) throw new Error("Organize step failed");
      const organizedBlob = await orgRes.blob();

      // STEP 3: COMPRESS
      setProgress(70);
      const compForm = new FormData();
      compForm.append("files", organizedBlob, "organized.pdf");
      const compRes = await fetch("https://pmvbnfhfryeuxyvcwqxu.functions.supabase.co/compress-pdf", {
        method: "POST",
        body: compForm,
      });
      if (!compRes.ok) throw new Error("Compress step failed");
      const finalBlob = await compRes.blob();

      setProgress(100);
      return { url: URL.createObjectURL(finalBlob), name: "final_pipeline.pdf" };

    } catch (err) {
      console.error("Pipeline Error:", err);
      setError(err.message);
      setProgress(0);
      throw err;
    }
  };

  return (
    <div className="flex justify-center items-start mt-16 px-4">
      <div className="w-full max-w-xl p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">

        {/* Header + Back */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            🔗 Pipeline Tool
          </h1>
          <BackButton to="/dashboard/edit" />
        </div>

        <p className="text-gray-700 dark:text-gray-200 mb-6">
          Upload multiple PDFs → system will <b>Merge</b>, <b>Organize</b>, then <b>Compress</b>.
        </p>

        {/* Organize Options */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
            Organize Mode
          </label>
          <select
            value={orgMode}
            onChange={(e) => setOrgMode(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          >
            <option value="reverse">Reverse all pages</option>
            <option value="custom">Custom order</option>
          </select>
        </div>

        {orgMode === "custom" && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
              Custom Order
            </label>
            <input
              type="text"
              value={customOrder}
              onChange={(e) => setCustomOrder(e.target.value)}
              placeholder="e.g. 3,1,2 or 1-3,5,4"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Use commas and ranges. Pages are 1-based (first page is 1).
            </p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200">
            ⚠️ {error}
          </div>
        )}

        <PdfToolWrapper
          key={resetKey}
          title="Pipeline Tool"
          description="One click: Merge → Organize → Compress"
          actionLabel="Run Pipeline"
          processFiles={handleProcess}
          multiple={true}
          outputName="final_pipeline.pdf"
          accept=".pdf"
        />
      </div>
    </div>
  );
}
