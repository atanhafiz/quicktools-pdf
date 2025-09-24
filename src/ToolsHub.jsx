import React from "react";
import { Link } from "react-router-dom";

export default function ToolsHub() {
  const categories = [
    {
      title: "✂️ Edit PDF",
      tools: [
        { name: "Merge PDF", path: "/merge", desc: "Combine multiple PDFs into one" },
        { name: "Split PDF", path: "/split", desc: "Split a PDF into separate files" },
        { name: "Rotate PDF", path: "/rotate", desc: "Rotate selected PDF pages" },
        { name: "Delete Pages", path: "/delete", desc: "Remove specific pages from PDF" },
        { name: "Organize PDF", path: "/organize", desc: "Rearrange and manage PDF pages" },
      ],
    },
    {
      title: "🔄 Convert PDF",
      tools: [
        { name: "PDF → Word", path: "/pdf-to-word", desc: "Convert PDF to editable Word document" },
        { name: "Word → PDF", path: "/word-to-pdf", desc: "Convert Word documents to PDF" },
        { name: "PDF → Excel", path: "/pdf-to-excel", desc: "Extract tables from PDF to Excel" },
        { name: "PDF → PPT", path: "/pdf-to-ppt", desc: "Convert PDF slides into PowerPoint" },
        { name: "PDF → Image", path: "/pdf-to-image", desc: "Export PDF pages as images" },
        { name: "Image → PDF", path: "/image-to-pdf", desc: "Combine images into a single PDF" },
      ],
    },
    {
      title: "🔐 Secure PDF",
      tools: [
        { name: "Protect PDF", path: "/protect", desc: "Add password protection to PDF" },
        { name: "Unlock PDF", path: "/unlock", desc: "Remove password protection" },
        { name: "Sign PDF", path: "/sign", desc: "Add digital signature to your PDF" },
        { name: "Watermark PDF", path: "/watermark", desc: "Insert watermark into PDF pages" },
        { name: "eSign Flow", path: "/esign", desc: "Full e-signature workflow" },
      ],
    },
    {
      title: "🤖 Smart AI",
      tools: [
        { name: "OCR PDF", path: "/ocr", desc: "Recognize text from scanned PDFs" },
        { name: "AI Summary", path: "/ai-summary", desc: "Generate automatic summaries" },
        { name: "Form Filler", path: "/form-filler", desc: "Fill in PDF forms with AI" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-8">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800 dark:text-gray-100">
        🚀 QuickTools PDF Hub
      </h1>

      {categories.map((cat, i) => (
        <div key={i} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
            {cat.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cat.tools.map((tool, j) => (
              <Link
                key={j}
                to={tool.path}
                className="block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 p-6"
              >
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {tool.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
