import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function ImageToPdf() {
  const [files, setFiles] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    const pdfDoc = await PDFDocument.create();

    for (const imgFile of files) {
      const bytes = await imgFile.arrayBuffer();
      let img;
      if (imgFile.type === "image/png") {
        img = await pdfDoc.embedPng(bytes);
      } else {
        img = await pdfDoc.embedJpg(bytes);
      }

      const page = pdfDoc.addPage([img.width, img.height]);
      page.drawImage(img, {
        x: 0,
        y: 0,
        width: img.width,
        height: img.height,
      });
    }

    const newBytes = await pdfDoc.save();
    const blob = new Blob([newBytes], { type: "application/pdf" });
    setPdfUrl(URL.createObjectURL(blob));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-xl shadow p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Image → PDF</h1>
        <p className="text-gray-500 mb-6">
          Upload images (JPG/PNG) and combine them into one PDF
        </p>

        <input
          type="file"
          accept="image/png, image/jpeg"
          multiple
          onChange={handleFileChange}
          className="mb-4"
        />

        <button
          onClick={handleConvert}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Convert to PDF
        </button>

        {pdfUrl && (
          <div className="mt-6">
            <a
              href={pdfUrl}
              download="images.pdf"
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
            >
              Download PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
