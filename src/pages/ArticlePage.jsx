import React from "react";
import { useParams, Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

export default function ArticlePage() {
  const { slug } = useParams();

  const articles = {
    "merge-pdf-online": {
      title: "How to Merge PDF Online Free",
      content: (
        <div className="space-y-4 text-gray-800 dark:text-gray-200">
          <p>
            Merging multiple PDF files into one is simple with QuickTools Tech.
          </p>
          <h3 className="text-2xl font-semibold mt-6">Steps:</h3>
          <ol className="list-decimal list-inside pl-4 space-y-1">
            <li>Go to the Merge PDF tool.</li>
            <li>Upload your PDF files.</li>
            <li>
              Click <span className="font-bold">Merge Now</span> and download
              the result.
            </li>
          </ol>
          <p>
            This method is <span className="font-semibold">fast</span>,{" "}
            <span className="font-semibold">secure</span>, and works on any
            device.
          </p>
        </div>
      ),
      ctaLabel: "Try Merge PDF Tool →",
      ctaLink: "/merge",
    },
    "convert-pdf-to-word": {
      title: "Best Free Tools to Convert PDF to Word",
      content: (
        <div className="space-y-4 text-gray-800 dark:text-gray-200">
          <p>
            Need to edit your PDF content? QuickTools PDF to Word makes it easy.
          </p>
          <h3 className="text-2xl font-semibold mt-6">Steps:</h3>
          <ol className="list-decimal list-inside pl-4 space-y-1">
            <li>Open the PDF to Word converter.</li>
            <li>Upload your PDF file.</li>
            <li>
              Click <span className="font-bold">Convert Now</span> to get an
              editable Word doc.
            </li>
          </ol>
          <p>
            Perfect for <span className="italic">students</span>,{" "}
            <span className="italic">freelancers</span>, and{" "}
            <span className="italic">professionals</span>.
          </p>
        </div>
      ),
      ctaLabel: "Use PDF → Word Converter →",
      ctaLink: "/pdf-to-word",
    },
    "ai-summarize-pdf": {
      title: "AI Tools to Summarize PDF in Seconds",
      content: (
        <div className="space-y-4 text-gray-800 dark:text-gray-200">
          <p>Long documents? Use AI Summary to save time.</p>
          <h3 className="text-2xl font-semibold mt-6">Steps:</h3>
          <ol className="list-decimal list-inside pl-4 space-y-1">
            <li>Go to the AI Summary tool.</li>
            <li>Upload your PDF file.</li>
            <li>
              Click <span className="font-bold">Generate Summary</span> to see
              the key points.
            </li>
          </ol>
          <p>
            Ideal for <span className="font-semibold">research papers</span>,{" "}
            <span className="font-semibold">reports</span>, and{" "}
            <span className="font-semibold">contracts</span>.
          </p>
        </div>
      ),
      ctaLabel: "Try AI Summary Tool →",
      ctaLink: "/ai-summary",
    },
  };

  const article = articles[slug];

  if (!article) {
    return (
      <PageWrapper title="Article Not Found">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            Article not found
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            The article you are looking for does not exist.
          </p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title={article.title}>
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {article.title}
        </h1>

        {/* Content */}
        {article.content}

        {/* CTA Button */}
        <div className="text-center mt-10">
          <Link
            to={article.ctaLink}
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition transform hover:scale-105"
          >
            {article.ctaLabel}
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
