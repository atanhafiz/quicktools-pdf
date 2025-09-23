import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

// Config worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PdfToImage() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleConvert = async () => {
    if (!file) {
      alert("Please upload a PDF first.");
      return;
    }

    setLoading(true);
    setImages([]);

    const fileReader = new FileReader();
    fileReader.onload = async function () {
      const typedArray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;

      const imageList = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 }); // scale lebih tinggi = kualiti lebih bagus
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;

        const imgUrl = canvas.toDataURL("image/png");
        imageList.push({ page: i, url: imgUrl });
      }

      setImages(imageList);
      setLoading(false);
    };
    fileReader.readAsArrayBuffer(file);
  };

  const handleDownload = (imgUrl, index) => {
    const a = document.createElement("a");
    a.href = imgUrl;
    a.download = `page-${index + 1}.png`;
    a.click();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">PDF → Image</h1>
        <p className="text-gray-500 mb-6">
          Upload a PDF and convert each page to an image
        </p>

        <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-4" />

        <button
          onClick={handleConvert}
          disabled={loading}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          {loading ? "Processing..." : "Convert to Images"}
        </button>

        {images.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {images.map((img, idx) => (
              <div key={idx} className="border p-2 rounded">
                <p className="text-sm mb-2">Page {img.page}</p>
                <img src={img.url} alt={`Page ${img.page}`} className="w-full border mb-2" />
                <button
                  onClick={() => handleDownload(img.url, idx)}
                  className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600 text-sm"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
