import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

export default function Pricing() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Is QuickToolsPDF free to use?",
      a: "Yes, most tools are free. Premium features like AI-based OCR and eSign workflow require a Pro subscription.",
    },
    {
      q: "Do you store my files?",
      a: "No. All files are processed securely and automatically deleted after a short period. Your privacy is guaranteed.",
    },
    {
      q: "Can I use QuickToolsPDF on my phone?",
      a: "Yes! Our platform is fully mobile-friendly. You can upload and process files directly from your phone or tablet.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept credit cards, PayPal, and enterprise invoicing for custom plans.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <PageWrapper title="💰 Pricing Plans">
      {/* Pricing Table */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
          Choose a plan that fits your needs. Upgrade anytime.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition p-8">
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Free</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Perfect for personal use.</p>
            <p className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-6">$0</p>
            <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-2 mb-6 text-left">
              <li>✅ Merge, Split, Rotate</li>
              <li>✅ PDF → Word (basic)</li>
              <li>✅ Protect & Unlock</li>
              <li>❌ Limited AI features</li>
            </ul>
            <Link
              to="/tools"
              className="w-full block py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition p-8 border-4 border-blue-500 scale-105">
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Pro</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">For professionals & businesses.</p>
            <p className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-6">
              $9<span className="text-lg">/mo</span>
            </p>
            <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-2 mb-6 text-left">
              <li>✅ All Free features</li>
              <li>✅ Unlimited conversions</li>
              <li>✅ Advanced AI tools</li>
              <li>✅ eSign workflow</li>
              <li>✅ Priority support</li>
            </ul>
            <Link
              to="/pricing"
              className="w-full block py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
            >
              Upgrade to Pro →
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition p-8">
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Enterprise</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">For large teams & organizations.</p>
            <p className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-6">Custom</p>
            <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-2 mb-6 text-left">
              <li>✅ All Pro features</li>
              <li>✅ Team management</li>
              <li>✅ API access</li>
              <li>✅ Custom branding</li>
              <li>✅ Dedicated support manager</li>
            </ul>
            <Link
              to="/contact"
              className="w-full block py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-bold rounded-lg transition"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="max-w-4xl mx-auto mt-20">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
          ❓ Frequently Asked Questions
        </h2>
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
    </PageWrapper>
  );
}
