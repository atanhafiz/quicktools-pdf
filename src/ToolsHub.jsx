import React from "react";
import { Link } from "react-router-dom";
import PageWrapper from "./components/PageWrapper";
import StatsCounter from "./components/StatsCounter";

export default function ToolsHub() {
  const categories = [
    {
      title: "✂️ Edit PDF",
      tools: [
        { icon: "🔗", name: "Merge PDF", path: "/merge", desc: "Combine multiple PDFs into one" },
        { icon: "✂️", name: "Split PDF", path: "/split", desc: "Split a PDF into separate files" },
        { icon: "🔄", name: "Rotate PDF", path: "/rotate", desc: "Rotate selected PDF pages" },
        { icon: "🗑️", name: "Delete Pages", path: "/delete", desc: "Remove specific pages from PDF" },
        { icon: "📑", name: "Organize PDF", path: "/organize", desc: "Rearrange and manage PDF pages" },
      ],
    },
    {
      title: "🔄 Convert PDF",
      tools: [
        { icon: "📄", name: "PDF → Word", path: "/pdf-to-word", desc: "Convert PDF to editable Word document" },
        { icon: "📝", name: "Word → PDF", path: "/word-to-pdf", desc: "Convert Word documents to PDF" },
        { icon: "📊", name: "PDF → Excel", path: "/pdf-to-excel", desc: "Extract tables from PDF to Excel" },
        { icon: "📑", name: "PDF → PPT", path: "/pdf-to-ppt", desc: "Convert PDF slides into PowerPoint" },
        { icon: "🖼️", name: "PDF → Image", path: "/pdf-to-image", desc: "Export PDF pages as images" },
        { icon: "📷", name: "Image → PDF", path: "/image-to-pdf", desc: "Combine images into a single PDF" },
      ],
    },
    {
      title: "🔐 Secure PDF",
      tools: [
        { icon: "🔒", name: "Protect PDF", path: "/protect", desc: "Add password protection to PDF" },
        { icon: "🔓", name: "Unlock PDF", path: "/unlock", desc: "Remove password protection" },
        { icon: "✍️", name: "Sign PDF", path: "/sign", desc: "Add digital signatures to your PDF" },
        { icon: "💧", name: "Watermark PDF", path: "/watermark", desc: "Insert watermark into PDF pages" },
        { icon: "🖊️", name: "eSign Flow", path: "/esign", desc: "Full e-signature workflow" },
      ],
    },
    {
      title: "🤖 Smart AI",
      tools: [
        { icon: "👁️", name: "OCR PDF", path: "/ocr", desc: "Recognize text from scanned PDFs" },
        { icon: "🤖", name: "AI Summary", path: "/ai-summary", desc: "Generate automatic summaries" },
        { icon: "📝", name: "Form Filler", path: "/form-filler", desc: "Fill in PDF forms with AI" },
      ],
    },
  ];

  return (
    <PageWrapper title="🚀 QuickTools PDF Hub">
      {/* Stats Counter with props */}
      <StatsCounter 
        files={10000000}   // 10M files
        users={200000}     // 200k users
        uptime={99.9}
        countries={80}
      />

      {/* Tool Categories */}
      {categories.map((cat, i) => (
        <div key={i} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">{cat.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cat.tools.map((tool, j) => (
              <Link
                key={j}
                to={tool.path}
                className="block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 p-6 text-center sm:text-left"
              >
                <div className="text-3xl mb-3">{tool.icon}</div>
                <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">{tool.name}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </PageWrapper>
  );
}
