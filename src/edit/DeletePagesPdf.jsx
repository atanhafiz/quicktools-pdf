import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function DeletePagesPdf() {
  const [file, setFile] = useState(null);
  const [pagesToDelete, setPagesToDelete] = useState("");
  const [outputUrl, setOutputUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDelete = async () => {
    if (!file || !pagesToDelete) {
      alert("Please upload a PDF and enter pages to delete.");
      return;
    }

    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    const totalPages = pdf.getPageCount();

    // parse input e.g. "2,4,6"
    const deleteList = pagesToDelete
      .split(",")
      .map((n) => parseInt(n.trim(), 10) - 1) // pdf-lib index start dari 0
      .filter((n) => !isNaN(n) && n >= 0 && n < totalPages);

    if (deleteList.length === 0) {
      alert("No valid page numbers to delete.");
      return;
    }

    // create new PDF
    const newPdf = await PDFDocument.create();
    for (let i = 0; i < totalPages; i++) {
      if (!deleteList.includes(i)) {
        const [copiedPage] = await newPdf.copyPages(pdf, [i]);
        newPdf.addPage(copiedPage);
      }
    }

    const newBytes = await newPdf.save();
    const newBlob = new Blob([newBytes], { type: "application/pdf" });
    setOutputUrl(URL.createObjectURL(newBlob));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-xl shadow p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Delete Pages PDF</h1>
        <p className="text-gray-500 mb-6">
          Upload a PDF and enter page numbers to delete (e.g., 2,4,6)
        </p>

        <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-4" />

        <input
          type="text"
          placeholder="Enter page numbers (e.g., 2,4,6)"
          value={pagesToDelete}
          onChange={(e) => setPagesToDelete(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
        >
          Delete Pages
        </button>

        {outputUrl && (
          <div className="mt-6">
            <a
              href={outputUrl}
              download="deleted-pages.pdf"
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
            >
              Download New PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
