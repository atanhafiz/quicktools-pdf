import React, { useRef, useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";

// Dummy: simulate apply signature to PDF
const processFiles = async (files, setProgress, signatureData) => {
  setProgress(20);
  await new Promise((r) => setTimeout(r, 1000));
  setProgress(60);

  const file = files[0];
  const arrayBuffer = await file.arrayBuffer();

  // NOTE: signatureData tak betul² digunakan (simulate only)
  // Real case: API akan embed image ke dalam PDF
  const blob = new Blob([arrayBuffer], { type: "application/pdf" });

  setProgress(100);
  return URL.createObjectURL(blob);
};

export default function SignPdf() {
  const canvasRef = useRef(null);
  const [signatureData, setSignatureData] = useState(null);

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

  const handleProcess = (files, setProgress) => {
    return processFiles(files, setProgress, signatureData);
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
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">✍️ Sign PDF</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
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

      <PdfToolWrapper
        title="Sign PDF"
        description="Apply your digital signature to the PDF file"
        actionLabel="Apply Signature"
        processFiles={handleProcess}
        multiple={false}
        outputName="signed.pdf"
        accept=".pdf"
      />
    </div>
  );
}
