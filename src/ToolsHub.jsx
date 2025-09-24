import React from "react";
import { Link } from "react-router-dom";

export default function ToolsHub() {
  const categories = [
    {
      title: "✂️ Edit PDF",
      tools: [
        { name: "Merge PDF", path: "/merge", desc: "Gabungkan beberapa PDF jadi satu" },
        { name: "Split PDF", path: "/split", desc: "Pisahkan PDF kepada beberapa fail" },
        { name: "Rotate PDF", path: "/rotate", desc: "Putar halaman PDF" },
        { name: "Delete Pages", path: "/delete", desc: "Buang halaman terpilih" },
        { name: "Organize PDF", path: "/organize", desc: "Susun semula halaman PDF" },
      ],
    },
    {
      title: "🔄 Convert PDF",
      tools: [
        { name: "PDF → Word", path: "/pdf-to-word", desc: "Tukar PDF kepada dokumen Word" },
        { name: "Word → PDF", path: "/word-to-pdf", desc: "Tukar Word kepada fail PDF" },
        { name: "PDF → Excel", path: "/pdf-to-excel", desc: "Extract jadual ke Excel" },
        { name: "PDF → PPT", path: "/pdf-to-ppt", desc: "Tukar PDF ke PowerPoint" },
        { name: "PDF → Image", path: "/pdf-to-image", desc: "Simpan setiap halaman PDF sebagai gambar" },
        { name: "Image → PDF", path: "/image-to-pdf", desc: "Gabungkan gambar jadi PDF" },
      ],
    },
    {
      title: "🔐 Secure PDF",
      tools: [
        { name: "Protect PDF", path: "/protect", desc: "Letak password pada PDF" },
        { name: "Unlock PDF", path: "/unlock", desc: "Buka password PDF" },
        { name: "Sign PDF", path: "/sign", desc: "Tambah tandatangan digital" },
        { name: "Watermark PDF", path: "/watermark", desc: "Tambah watermark pada PDF" },
        { name: "eSign Flow", path: "/esign", desc: "Flow e-sign penuh dengan pihak lain" },
      ],
    },
    {
      title: "🤖 Smart AI",
      tools: [
        { name: "OCR PDF", path: "/ocr", desc: "Kenal pasti teks dari gambar dalam PDF" },
        { name: "AI Summary", path: "/ai-summary", desc: "Ringkasan automatik kandungan PDF" },
        { name: "Form Filler", path: "/form-filler", desc: "Isi borang PDF secara automatik" },
      ],
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">🚀 QuickTools PDF Hub</h1>

      {categories.map((cat, i) => (
        <div key={i} className="mb-10">
          <h2 className="text-xl font-semibold mb-4">{cat.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cat.tools.map((tool, j) => (
              <Link
                key={j}
                to={tool.path}
                className="block bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg p-5 transition"
              >
                <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
