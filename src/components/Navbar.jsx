import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { x: 50, opacity: 0 },
    show: { x: 0, opacity: 1 },
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="group flex flex-col">
            <span className="text-xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent group-hover:opacity-90 transition">
              QuickToolsPDF
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              AI PDF Suite
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-2">
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
                  `px-3 py-1 rounded-lg transition font-medium ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                      : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Dev only: Demo Hub */}
            {process.env.NODE_ENV === "development" && (
              <NavLink
                to="/demo-hub"
                className={({ isActive }) =>
                  `px-3 py-1 rounded-lg transition font-medium ${
                    isActive
                      ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600"
                      : "text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                  }`
                }
              >
                🧪 Demo Hub
              </NavLink>
            )}
          </div>

          {/* Right: Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              title="Switch Theme"
              className="w-9 h-9 flex items-center justify-center rounded-full shadow-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 transition hover:rotate-12"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            {/* Start Free CTA */}
            <Link
              to="/tools"
              className="px-5 py-2 rounded-lg font-bold text-white shadow-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 transition transform hover:scale-105"
            >
              🚀 Start Free
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="px-3 py-2 rounded-lg text-gray-800 dark:text-gray-100 transform hover:rotate-90 transition"
            >
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Slide-in panel */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x < -100) toggleMenu();
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 right-0 w-64 h-full bg-white dark:bg-gray-900 shadow-2xl p-6 flex flex-col gap-4 z-50 md:hidden"
            >
              {/* Close button */}
              <button
                onClick={toggleMenu}
                className="self-end text-2xl text-gray-800 dark:text-gray-100 mb-6 transform hover:rotate-90 transition"
              >
                ✖
              </button>

              {/* Links */}
              <motion.div
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={containerVariants}
                className="flex flex-col gap-3"
              >
                {[
                  { path: "/", label: "Home" },
                  { path: "/tools", label: "Tools Hub" },
                  { path: "/dashboard", label: "Dashboard" },
                  { path: "/pricing", label: "Pricing" },
                  { path: "/about", label: "About" },
                  { path: "/faq", label: "FAQ" },
                ].map((link) => (
                  <motion.div key={link.path} variants={itemVariants}>
                    <NavLink
                      to={link.path}
                      onClick={toggleMenu}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-lg font-medium ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}

                {/* Demo Hub for dev */}
                {process.env.NODE_ENV === "development" && (
                  <motion.div variants={itemVariants}>
                    <NavLink
                      to="/demo-hub"
                      onClick={toggleMenu}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-lg font-medium ${
                          isActive
                            ? "bg-purple-600 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-gray-700"
                        }`
                      }
                    >
                      🧪 Demo Hub
                    </NavLink>
                  </motion.div>
                )}
              </motion.div>

              {/* Divider */}
              <hr className="my-4 border-gray-300 dark:border-gray-700" />

              {/* Mode toggle */}
              <button
                onClick={() => {
                  setDarkMode(!darkMode);
                  toggleMenu();
                }}
                className="px-3 py-2 rounded-lg shadow-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-semibold"
              >
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>

              {/* Start Free */}
              <Link
                to="/tools"
                onClick={toggleMenu}
                className="px-4 py-3 rounded-lg bg-blue-600 text-white font-bold shadow-lg text-center hover:bg-blue-700 transition"
              >
                🚀 Start Free
              </Link>

              {/* Social links */}
              <div className="flex justify-center gap-6 mt-6 text-gray-600 dark:text-gray-300 text-xl">
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
