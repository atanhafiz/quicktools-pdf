import React from "react";
import { Link } from "react-router-dom";

export default function ToolsDemoHub() {
  const demos = [
    {
      path: "/edit-demo",
      title: "🛠️ Edit Tools Demo",
      desc: "Test all Edit tools (Merge, Split, Rotate, Delete, Organize)",
    },
    {
      path: "/convert-demo",
      title: "🔄 Convert Tools Demo",
      desc: "Test all Convert tools (PDF ⇄ Word, Excel, PPT, Image)",
    },
    {
      path: "/secure-demo",
      title: "🔐 Secure Tools Demo",
      desc: "Test all Secure tools (Protect, Unlock, Sign, Watermark, eSign Flow)",
    },
    {
      path: "/smartai-demo",
      title: "🤖 Smart AI Tools Demo",
      desc: "Test all Smart AI tools (OCR, AI Summary, Form Filler)",
    },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8 text-center">
        🧪 Tools Demo Hub
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
        Pick a category below to test all tools in that group.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {demos.map((demo, i) => (
          <Link
            key={i}
            to={demo.path}
            className="block border rounded-lg shadow hover:shadow-lg transition bg-white dark:bg-gray-800 p-6"
          >
            <h2 className="text-xl font-bold mb-2">{demo.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {demo.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
