import React from "react";
import PdfToolWrapper from "../components/PdfToolWrapper";

// Dummy AI Summary: simulate summary
const processFiles = async (files, setProgress) => {
  setProgress(25);
  await new Promise((r) => setTimeout(r, 1000));
  setProgress(60);

  // Simulate output summary text
  const summary = "This is an AI-generated summary of the PDF content (dummy).";
  const blob = new Blob([summary], { type: "text/plain" });

  setProgress(100);
  return URL.createObjectURL(blob);
};

export default function AiSummary() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🤖 AI Summary</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Generate an automatic summary of your PDF content.
      </p>

      <PdfToolWrapper
        title="AI Summary"
        description="Summarize your PDF into short key points using AI"
        actionLabel="Generate Summary"
        processFiles={processFiles}
        multiple={false}
        outputName="summary.txt"
        accept=".pdf"
      />
    </div>
  );
}
