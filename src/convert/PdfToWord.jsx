import React, { useState } from "react";
import confetti from "canvas-confetti";
import { FaFilePdf, FaTimes } from "react-icons/fa";

export default function PdfToWord() {
  const [file, setFile] = useState(null);
  const [convertedUrl, setConvertedUrl] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setConvertedUrl(null);
  };

  const convertPdfToWord = async () => {
    if (!file) {
      alert("📌 Please choose a PDF file first.");
      return;
    }

    setIsConverting(true);
    setProgress(0);
    setStatusMsg("Converting… please wait ⏳");

    // Simulate conversion progress (demo only)
    for (let i = 1; i <= 10; i++) {
      await new Promise((res) => setTimeout(res, 400));
      setProgress(i * 10);
    }

    // ⚠️ NOTE: Real conversion logic required (backend API / server)
    // Here we just simulate with a dummy .docx
    const blob = new Blob(["This is a demo Word file from Quicktools."], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const url = URL.createObjectURL(blob);
    setConvertedUrl(url);

    setIsConverting(false);
    setStatusMsg("");

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
    setShowModal(true);

    // Timeout alert for long files
    setTimeout(() => {
      if (isConverting) {
        alert("Large file detected, conversion may take longer ⏳");
      }
    }, 60000);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-blue-200">
      <h1 className="text-2xl font-bold mb-2 text-blue-600">📄 PDF to Word</h1>
      <p className="text-sm text-gray-600 mb-6">
        📝 <b>How to use:</b> Upload your PDF → Click{" "}
        <span className="font-semibold">Convert</span> → Download Word file.
      </p>

      {/* File Input */}
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-4 hidden"
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer inline-block px-4 py-2 mb-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
      >
        📂 Choose PDF File
      </label>

      {/* File Info */}
      {file && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg text-blue-700">
          <FaFilePdf className="inline mr-2" /> {file.name} (
          {(file.size / 1024 / 1024).toFixed(2)} MB)
        </div>
      )}

      {/* Convert Button */}
      <button
        onClick={convertPdfToWord}
        className="w-full px-4 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition"
        disabled={isConverting}
      >
        {isConverting ? "Converting…" : "🔄 Convert to Word"}
      </button>

      {/* Progress Bar */}
      {isConverting && (
        <div className="w-full bg-gray-200 rounded-full mt-4">
          <div
            className="bg-blue-500 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
          <p className="text-sm text-gray-500 mt-2">{statusMsg}</p>
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
              🎉 Conversion Completed!
            </h2>
            <div className="text-4xl mb-3 animate-bounce">🥳✨📄</div>
            <p className="text-gray-600 mb-4">
              Your PDF has been successfully converted to Word.
            </p>
            {convertedUrl && (
              <a
                href={convertedUrl}
                download="converted.docx"
                className="px-5 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
              >
                ⬇️ Download Word File
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
