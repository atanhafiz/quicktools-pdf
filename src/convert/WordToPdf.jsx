import { useState } from "react";
import * as mammoth from "mammoth";
import html2pdf from "html2pdf.js";

export default function WordToPdf() {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleConvert = async () => {
    if (!file) {
      alert("Please upload a Word (.docx) file first.");
      return;
    }

    setLoading(true);

    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    setContent(result.value);

    // Convert extracted text → PDF
    const element = document.createElement("div");
    element.innerHTML = `<h1>Converted Word Document</h1><p>${result.value.replace(
      /\n/g,
      "<br/>"
    )}</p>`;

    html2pdf().from(element).save("word-to-pdf.pdf");

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-xl shadow p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Word → PDF</h1>
        <p className="text-gray-500 mb-6">
          Upload a Word (.docx) file and convert it to PDF (demo version)
        </p>

        <input type="file" accept=".docx" onChange={handleFileChange} className="mb-4" />

        <button
          onClick={handleConvert}
          disabled={loading}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          {loading ? "Processing..." : "Convert to PDF"}
        </button>

        {content && (
          <div className="mt-6 text-left max-h-64 overflow-y-auto border p-4 bg-gray-100 rounded">
            <pre className="text-sm whitespace-pre-wrap">{content}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
