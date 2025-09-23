import { useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";

export default function RotatePdf() {
  const [file, setFile] = useState(null);
  const [angle, setAngle] = useState(90);
  const [rotatedUrl, setRotatedUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleRotate = async () => {
    if (!file) {
      alert("Please upload a PDF first.");
      return;
    }

    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);

    const pages = pdf.getPages();
    pages.forEach((page) => {
      page.setRotation(degrees(angle));
    });

    const newBytes = await pdf.save();
    const newBlob = new Blob([newBytes], { type: "application/pdf" });
    setRotatedUrl(URL.createObjectURL(newBlob));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-xl shadow p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Rotate PDF</h1>
        <p className="text-gray-500 mb-6">
          Upload a PDF and rotate all pages by 90°, 180°, or 270°
        </p>

        <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-4" />

        <select
          value={angle}
          onChange={(e) => setAngle(parseInt(e.target.value))}
          className="w-full border p-2 rounded mb-4"
        >
          <option value={90}>Rotate 90°</option>
          <option value={180}>Rotate 180°</option>
          <option value={270}>Rotate 270°</option>
        </select>

        <button
          onClick={handleRotate}
          className="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600 transition"
        >
          Rotate PDF
        </button>

        {rotatedUrl && (
          <div className="mt-6">
            <a
              href={rotatedUrl}
              download="rotated.pdf"
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
            >
              Download Rotated PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
