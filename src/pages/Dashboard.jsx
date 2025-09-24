import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const categories = [
    {
      title: "✂️ Edit PDF",
      path: "/dashboard/edit",
      desc: "Merge, split, rotate & organize PDF files with ease",
    },
    {
      title: "🔄 Convert PDF",
      path: "/dashboard/convert",
      desc: "Convert PDF to Word, Excel, PPT or vice versa",
    },
    {
      title: "🔐 Secure PDF",
      path: "/dashboard/secure",
      desc: "Protect, unlock, sign & watermark your PDFs",
    },
    {
      title: "🤖 Smart AI",
      path: "/dashboard/smartai",
      desc: "OCR, auto summary & AI form filling",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-extrabold mb-10 text-center">
        🚀 QuickTools Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat, i) => (
          <Link
            key={i}
            to={cat.path}
            className="block bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 p-6"
          >
            <h2 className="text-xl font-bold mb-2">{cat.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{cat.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
