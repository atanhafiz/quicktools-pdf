import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

export default function EditPDF() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Edit PDF online – Add text, highlight, and more | QuickTools</title>
        <meta name="description" content="Edit PDF online free. Add text, highlight, shapes, and images. Fast, secure, no watermark." />
        <meta name="keywords" content="edit pdf online, annotate pdf, pdf editor, add text to pdf" />
      </Helmet>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Edit PDF online – Add text, highlight, and more</h1>
          <p className="mt-3 text-gray-600">Fast, secure, and works on any device. No registration required – 100% free to use.</p>
        </header>

        <div className="mt-8 rounded-2xl border-2 border-dashed border-sky-400 bg-white p-8 shadow-sm">
          <p className="mb-4 text-center text-gray-700">Drag & Drop your PDF files here, or click Upload to select from your device.</p>
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center">
            <button onClick={() => navigate("/tools/edit")} className="w-full md:w-auto rounded-lg bg-sky-600 px-6 py-3 font-medium text-white shadow hover:bg-sky-700 transition">Upload Files</button>
            <button onClick={() => navigate("/tools/edit")} className="w-full md:w-auto rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow hover:bg-blue-700 transition">Edit Now</button>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">How to Edit PDF Free</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-6 text-gray-700">
              <li>Open QuickTools → Edit PDF</li>
              <li>Upload your PDF file</li>
              <li>Add text, highlights, shapes</li>
              <li>Click <b>Edit Now</b> → Download result</li>
            </ol>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Editing Tools</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-700">
              <li>Add text, highlights, shapes</li>
              <li>Insert images & logos</li>
              <li>Stamp & annotations</li>
              <li>Collaborative editing</li>
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
            <Link to="/seo/ocr" className="hover:underline">OCR</Link>
            <Link to="/seo/sign" className="hover:underline">eSign</Link>
            <Link to="/seo/merge" className="hover:underline">Merge</Link>
          </nav>
        </footer>
      </section>
    </main>
  );
}
