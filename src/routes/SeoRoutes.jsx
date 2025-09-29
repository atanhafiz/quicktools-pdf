import { Routes, Route } from "react-router-dom";
import {
  MergePDF, CompressPDF, SplitPDF, ConvertPDF, OCRPDF,
  SignPDF, EditPDF, SecurePDF, UnlockPDF, PDFtoJPG
} from "@/pages/seo";

export default function SeoRoutes() {
  return (
    <Routes>
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
    </Routes>
  );
}
