import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex flex-col items-center text-center px-6">
      {/* Hero */}
      <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
        All-in-One <span className="text-blue-600 dark:text-blue-400">PDF</span> & AI Toolkit
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mb-8">
        Edit, convert, secure, and enhance your documents instantly.  
        Trusted by students, professionals, and businesses worldwide.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/tools"
          className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg transition"
        >
          🚀 Start Free
        </Link>
        <Link
          to="/pricing"
          className="px-8 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-bold shadow-lg transition"
        >
          💰 See Pricing
        </Link>
      </div>

      {/* Features Highlight */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-6xl w-full">
        {[
          { icon: "✂️", title: "Edit PDF", desc: "Merge, split, rotate, and organize your PDFs easily." },
          { icon: "🔄", title: "Convert", desc: "PDF to Word, Excel, PPT, Image, and vice versa." },
          { icon: "🔐", title: "Secure", desc: "Protect with password, unlock, sign, and watermark." },
          { icon: "🤖", title: "Smart AI", desc: "OCR, summaries, and AI-powered form filling." },
        ].map((f, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition p-6 text-left"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {f.icon} {f.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="max-w-6xl w-full mt-20">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-10">
          💬 What Our Users Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah J.",
              role: "University Student",
              feedback:
                "QuickToolsPDF saved me hours during my thesis. The PDF to Word tool is a lifesaver!",
              stars: 5,
            },
            {
              name: "Michael K.",
              role: "Freelancer",
              feedback:
                "I use the compress and merge tools daily. Simple, fast, and reliable.",
              stars: 5,
            },
            {
              name: "Aisha R.",
              role: "Project Manager",
              feedback:
                "Our team uses the eSign workflow — it streamlined our approvals. Highly recommend!",
              stars: 4,
            },
          ].map((t, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition p-6 text-left"
            >
              <div className="flex items-center mb-3">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <span key={j} className="text-yellow-400 text-lg">★</span>
                ))}
                {Array.from({ length: 5 - t.stars }).map((_, j) => (
                  <span key={j} className="text-gray-300 dark:text-gray-600 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">{t.feedback}</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">{t.name}</p>
              <p className="text-gray-600 dark:text-gray-400 text-xs">{t.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA Banner */}
      <div className="w-full max-w-5xl bg-blue-600 dark:bg-blue-700 rounded-2xl shadow-xl mt-20 p-10 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Productivity?</h2>
        <p className="mb-6 text-lg">
          Join thousands of users who trust QuickToolsPDF to simplify their document workflow.
        </p>
        <Link
          to="/tools"
          className="px-10 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          🚀 Get Started Free
        </Link>
      </div>
    </div>
  );
}
