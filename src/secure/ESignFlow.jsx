import React, { useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";

// Dummy: simulate eSign flow untuk multi user
const processFiles = async (files, setProgress, signers) => {
  setProgress(20);
  await new Promise((r) => setTimeout(r, 1000));
  setProgress(50);

  // Simulate hantar ke semua email
  console.log("📩 Sending PDF to signers:", signers);

  await new Promise((r) => setTimeout(r, 1000));
  setProgress(80);

  const file = files[0];
  const arrayBuffer = await file.arrayBuffer();

  // NOTE: signers data tak betul² embed (simulate only)
  // Real case: API handle eSign workflow
  const blob = new Blob([arrayBuffer], { type: "application/pdf" });

  setProgress(100);
  return URL.createObjectURL(blob);
};

export default function EsignFlow() {
  const [emails, setEmails] = useState([""]);

  // Tambah input email baru
  const addEmailField = () => {
    setEmails([...emails, ""]);
  };

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
  const handleProcess = (files, setProgress) => {
    return processFiles(files, setProgress, emails.filter((e) => e));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📑 eSign Flow</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
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
              className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              ✖
            </button>
          )}
        </div>
      ))}

      <button
        onClick={addEmailField}
        className="mb-4 px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded-lg shadow hover:bg-gray-400 dark:hover:bg-gray-600"
      >
        ➕ Add Signer
      </button>

      <PdfToolWrapper
        title="eSign Flow"
        description="Send PDF to multiple signers and collect digital signatures"
        actionLabel="Start eSign Flow"
        processFiles={handleProcess}
        multiple={false}
        outputName="signed-flow.pdf"
        accept=".pdf"
      />
    </div>
  );
}
