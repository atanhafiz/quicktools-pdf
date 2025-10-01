import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

export default function PDFtoJPG() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-50">
      <Helmet>
        <title>PDF to JPG – Convert pages to images | QuickTools</title>
        <meta name="description" content="PDF to JPG online free. Convert pages to images with high quality. Fast, secure, no watermark." />
        <meta name="keywords" content="pdf to jpg, convert pdf to jpg, pdf to image, pdf converter" />
      </Helmet>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">PDF to JPG – Convert pages to images</h1>
          <p className="mt-3 text-gray-600">Fast, secure, and works on any device. No registration required – 100% free to use.</p>
        </header>

        <div className="mt-8 rounded-2xl border-2 border-dashed border-yellow-400 bg-white p-8 shadow-sm">
          <p className="mb-4 text-center text-gray-700">Drag & Drop your PDF files here, or click Upload to select from your device.</p>
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center">
            <button onClick={() => navigate("/tools/pdf-to-jpg")} className="w-full md:w-auto rounded-lg bg-yellow-500 px-6 py-3 font-medium text-white shadow hover:bg-yellow-600 transition">Upload Files</button>
            <button onClick={() => navigate("/tools/pdf-to-jpg")} className="w-full md:w-auto rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow hover:bg-blue-700 transition">Convert Now</button>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">How to Convert PDF to JPG Free</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-6 text-gray-700">
              <li>Open QuickTools → PDF to JPG</li>
              <li>Upload your PDF file</li>
              <li>Select pages to convert</li>
              <li>Click <b>Convert Now</b> → Download result</li>
            </ol>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Perfect For</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-700">
              <li>Sharing slides as images</li>
              <li>Creating thumbnails</li>
              <li>Social media posts</li>
              <li>High-quality image output</li>
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
            <Link to="/seo/convert" className="hover:underline">PDF Converter</Link>
            <Link to="/seo/compress" className="hover:underline">Compress</Link>
            <Link to="/seo/merge" className="hover:underline">Merge</Link>
          </nav>
        </footer>
      </section>
    </main>
  );
}
