import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem({ id }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-2 bg-gray-100 rounded shadow cursor-move"
    >
      📄 Page {id + 1}
    </li>
  );
}

export default function OrganizePdf() {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState([]);
  const [reorderedUrl, setReorderedUrl] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleFileChange = async (e) => {
    const uploaded = e.target.files[0];
    setFile(uploaded);

    const bytes = await uploaded.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    const totalPages = pdf.getPageCount();

    setPages(Array.from({ length: totalPages }, (_, i) => i));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setPages((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleReorder = async () => {
    if (!file || pages.length === 0) {
      alert("Please upload a PDF first.");
      return;
    }

    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);

    const newPdf = await PDFDocument.create();
    for (const pageIndex of pages) {
      const [copiedPage] = await newPdf.copyPages(pdf, [pageIndex]);
      newPdf.addPage(copiedPage);
    }

    const newBytes = await newPdf.save();
    const newBlob = new Blob([newBytes], { type: "application/pdf" });
    setReorderedUrl(URL.createObjectURL(newBlob));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Organize PDF</h1>
        <p className="text-gray-500 mb-6">
          Upload a PDF, drag & drop pages to reorder, then download.
        </p>

        <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-6" />

        {pages.length > 0 && (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={pages} strategy={verticalListSortingStrategy}>
              <ul className="border rounded p-4 mb-6 space-y-2">
                {pages.map((page) => (
                  <SortableItem key={page} id={page} />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        )}

        {pages.length > 0 && (
          <button
            onClick={handleReorder}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Reorder PDF
          </button>
        )}

        {reorderedUrl && (
          <div className="mt-6">
            <a
              href={reorderedUrl}
              download="reordered.pdf"
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
            >
              Download Reordered PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
