import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

export default function PDFtoJPG() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-50">
      <Helmet>
        <title>PDF to JPG Converter Online | QuickTools</title>
        <meta name="description" content="Tukar PDF ke JPG online. Kualiti gambar jelas, sesuai untuk perkongsian pantas." />
        <meta name="keywords" content="pdf to jpg, convert pdf to jpg, pdf ke jpg" />
      </Helmet>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">PDF to JPG – Convert Sekejap</h1>
          <p className="mt-3 text-gray-600">Perfect untuk share slide/nota dalam bentuk gambar.</p>
        </header>

        <div className="mt-8 rounded-2xl border-2 border-dashed border-yellow-400 bg-white p-8 shadow-sm">
          <p className="mb-4 text-center text-gray-700">Drag & Drop PDF</p>
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center">
            <button onClick={() => navigate("/tools/pdf-to-jpg")} className="w-full md:w-auto rounded-lg bg-yellow-500 px-6 py-3 font-medium text-white shadow hover:bg-yellow-600 transition">Convert Now</button>
            <button onClick={() => navigate("/tools/convert")} className="w-full md:w-auto rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow hover:bg-blue-700 transition">More Convert</button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold">Tips</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-700">
            <li>Pilih DPI lebih tinggi untuk kualiti tajam</li>
            <li>Guna compress lepas convert kalau nak kecil</li>
          </ul>
        </div>

        <footer className="mt-12 flex justify-between items-center">
          <Link to="/" className="text-blue-600 hover:underline">← Balik Home</Link>
          <nav className="text-sm text-gray-600 flex gap-4">
            <Link to="/seo/convert" className="hover:underline">PDF Converter</Link>
            <Link to="/seo/compress" className="hover:underline">Compress</Link>
          </nav>
        </footer>
      </section>
    </main>
  );
}
