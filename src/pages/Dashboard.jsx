import React from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import Testimonials from "../components/Testimonials";
import StatsCounter from "../components/StatsCounter";

export default function Dashboard() {
  return (
    <PageWrapper title="⚡ QuickTools Dashboard">
      <p className="text-center mb-12 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
        Manage all your PDF tools in one clean dashboard. Access Edit, Convert, Secure, and AI tools quickly & efficiently.
      </p>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-20">
        <Link
          to="/dashboard/edit"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all p-6 text-center"
        >
          <div className="text-4xl mb-3">✂️</div>
          <h3 className="text-xl font-bold mb-2">Edit PDF</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Merge, split, rotate & organize your PDFs.
          </p>
        </Link>

        <Link
          to="/dashboard/convert"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all p-6 text-center"
        >
          <div className="text-4xl mb-3">🔄</div>
          <h3 className="text-xl font-bold mb-2">Convert PDF</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Convert PDFs to Word, Excel, PPT & more.
          </p>
        </Link>

        <Link
          to="/dashboard/secure"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all p-6 text-center"
        >
          <div className="text-4xl mb-3">🔐</div>
          <h3 className="text-xl font-bold mb-2">Secure PDF</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Protect, unlock, sign & watermark your PDFs.
          </p>
        </Link>

        <Link
          to="/dashboard/smartai"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all p-6 text-center"
        >
          <div className="text-4xl mb-3">🤖</div>
          <h3 className="text-xl font-bold mb-2">Smart AI</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            OCR, summaries & AI-powered automation.
          </p>
        </Link>
      </div>

      {/* Stats Counter with props */}
      <StatsCounter 
        files={20000000}   // 20M files
        users={500000}     // 500k users
        uptime={99.9}
        countries={120}
      />

      {/* Testimonials */}
      <Testimonials />
    </PageWrapper>
  );
}
