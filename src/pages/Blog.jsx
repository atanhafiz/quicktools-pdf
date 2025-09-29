import React from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

function Blog() {
  const articles = [
    {
      slug: "merge-pdf-online",
      title: "How to Merge PDF Online Free",
      excerpt:
        "Step-by-step guide on how to merge multiple PDF files into one. Fast, secure, and works on any device.",
    },
    {
      slug: "convert-pdf-to-word",
      title: "Best Free Tools to Convert PDF to Word",
      excerpt:
        "Learn how to convert your PDFs into editable Word documents instantly with QuickTools Tech.",
    },
    {
      slug: "ai-summarize-pdf",
      title: "AI Tools to Summarize PDF in Seconds",
      excerpt:
        "Discover how QuickTools AI can summarize long PDF documents into short, clear key points.",
    },
  ];

  return (
    <PageWrapper title="📚 Blog – QuickTools Tech">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-12 text-center">
          📚 QuickTools Blog
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto mb-16">
          Read tutorials, guides, and tips on how to use QuickTools to manage
          your PDF files faster, smarter, and with the power of AI.
        </p>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((a, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold text-blue-600 mb-3">
                  {a.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-6">
                  {a.excerpt}
                </p>
              </div>
              <Link
                to={`/blog/${a.slug}`}
                className="text-blue-500 font-semibold hover:underline self-start"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

export default Blog;
