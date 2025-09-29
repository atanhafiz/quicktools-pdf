import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

export default function OCRPDF() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-50">
      <Helmet>
        <title>OCR PDF Online (Teks Boleh Cari) | QuickTools</title>
        <meta name="description" content="OCR PDF online untuk tukar gambar/scan jadi teks yang boleh dicari & disalin." />
        <meta name="keywords" content="ocr pdf online, convert image to pdf with ocr, text recognition, scan to text" />
      </Helmet>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">OCR PDF – Tukar Scan Jadi Teks</h1>
          <p className="mt-3 text-gray-600">Gambar → Teks yang boleh cari/copy. Sokong multi-bahasa.</p>
        </header>

        <div className="mt-8 rounded-2xl border-2 border-dashed border-purple-400 bg-white p-8 shadow-sm">
          <p className="mb-4 text-center text-gray-700">Drag & Drop PDF/IMEJ</p>
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center">
            <button onClick={() => navigate("/tools/ocr")} className="w-full md:w-auto rounded-lg bg-purple-600 px-6 py-3 font-medium text-white shadow hover:bg-purple-700 transition">Upload & OCR</button>
            <button onClick={() => navigate("/tools/ocr")} className="w-full md:w-auto rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow hover:bg-blue-700 transition">Start Now</button>
          </div>
          <p className="mt-3 text-center text-sm text-gray-500">AI OCR premium: ketepatan lebih tinggi + layout terpelihara.</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Sesuai Untuk</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-700">
              <li>Invoice, resit, borang scan</li>
              <li>Nota kelas & dokumen lama</li>
              <li>Carian teks pantas</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Tips Ketepatan</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-700">
              <li>Gambar jelas, tak blur</li>
              <li>Pilih bahasa yang betul</li>
              <li>Guna “Deskew” kalau senget (premium)</li>
            </ul>
          </div>
        </div>

        <footer className="mt-12 flex justify-between items-center">
          <Link to="/" className="text-blue-600 hover:underline">← Balik Home</Link>
          <nav className="text-sm text-gray-600 flex gap-4">
            <Link to="/seo/convert" className="hover:underline">Convert</Link>
            <Link to="/seo/edit" className="hover:underline">Edit</Link>
          </nav>
        </footer>
      </section>
    </main>
  );
}
