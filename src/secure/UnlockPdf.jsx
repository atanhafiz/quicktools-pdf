import React, { useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";

// Dummy process: simulate unlock PDF dengan password
const processFiles = async (files, setProgress, password) => {
  setProgress(20);
  await new Promise((r) => setTimeout(r, 1000));
  setProgress(60);

  const file = files[0];
  const arrayBuffer = await file.arrayBuffer();

  // 🔓 Password simulate check
  // Real case: hantar ke API untuk verify & remove password
  const blob = new Blob([arrayBuffer], { type: "application/pdf" });

  setProgress(100);
  return URL.createObjectURL(blob);
};

export default function UnlockPdf() {
  const [password, setPassword] = useState("");

  // Wrapper kita expect processFiles(files, setProgress)
  const handleProcess = (files, setProgress) => {
    return processFiles(files, setProgress, password);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔓 Unlock PDF</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Remove password protection from your PDF file.
      </p>

      {/* Input password */}
      <input
        type="password"
        placeholder="Enter password to unlock"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
      />

      <PdfToolWrapper
        title="Unlock PDF"
        description="Remove password encryption from your PDF"
        actionLabel="Unlock Now"
        processFiles={handleProcess}
        multiple={false}
        outputName="unlocked.pdf"
        accept=".pdf"
      />
    </div>
  );
}
