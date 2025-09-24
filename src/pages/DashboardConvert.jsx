import React from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

export default function DashboardConvert() {
  const tools = [
    { icon: "📄", name: "PDF → Word", path: "/pdf-to-word", desc: "Convert PDF to Word document" },
    { icon: "📝", name: "Word → PDF", path: "/word-to-pdf", desc: "Convert Word documents to PDF" },
    { icon: "📊", name: "PDF → Excel", path: "/pdf-to-excel", desc: "Extract tables to Excel" },
    { icon: "📑", name: "PDF → PPT", path: "/pdf-to-ppt", desc: "Convert PDF slides to PowerPoint" },
    { icon: "🖼️", name: "PDF → Image", path: "/pdf-to-image", desc: "Export PDF pages as images" },
    { icon: "📷", name: "Image → PDF", path: "/image-to-pdf", desc: "Combine images into one PDF" },
  ];

  return (
    <PageWrapper title="🔄 Convert PDF Tools">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool, i) => (
          <Link
            key={i}
            to={tool.path}
            className="block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all p-6 text-center sm:text-left"
          >
            <div className="text-4xl mb-3">{tool.icon}</div>
            <h2 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">{tool.name}</h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </PageWrapper>
  );
}
