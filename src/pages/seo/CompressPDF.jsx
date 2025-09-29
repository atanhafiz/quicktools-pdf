import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

export default function CompressPDF() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Compress PDF Online Free | QuickTools</title>
        <meta name="description" content="Compress PDF online percuma. Kecilkan saiz fail dengan cepat tanpa hilang kualiti." />
        <meta name="keywords" content="compress pdf, pdf compressor, reduce pdf size, kecilkan pdf, kompres pdf" />
      </Helmet>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Compress PDF Online – Reduce File Size Fast</h1>
          <p className="mt-3 text-gray-600">Kecik saiz PDF untuk senang hantar WhatsApp/Email. Free guna.</p>
        </header>

        <div className="mt-8 rounded-2xl border-2 border-dashed border-emerald-400 bg-white p-8 shadow-sm">
          <p className="mb-4 text-center text-gray-700">Drag & Drop PDF hang</p>
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center">
            <button onClick={() => navigate("/tools/compress")} className="w-full md:w-auto rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white shadow hover:bg-emerald-700 transition">Upload PDF</button>
            <button onClick={() => navigate("/tools/compress")} className="w-full md:w-auto rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow hover:bg-blue-700 transition">Compress Now</button>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Tips Kualiti</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-700">
              <li>Pilih tahap kompres ikut keperluan (Low/Medium/High)</li>
              <li>Untuk dokumen scan, guna OCR lepas kompres</li>
              <li>Sasaran <b>&lt; 2MB</b> untuk WhatsApp</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold">FAQ Ringkas</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-700">
              <li>Ada watermark? — Basic tiada watermark</li>
              <li>Privacy? — Auto delete fail dalam 1 jam</li>
              <li>Support mobile? — Ya, mobile-first</li>
            </ul>
          </div>
        </div>

        <footer className="mt-12 flex justify-between items-center">
          <Link to="/" className="text-blue-600 hover:underline">← Balik Home</Link>
          <nav className="text-sm text-gray-600 flex gap-4">
            <Link to="/seo/merge" className="hover:underline">Merge</Link>
            <Link to="/seo/split" className="hover:underline">Split</Link>
            <Link to="/seo/pdf-to-jpg" className="hover:underline">PDF to JPG</Link>
          </nav>
        </footer>
      </section>
    </main>
  );
}
