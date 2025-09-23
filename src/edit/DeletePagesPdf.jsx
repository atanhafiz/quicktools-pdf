import React, { useState, useEffect } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";
import * as pdfjsLib from "pdfjs-dist/webpack";

export default function DeletePagesPdf() {
  const [file, setFile] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [pagesToDelete, setPagesToDelete] = useState([]);
  const [outputName, setOutputName] = useState("deleted.pdf");

  // Handle file upload
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      setPagesToDelete([]);
    }
  };

  // Handle drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      setPagesToDelete([]);
    }
  };
  const handleDragOver = (e) => e.preventDefault();

  // Generate thumbnails
  useEffect(() => {
    if (!file) return;

    const loadPdf = async () => {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const thumbs = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.25 });
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

  // Toggle page delete
  const handleThumbClick = (pageNum) => {
    setPagesToDelete((prev) =>
      prev.includes(pageNum)
        ? prev.filter((p) => p !== pageNum)
        : [...prev, pageNum]
    );
  };

  // Process delete
  const processFiles = async (_, setProgress) => {
    if (!file) throw new Error("No file selected");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("deletePages", JSON.stringify(pagesToDelete));

    const res = await fetch("https://quicktools-api.vercel.app/delete", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Delete failed");

    // simulate smooth progress
    for (let i = 0; i <= 100; i += 25) {
      await new Promise((resolve) => setTimeout(resolve, 150));
      setProgress(i);
    }

    const blob = await res.blob();
    return window.URL.createObjectURL(blob);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-red-200">
      <h1 className="text-2xl font-bold mb-2 text-red-600">🗑️ Delete Pages</h1>
      <p className="text-sm text-gray-600 mb-6">
        Upload or drag & drop a PDF → <b>Click thumbnails</b> to mark pages ❌ →
        Delete → Download.
      </p>

      {/* File input */}
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="hidden"
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer inline-block px-4 py-2 mb-4 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
      >
        📂 Choose PDF File
      </label>

      {/* Drag & drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-red-400 rounded-lg p-8 mb-6 text-center text-gray-600 hover:bg-red-50 transition"
      >
        🚀 Or Drag & Drop your PDF file here
      </div>

      {/* Thumbnails */}
      {thumbnails.length > 0 && (
        <div className="grid grid-cols-4 gap-3 mb-6">
          {thumbnails.map((thumb) => (
            <div
              key={thumb.pageNum}
              onClick={() => handleThumbClick(thumb.pageNum)}
              className={`border rounded-lg cursor-pointer overflow-hidden ${
                pagesToDelete.includes(thumb.pageNum)
                  ? "ring-2 ring-red-500"
                  : "hover:ring-1 hover:ring-gray-400"
              }`}
            >
              <img src={thumb.src} alt={`Page ${thumb.pageNum}`} className="w-full" />
              <p className="text-xs text-center py-1 bg-gray-100">
                Page {thumb.pageNum}{" "}
                {pagesToDelete.includes(thumb.pageNum) ? "❌" : ""}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Output file name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ✏️ Output File Name
        </label>
        <input
          type="text"
          value={outputName}
          onChange={(e) => setOutputName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-red-200"
        />
      </div>

      {/* Wrapper */}
      <PdfToolWrapper
        title=""
        description=""
        actionLabel="🗑️ Delete Pages"
        processFiles={processFiles}
        multiple={false}
        outputName={outputName || "deleted.pdf"}
        files={file ? [file] : []}
      />
    </div>
  );
}
