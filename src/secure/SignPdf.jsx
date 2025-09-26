import React, { useRef, useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";
import BackButton from "../components/BackButton"; // ✅ Import BackButton

// Dummy: simulate apply signature to PDF
const processFiles = async (files, setProgress, signatureData, outputName, setError) => {
  try {
    if (!files.length) throw new Error("Please upload a PDF file.");
    const file = files[0];
    if (!file.name.endsWith(".pdf")) throw new Error("Invalid file type. Only PDF files are allowed.");

    // Default output name
    let finalName = outputName && outputName.trim() !== "" ? outputName : "signed.pdf";
    if (!finalName.toLowerCase().endsWith(".pdf")) finalName = finalName + ".pdf";

    setProgress(20);
    await new Promise((r) => setTimeout(r, 1000));
    setProgress(60);

    const arrayBuffer = await file.arrayBuffer();

    // NOTE: signatureData tak betul² digunakan (simulate only)
    // Real case: API akan embed image ke dalam PDF
    const blob = new Blob([arrayBuffer], { type: "application/pdf" });

    setProgress(100);
    return { url: URL.createObjectURL(blob), name: finalName };
  } catch (err) {
    setError(err.message);
    setProgress(0);
    throw err;
  }
};

export default function SignPdf() {
  const canvasRef = useRef(null);
  const [signatureData, setSignatureData] = useState(null);
  const [outputName, setOutputName] = useState("");
  const [error, setError] = useState("");
  const [resetKey, setResetKey] = useState(0);

  const saveSignature = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    setSignatureData(dataUrl);
    alert("✅ Signature saved!");
  };

  // Clear signature
  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureData(null);
  };

  const handleProcess = (files, setProgress) =>
    processFiles(files, setProgress, signatureData, outputName, setError);

  const handleClear = () => {
    setOutputName("");
    setError("");
    setResetKey((prev) => prev + 1);
  };

  // Draw signature (mouse)
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    canvas.isDrawing = true;
  };

  const draw = (e) => {
    const canvas = canvasRef.current;
    if (!canvas.isDrawing) return;
    const ctx = canvas.getContext("2d");
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const endDrawing = () => {
    const canvas = canvasRef.current;
    canvas.isDrawing = false;
  };

  return (
    <div className="flex justify-center items-start mt-16 px-4">
      <div className="w-full max-w-xl p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        
        {/* Header + Back Button */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            ✍️ Sign PDF
          </h1>
          <BackButton to="/dashboard/secure" />
        </div>

        <p className="text-gray-700 dark:text-gray-200 mb-6">
          Add your digital signature to a PDF file.
        </p>

        {/* Signature pad */}
        <canvas
          ref={canvasRef}
          width={400}
          height={150}
          className="border rounded-lg mb-3 bg-white"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
        />

        <div className="flex gap-2 mb-4">
          <button
            onClick={saveSignature}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Save Signature
          </button>
          <button
            onClick={clearSignature}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition"
          >
            Clear
          </button>
        </div>

        {/* Output Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
            Output File Name
          </label>
          <input
            type="text"
            value={outputName}
            onChange={(e) => setOutputName(e.target.value)}
            placeholder="Enter output file name.pdf"
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Default will be <b>signed.pdf</b> if left empty.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200 flex justify-between items-center">
            <span>⚠️ {error}</span>
            <button
              onClick={handleClear}
              className="ml-4 px-3 py-1 rounded bg-red-600 text-white text-xs hover:bg-red-700"
            >
              Clear
            </button>
          </div>
        )}

        {/* Wrapper */}
        <PdfToolWrapper
          key={resetKey}
          title="Sign PDF"
          description="Apply your digital signature to the PDF file"
          actionLabel="Apply Signature"
          processFiles={handleProcess}
          multiple={false}
          outputName={outputName || "signed.pdf"}
          accept=".pdf"
        />
      </div>
    </div>
  );
}
