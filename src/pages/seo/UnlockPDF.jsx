import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

export default function UnlockPDF() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Unlock PDF / Remove Password | QuickTools</title>
        <meta name="description" content="Buka kunci PDF (dengan kebenaran) untuk kegunaan semula. Hormati hak & polisi dokumen." />
        <meta name="keywords" content="unlock pdf, remove pdf password, buka kunci pdf" />
      </Helmet>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Unlock PDF – Remove Password</h1>
          <p className="mt-3 text-gray-600">Guna hanya untuk dokumen milik hang / ada izin. Patuh undang-undang.</p>
        </header>

        <div className="mt-8 rounded-2xl border-2 border-dashed border-red-400 bg-white p-8 shadow-sm">
          <p className="mb-4 text-center text-gray-700">Drag & Drop PDF berkunci</p>
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center">
            <button onClick={() => navigate("/tools/unlock")} className="w-full md:w-auto rounded-lg bg-red-600 px-6 py-3 font-medium text-white shadow hover:bg-red-700 transition">Unlock Now</button>
            <button onClick={() => navigate("/tools/secure")} className="w-full md:w-auto rounded-lg bg-gray-800 px-6 py-3 font-medium text-white shadow hover:bg-gray-900 transition">Set Semula Password</button>
          </div>
          <p className="mt-3 text-center text-sm text-gray-500">Kita tak sokong bypass DRM / dokumen terlindung undang-undang.</p>
        </div>

        <footer className="mt-12 flex justify-between items-center">
          <Link to="/" className="text-blue-600 hover:underline">← Balik Home</Link>
          <nav className="text-sm text-gray-600 flex gap-4">
            <Link to="/seo/secure" className="hover:underline">Secure</Link>
            <Link to="/seo/merge" className="hover:underline">Merge</Link>
          </nav>
        </footer>
      </section>
    </main>
  );
}
