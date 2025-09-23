import { useState } from "react";
import { CloudUpload } from "lucide-react";

export default function UploadBox({ title }) {
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setFileName(file.name);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-xl shadow p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-500 mb-6">Upload your PDF to continue</p>

        <label
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="block border-2 border-dashed border-gray-400 rounded-xl p-10 hover:border-red-500 hover:bg-red-50 transition cursor-pointer"
        >
          <input type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
          <CloudUpload className="mx-auto text-red-500 mb-3" size={40} />
          <p className="text-gray-600">Drag & Drop PDF here</p>
          <p className="text-sm text-gray-400 mt-2">or click to browse files</p>
        </label>

        {fileName && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md shadow text-sm text-gray-700 flex justify-between items-center">
            <span>Selected file: <b>{fileName}</b></span>
            <button className="ml-4 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">
              Process →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
