import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import confetti from "canvas-confetti";
import {
  FaFilePdf,
  FaTrash,
  FaArrowUp,
  FaArrowDown,
  FaTimes,
} from "react-icons/fa";

export default function MergePdf() {
  const [files, setFiles] = useState([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isMerging, setIsMerging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === "application/pdf"
    );
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const moveFile = (index, direction) => {
    const newFiles = [...files];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= files.length) return;
    [newFiles[index], newFiles[targetIndex]] = [
      newFiles[targetIndex],
      newFiles[index],
    ];
    setFiles(newFiles);
  };

  const mergePdfs = async () => {
    if (files.length < 2) {
      alert("📌 Please select at least 2 PDF files.");
      return;
    }

    setIsMerging(true);
    setProgress(0);

    const mergedPdf = await PDFDocument.create();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const pdfBytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(
        pdf,
        pdf.getPageIndices()
      );
      copiedPages.forEach((page) => mergedPdf.addPage(page));

      setProgress(Math.round(((i + 1) / files.length) * 100));
    }

    const mergedPdfBytes = await mergedPdf.save();
    const mergedBlob = new Blob([mergedPdfBytes], { type: "application/pdf" });
    const mergedUrl = URL.createObjectURL(mergedBlob);
    setMergedPdfUrl(mergedUrl);

    setIsMerging(false);

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
    setSuccessMessage("Your PDFs are ready 🎉");
    setShowModal(true);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-blue-200">
      <h1 className="text-2xl font-bold mb-2 text-blue-600 flex items-center gap-2">
        🔗 Merge PDF
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        📝 <b>How to use:</b> Select 2 or more PDFs → Arrange the order →
        Click <span className="font-semibold">Merge PDFs</span> →
        Download the final file.
      </p>

      <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={handleFileChange}
        className="mb-4 hidden"
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer inline-block px-4 py-2 mb-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
      >
        📂 Choose PDF Files
      </label>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-blue-400 rounded-lg p-8 mb-6 text-center text-gray-600 hover:bg-blue-50 transition"
      >
        🚀 Drag & Drop your PDF files here
      </div>

      {files.length > 0 && (
        <ul className="mb-6 space-y-2">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-blue-50 p-3 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-3 text-blue-700">
                <FaFilePdf /> {file.name}
                <span className="text-xs text-gray-500">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => moveFile(index, -1)}
                  className="px-2 py-1 bg-yellow-400 rounded text-sm hover:bg-yellow-500"
                >
                  <FaArrowUp />
                </button>
                <button
                  onClick={() => moveFile(index, 1)}
                  className="px-2 py-1 bg-yellow-400 rounded text-sm hover:bg-yellow-500"
                >
                  <FaArrowDown />
                </button>
                <button
                  onClick={() => removeFile(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={mergePdfs}
        className="w-full px-4 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition"
        disabled={isMerging}
      >
        {isMerging ? "Merging..." : "🔗 Merge PDFs"}
      </button>

      {isMerging && (
        <div className="w-full bg-gray-200 rounded-full mt-4">
          <div
            className="bg-blue-500 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm text-center relative animate-bounceIn">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold text-green-600 mb-3 animate-pulse">
              🎉 Merge Completed!
            </h2>
            <div className="text-4xl mb-3 animate-bounce">🥳✨🎊</div>
            <p className="text-gray-600 mb-4">{successMessage}</p>
            {mergedPdfUrl && (
              <a
                href={mergedPdfUrl}
                download="merged.pdf"
                className="px-5 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
              >
                ⬇️ Download Merged PDF
              </a>
            )}
            <p className="mt-3 text-sm text-gray-500">
              Thank you for using <b>Quicktools</b> 💙
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
