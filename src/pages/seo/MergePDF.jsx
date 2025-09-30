import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

export default function MergePDF() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Merge PDF Online Free | QuickTools</title>
        <meta name="description" content="Merge PDF online free. Fast, secure, no watermark. Mobile & desktop ready." />
        <meta name="keywords" content="merge pdf, pdf merge online, combine pdf, pdf joiner, merge pdf files" />
      </Helmet>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Merge multiple PDF files into one document</h1>
          <p className="mt-3 text-gray-600">Fast, secure, and works on any device. No registration required – 100% free to use.</p>
        </header>

        <div className="mt-8 rounded-2xl border-2 border-dashed border-blue-400 bg-white p-8 shadow-sm">
          <p className="mb-4 text-center text-gray-700">Drag & Drop your PDF files here, or click Upload to select from your device.</p>
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center">
            <button
              onClick={() => navigate("/tools/merge")}
              className="w-full md:w-auto rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow hover:bg-blue-700 transition"
            >
              Upload Files
            </button>
            <button
              onClick={() => navigate("/tools/merge")}
              className="w-full md:w-auto rounded-lg bg-green-600 px-6 py-3 font-medium text-white shadow hover:bg-green-700 transition"
            >
              Merge Now
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">How to Merge PDF Free</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-6 text-gray-700">
              <li>Open QuickTools → Merge PDF</li>
              <li>Upload all PDF files</li>
              <li>Click <b>Merge Now</b> → Download ready</li>
            </ol>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Why QuickTools?</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-700">
              <li>Free & Easy to Use</li>
              <li>Secure – Auto file deletion</li>
              <li>Works on Mobile & Desktop</li>
            </ul>
          </div>
        </div>

        <footer className="mt-12 flex flex-wrap items-center justify-between gap-3">
          <Link to="/" className="text-blue-600 hover:underline">← Back Home</Link>
          <nav className="text-sm text-gray-600 flex gap-4">
            <Link to="/seo/split" className="hover:underline">Split</Link>
            <Link to="/seo/compress" className="hover:underline">Compress</Link>
          </nav>
        </footer>
      </section>
    </main>
  );
}
