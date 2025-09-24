import React from "react";
import { Link } from "react-router-dom";

export default function DashboardSecure() {
  const tools = [
    { name: "Protect PDF", path: "/protect", desc: "Add password protection", icon: "🔒" },
    { name: "Unlock PDF", path: "/unlock", desc: "Remove password protection", icon: "🔓" },
    { name: "Sign PDF", path: "/sign", desc: "Add digital signatures", icon: "✍️" },
    { name: "Watermark PDF", path: "/watermark", desc: "Insert watermark", icon: "💧" },
    { name: "eSign Flow", path: "/esign", desc: "Full e-signature workflow", icon: "🖊️" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">🔐 Secure PDF Tools</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, i) => (
          <Link
            key={i}
            to={tool.path}
            className="block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all p-6"
          >
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
              {tool.icon} {tool.name}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
