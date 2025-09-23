import React, { useState, useEffect } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";
import * as pdfjsLib from "pdfjs-dist/webpack";

export default function RotatePdf() {
  const [globalAngle, setGlobalAngle] = useState(90); // default
  const [file, setFile] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [pageAngles, setPageAngles] = useState({}); // {1:90, 2:180,...}

  // Render thumbnails when a file is uploaded
  useEffect(() => {
    if (!file) return;

    const loadPdf = async () => {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const thumbs = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.2 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context, viewport }).promise;
        thumbs.push({ pageNum: i, src: canvas.toDataURL() });
      }

      setThumbnails(thumbs);
    };

    loadPdf();
  }, [file]);

  // Toggle rotation for a specific page
  const handleRotateClick = (pageNum) => {
    setPageAngles((prev) => {
      const current = prev[pageNum] || 0;
      const next = (current + 90) % 360;
      return { ...prev, [pageNum]: next === 0 ? globalAngle : next };
    });
  };

  // Process rotate
  const processFiles = async (files, setProgress) => {
    const selectedFile = files[0];
    setFile(selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("globalAngle", globalAngle);
    formData.append("pageAngles", JSON.stringify(pageAngles));

    const res = await fetch("https://quicktools-api.vercel.app/rotate", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Rotate failed");

    // Simple progress simulate
    for (let i = 0; i <= 100; i += 25) {
      await new Promise((resolve) => setTimeout(resolve, 150));
      setProgress(i);
    }

    const blob = await res.blob();
    return window.URL.createObjectURL(blob);
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-2">🔄 Rotate PDF</h1>
      <p className="text-gray-600 mb-6">
        Rotate all pages to a global angle, or click individual thumbnails to
        rotate specific pages.
      </p>

      {/* Global angle selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Global Rotation Angle
        </label>
        <select
          value={globalAngle}
          onChange={(e) => setGlobalAngle(Number(e.target.value))}
          className="w-full border px-3 py-2 rounded-lg text-sm"
        >
          <option value={90}>90° Clockwise</option>
          <option value={180}>180°</option>
          <option value={270}>270° Counterclockwise</option>
        </select>
      </div>

      {/* Thumbnails */}
      {thumbnails.length > 0 && (
        <div className="grid grid-cols-4 gap-3 mb-6">
          {thumbnails.map((thumb) => (
            <div
              key={thumb.pageNum}
              onClick={() => handleRotateClick(thumb.pageNum)}
              className="border rounded-lg cursor-pointer overflow-hidden hover:ring-2 hover:ring-blue-400"
            >
              <img
                src={thumb.src}
                alt={`Page ${thumb.pageNum}`}
                className="w-full"
                style={{
                  transform: `rotate(${pageAngles[thumb.pageNum] || 0}deg)`,
                  transition: "transform 0.3s",
                }}
              />
              <p className="text-xs text-center py-1 bg-gray-100">
                Page {thumb.pageNum} –{" "}
                {pageAngles[thumb.pageNum] || globalAngle}°
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Wrapper */}
      <PdfToolWrapper
        title="Rotate PDF"
        description="Upload a PDF and rotate pages by global or per-page angles."
        actionLabel="Rotate Now"
        processFiles={processFiles}
        multiple={false}
        outputName="rotated.pdf"
      />
    </div>
  );
}
