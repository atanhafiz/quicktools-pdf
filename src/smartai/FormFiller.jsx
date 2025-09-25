import React, { useState } from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";

// Dummy Form Filler: simulate auto fill PDF form
const processFiles = async (files, setProgress, fields) => {
  setProgress(20);
  await new Promise((r) => setTimeout(r, 1000));
  setProgress(70);

  // Simulate output filled PDF
  const file = files[0];
  const arrayBuffer = await file.arrayBuffer();
  const blob = new Blob([arrayBuffer], { type: "application/pdf" });

  setProgress(100);
  return URL.createObjectURL(blob);
};

export default function FormFiller() {
  const [fields, setFields] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleProcess = (files, setProgress) => {
    return processFiles(files, setProgress, fields);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📝 Form Filler</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Automatically fill PDF forms using AI assistance.
      </p>

      {/* Example input fields */}
      <div className="flex flex-col gap-3 mb-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={fields.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={fields.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <PdfToolWrapper
        title="Form Filler"
        description="Fill PDF forms automatically with AI"
        actionLabel="Fill Form"
        processFiles={handleProcess}
        multiple={false}
        outputName="filled-form.pdf"
        accept=".pdf"
      />
    </div>
  );
}
