import React from "react";
import { Link } from "react-router-dom";

export default function DashboardEdit() {
  const tools = [
    { icon: "🔗", name: "Merge PDF", path: "/merge", desc: "Combine multiple PDFs into one file" },
    { icon: "✂️", name: "Split PDF", path: "/split", desc: "Split PDF into smaller files" },
    { icon: "🔄", name: "Rotate PDF", path: "/rotate", desc: "Rotate selected pages" },
    { icon: "🗑️", name: "Delete Pages", path: "/delete", desc: "Remove unwanted pages" },
    { icon: "📑", name: "Organize PDF", path: "/organize", desc: "Rearrange and manage PDF pages" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">✂️ Edit PDF Tools</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool, i) => (
          <Link
            key={i}
            to={tool.path}
            className="block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all p-6 text-center sm:text-left"
          >
            <div className="text-4xl mb-3">{tool.icon}</div>
            <h2 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">
              {tool.name}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
