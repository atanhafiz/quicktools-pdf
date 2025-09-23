import { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export default function FormFiller() {
  const [file, setFile] = useState(null);
  const [filledUrl, setFilledUrl] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFill = async () => {
    if (!file) {
      alert("Please upload a PDF first.");
      return;
    }

    const bytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(bytes);

    // kalau PDF asal tak ada form, kita buat field manual
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const page = pdfDoc.getPages()[0];
    page.drawText(`Name: ${formData.name}`, {
      x: 50,
      y: 700,
      size: 14,
      font,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Email: ${formData.email}`, {
      x: 50,
      y: 670,
      size: 14,
      font,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Address: ${formData.address}`, {
      x: 50,
      y: 640,
      size: 14,
      font,
      color: rgb(0, 0, 0),
    });

    const newBytes = await pdfDoc.save();
    const newBlob = new Blob([newBytes], { type: "application/pdf" });
    setFilledUrl(URL.createObjectURL(newBlob));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-xl bg-white rounded-xl shadow p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Form Filler PDF</h1>
        <p className="text-gray-500 mb-6">
          Upload a PDF and fill in form details (demo fields)
        </p>

        <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-4" />

        <div className="space-y-4 mb-4 text-left">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <button
          onClick={handleFill}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Fill Form
        </button>

        {filledUrl && (
          <div className="mt-6">
            <a
              href={filledUrl}
              download="filled.pdf"
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
            >
              Download Filled PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
