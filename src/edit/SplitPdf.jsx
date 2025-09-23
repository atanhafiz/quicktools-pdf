import React, { useState, useEffect } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";
import * as pdfjsLib from "pdfjs-dist/webpack";

export default function SplitPdf() {
  const [pageRange, setPageRange] = useState("1-2");
  const [thumbnails, setThumbnails] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);
  const [file, setFile] = useState(null);
  const [splitAll, setSplitAll] = useState(false);
  const [mode, setMode] = useState("smooth"); // "quick" or "smooth"

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

  // Update pageRange when selecting thumbnails
  useEffect(() => {
    if (selectedPages.length > 0) {
      setPageRange(selectedPages.sort((a, b) => a - b).join(","));
    }
  }, [selectedPages]);

  const handleThumbClick = (pageNum) => {
    setSelectedPages((prev) =>
      prev.includes(pageNum)
        ? prev.filter((p) => p !== pageNum)
        : [...prev, pageNum]
    );
  };

  // Process split (Quick vs Smooth)
  const processFiles = async (files, setProgress) => {
    const selectedFile = files[0];
    setFile(selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);

    if (splitAll) {
      formData.append("mode", "split-all");
    } else {
      formData.append("pages", pageRange);
    }

    // QUICK MODE → no progress, straight fetch
    if (mode === "quick") {
      const res = await fetch("https://quicktools-api.vercel.app/split", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Split failed");

      const blob = await res.blob();
      return window.URL.createObjectURL(blob);
    }

    // SMOOTH MODE → use progress bar
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://quicktools-api.vercel.app/split", true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress(percent);
        }
      };

      xhr.responseType = "blob";

      xhr.onload = () => {
        if (xhr.status === 200) {
          const url = window.URL.createObjectURL(xhr.response);
          resolve(url);
        } else {
          reject(new Error("Split failed"));
        }
      };

      xhr.onerror = () => reject(new Error("Network error"));
      xhr.send(formData);
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-2">✂️ Split PDF</h1>
      <p className="text-gray-600 mb-6">
        Split your PDF by <b>page range</b>, select from <b>thumbnails</b>, or{" "}
        <b>split every page into separate files</b>.
      </p>

      {/* Mode toggle */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setMode("quick")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${
            mode === "quick"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          ⚡ Quick Mode
        </button>
        <button
          onClick={() => setMode("smooth")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${
            mode === "smooth"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          🎨 Smooth Mode
        </button>
      </div>

      {/* Page range input */}
      {!splitAll && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Page Range
          </label>
          <input
            type="text"
            value={pageRange}
            onChange={(e) => setPageRange(e.target.value)}
            placeholder="Example: 1-3,5,7-9"
            className="w-full border px-3 py-2 rounded-lg text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter page numbers, use commas (,) or dashes (-) for ranges.
          </p>
        </div>
      )}

      {/* Thumbnails */}
      {!splitAll && thumbnails.length > 0 && (
        <div className="grid grid-cols-4 gap-3 mb-6">
          {thumbnails.map((thumb) => (
            <div
              key={thumb.pageNum}
              onClick={() => handleThumbClick(thumb.pageNum)}
              className={`border rounded-lg cursor-pointer overflow-hidden ${
                selectedPages.includes(thumb.pageNum)
                  ? "ring-2 ring-blue-500"
                  : "hover:ring-1 hover:ring-gray-400"
              }`}
            >
              <img
                src={thumb.src}
                alt={`Page ${thumb.pageNum}`}
                className="w-full"
              />
              <p className="text-xs text-center py-1 bg-gray-100">
                Page {thumb.pageNum}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Split all toggle */}
      <div className="mb-6">
        <button
          onClick={() => setSplitAll(!splitAll)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${
            splitAll
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {splitAll ? "Cancel Split All" : "🔀 Split Every Page"}
        </button>
        {splitAll && (
          <p className="text-xs text-red-500 mt-2">
            Active mode: every page will be separated into individual PDF files
            (ZIP).
          </p>
        )}
      </div>

      {/* Wrapper */}
      <PdfToolWrapper
        title="Split PDF"
        description="Upload a PDF and choose how to split."
        actionLabel={splitAll ? "Split All Pages" : "Split Now"}
        processFiles={processFiles}
        multiple={false}
        outputName={splitAll ? "split-pages.zip" : "split.pdf"}
      />
    </div>
  );
}
