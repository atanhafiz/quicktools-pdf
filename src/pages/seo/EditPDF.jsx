import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

export default function EditPDF() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Edit PDF Online Free | QuickTools</title>
        <meta name="description" content="Edit PDF online – tambah teks, highlight, bentuk, gambar. Mudah untuk nota & semakan." />
        <meta name="keywords" content="edit pdf online, annotate pdf, pdf editor, tambah teks pdf" />
      </Helmet>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Edit PDF – Tulis, Highlight, Anotasi</h1>
          <p className="mt-3 text-gray-600">Terus edit dalam browser. Simpan semula sebagai PDF.</p>
        </header>

        <div className="mt-8 rounded-2xl border-2 border-dashed border-sky-400 bg-white p-8 shadow-sm">
          <p className="mb-4 text-center text-gray-700">Drag & Drop PDF</p>
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center">
            <button onClick={() => navigate("/tools/edit")} className="w-full md:w-auto rounded-lg bg-sky-600 px-6 py-3 font-medium text-white shadow hover:bg-sky-700 transition">Open Editor</button>
            <button onClick={() => navigate("/tools/edit")} className="w-full md:w-auto rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow hover:bg-blue-700 transition">Start Now</button>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Tools Utama</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-700">
              <li>Teks, highlight, shape, stamp</li>
              <li>Tambah gambar/logo</li>
              <li>Redact (premium)</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Collab</h2>
            <p className="mt-3 text-gray-700">Share-link untuk anotasi ramai-ramai (premium).</p>
          </div>
        </div>

        <footer className="mt-12 flex justify-between items-center">
          <Link to="/" className="text-blue-600 hover:underline">← Balik Home</Link>
          <nav className="text-sm text-gray-600 flex gap-4">
            <Link to="/seo/ocr" className="hover:underline">OCR</Link>
            <Link to="/seo/sign" className="hover:underline">eSign</Link>
          </nav>
        </footer>
      </section>
    </main>
  );
}
