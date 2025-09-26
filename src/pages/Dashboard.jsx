import React from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import Testimonials from "../components/Testimonials";
import StatsCounter from "../components/StatsCounter";
import { FaEdit, FaExchangeAlt, FaLock, FaRobot } from "react-icons/fa";

export default function Dashboard() {
  return (
    <PageWrapper title="⚡ QuickTools Dashboard">
      {/* Intro */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Manage Your PDFs in One Place
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Access Edit, Convert, Secure, and AI-powered tools — all in a clean, intuitive dashboard.
        </p>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-20">
        <Link to="/dashboard/edit" className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all p-6 text-center">
          <FaEdit className="text-4xl text-blue-500 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Edit PDF</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Merge, split, rotate & organize your PDFs.</p>
        </Link>

        <Link to="/dashboard/convert" className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all p-6 text-center">
          <FaExchangeAlt className="text-4xl text-green-500 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Convert PDF</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">PDF ↔ Word, Excel, PPT, Image & more.</p>
        </Link>

        <Link to="/dashboard/secure" className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all p-6 text-center">
          <FaLock className="text-4xl text-red-500 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Secure PDF</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Protect, unlock, sign & watermark your PDFs.</p>
        </Link>

        <Link to="/dashboard/smartai" className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all p-6 text-center">
          <FaRobot className="text-4xl text-purple-500 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Smart AI</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">OCR, summaries & AI-powered automation.</p>
        </Link>
      </div>

      {/* Stats Counter */}
      <StatsCounter files={20000000} users={500000} uptime={99.9} countries={120} />

      {/* Testimonials */}
      <div className="mt-16">
        <Testimonials />
      </div>
    </PageWrapper>
  );
}
