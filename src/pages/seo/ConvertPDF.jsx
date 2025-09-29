import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

export default function ConvertPDF() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-50">
      <Helmet>
        <title>PDF Converter (Word/JPG/PNG) Online | QuickTools</title>
        <meta name="description" content="Convert PDF ke Word, JPG, PNG online. Senang, tepat, laju." />
        <meta name="keywords" content="pdf converter, pdf to word, pdf to jpg, convert pdf online, tukar pdf" />
      </Helmet>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">PDF Converter – Word, JPG, PNG</h1>
          <p className="mt-3 text-gray-600">Tukar format dokumen ikut keperluan kerja hang. Click click siap.</p>
        </header>

        <div className="mt-8 rounded-2xl border-2 border-dashed border-amber-400 bg-white p-8 shadow-sm">
          <p className="mb-4 text-center text-gray-700">Drag & Drop PDF</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => navigate("/tools/pdf-to-word")} className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700">PDF → Word</button>
            <button onClick={() => navigate("/tools/pdf-to-jpg")} className="rounded-lg bg-amber-600 px-5 py-3 font-medium text-white hover:bg-amber-700">PDF → JPG</button>
            <button onClick={() => navigate("/tools/pdf-to-png")} className="rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-700">PDF → PNG</button>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Kualiti & Formatting</h2>
            <p className="mt-3 text-gray-700">Jaga layout sewaktu convert. Untuk scan, disyorkan guna OCR dulu.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Automation</h2>
            <p className="mt-3 text-gray-700">Buat batch convert untuk banyak fail (feature premium).</p>
          </div>
        </div>

        <footer className="mt-12 flex justify-between items-center">
          <Link to="/" className="text-blue-600 hover:underline">← Balik Home</Link>
          <nav className="text-sm text-gray-600 flex gap-4">
            <Link to="/seo/pdf-to-jpg" className="hover:underline">PDF to JPG</Link>
            <Link to="/seo/ocr" className="hover:underline">OCR</Link>
          </nav>
        </footer>
      </section>
    </main>
  );
}
