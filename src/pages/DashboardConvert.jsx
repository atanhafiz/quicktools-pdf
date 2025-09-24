import React from "react";
import { Link } from "react-router-dom";

export default function DashboardConvert() {
  const tools = [
    { name: "PDF → Word", path: "/pdf-to-word", desc: "Convert PDF to editable Word document", icon: "📄" },
    { name: "Word → PDF", path: "/word-to-pdf", desc: "Convert Word documents to PDF", icon: "📝" },
    { name: "PDF → Excel", path: "/pdf-to-excel", desc: "Extract tables from PDF to Excel", icon: "📊" },
    { name: "PDF → PPT", path: "/pdf-to-ppt", desc: "Convert PDF slides into PowerPoint", icon: "📑" },
    { name: "PDF → Image", path: "/pdf-to-image", desc: "Export PDF pages as images", icon: "🖼" },
    { name: "Image → PDF", path: "/image-to-pdf", desc: "Combine images into a single PDF", icon: "📷" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">🔄 Convert PDF Tools</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, i) => (
          <Link
            key={i}
            to={tool.path}
            className="block bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition-all p-6"
          >
            <h2 className="text-lg font-semibold mb-2">{tool.icon} {tool.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
