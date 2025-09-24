import React, { useState } from "react";
import confetti from "canvas-confetti";

export default function PdfToolWrapper({
  title,
  description,
  actionLabel,
  processFiles,
  multiple = false,
  outputName = "output.pdf",
  files = null,
  accept = ".pdf", // default PDF
}) {
  const [internalFiles, setInternalFiles] = useState([]);
  const [resultUrl, setResultUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [showSad, setShowSad] = useState(false);

  const usedFiles = files !== null ? files : internalFiles;

  const handleFileChange = (e) => {
    const selected = multiple ? Array.from(e.target.files) : [e.target.files[0]];
    setInternalFiles(selected);
    setResultUrl(null);
  };

  // Confetti lompat-lompat 🎉
  const fireConfetti = () => {
    let count = 0;
    const interval = setInterval(() => {
      confetti({
        particleCount: 60,
        spread: 80,
        startVelocity: 40,
        origin: { y: 0.6 },
      });
      count++;
      if (count > 4) clearInterval(interval); // lompat 5 kali
    }, 400);
  };

  const handleProcess = async () => {
    if (!usedFiles.length) {
      alert("📌 Please upload your file first.");
      return;
    }
    setIsProcessing(true);
    setProgress(0);

    const url = await processFiles(usedFiles, setProgress);

    setResultUrl(url);
    setIsProcessing(false);

    fireConfetti();
    setShowModal(true);
  };

  const handleSupport = () => {
    setShowModal(false);
    setShowThanks(true);
    fireConfetti();
  };

  const handleCloseSad = () => {
    setShowModal(false);
    setShowSad(true);
  };

  // ✅ Robust detect file label (MIME + extension)
  const getFileLabel = () => {
    const lower = accept.toLowerCase();

    if (lower.includes("word") || lower.includes(".doc")) return "Word File";
    if (lower.includes("excel") || lower.includes(".xls")) return "Excel File";
    if (lower.includes("image") || lower.includes(".png") || lower.includes(".jpg") || lower.includes(".jpeg")) 
      return "Image File";
    if (lower.includes("powerpoint") || lower.includes("ppt")) return "PowerPoint File";

    return "PDF File"; // fallback
  };

  return (
    <div>
      {/* Input untuk upload file */}
      {files === null && (
        <>
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer inline-block px-4 py-2 mb-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          >
            📂 Choose {getFileLabel()}
            {multiple && "s"}
          </label>
        </>
      )}

      {/* Action button */}
      <button
        onClick={handleProcess}
        className="w-full px-4 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition"
        disabled={isProcessing}
      >
        {isProcessing ? "Processing…" : actionLabel}
      </button>

      {/* Progress bar */}
      {isProcessing && (
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm text-center relative">
            <button
              onClick={handleCloseSad}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold text-green-600 mb-3">🎉 Completed!</h2>
            <div className="text-3xl mb-3 animate-bounce">🥳✨📄</div>
            <p className="text-gray-600 mb-4">
              Your file has been successfully processed.
            </p>
            {resultUrl && (
              <a
                href={resultUrl}
                download={outputName}
                className="px-5 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
              >
                ⬇️ Download File
              </a>
            )}
            {/* Support button */}
            <button
              onClick={handleSupport}
              className="mt-4 px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition flex items-center gap-2 mx-auto"
            >
              🐱 Buy me a coffee
            </button>
            <p className="mt-3 text-sm text-gray-500">
              Thank you for using <b>Quicktools</b> 💙
            </p>
          </div>
        </div>
      )}

      {/* Thanks Modal */}
      {showThanks && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm text-center relative">
            <h2 className="text-xl font-bold text-yellow-500 mb-3">☕ Thank you!</h2>
            <div className="text-3xl mb-3">🐱💙🎊</div>
            <p className="text-gray-600 mb-4">
              Thanks for supporting Quicktools! You're awesome 🚀
            </p>
            <button
              onClick={() => setShowThanks(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Sad Modal */}
      {showSad && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm text-center relative">
            <h2 className="text-xl font-bold text-red-500 mb-3">😿 Bye Bye</h2>
            <p className="text-gray-600 mb-4">See you again, don’t forget to come back!</p>
            <button
              onClick={() => setShowSad(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
