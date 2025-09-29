import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

export default function SecurePDF() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Protect / Secure PDF with Password | QuickTools</title>
        <meta name="description" content="Lindungi PDF dengan kata laluan. Encrypt & tetapan permission viewing/printing." />
        <meta name="keywords" content="secure pdf, protect pdf, password protect pdf, kunci pdf" />
      </Helmet>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Secure PDF – Password Protect</h1>
          <p className="mt-3 text-gray-600">Kunci PDF hang dengan password. Tetap permission ikut keperluan.</p>
        </header>

        <div className="mt-8 rounded-2xl border-2 border-dashed border-teal-400 bg-white p-8 shadow-sm">
          <p className="mb-4 text-center text-gray-700">Drag & Drop PDF</p>
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center">
            <button onClick={() => navigate("/tools/secure")} className="w-full md:w-auto rounded-lg bg-teal-600 px-6 py-3 font-medium text-white shadow hover:bg-teal-700 transition">Set Password</button>
            <button onClick={() => navigate("/tools/secure")} className="w-full md:w-auto rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow hover:bg-blue-700 transition">Protect Now</button>
          </div>
          <p className="mt-3 text-center text-sm text-gray-500">AES-256 encryption (server-side).</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Permission</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-700">
              <li>View only</li>
              <li>Block print</li>
              <li>Block copy</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Best Practice</h2>
            <p className="mt-3 text-gray-700">Guna password unik & jangan share public link.</p>
          </div>
        </div>

        <footer className="mt-12 flex justify-between items-center">
          <Link to="/" className="text-blue-600 hover:underline">← Balik Home</Link>
          <nav className="text-sm text-gray-600 flex gap-4">
            <Link to="/seo/unlock" className="hover:underline">Unlock</Link>
            <Link to="/seo/sign" className="hover:underline">eSign</Link>
          </nav>
        </footer>
      </section>
    </main>
  );
}
