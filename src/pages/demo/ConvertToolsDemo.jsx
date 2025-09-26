import React from "react";
import { Link } from "react-router-dom";
import PdfToWord from "../convert/PdfToWord";
import PdfToExcel from "../convert/PdfToExcel";
import PdfToPpt from "../convert/PdfToPpt";
import PdfToImage from "../convert/PdfToImage";
import ImageToPdf from "../convert/ImageToPdf";
import WordToPdf from "../convert/WordToPdf";

export default function ConvertToolsDemo() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold">🔄 Convert Tools Demo</h1>
        <Link
          to="/demo-hub"
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          ← Back to Demo Hub
        </Link>
      </div>

      <section className="border rounded-lg shadow p-6"><PdfToWord /></section>
      <section className="border rounded-lg shadow p-6"><PdfToExcel /></section>
      <section className="border rounded-lg shadow p-6"><PdfToPpt /></section>
      <section className="border rounded-lg shadow p-6"><PdfToImage /></section>
      <section className="border rounded-lg shadow p-6"><ImageToPdf /></section>
      <section className="border rounded-lg shadow p-6"><WordToPdf /></section>
    </div>
  );
}
