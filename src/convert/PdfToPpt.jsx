import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import PptxGenJS from "pptxgenjs";

// config worker pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PdfToPpt() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleConvert = async () => {
    if (!file) {
      alert("Please upload a PDF file first.");
      return;
    }

    setLoading(true);

    const fileReader = new FileReader();
    fileReader.onload = async function () {
      const typedArray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;

      const pptx = new PptxGenJS();

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");

        const slide = pptx.addSlide();
        slide.addText(`Page ${i}`, { x: 0.5, y: 0.3, fontSize: 18, bold: true });
        slide.addText(pageText, {
          x: 0.5,
          y: 1,
          fontSize: 14,
          color: "363636",
          w: "90%",
          h: "70%",
        });
      }

      pptx.writeFile("converted.pptx");
      setLoading(false);
    };
    fileReader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-xl shadow p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">PDF → PPT</h1>
        <p className="text-gray-500 mb-6">
          Upload a PDF and export its text into PowerPoint slides (demo)
        </p>

        <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-4" />

        <button
          onClick={handleConvert}
          disabled={loading}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          {loading ? "Processing..." : "Convert to PPT"}
        </button>
      </div>
    </div>
  );
}
