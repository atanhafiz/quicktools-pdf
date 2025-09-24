import React, { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Is QuickToolsPDF free to use?",
      a: "Yes, most of our tools are free. Premium features like AI-based OCR and eSign workflow may require a subscription.",
    },
    {
      q: "Do my files stay private?",
      a: "Absolutely. Your files are processed securely and automatically deleted after a short period. We never store your documents.",
    },
    {
      q: "Can I use QuickToolsPDF on my phone?",
      a: "Yes, our platform is mobile-friendly. You can upload and process files directly from your smartphone or tablet.",
    },
    {
      q: "How fast is the conversion?",
      a: "Most conversions are completed within seconds. Larger files may take a bit longer depending on your internet speed.",
    },
    {
      q: "Do you offer support?",
      a: "Yes, you can reach out via our Contact page or email us at support@quicktools.ai.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-8 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          ❓ Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-gray-200 dark:border-gray-700 pb-3">
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-900 dark:text-gray-100 focus:outline-none"
              >
                {faq.q}
                <span className="text-xl">{openIndex === i ? "−" : "+"}</span>
              </button>
              {openIndex === i && (
                <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
