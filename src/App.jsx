import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";
import Navbar from "./components/Navbar";
import ToolsHub from "./ToolsHub";

// ====== EDIT ======
import MergePdf from "./edit/MergePdf";
import SplitPdf from "./edit/SplitPdf";
import RotatePdf from "./edit/RotatePdf";
import DeletePagesPdf from "./edit/DeletePagesPdf";
import OrganizePdf from "./edit/OrganizePdf";

// ====== CONVERT ======
import PdfToWord from "./convert/PdfToWord";
import PdfToExcel from "./convert/PdfToExcel";
import PdfToPpt from "./convert/PdfToPpt";
import PdfToImage from "./convert/PdfToImage";
import ImageToPdf from "./convert/ImageToPdf";
import WordToPdf from "./convert/WordToPdf";

// ====== SECURE ======
import ProtectPdf from "./secure/ProtectPdf";
import UnlockPdf from "./secure/UnlockPdf";
import SignPdf from "./secure/SignPdf";
import WatermarkPdf from "./secure/WatermarkPdf";
import EsignFlow from "./secure/EsignFlow";

// ====== SMART AI ======
import OcrPdf from "./smartai/OcrPdf";
import AiSummary from "./smartai/AiSummary";
import FormFiller from "./smartai/FormFiller";

// ====== PAGES ======
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ToolsHub />} />

          {/* EDIT */}
          <Route path="/merge" element={<MergePdf />} />
          <Route path="/split" element={<SplitPdf />} />
          <Route path="/rotate" element={<RotatePdf />} />
          <Route path="/delete" element={<DeletePagesPdf />} />
          <Route path="/organize" element={<OrganizePdf />} />

          {/* CONVERT */}
          <Route path="/pdf-to-word" element={<PdfToWord />} />
          <Route path="/pdf-to-excel" element={<PdfToExcel />} />
          <Route path="/pdf-to-ppt" element={<PdfToPpt />} />
          <Route path="/pdf-to-image" element={<PdfToImage />} />
          <Route path="/image-to-pdf" element={<ImageToPdf />} />
          <Route path="/word-to-pdf" element={<WordToPdf />} />

          {/* SECURE */}
          <Route path="/protect" element={<ProtectPdf />} />
          <Route path="/unlock" element={<UnlockPdf />} />
          <Route path="/sign" element={<SignPdf />} />
          <Route path="/watermark" element={<WatermarkPdf />} />
          <Route path="/esign" element={<EsignFlow />} />

          {/* SMART AI */}
          <Route path="/ocr" element={<OcrPdf />} />
          <Route path="/ai-summary" element={<AiSummary />} />
          <Route path="/form-filler" element={<FormFiller />} />

          {/* PAGES */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
