import React, { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";

export default function FAQ() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  // Popular Q&A
  const popular = [
    {
      q: "Is QuickToolsPDF free to use?",
      a: "Yes, most tools are free. Premium features like AI OCR and eSign require Pro.",
    },
    {
      q: "Do you store my files?",
      a: "No. Files are processed securely and auto-deleted after a short period.",
    },
    {
      q: "How much is the Pro plan?",
      a: "Pro costs $9/month and includes unlimited conversions, AI tools, and eSign.",
    },
  ];

  // FAQ categories
  const faqs = [
    {
      category: "General",
      id: "general",
      items: [
        { q: "Is QuickToolsPDF free to use?", a: "Yes, most tools are free. Premium features like AI OCR and eSign require Pro." },
        { q: "Do you store my files?", a: "No. Files are processed securely and auto-deleted after a short period." },
      ],
    },
    {
      category: "Tools",
      id: "tools",
      items: [
        { q: "Can I merge unlimited PDFs?", a: "Yes, Free users can merge multiple files but with size limits. Pro users have no limits." },
        { q: "Does PDF → Word keep formatting?", a: "We use advanced converters to preserve formatting as much as possible." },
      ],
    },
    {
      category: "Pricing",
      id: "pricing",
      items: [
        { q: "How much is the Pro plan?", a: "Pro costs $9/month and includes unlimited conversions, AI tools, and eSign." },
        { q: "Do you offer Enterprise plans?", a: "Yes, Enterprise plans include API access, team management, and custom branding." },
      ],
    },
    {
      category: "Account",
      id: "account",
      items: [
        { q: "Do I need to create an account?", a: "No account is required for Free tools. An account is needed for Pro & Enterprise features." },
        { q: "Can I cancel anytime?", a: "Yes, subscriptions can be cancelled anytime without penalty." },
      ],
    },
  ];

  const filteredFaqs = faqs.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  const toggleFAQ = (q) => {
    setOpenIndex(openIndex === q ? null : q);
  };

  // Auto scroll if hash in URL (e.g. /faq#pricing)
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    }
  }, []);

  return (
    <PageWrapper title="❓ Knowledge Base - FAQ">
      {/* Popular Questions */}
      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          ⭐ Popular Questions
        </h2>
        <div className="space-y-3">
          {popular.map((item, i) => (
            <div
              key={i}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(item.q)}
                className="w-full flex justify-between items-center text-left font-medium text-gray-900 dark:text-gray-100"
              >
                {item.q}
                <span className="text-xl">{openIndex === item.q ? "−" : "+"}</span>
              </button>
              {openIndex === item.q && (
                <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-12">
        <input
          type="text"
          placeholder="Search your question..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* FAQ Categories */}
      <div className="max-w-5xl mx-auto space-y-10">
        {filteredFaqs.map(
          (cat, i) =>
            cat.items.length > 0 && (
              <div key={i} id={cat.id}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {cat.category}
                </h2>
                <div className="space-y-3">
                  {cat.items.map((item, j) => (
                    <div
                      key={j}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm"
                    >
                      <button
                        onClick={() => toggleFAQ(item.q)}
                        className="w-full flex justify-between items-center text-left font-medium text-gray-900 dark:text-gray-100"
                      >
                        {item.q}
                        <span className="text-xl">
                          {openIndex === item.q ? "−" : "+"}
                        </span>
                      </button>
                      {openIndex === item.q && (
                        <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm">{item.a}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </PageWrapper>
  );
}
