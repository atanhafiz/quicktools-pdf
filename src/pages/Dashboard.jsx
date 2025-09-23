import { useNavigate } from "react-router-dom";
import {
  FileText,
  FileImage,
  FileSpreadsheet,
  Presentation,
  Combine,
  Split,
  RotateCcw,
  Trash2,
  Rows,
  Lock,
  Unlock,
  Signature,
  Droplet,
  ScanText,
  Sparkles,
  Edit,
} from "lucide-react";
import ToolCard from "../components/ToolCard";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-center py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
          Every tool you need to work with PDFs in one place
        </h1>
        <p className="text-gray-500">
          Merge, split, compress, convert, unlock, sign, watermark and more.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-20">
        {/* Convert */}
        <ToolCard icon={<FileText />} title="Word to PDF" desc="Convert Word documents to PDF." color="bg-blue-500" onClick={() => navigate("/word-to-pdf")} />
        <ToolCard icon={<FileText />} title="PDF to Word" desc="Convert PDFs back to Word." color="bg-green-500" onClick={() => navigate("/pdf-to-word")} />
        <ToolCard icon={<FileSpreadsheet />} title="PDF to Excel" desc="Export tables from PDF into Excel." color="bg-green-600" onClick={() => navigate("/pdf-to-excel")} />
        <ToolCard icon={<Presentation />} title="PDF to PPT" desc="Convert PDFs to PowerPoint slides." color="bg-pink-500" onClick={() => navigate("/pdf-to-ppt")} />
        <ToolCard icon={<FileImage />} title="Image to PDF" desc="Convert images into PDF." color="bg-purple-500" onClick={() => navigate("/image-to-pdf")} />
        <ToolCard icon={<FileImage />} title="PDF to Image" desc="Extract PDF pages as images." color="bg-yellow-500" onClick={() => navigate("/pdf-to-image")} />

        {/* Edit */}
        <ToolCard icon={<Combine />} title="Merge PDF" desc="Combine multiple PDFs into one." color="bg-red-500" onClick={() => navigate("/merge-pdf")} />
        <ToolCard icon={<Split />} title="Split PDF" desc="Split one PDF into many files." color="bg-orange-500" onClick={() => navigate("/split-pdf")} />
        <ToolCard icon={<RotateCcw />} title="Rotate PDF" desc="Rotate PDF pages." color="bg-indigo-500" onClick={() => navigate("/rotate-pdf")} />
        <ToolCard icon={<Trash2 />} title="Delete Pages" desc="Remove pages from PDF." color="bg-gray-500" onClick={() => navigate("/delete-pages-pdf")} />
        <ToolCard icon={<Rows />} title="Organize PDF" desc="Reorder PDF pages easily." color="bg-pink-600" onClick={() => navigate("/organize-pdf")} />

        {/* Secure */}
        <ToolCard icon={<Lock />} title="Protect PDF" desc="Add password protection to PDF." color="bg-gray-900" onClick={() => navigate("/protect-pdf")} />
        <ToolCard icon={<Unlock />} title="Unlock PDF" desc="Remove PDF password." color="bg-gray-700" onClick={() => navigate("/unlock-pdf")} />
        <ToolCard icon={<Signature />} title="Sign PDF" desc="Add digital signatures." color="bg-blue-600" onClick={() => navigate("/sign-pdf")} />
        <ToolCard icon={<Droplet />} title="Watermark PDF" desc="Add watermark to PDF." color="bg-teal-500" onClick={() => navigate("/watermark-pdf")} />

        {/* Smart AI */}
        <ToolCard icon={<ScanText />} title="OCR PDF" desc="Extract text from scanned PDFs." color="bg-green-700" onClick={() => navigate("/ocr-pdf")} />
        <ToolCard icon={<Sparkles />} title="AI Summary" desc="Summarize PDFs with AI." color="bg-yellow-600" onClick={() => navigate("/ai-summary")} />
        <ToolCard icon={<Edit />} title="Form Filler" desc="Fill and edit PDF forms." color="bg-orange-600" onClick={() => navigate("/form-filler")} />
      </div>
    </div>
  );
}
