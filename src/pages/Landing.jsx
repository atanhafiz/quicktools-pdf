import React from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import BrowserMockup from "../components/BrowserMockup";

export default function Landing() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        {/* Left: Text */}
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            All-in-One <span className="text-blue-600 dark:text-blue-400">PDF</span> & AI Toolkit
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 mb-8">
            Edit, convert, secure, and enhance your documents instantly.  
            Trusted by students, professionals, and businesses worldwide.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
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
        </div>

        {/* Right: Screenshot Mockup (ToolsHub) */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
            <BrowserMockup image="/images/toolshub.png" />
          </div>
        </div>
      </div>

      {/* Features Highlight */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
        {[
          { icon: "✂️", title: "Edit PDF", desc: "Merge, split, rotate, and organize your PDFs easily." },
          { icon: "🔄", title: "Convert", desc: "PDF to Word, Excel, PPT, Image, and vice versa." },
          { icon: "🔐", title: "Secure", desc: "Protect with password, unlock, sign, and watermark." },
          { icon: "🤖", title: "Smart AI", desc: "OCR, summaries, and AI-powered form filling." },
        ].map((f, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition p-6 text-center sm:text-left"
          >
            <div className="text-4xl mb-3">{f.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{f.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* 2nd Mockup Section: Dashboard Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 max-w-6xl mx-auto">
        {/* Left: Screenshot Mockup (Dashboard) */}
        <div className="flex justify-center lg:justify-start">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
            <BrowserMockup image="/images/dashboard.png" />
          </div>
        </div>

        {/* Right: Text */}
        <div className="text-center lg:text-left flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            ⚡ Powerful Dashboard
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Manage all your PDF tasks in one clean dashboard.  
            Access Edit, Convert, Secure, and AI tools in just a click.
          </p>
          <Link
            to="/dashboard"
            className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg transition mx-auto lg:mx-0"
          >
            Open Dashboard →
          </Link>
        </div>
      </div>

      {/* 3rd Mockup Section: Pricing Preview */}
      <div className="max-w-6xl mx-auto mb-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-10">
          💰 Simple Pricing for Everyone
        </h2>
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

      {/* Testimonials */}
      <div className="max-w-6xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-10 text-center">
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
      <div className="w-full max-w-5xl bg-blue-600 dark:bg-blue-700 rounded-2xl shadow-xl p-10 text-center text-white mx-auto">
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
    </PageWrapper>
  );
}
