import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Tools Hub", path: "/" },
  ];

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-lg">
      {/* Brand */}
      <Link to="/" className="font-extrabold text-xl tracking-wide">
        QuickTools<span className="text-blue-400">PDF</span>
      </Link>

      {/* Links */}
      <div className="flex items-center space-x-6">
        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            className={`hover:text-blue-400 transition ${
              location.pathname === link.path ? "text-blue-400 font-semibold" : ""
            }`}
          >
            {link.name}
          </Link>
        ))}

        {/* Dark/Light Switch */}
        <button
          onClick={toggleTheme}
          className="ml-4 px-3 py-1 rounded-lg bg-gray-700 hover:bg-gray-600 transition flex items-center"
        >
          {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </nav>
  );
}
