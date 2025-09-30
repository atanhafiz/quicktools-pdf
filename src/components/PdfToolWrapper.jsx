import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { FaUpload, FaTimes, FaCheckCircle } from "react-icons/fa";

export default function PdfToolWrapper({
  title,
  description,
  actionLabel,
  processFiles,
  multiple = false,
  outputName = "output.pdf",
  accept = ".pdf",
  setFile,
}) {
  const [internalFiles, setInternalFiles] = useState([]);
  const [resultUrl, setResultUrl] = useState(null);
  const [resultName, setResultName] = useState(outputName);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEncourage, setShowEncourage] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const usedFiles = internalFiles;

  // 🎉 Royal Confetti Burst
  const fireConfetti = () => {
    const defaults = {
      spread: 360,
      ticks: 120,
      gravity: 0.9,
      decay: 0.92,
      startVelocity: 45,
      scalar: 1.2,
    };
    const colors = ["#FFD700", "#C0C0C0", "#EAB308", "#22C55E", "#4F46E5"];

    confetti({ ...defaults, particleCount: 180, colors });
    confetti({ ...defaults, particleCount: 60, shapes: ["text"], text: "✨" });
    confetti({ ...defaults, particleCount: 40, shapes: ["text"], text: "📄" });
  };

  const handleFileChange = (e) => {
    const selected = multiple ? Array.from(e.target.files) : [e.target.files[0]];
    setInternalFiles(selected);
    setResultUrl(null);
    setProgress(0);
    setError("");
    if (setFile) setFile(selected[0] || null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = multiple ? Array.from(e.dataTransfer.files) : [e.dataTransfer.files[0]];
    setInternalFiles(dropped);
    setResultUrl(null);
    setProgress(0);
    setError("");
    if (setFile) setFile(dropped[0] || null);
  };

  const handleProcess = async () => {
    if (!usedFiles.length) {
      setError("📌 Please upload your file first.");
      return;
    }
    try {
      setIsProcessing(true);
      setProgress(0);
      const result = await processFiles(usedFiles, setProgress);
      if (result && result.url) {
        setResultUrl(result.url);
        setResultName(result.name || outputName);
      } else {
        setResultUrl(result);
        setResultName(outputName);
      }
      setIsProcessing(false);
      fireConfetti();
      setShowModal(true);
    } catch (err) {
      setError(err.message || "❌ Processing failed.");
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleClear = () => {
    setInternalFiles([]);
    setResultUrl(null);
    setError("");
    setProgress(0);
    if (setFile) setFile(null);
  };

  const handleRemoveFile = (idx) => {
    const updated = [...internalFiles];
    updated.splice(idx, 1);
    setInternalFiles(updated);
  };

  // 🔄 Soft bounce animation for Support button
  const [bounce, setBounce] = useState(false);
  useEffect(() => {
    if (showModal) {
      const interval = setInterval(() => {
        setBounce((prev) => !prev);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [showModal]);

  return (
    <div className="border-2 border-dashed rounded-xl p-6 text-center dark:border-gray-700 relative">
      {/* Upload Area */}
      {usedFiles.length === 0 && !resultUrl && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="cursor-pointer"
        >
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
            className="inline-block px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg shadow hover:opacity-90 transition"
          >
            📂 Upload Files
          </label>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Drag & Drop your files here, or click Upload to select from your device.
          </p>
        </div>
      )}

      {/* File Preview */}
      {usedFiles.length > 0 && (
        <div className="mb-4 space-y-2">
          {usedFiles.map((f, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between px-3 py-2 border rounded-lg dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <span className="text-sm text-gray-700 dark:text-gray-200 truncate">
                {f.name} ({(f.size / 1024).toFixed(1)} KB)
              </span>
              <button
                onClick={() => handleRemoveFile(idx)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTimes />
              </button>
            </div>
          ))}
          <button
            onClick={handleClear}
            className="mt-2 px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700 transition"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200 flex justify-between items-center animate-pulse">
          <span>⚠️ {error}</span>
          <button
            onClick={handleClear}
            className="ml-4 px-3 py-1 rounded bg-red-600 text-white text-xs hover:bg-red-700"
          >
            Clear
          </button>
        </div>
      )}

      {/* Progress */}
      {isProcessing && (
        <div className="w-full bg-gray-200 rounded-full mt-4 dark:bg-gray-700 overflow-hidden">
          <div
            className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 h-2.5 rounded-full transition-all duration-300 animate-pulse"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Convert Button */}
      {usedFiles.length > 0 && !resultUrl && (
        <button
          onClick={handleProcess}
          disabled={isProcessing}
          className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold shadow-lg hover:opacity-90 disabled:opacity-50 transition"
        >
          {isProcessing ? "Processing…" : actionLabel || "Convert Now"}
        </button>
      )}

      {/* Success Modal */}
      {showModal && resultUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative backdrop-blur-2xl bg-white/30 dark:bg-gray-900/40 border border-yellow-400 rounded-2xl p-8 shadow-2xl text-center animate-[zoomIn_0.4s_ease]">
            <button
              onClick={() => {
                setShowModal(false);
                setShowEncourage(true);
              }}
              className="absolute top-2 right-2 text-yellow-500 hover:text-yellow-600 text-lg"
            >
              ✖
            </button>
            <FaCheckCircle className="text-yellow-400 text-6xl mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold text-yellow-500 mb-3 drop-shadow">
              👑 Completed!
            </h2>
            <p className="text-gray-800 dark:text-gray-200 mb-6">
              Your file has been successfully processed.
            </p>
            <a
              href={resultUrl}
              download={resultName}
              className="block w-full px-8 py-3 mb-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition"
            >
              ⬇️ Download Result
            </a>
            <button
              onClick={() => {
                setShowModal(false);
                setShowCelebration(true);
              }}
              className={`px-6 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition mx-auto ${
                bounce ? "animate-bounce" : ""
              }`}
            >
              ☕ Support Quicktools
            </button>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Help us maintain servers & keep Quicktools free 💙
            </p>
          </div>
        </div>
      )}

      {/* Encourage Modal */}
      {showEncourage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 rounded-xl p-6 text-center shadow-xl">
            <h2 className="text-2xl font-bold mb-3">🐱 Thanks for using Quicktools!</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Don’t forget to come back tomorrow 🚀<br />
              Share this tool with your friends 🎉
            </p>
            <div className="flex gap-3 justify-center">
              <a
                href="https://wa.me/?text=Check%20out%20Quicktools%20PDF%20Tools!%20🚀"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
              >
                WhatsApp
              </a>
              <a
                href="https://t.me/share/url?url=https://quicktools-pdf.netlify.app&text=Check%20out%20Quicktools%20🚀"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
              >
                Telegram
              </a>
            </div>
            <button
              onClick={() => setShowEncourage(false)}
              className="mt-4 px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 flex items-center justify-center z-50">
          <div className="text-center text-white p-8 animate-[zoomIn_0.4s_ease]">
            <h2 className="text-4xl font-bold mb-4 animate-bounce">🎉 Woohoo! 🎉</h2>
            <p className="text-xl mb-6">
              You’re the real MVP! Thanks for supporting Quicktools Premium 💎✨
            </p>
            <div className="text-6xl mb-6">🐼 🐱 🐣 🥳</div>
            <button
              onClick={() => setShowCelebration(false)}
              className="px-8 py-3 bg-green-600 rounded-xl shadow-lg font-bold hover:bg-green-700 transition"
            >
              Continue using tools 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
