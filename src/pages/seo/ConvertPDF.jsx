import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

export default function ConvertPDF() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Convert PDF to Word, JPG, PPT & more | QuickTools</title>
        <meta name="description" content="Convert PDF to Word, JPG, PPT & more online. Fast, secure, no watermark. Works on any device." />
        <meta name="keywords" content="pdf converter, pdf to word, pdf to jpg, convert pdf online, pdf to ppt" />
      </Helmet>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Convert PDF to Word, JPG, PPT & more</h1>
          <p className="mt-3 text-gray-600">Fast, secure, and works on any device. No registration required – 100% free to use.</p>
        </header>

        <div className="mt-8 rounded-2xl border-2 border-dashed border-amber-400 bg-white p-8 shadow-sm">
          <p className="mb-4 text-center text-gray-700">Drag & Drop your PDF files here, or click Upload to select from your device.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => navigate("/tools/pdf-to-word")} className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 transition">PDF → Word</button>
            <button onClick={() => navigate("/tools/pdf-to-jpg")} className="rounded-lg bg-amber-600 px-5 py-3 font-medium text-white hover:bg-amber-700 transition">PDF → JPG</button>
            <button onClick={() => navigate("/tools/pdf-to-ppt")} className="rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-700 transition">PDF → PPT</button>
            <button onClick={() => navigate("/tools/convert")} className="rounded-lg bg-purple-600 px-5 py-3 font-medium text-white hover:bg-purple-700 transition">Convert Now</button>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">How to Convert PDF Free</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-6 text-gray-700">
              <li>Open QuickTools → Convert PDF</li>
              <li>Upload your PDF file</li>
              <li>Choose output format</li>
              <li>Click <b>Convert Now</b> → Download result</li>
            </ol>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Why QuickTools?</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-700">
              <li>Free & Easy to Use</li>
              <li>Secure – Auto file deletion</li>
              <li>Works on Mobile & Desktop</li>
              <li>High Quality Conversion</li>
              <li>No Watermark</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-gray-600">
          <p>Your privacy matters – we never store your files longer than necessary.</p>
          <p className="mt-1">Files are automatically deleted after 1 hour for your security.</p>
          <p className="mt-2 font-medium">Powered by QuickTools – The easiest way to work with PDFs.</p>
        </div>

        <footer className="mt-12 flex justify-between items-center">
          <Link to="/" className="text-blue-600 hover:underline">← Back Home</Link>
          <nav className="text-sm text-gray-600 flex gap-4">
            <Link to="/seo/pdf-to-jpg" className="hover:underline">PDF to JPG</Link>
            <Link to="/seo/ocr" className="hover:underline">OCR</Link>
            <Link to="/seo/merge" className="hover:underline">Merge</Link>
          </nav>
        </footer>
      </section>
    </main>
  );
}
