import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

export default function SplitPDF() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Split PDF / Extract Pages Online | QuickTools</title>
        <meta name="description" content="Split PDF atau extract pages secara percuma. Mudah, pantas, selamat." />
        <meta name="keywords" content="split pdf, extract pages from pdf, pdf splitter online, pecah pdf" />
      </Helmet>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Split PDF – Pecah Muka Surat Dengan Senang</h1>
          <p className="mt-3 text-gray-600">Pilih page range → jadikan fail baru. Sesuai untuk hantar bab tertentu sahaja.</p>
        </header>

        <div className="mt-8 rounded-2xl border-2 border-dashed border-fuchsia-400 bg-white p-8 shadow-sm">
          <p className="mb-4 text-center text-gray-700">Drag & Drop PDF</p>
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center">
            <button onClick={() => navigate("/tools/split")} className="w-full md:w-auto rounded-lg bg-fuchsia-600 px-6 py-3 font-medium text-white shadow hover:bg-fuchsia-700 transition">Upload PDF</button>
            <button onClick={() => navigate("/tools/split")} className="w-full md:w-auto rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow hover:bg-blue-700 transition">Split Now</button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold">Use Case Biasa</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-700">
            <li>Hantar 1 bab laporan saja</li>
            <li>Buang muka depan/iklan</li>
            <li>Asing invoice per client</li>
          </ul>
        </div>

        <footer className="mt-12 flex justify-between items-center">
          <Link to="/" className="text-blue-600 hover:underline">← Balik Home</Link>
          <nav className="text-sm text-gray-600 flex gap-4">
            <Link to="/seo/merge" className="hover:underline">Merge</Link>
            <Link to="/seo/ocr" className="hover:underline">OCR</Link>
          </nav>
        </footer>
      </section>
    </main>
  );
}
