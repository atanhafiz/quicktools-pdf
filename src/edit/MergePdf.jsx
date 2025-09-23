import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { FaFilePdf, FaTrash, FaBroom } from "react-icons/fa";
import PdfToolWrapper from "../components/PdfToolWrapper";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const makeId = () => Math.random().toString(36).substring(2, 9);

function SortableItem({ item, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex justify-between items-center bg-blue-50 p-3 rounded-lg shadow-sm"
    >
      {/* Drag handle area */}
      <div
        {...listeners}
        className="flex items-center gap-3 text-blue-700 cursor-move flex-1"
      >
        <FaFilePdf /> {item.file.name}
        <span className="text-xs text-gray-500">
          ({(item.file.size / 1024 / 1024).toFixed(2)} MB)
        </span>
      </div>

      {/* Delete button → bukan draggable */}
      <button
        onClick={() => onRemove(item.id)}
        className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 ml-2"
      >
        <FaTrash />
      </button>
    </li>
  );
}

export default function MergePdf() {
  const [files, setFiles] = useState([]);
  const [outputName, setOutputName] = useState("merged.pdf");

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files)
      .filter((file) => file.type === "application/pdf")
      .map((f) => ({ id: makeId(), file: f }));
    setFiles((prev) => [...prev, ...droppedFiles]);
  };
  const handleDragOver = (e) => e.preventDefault();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
      .filter((file) => file.type === "application/pdf")
      .map((f) => ({ id: makeId(), file: f }));
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const clearAll = () => setFiles([]);

  const handleReorder = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = files.findIndex((f) => f.id === active.id);
      const newIndex = files.findIndex((f) => f.id === over.id);
      setFiles((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const processFiles = async (items, setProgress) => {
    const mergedPdf = await PDFDocument.create();
    for (let i = 0; i < items.length; i++) {
      const file = items[i].file;
      const pdfBytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
      setProgress(Math.round(((i + 1) / items.length) * 100));
    }
    const mergedPdfBytes = await mergedPdf.save();
    const mergedBlob = new Blob([mergedPdfBytes], { type: "application/pdf" });
    return URL.createObjectURL(mergedBlob);
  };

  const totalSize = files.reduce((acc, f) => acc + f.file.size, 0);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-blue-200">
      <h1 className="text-2xl font-bold mb-2 text-blue-600">🔗 Merge PDF</h1>
      <p className="text-sm text-gray-600 mb-6">
        📝 Choose OR drag & drop PDFs → <b>Drag files up & down to reorder</b> → Merge → Download.
      </p>

      <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={handleFileChange}
        className="hidden"
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
        🚀 Or Drag & Drop your PDF files here
      </div>

      {files.length > 0 && (
        <>
          <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
            <span>
              📊 {files.length} file(s) – {(totalSize / 1024 / 1024).toFixed(2)} MB total
            </span>
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              <FaBroom /> Clear All
            </button>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleReorder}
          >
            <SortableContext
              items={files.map((f) => f.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul className="mb-6 space-y-2">
                {files.map((f) => (
                  <SortableItem
                    key={f.id}
                    item={f}
                    onRemove={(id) =>
                      setFiles((prev) => prev.filter((file) => file.id !== id))
                    }
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>

          <p className="text-xs text-gray-500 mt-2">
            💡 Tip: Drag files up & down to reorder them
          </p>
        </>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ✏️ Output File Name
        </label>
        <input
          type="text"
          value={outputName}
          onChange={(e) => setOutputName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
        />
      </div>

      <PdfToolWrapper
        title=""
        description=""
        actionLabel="🔗 Merge PDFs"
        processFiles={async (_, setProgress) => await processFiles(files, setProgress)}
        multiple={true}
        outputName={outputName || "merged.pdf"}
        files={files}
      />
    </div>
  );
}
