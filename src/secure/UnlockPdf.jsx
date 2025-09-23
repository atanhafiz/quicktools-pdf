import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function UnlockPdf() {
  const [file, setFile] = useState(null);
  const [unlockedUrl, setUnlockedUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUnlock = async () => {
    if (!file) {
      alert("Please upload a PDF file.");
      return;
    }

    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);

    // Simulate unlock: remove metadata subject if exist
    pdf.setSubject("");

    const newBytes = await pdf.save();
    const newBlob = new Blob([newBytes], { type: "application/pdf" });
    setUnlockedUrl(URL.createObjectURL(newBlob));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-xl shadow p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Unlock PDF</h1>
        <p className="text-gray-500 mb-6">
          Upload a password-protected PDF to unlock (demo mode)
        </p>

        <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-4" />

        <button
          onClick={handleUnlock}
          className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-800 transition"
        >
          Unlock PDF
        </button>

        {unlockedUrl && (
          <div className="mt-6">
            <a
              href={unlockedUrl}
              download="unlocked.pdf"
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
            >
              Download Unlocked PDF
            </a>
            <p className="text-sm text-gray-500 mt-2">
              (Note: This is a demo – real decryption needs backend)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
