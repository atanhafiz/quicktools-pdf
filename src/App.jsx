// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import React, { Suspense } from "react";

// ====== MAIN PAGES ======
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import DashboardEdit from "./pages/DashboardEdit";
import DashboardConvert from "./pages/DashboardConvert";
import DashboardSecure from "./pages/DashboardSecure";
import DashboardSmartAI from "./pages/DashboardSmartAI";
import ToolsHub from "./ToolsHub";
import Blog from "./pages/Blog";
import ArticlePage from "./pages/ArticlePage";

// ====== TOOLS ======
import MergePdf from "./edit/MergePdf";
import CompressPdf from "./edit/CompressPdf";   // ✅ baru
import SplitPdf from "./edit/SplitPdf";
import RotatePdf from "./edit/RotatePdf";
import DeletePagesPdf from "./edit/DeletePagesPdf";
import OrganizePdf from "./edit/OrganizePdf";
import PdfToWord from "./convert/PdfToWord";
import PdfToExcel from "./convert/PdfToExcel";
import PdfToPpt from "./convert/PdfToPpt";
import PdfToImage from "./convert/PdfToImage";
import ImageToPdf from "./convert/ImageToPdf";
import WordToPdf from "./convert/WordToPdf";
import ProtectPdf from "./secure/ProtectPdf";
import UnlockPdf from "./secure/UnlockPdf";
import SignPdf from "./secure/SignPdf";
import WatermarkPdf from "./secure/WatermarkPdf";
import EsignFlow from "./secure/EsignFlow";
import OcrPdf from "./smartai/OcrPdf";
import AiSummary from "./smartai/AiSummary";
import FormFiller from "./smartai/FormFiller";

// ====== EXTRA PAGES ======
import Contact from "./pages/Contact";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Pricing from "./pages/Pricing";

// ====== SEO PAGES ======
import { 
  MergePDF, CompressPDF, SplitPDF, ConvertPDF, OCRPDF,
  SignPDF, EditPDF, SecurePDF, UnlockPDF, PDFtoJPG
} from "./pages/seo";

// ====== DEMO TOOLSHUB (Dev Only) ======
let DemoRoutes = null;
if (process.env.NODE_ENV !== "production") {
  const EditToolsDemo = React.lazy(() => import("./pages/demo/EditToolsDemo.jsx"));
  const ConvertToolsDemo = React.lazy(() => import("./pages/demo/ConvertToolsDemo.jsx"));
  const SecureToolsDemo = React.lazy(() => import("./pages/demo/SecureToolsDemo.jsx"));
  const SmartAIToolsDemo = React.lazy(() => import("./pages/demo/SmartAIToolsDemo.jsx"));
  const ToolsDemoHub = React.lazy(() => import("./pages/demo/ToolsDemoHub.jsx"));

  DemoRoutes = (
    <>
      <Route path="/edit-demo" element={<Suspense fallback={<div>Loading...</div>}><EditToolsDemo /></Suspense>} />
      <Route path="/convert-demo" element={<Suspense fallback={<div>Loading...</div>}><ConvertToolsDemo /></Suspense>} />
      <Route path="/secure-demo" element={<Suspense fallback={<div>Loading...</div>}><SecureToolsDemo /></Suspense>} />
      <Route path="/smartai-demo" element={<Suspense fallback={<div>Loading...</div>}><SmartAIToolsDemo /></Suspense>} />
      <Route path="/demo-hub" element={<Suspense fallback={<div>Loading...</div>}><ToolsDemoHub /></Suspense>} />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* LANDING */}
              <Route path="/" element={<Landing />} />
              <Route path="/tools" element={<ToolsHub />} />

              {/* BLOG */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<ArticlePage />} />

              {/* DASHBOARD */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/edit" element={<DashboardEdit />} />
              <Route path="/dashboard/convert" element={<DashboardConvert />} />
              <Route path="/dashboard/secure" element={<DashboardSecure />} />
              <Route path="/dashboard/smartai" element={<DashboardSmartAI />} />

              {/* EDIT TOOLS */}
              <Route path="/merge" element={<MergePdf />} />
              <Route path="/compress" element={<CompressPdf />} />   {/* ✅ baru */}
              <Route path="/split" element={<SplitPdf />} />
              <Route path="/rotate" element={<RotatePdf />} />
              <Route path="/delete" element={<DeletePagesPdf />} />
              <Route path="/organize" element={<OrganizePdf />} />

              {/* CONVERT TOOLS */}
              <Route path="/pdf-to-word" element={<PdfToWord />} />
              <Route path="/pdf-to-excel" element={<PdfToExcel />} />
              <Route path="/pdf-to-ppt" element={<PdfToPpt />} />
              <Route path="/pdf-to-image" element={<PdfToImage />} />
              <Route path="/image-to-pdf" element={<ImageToPdf />} />
              <Route path="/word-to-pdf" element={<WordToPdf />} />

              {/* SECURE TOOLS */}
              <Route path="/protect" element={<ProtectPdf />} />
              <Route path="/unlock" element={<UnlockPdf />} />
              <Route path="/sign" element={<SignPdf />} />
              <Route path="/watermark" element={<WatermarkPdf />} />
              <Route path="/esign" element={<EsignFlow />} />

              {/* SMART AI TOOLS */}
              <Route path="/ocr" element={<OcrPdf />} />
              <Route path="/ai-summary" element={<AiSummary />} />
              <Route path="/form-filler" element={<FormFiller />} />

              {/* EXTRA */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/pricing" element={<Pricing />} />

              {/* SEO ROUTES */}
              <Route path="/seo/merge" element={<MergePDF />} />
              <Route path="/seo/compress" element={<CompressPDF />} />
              <Route path="/seo/split" element={<SplitPDF />} />
              <Route path="/seo/convert" element={<ConvertPDF />} />
              <Route path="/seo/ocr" element={<OCRPDF />} />
              <Route path="/seo/sign" element={<SignPDF />} />
              <Route path="/seo/edit" element={<EditPDF />} />
              <Route path="/seo/secure" element={<SecurePDF />} />
              <Route path="/seo/unlock" element={<UnlockPDF />} />
              <Route path="/seo/pdf-to-jpg" element={<PDFtoJPG />} />

              {/* DEMO ROUTES (Dev Only) */}
              {DemoRoutes}

              {/* CATCH-ALL 404 → Redirect Landing */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
