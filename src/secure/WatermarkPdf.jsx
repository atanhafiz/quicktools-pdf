import { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default function WatermarkPdf() {
  const [file, setFile] = useState(null);
  const [watermark, setWatermark] = useState("CONFIDENTIAL");
  const [outputUrl, setOutputUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleApply = async () => {
    if (!file || !watermark) {
      alert("Please upload a PDF and enter watermark text.");
      return;
    }

    const bytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(bytes);

    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    pdfDoc.getPages().forEach((page) => {
      const { width, height } = page.getSize();
      page.drawText(watermark, {
        x: width / 2 - (watermark.length * 5),
        y: height / 2,
        size: 40,
        font,
        color: rgb(0.8, 0.8, 0.8),
        opacity: 0.4,
        rotate: { type: "degrees", angle: 45 },
      });
    });

    const newBytes = await pdfDoc.save();
    const newBlob = new Blob([newBytes], { type: "application/pdf" });
    setOutputUrl(URL.createObjectURL(newBlob));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-xl shadow p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Watermark PDF</h1>
        <p className="text-gray-500 mb-6">
          Upload a PDF and add a text watermark to all pages
        </p>

        <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-4" />

        <input
          type="text"
          placeholder="Enter watermark text"
          value={watermark}
          onChange={(e) => setWatermark(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <button
          onClick={handleApply}
          className="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600 transition"
        >
          Apply Watermark
        </button>

        {outputUrl && (
          <div className="mt-6">
            <a
              href={outputUrl}
              download="watermarked.pdf"
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
            >
              Download Watermarked PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
