import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import Tesseract from "tesseract.js";

// worker pdf.js kena config
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function OcrPdf() {
  const [file, setFile] = useState(null);
  const [textResult, setTextResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOcr = async () => {
    if (!file) {
      alert("Please upload a PDF file first.");
      return;
    }

    setLoading(true);
    setTextResult("");

    const fileReader = new FileReader();
    fileReader.onload = async function () {
      const typedArray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;

      let allText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;

        // OCR guna Tesseract.js
        const { data: { text } } = await Tesseract.recognize(canvas, "eng");
        allText += `\n--- Page ${i} ---\n${text}\n`;
      }

      setTextResult(allText);
      setLoading(false);
    };
    fileReader.readAsArrayBuffer(file);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([textResult], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ocr-result.txt";
    a.click();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">OCR PDF</h1>
        <p className="text-gray-500 mb-6">
          Upload a scanned PDF and extract text using OCR
        </p>

        <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-4" />

        <button
          onClick={handleOcr}
          disabled={loading}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          {loading ? "Processing..." : "Start OCR"}
        </button>

        {textResult && (
          <div className="mt-6 text-left max-h-64 overflow-y-auto border p-4 bg-gray-100 rounded">
            <pre className="text-sm">{textResult}</pre>
            <button
              onClick={handleDownloadTxt}
              className="mt-4 px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
            >
              Download as TXT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
