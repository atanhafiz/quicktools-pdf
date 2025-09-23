import { useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import SignatureCanvas from "react-signature-canvas";
import { Document, Page } from "react-pdf";
import { Rnd } from "react-rnd";

export default function SignPdf() {
  const sigPad = useRef(); // ✅ simpan ref signature pad
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [sigUrl, setSigUrl] = useState(null);
  const [sigPos, setSigPos] = useState({ x: 50, y: 50, width: 150, height: 50 });
  const [signedUrl, setSignedUrl] = useState(null);

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
    const reader = new FileReader();
    reader.onload = () => setPdfData(new Uint8Array(reader.result));
    reader.readAsArrayBuffer(file);
  };

  const handleSaveSignature = () => {
    if (!sigPad.current) return;
    const url = sigPad.current.getTrimmedCanvas().toDataURL("image/png");
    setSigUrl(url);
  };

  const handleApply = async () => {
    if (!pdfFile || !sigUrl) {
      alert("Upload PDF dan buat tandatangan dulu.");
      return;
    }

    const pdfBytes = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);

    const pngBytes = await fetch(sigUrl).then((res) => res.arrayBuffer());
    const sigImage = await pdfDoc.embedPng(pngBytes);

    const page = pdfDoc.getPages()[0]; // sementara page 1
    page.drawImage(sigImage, {
      x: sigPos.x,
      y: sigPos.y,
      width: sigPos.width,
      height: sigPos.height,
    });

    const newBytes = await pdfDoc.save();
    const blob = new Blob([newBytes], { type: "application/pdf" });
    setSignedUrl(URL.createObjectURL(blob));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Sign PDF</h1>

      <input type="file" accept="application/pdf" onChange={handlePdfChange} className="mb-4" />

      {/* Signature pad */}
      <SignatureCanvas
        ref={sigPad}
        penColor="black"
        canvasProps={{ width: 400, height: 150, className: "border mb-2" }}
      />
      <button
        onClick={handleSaveSignature}
        className="px-3 py-1 bg-blue-500 text-white rounded"
      >
        Save Signature
      </button>

      {/* PDF Preview with draggable signature */}
      {pdfData && (
        <div className="relative border my-4 inline-block">
          <Document file={pdfData}>
            <Page pageNumber={1} width={400} />
          </Document>

          {sigUrl && (
            <Rnd
              size={{ width: sigPos.width, height: sigPos.height }}
              position={{ x: sigPos.x, y: sigPos.y }}
              onDragStop={(e, d) => setSigPos({ ...sigPos, x: d.x, y: d.y })}
              onResizeStop={(e, dir, ref, delta, pos) =>
                setSigPos({
                  x: pos.x,
                  y: pos.y,
                  width: parseInt(ref.style.width),
                  height: parseInt(ref.style.height),
                })
              }
            >
              <img src={sigUrl} alt="Signature" className="w-full h-full" />
            </Rnd>
          )}
        </div>
      )}

      <button
        onClick={handleApply}
        className="px-4 py-2 mt-4 bg-green-600 text-white rounded"
      >
        Apply to PDF
      </button>

      {signedUrl && (
        <div className="mt-4">
          <a
            href={signedUrl}
            download="signed.pdf"
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Download Signed PDF
          </a>
        </div>
      )}
    </div>
  );
}
