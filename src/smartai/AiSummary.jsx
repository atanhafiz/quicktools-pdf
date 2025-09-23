import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

// config worker pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function AiSummary() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const extractTextFromPdf = async (file) => {
    const fileReader = new FileReader();
    return new Promise((resolve) => {
      fileReader.onload = async function () {
        const typedArray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;

        let allText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(" ");
          allText += ` ${pageText}`;
        }
        resolve(allText);
      };
      fileReader.readAsArrayBuffer(file);
    });
  };

  const handleSummarize = async () => {
    if (!file) {
      alert("Please upload a PDF file first.");
      return;
    }

    setLoading(true);

    const text = await extractTextFromPdf(file);

    // 🔹 Untuk demo, kita buat pseudo "AI summary"
    // Nanti boleh ganti dengan API call (contoh OpenAI GPT-4)
    let fakeSummary = text.split(" ").slice(0, 100).join(" ");
    fakeSummary += " ...\n\n(Summary truncated for demo)";

    setSummary(fakeSummary);
    setLoading(false);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([summary], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "summary.txt";
    a.click();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">AI Summary PDF</h1>
        <p className="text-gray-500 mb-6">
          Upload a long PDF and get a summarized version (demo mode)
        </p>

        <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-4" />

        <button
          onClick={handleSummarize}
          disabled={loading}
          className="px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600 transition"
        >
          {loading ? "Processing..." : "Summarize PDF"}
        </button>

        {summary && (
          <div className="mt-6 text-left max-h-64 overflow-y-auto border p-4 bg-gray-100 rounded">
            <pre className="text-sm whitespace-pre-wrap">{summary}</pre>
            <button
              onClick={handleDownloadTxt}
              className="mt-4 px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
            >
              Download Summary
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
