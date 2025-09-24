import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-16 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Brand */}
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-gray-100">
            QuickTools<span className="text-blue-500">PDF</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Your all-in-one PDF & AI toolkit.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            Quick Links
          </h3>
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/tools" className="hover:text-blue-500">Tools Hub</Link>
          <Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link>
          <Link to="/pricing" className="hover:text-blue-500">Pricing</Link>
          <Link to="/about" className="hover:text-blue-500">About</Link>
          <Link to="/contact" className="hover:text-blue-500">Contact</Link>
          <Link to="/faq" className="hover:text-blue-500">FAQ</Link>
        </div>

        {/* Note */}
        <div className="sm:text-right text-sm flex flex-col justify-center">
          <p>© {new Date().getFullYear()} QuickToolsPDF</p>
          <p className="mt-1">Made with ❤️ by Team QuickTools</p>
        </div>
      </div>
    </footer>
  );
}
