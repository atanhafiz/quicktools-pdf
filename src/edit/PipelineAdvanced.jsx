import React, { useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";
import BackButton from "../components/BackButton";

export default function PipelineAdvanced() {
  const [error, setError] = useState("");
  const [resetKey, setResetKey] = useState(0);

  // Step settings
  const [mergeChecked, setMergeChecked] = useState(true);
  const [organizeChecked, setOrganizeChecked] = useState(true);
  const [compressChecked, setCompressChecked] = useState(true);
  const [protectChecked, setProtectChecked] = useState(false);
  const [unlockChecked, setUnlockChecked] = useState(false);

  // Organize settings
  const [orgMode, setOrgMode] = useState("reverse");
  const [customOrder, setCustomOrder] = useState("");

  // Protect settings
  const [password, setPassword] = useState("");

  const handleProcess = async (files, setProgress) => {
    try {
      if (!files.length) throw new Error("Please upload at least one PDF file.");
      let currentFile = null;

      // STEP 1: Merge
      if (mergeChecked) {
        setProgress(10);
        const form = new FormData();
        files.forEach((f) => form.append("files", f));
        const res = await fetch(
          "https://pmvbnfhfryeuxyvcwqxu.functions.supabase.co/merge-pdf",
          {
            method: "POST",
            body: form,
          }
        );
        if (!res.ok) throw new Error("Merge step failed");
        currentFile = await res.blob();
      } else {
        currentFile = files[0];
      }

      // STEP 2: Organize
      if (organizeChecked) {
        setProgress(30);
        const form = new FormData();
        form.append("file", currentFile, "step.pdf");
        form.append("mode", orgMode);
        if (orgMode === "custom") {
          if (!customOrder.trim())
            throw new Error("Custom order required for Organize");
          form.append("order", customOrder);
        }
        const res = await fetch(
          "https://pmvbnfhfryeuxyvcwqxu.functions.supabase.co/organize-pdf",
          {
            method: "POST",
            body: form,
          }
        );
        if (!res.ok) throw new Error("Organize step failed");
        currentFile = await res.blob();
      }

      // STEP 3: Compress
      if (compressChecked) {
        setProgress(50);
        const form = new FormData();
        form.append("files", currentFile, "step.pdf");
        const res = await fetch(
          "https://pmvbnfhfryeuxyvcwqxu.functions.supabase.co/compress-pdf",
          {
            method: "POST",
            body: form,
          }
        );
        if (!res.ok) throw new Error("Compress step failed");
        currentFile = await res.blob();
      }

      // STEP 4: Protect
      if (protectChecked) {
        setProgress(70);
        const form = new FormData();
        form.append("file", currentFile, "step.pdf");
        form.append("password", password || "123456");
        const res = await fetch(
          "https://pmvbnfhfryeuxyvcwqxu.functions.supabase.co/protect-pdf",
          {
            method: "POST",
            body: form,
          }
        );
        if (!res.ok) throw new Error("Protect step failed");
        currentFile = await res.blob();
      }

      // STEP 5: Unlock
      if (unlockChecked) {
        setProgress(85);
        const form = new FormData();
        form.append("file", currentFile, "step.pdf");
        const res = await fetch(
          "https://pmvbnfhfryeuxyvcwqxu.functions.supabase.co/unlock-pdf",
          {
            method: "POST",
            body: form,
          }
        );
        if (!res.ok) throw new Error("Unlock step failed");
        currentFile = await res.blob();
      }

      setProgress(100);
      return {
        url: URL.createObjectURL(currentFile),
        name: "final_pipeline_advanced.pdf",
      };
    } catch (err) {
      console.error("PipelineAdvanced Error:", err);
      setError(err.message);
      setProgress(0);
      throw err;
    }
  };

  return (
    <div className="flex justify-center items-start mt-16 px-4">
      <div className="w-full max-w-2xl p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            ⚡ Pipeline Advanced
          </h1>
          <BackButton to="/dashboard/edit" />
        </div>

        <p className="text-gray-700 dark:text-gray-200 mb-6">
          Choose which steps to run → Merge, Organize, Compress, Protect, Unlock.
        </p>

        {/* Pipeline Options */}
        <div className="space-y-3 mb-6 text-gray-900 dark:text-gray-200">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={mergeChecked}
              onChange={() => setMergeChecked(!mergeChecked)}
            />
            <span className="dark:text-gray-200">Merge PDFs</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={organizeChecked}
              onChange={() => setOrganizeChecked(!organizeChecked)}
            />
            <span className="dark:text-gray-200">Organize Pages</span>
          </label>
          {organizeChecked && (
            <div className="ml-6">
              <select
                value={orgMode}
                onChange={(e) => setOrgMode(e.target.value)}
                className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 mb-2"
              >
                <option value="reverse">Reverse</option>
                <option value="custom">Custom</option>
              </select>
              {orgMode === "custom" && (
                <input
                  type="text"
                  value={customOrder}
                  onChange={(e) => setCustomOrder(e.target.value)}
                  placeholder="e.g. 3,1,2 or 1-3,5,4"
                  className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                />
              )}
            </div>
          )}

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={compressChecked}
              onChange={() => setCompressChecked(!compressChecked)}
            />
            <span className="dark:text-gray-200">Compress PDF</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={protectChecked}
              onChange={() => setProtectChecked(!protectChecked)}
            />
            <span className="dark:text-gray-200">Protect PDF</span>
          </label>
          {protectChecked && (
            <div className="ml-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Set password"
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
              />
            </div>
          )}

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={unlockChecked}
              onChange={() => setUnlockChecked(!unlockChecked)}
            />
            <span className="dark:text-gray-200">Unlock PDF</span>
          </label>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200">
            ⚠️ {error}
          </div>
        )}

        {/* Wrapper */}
        <PdfToolWrapper
          key={resetKey}
          title="Pipeline Advanced"
          description="Run selected steps in sequence on your PDF(s)."
          actionLabel="Run Pipeline"
          processFiles={handleProcess}
          multiple={true}
          outputName="final_pipeline_advanced.pdf"
          accept=".pdf"
        />
      </div>
    </div>
  );
}
