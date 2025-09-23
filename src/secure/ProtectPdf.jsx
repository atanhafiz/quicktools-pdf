import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function ProtectPdf() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [protectedUrl, setProtectedUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleProtect = async () => {
    if (!file || !password) {
      alert("Please upload a PDF and enter a password.");
      return;
    }

    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);

    // pdf-lib tak support encryption, so kita just add metadata
    pdf.setTitle("Protected PDF");
    pdf.setSubject(`Password required: ${password}`);

    const newBytes = await pdf.save();
    const newBlob = new Blob([newBytes], { type: "application/pdf" });
    setProtectedUrl(URL.createObjectURL(newBlob));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-xl shadow p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Protect PDF</h1>
        <p className="text-gray-500 mb-6">
          Upload a PDF and set a password (demo, not full encryption)
        </p>

        <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-4" />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <button
          onClick={handleProtect}
          className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-900 transition"
        >
          Protect PDF
        </button>

        {protectedUrl && (
          <div className="mt-6">
            <a
              href={protectedUrl}
              download="protected.pdf"
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
            >
              Download Protected PDF
            </a>
            <p className="text-sm text-gray-500 mt-2">
              (Password set: <b>{password}</b> — demo mode only)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
