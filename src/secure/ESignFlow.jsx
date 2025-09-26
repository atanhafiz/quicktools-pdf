import React, { useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";
import BackButton from "../components/BackButton"; // ✅ Import BackButton

// Dummy: simulate eSign flow untuk multi user
const processFiles = async (files, setProgress, signers, outputName, setError) => {
  try {
    if (!files.length) throw new Error("Please upload a PDF file.");
    const file = files[0];
    if (!file.name.endsWith(".pdf")) throw new Error("Invalid file type. Only PDF files are allowed.");

    // Default output name
    let finalName = outputName && outputName.trim() !== "" ? outputName : "signed-flow.pdf";
    if (!finalName.toLowerCase().endsWith(".pdf")) finalName = finalName + ".pdf";

    setProgress(20);
    await new Promise((r) => setTimeout(r, 1000));
    setProgress(50);

    // Simulate hantar ke semua email
    console.log("📩 Sending PDF to signers:", signers);

    await new Promise((r) => setTimeout(r, 1000));
    setProgress(80);

    const arrayBuffer = await file.arrayBuffer();

    // NOTE: signers data tak betul² embed (simulate only)
    // Real case: API handle eSign workflow
    const blob = new Blob([arrayBuffer], { type: "application/pdf" });

    setProgress(100);
    return { url: URL.createObjectURL(blob), name: finalName };
  } catch (err) {
    setError(err.message);
    setProgress(0);
    throw err;
  }
};

export default function EsignFlow() {
  const [emails, setEmails] = useState([""]);
  const [outputName, setOutputName] = useState("");
  const [error, setError] = useState("");
  const [resetKey, setResetKey] = useState(0);

  // Tambah input email baru
  const addEmailField = () => setEmails([...emails, ""]);

  // Update email field
  const updateEmail = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  // Remove email field
  const removeEmail = (index) => {
    const newEmails = [...emails];
    newEmails.splice(index, 1);
    setEmails(newEmails);
  };

  // Bungkus process untuk wrapper
  const handleProcess = (files, setProgress) =>
    processFiles(files, setProgress, emails.filter((e) => e), outputName, setError);

  const handleClear = () => {
    setEmails([""]);
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
            📑 eSign Flow
          </h1>
          <BackButton to="/dashboard/secure" />
        </div>

        <p className="text-gray-700 dark:text-gray-200 mb-6">
          Start a multi-user e-signature workflow by adding signer emails.
        </p>

        {/* Dynamic email input list */}
        {emails.map((email, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2">
            <input
              type="email"
              placeholder={`Signer ${idx + 1} email`}
              value={email}
              onChange={(e) => updateEmail(idx, e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
            />
            {emails.length > 1 && (
              <button
                onClick={() => removeEmail(idx)}
                className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                ✖
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addEmailField}
          className="mb-4 px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded-lg shadow hover:bg-gray-400 dark:hover:bg-gray-600 transition"
        >
          ➕ Add Signer
        </button>

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
            Default will be <b>signed-flow.pdf</b> if left empty.
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
          title="eSign Flow"
          description="Send PDF to multiple signers and collect digital signatures"
          actionLabel="Start eSign Flow"
          processFiles={handleProcess}
          multiple={false}
          outputName={outputName || "signed-flow.pdf"}
          accept=".pdf"
        />
      </div>
    </div>
  );
}
