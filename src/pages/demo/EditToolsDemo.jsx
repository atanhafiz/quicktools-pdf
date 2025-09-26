import React from "react";
import { Link } from "react-router-dom";
import MergePdf from "../edit/MergePdf";
import SplitPdf from "../edit/SplitPdf";
import RotatePdf from "../edit/RotatePdf";
import DeletePagesPdf from "../edit/DeletePagesPdf";
import OrganizePdf from "../edit/OrganizePdf";

export default function EditToolsDemo() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold">🛠️ Edit Tools Demo</h1>
        <Link
          to="/demo-hub"
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          ← Back to Demo Hub
        </Link>
      </div>

      <section className="border rounded-lg shadow p-6"><MergePdf /></section>
      <section className="border rounded-lg shadow p-6"><SplitPdf /></section>
      <section className="border rounded-lg shadow p-6"><RotatePdf /></section>
      <section className="border rounded-lg shadow p-6"><DeletePagesPdf /></section>
      <section className="border rounded-lg shadow p-6"><OrganizePdf /></section>
    </div>
  );
}
