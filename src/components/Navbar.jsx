import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Tools Hub", path: "/tools" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Pricing", path: "/pricing" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="font-extrabold text-xl tracking-wide text-gray-900 dark:text-white">
          QuickTools<span className="text-blue-500">PDF</span>
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-6">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className={`hover:text-blue-500 transition ${
                location.pathname === link.path
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-800 dark:text-gray-200"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Dark/Light Switch */}
          <button
            onClick={toggleTheme}
            className="ml-4 px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition flex items-center text-sm text-gray-900 dark:text-gray-100"
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </div>
    </nav>
  );
}
