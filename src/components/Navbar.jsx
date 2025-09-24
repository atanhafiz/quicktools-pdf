import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // apply dark mode ke <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Logo */}
          <Link
            to="/"
            className="text-xl font-extrabold text-blue-600 flex items-center gap-1"
          >
            QuickTools<span className="text-gray-900 dark:text-gray-100">PDF</span>
          </Link>

          {/* Center: Nav Links (desktop only) */}
          <div className="hidden md:flex space-x-4">
            {[
              { path: "/", label: "Home" },
              { path: "/tools", label: "Tools Hub" },
              { path: "/dashboard", label: "Dashboard" },
              { path: "/pricing", label: "Pricing" },
              { path: "/about", label: "About" },
              { path: "/faq", label: "FAQ" },
            ].map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-1 rounded-lg shadow-md transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right: Desktop CTA + Dark/Light toggle */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 rounded-lg shadow-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-semibold"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
            <Link
              to="/tools"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md transition"
            >
              🚀 Start Free
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="px-3 py-2 rounded-lg text-gray-800 dark:text-gray-100"
            >
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 right-0 w-64 h-full bg-white dark:bg-gray-900 shadow-2xl p-6 flex flex-col gap-4 z-50 md:hidden"
            >
              {/* Close button top right */}
              <button
                onClick={() => setMenuOpen(false)}
                className="self-end text-2xl text-gray-800 dark:text-gray-100 mb-6"
              >
                ✖
              </button>

              {[
                { path: "/", label: "Home" },
                { path: "/tools", label: "Tools Hub" },
                { path: "/dashboard", label: "Dashboard" },
                { path: "/pricing", label: "Pricing" },
                { path: "/about", label: "About" },
                { path: "/faq", label: "FAQ" },
              ].map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg shadow-md ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Mode toggle */}
              <button
                onClick={() => {
                  setDarkMode(!darkMode);
                  setMenuOpen(false);
                }}
                className="px-3 py-2 rounded-lg shadow-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-semibold"
              >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
              </button>

              {/* Start Free */}
              <Link
                to="/tools"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg bg-blue-600 text-white font-bold shadow-md text-center"
              >
                🚀 Start Free
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
