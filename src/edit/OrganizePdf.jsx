import React, { useState, useEffect } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";
import * as pdfjsLib from "pdfjs-dist/webpack";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableThumb({ thumb, angle, onRotate, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: thumb.pageNum });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border rounded-lg cursor-move overflow-hidden hover:ring-2 hover:ring-indigo-400 relative"
    >
      <img
        src={thumb.src}
        alt={`Page ${thumb.pageNum}`}
        className="w-full"
        style={{
          transform: `rotate(${angle}deg)`,
          transition: "transform 0.3s",
        }}
      />
      <p className="text-xs text-center py-1 bg-gray-100">
        Page {thumb.pageNum} – {angle}°
      </p>
      <div className="absolute top-1 right-1 flex gap-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRotate(thumb.pageNum);
          }}
          className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
        >
          ⟳
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(thumb.pageNum);
          }}
          className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
        >
          ❌
        </button>
      </div>
    </div>
  );
}

export default function OrganizePagesPdf() {
  const [file, setFile] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [pageAngles, setPageAngles] = useState({});
  const [pagesDeleted, setPagesDeleted] = useState([]);
  const [pageOrder, setPageOrder] = useState([]);
  const [outputName, setOutputName] = useState("organized-pages.pdf");

  const sensors = useSensors(useSensor(PointerSensor));

  // File input
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      setPageAngles({});
      setPagesDeleted([]);
    }
  };

  // Drag & drop file
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      setPageAngles({});
      setPagesDeleted([]);
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
      setPageOrder(thumbs.map((t) => t.pageNum));
    };

    loadPdf();
  }, [file]);

  // Rotate
  const handleRotate = (pageNum) => {
    setPageAngles((prev) => {
      const current = prev[pageNum] || 0;
      const next = (current + 90) % 360;
      return { ...prev, [pageNum]: next };
    });
  };

  // Delete toggle
  const handleDelete = (pageNum) => {
    setPagesDeleted((prev) =>
      prev.includes(pageNum)
        ? prev.filter((p) => p !== pageNum)
        : [...prev, pageNum]
    );
  };

  // Reorder
  const handleReorder = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = pageOrder.indexOf(active.id);
      const newIndex = pageOrder.indexOf(over.id);
      setPageOrder((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  // Process organize
  const processFiles = async (_, setProgress) => {
    if (!file) throw new Error("No file selected");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("pageOrder", JSON.stringify(pageOrder));
    formData.append("pagesDeleted", JSON.stringify(pagesDeleted));
    formData.append("pageAngles", JSON.stringify(pageAngles));

    const res = await fetch("https://quicktools-api.vercel.app/organize-pages", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Organize pages failed");

    for (let i = 0; i <= 100; i += 20) {
      await new Promise((resolve) => setTimeout(resolve, 150));
      setProgress(i);
    }

    const blob = await res.blob();
    return window.URL.createObjectURL(blob);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-indigo-200">
      <h1 className="text-2xl font-bold mb-2 text-indigo-600">📑 Organize Pages</h1>
      <p className="text-sm text-gray-600 mb-6">
        Upload a PDF → <b>Reorder pages</b> (drag & drop) → <b>Rotate</b> ⟳ →
        <b> Delete</b> ❌ → Download organized PDF.
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
        className="cursor-pointer inline-block px-4 py-2 mb-4 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition"
      >
        📂 Choose PDF File
      </label>

      {/* Drag & drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-indigo-400 rounded-lg p-8 mb-6 text-center text-gray-600 hover:bg-indigo-50 transition"
      >
        🚀 Or Drag & Drop your PDF file here
      </div>

      {/* Thumbnails with drag & drop */}
      {thumbnails.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleReorder}
        >
          <SortableContext items={pageOrder} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-4 gap-3 mb-6">
              {pageOrder.map((pageNum) => {
                const thumb = thumbnails.find((t) => t.pageNum === pageNum);
                return (
                  <SortableThumb
                    key={thumb.pageNum}
                    thumb={thumb}
                    angle={pageAngles[pageNum] || 0}
                    onRotate={handleRotate}
                    onDelete={handleDelete}
                  />
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
        />
      </div>

      {/* Wrapper */}
      <PdfToolWrapper
        title=""
        description=""
        actionLabel="📑 Organize Pages"
        processFiles={processFiles}
        multiple={false}
        outputName={outputName || "organized-pages.pdf"}
        files={file ? [file] : []}
      />
    </div>
  );
}
