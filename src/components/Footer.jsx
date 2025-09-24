import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email address.");
      return;
    }
    // 🚀 TODO: Integrate with API (Supabase, Mailchimp, etc.)
    alert(`Thank you for subscribing, ${email}!`);
    setEmail("");
  };

  return (
    <footer className="mt-16 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-gray-100">
            QuickTools<span className="text-blue-500">PDF</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Your all-in-one PDF & AI toolkit.
          </p>
        </div>

        {/* Main Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            Quick Links
          </h3>
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/tools" className="hover:text-blue-500">Tools Hub</Link>
          <Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link>
          <Link to="/pricing" className="hover:text-blue-500">Pricing</Link>
          <HashLink smooth to="/pricing#faq" className="hover:text-blue-500">Pricing FAQ</HashLink>
          <Link to="/about" className="hover:text-blue-500">About</Link>
          <Link to="/contact" className="hover:text-blue-500">Contact</Link>
          <Link to="/faq" className="hover:text-blue-500">General FAQ</Link>
        </div>

        {/* FAQ Categories */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            FAQ Categories
          </h3>
          <HashLink smooth to="/faq#general" className="hover:text-blue-500">General</HashLink>
          <HashLink smooth to="/faq#tools" className="hover:text-blue-500">Tools</HashLink>
          <HashLink smooth to="/faq#pricing" className="hover:text-blue-500">Pricing</HashLink>
          <HashLink smooth to="/faq#account" className="hover:text-blue-500">Account</HashLink>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
            📩 Newsletter
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Subscribe to get product updates & exclusive offers.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow transition whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-t border-gray-200 dark:border-gray-700 text-sm flex flex-col sm:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} QuickToolsPDF</p>
        <p className="mt-2 sm:mt-0">Made with ❤️ by Team QuickTools</p>
      </div>
    </footer>
  );
}
