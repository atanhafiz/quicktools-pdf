import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur shadow">
      <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        QuickTools PDF
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
          Dashboard
        </Link>
        <button
          onClick={toggleTheme}
          className="px-4 py-1.5 text-sm rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </nav>
  );
}
