import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

export default function SignPDF() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-50">
      <Helmet>
        <title>eSign PDF – Sign documents online securely | QuickTools</title>
        <meta name="description" content="eSign PDF online free. Sign documents online securely with digital signatures. Fast, secure, no watermark." />
        <meta name="keywords" content="esign pdf, sign pdf online, electronic signature pdf, digital signature" />
      </Helmet>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">eSign PDF – Sign documents online securely</h1>
          <p className="mt-3 text-gray-600">Fast, secure, and works on any device. No registration required – 100% free to use.</p>
        </header>

        <div className="mt-8 rounded-2xl border-2 border-dashed border-rose-400 bg-white p-8 shadow-sm">
          <p className="mb-4 text-center text-gray-700">Drag & Drop your PDF files here, or click Upload to select from your device.</p>
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center">
            <button onClick={() => navigate("/tools/sign")} className="w-full md:w-auto rounded-lg bg-rose-600 px-6 py-3 font-medium text-white shadow hover:bg-rose-700 transition">Upload Files</button>
            <button onClick={() => navigate("/tools/sign")} className="w-full md:w-auto rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow hover:bg-blue-700 transition">Sign Now</button>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">How to eSign PDF Free</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-6 text-gray-700">
              <li>Open QuickTools → eSign PDF</li>
              <li>Upload your PDF document</li>
              <li>Add your signature</li>
              <li>Click <b>Sign Now</b> → Download result</li>
            </ol>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Perfect For</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-700">
              <li>Contracts, agreements, proposals</li>
              <li>HR forms & approvals</li>
              <li>Business documents</li>
              <li>Legal paperwork</li>
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
            <Link to="/seo/secure" className="hover:underline">Secure</Link>
            <Link to="/seo/unlock" className="hover:underline">Unlock</Link>
            <Link to="/seo/edit" className="hover:underline">Edit</Link>
          </nav>
        </footer>
      </section>
    </main>
  );
}
