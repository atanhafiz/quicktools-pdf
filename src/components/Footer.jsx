import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

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
          <h2 className="text-xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            QuickToolsPDF
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Your all-in-one PDF & AI toolkit.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Quick Links
          </h3>
          {[
            { path: "/", label: "Home" },
            { path: "/tools", label: "Tools Hub" },
            { path: "/dashboard", label: "Dashboard" },
            { path: "/pricing", label: "Pricing" },
            { path: "/about", label: "About" },
            { path: "/contact", label: "Contact" },
            { path: "/faq", label: "General FAQ" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="hover:text-blue-500 hover:underline transition"
            >
              {link.label}
            </Link>
          ))}
          <HashLink
            smooth
            to="/pricing#faq"
            className="hover:text-blue-500 hover:underline transition"
          >
            Pricing FAQ
          </HashLink>
        </div>

        {/* FAQ Categories */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
            FAQ Categories
          </h3>
          {[
            { path: "/faq#general", label: "General" },
            { path: "/faq#tools", label: "Tools" },
            { path: "/faq#pricing", label: "Pricing" },
            { path: "/faq#account", label: "Account" },
          ].map((cat) => (
            <HashLink
              smooth
              key={cat.path}
              to={cat.path}
              className="hover:text-blue-500 hover:underline transition"
            >
              {cat.label}
            </HashLink>
          ))}
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
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow hover:from-purple-600 hover:to-pink-500 transition transform hover:scale-105"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-t border-gray-200 dark:border-gray-700 text-sm flex flex-col sm:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} QuickToolsPDF. All rights reserved.</p>
        <div className="flex items-center gap-4 mt-2 sm:mt-0 text-lg">
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FaTwitter className="hover:text-blue-500 transition" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedin className="hover:text-blue-700 transition" />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <FaGithub className="hover:text-gray-900 dark:hover:text-white transition" />
          </a>
        </div>
      </div>
    </footer>
  );
}
