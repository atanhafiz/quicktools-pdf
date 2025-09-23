import { Link } from "react-router-dom";
import {
  FileText,
  Scissors,
  RotateCcw,
  Trash2,
  Layers,
  Presentation,
  Image,
  Lock,
  Unlock,
  PenTool,
  Type,
  Cpu,
  Table,
} from "lucide-react";

const categories = [
  {
    title: "🛠️ Edit PDF",
    tools: [
      { name: "Merge PDF", path: "/merge", desc: "Combine multiple PDFs into one file", icon: <Layers className="w-6 h-6" /> },
      { name: "Split PDF", path: "/split", desc: "Split PDF into separate files", icon: <Scissors className="w-6 h-6" /> },
      { name: "Rotate PDF", path: "/rotate", desc: "Rotate specific pages", icon: <RotateCcw className="w-6 h-6" /> },
      { name: "Delete Pages", path: "/delete", desc: "Remove unwanted pages", icon: <Trash2 className="w-6 h-6" /> },
      { name: "Organize PDF", path: "/organize", desc: "Rearrange pages visually", icon: <FileText className="w-6 h-6" /> },
    ],
  },
  {
    title: "🔄 Convert PDF",
    tools: [
      { name: "PDF → Word", path: "/pdf-to-word", desc: "Convert PDF to editable Word", icon: <FileText className="w-6 h-6" /> },
      { name: "PDF → Excel", path: "/pdf-to-excel", desc: "Extract tables into Excel", icon: <Table className="w-6 h-6" /> },
      { name: "PDF → PPT", path: "/pdf-to-ppt", desc: "Convert PDF to PowerPoint", icon: <Presentation className="w-6 h-6" /> },
      { name: "PDF → Image", path: "/pdf-to-image", desc: "Export pages as images", icon: <Image className="w-6 h-6" /> },
      { name: "Image → PDF", path: "/image-to-pdf", desc: "Combine images into a PDF", icon: <Image className="w-6 h-6" /> },
      { name: "Word → PDF", path: "/word-to-pdf", desc: "Turn Word files into PDF", icon: <FileText className="w-6 h-6" /> },
    ],
  },
  {
    title: "🔐 Secure PDF",
    tools: [
      { name: "Protect PDF", path: "/protect", desc: "Add password protection", icon: <Lock className="w-6 h-6" /> },
      { name: "Unlock PDF", path: "/unlock", desc: "Remove PDF password", icon: <Unlock className="w-6 h-6" /> },
      { name: "Sign PDF", path: "/sign", desc: "Digitally sign documents", icon: <PenTool className="w-6 h-6" /> },
      { name: "Watermark PDF", path: "/watermark", desc: "Add text or logo watermark", icon: <Type className="w-6 h-6" /> },
    ],
  },
  {
    title: "🤖 Smart AI",
    tools: [
      { name: "OCR to Text", path: "/ocr", desc: "Extract text from scanned PDFs", icon: <Cpu className="w-6 h-6" /> },
    ],
  },
];

export default function ToolsHub() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="p-10 text-center shadow bg-white/70 dark:bg-gray-900/70 backdrop-blur">
        <h1 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          QuickTools PDF Hub
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          All-in-one PDF solutions – Fast • Simple • Secure
        </p>
      </header>

      {/* Tools */}
      <main className="p-10 space-y-16 max-w-7xl mx-auto">
        {categories.map((cat) => (
          <section key={cat.title}>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
              {cat.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {cat.tools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="group block p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-soft hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-4 text-blue-600 dark:text-blue-400">
                    {tool.icon}
                    <h3 className="text-xl font-semibold">{tool.name}</h3>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {tool.desc}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700">
        © {new Date().getFullYear()} QuickTools Hub. All rights reserved.
      </footer>
    </div>
  );
}
