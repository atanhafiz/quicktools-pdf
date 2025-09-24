import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const categories = [
    { title: "✂️ Edit PDF", path: "/dashboard/edit", desc: "Merge, split, rotate & organize PDF files" },
    { title: "🔄 Convert PDF", path: "/dashboard/convert", desc: "Convert PDF to Word, Excel, PPT or images" },
    { title: "🔐 Secure PDF", path: "/dashboard/secure", desc: "Protect, unlock, sign & watermark your PDFs" },
    { title: "🤖 Smart AI", path: "/dashboard/smartai", desc: "OCR, auto summary & AI-powered form filling" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-8">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800 dark:text-gray-100">
        🚀 QuickTools Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat, i) => (
          <Link
            key={i}
            to={cat.path}
            className="block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 p-6 text-center"
          >
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              {cat.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{cat.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
