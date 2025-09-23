import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function SplitPdf() {
  const [file, setFile] = useState(null);
  const [ranges, setRanges] = useState("");
  const [splitFiles, setSplitFiles] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSplit = async () => {
    if (!file || !ranges) {
      alert("Please upload a PDF and enter page ranges.");
      return;
    }

    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    const pageCount = pdf.getPageCount();

    // parse range input
    const rangesArr = ranges.split(",").map((r) => r.trim());
    const results = [];

    for (const range of rangesArr) {
      let [start, end] = range.split("-").map((n) => parseInt(n, 10));
      if (!end) end = start;

      if (start < 1 || end > pageCount || start > end) {
        alert(`Invalid range: ${range}`);
        return;
      }

      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(pdf, Array.from({ length: end - start + 1 }, (_, i) => i + (start - 1)));
      copiedPages.forEach((page) => newPdf.addPage(page));

      const newBytes = await newPdf.save();
      const newBlob = new Blob([newBytes], { type: "application/pdf" });
      results.push({ url: URL.createObjectURL(newBlob), name: `split-${range}.pdf` });
    }

    setSplitFiles(results);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-xl shadow p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Split PDF</h1>
        <p className="text-gray-500 mb-6">Upload a PDF and enter page ranges (e.g., 1-3, 4-6, 7)</p>

        <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-4" />

        <input
          type="text"
          placeholder="Enter ranges (e.g., 1-3, 4, 5-7)"
          value={ranges}
          onChange={(e) => setRanges(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <button
          onClick={handleSplit}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Split PDF
        </button>

        {splitFiles.length > 0 && (
          <div className="mt-6 text-left">
            <h2 className="font-semibold mb-2">Download Split Files:</h2>
            <ul className="space-y-2">
              {splitFiles.map((f, idx) => (
                <li key={idx}>
                  <a
                    href={f.url}
                    download={f.name}
                    className="text-blue-600 underline"
                  >
                    {f.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
