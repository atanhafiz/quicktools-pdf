import React, { useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";

// Dummy process: simulate protect PDF dengan password
const processFiles = async (files, setProgress, password) => {
  setProgress(20);
  await new Promise((r) => setTimeout(r, 1000));
  setProgress(60);

  const file = files[0];
  const arrayBuffer = await file.arrayBuffer();

  // 🔒 Password tak betul² digunakan (simulate only)
  // Real case: hantar ke API untuk encrypt PDF
  const blob = new Blob([arrayBuffer], { type: "application/pdf" });

  setProgress(100);
  return URL.createObjectURL(blob);
};

export default function ProtectPdf() {
  const [password, setPassword] = useState("");

  // Wrapper kita expect function processFiles(files, setProgress)
  // Jadi kita bungkus sekali password dalam closure
  const handleProcess = (files, setProgress) => {
    return processFiles(files, setProgress, password);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔒 Protect PDF</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Add password protection to your PDF file.
      </p>

      {/* Input password */}
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
      />

      <PdfToolWrapper
        title="Protect PDF"
        description="Secure your PDF with password encryption"
        actionLabel="Protect Now"
        processFiles={handleProcess}
        multiple={false}
        outputName="protected.pdf"
        accept=".pdf"
      />
    </div>
  );
}
