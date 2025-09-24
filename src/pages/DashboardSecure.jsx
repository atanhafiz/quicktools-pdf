import React from "react";
import { Link } from "react-router-dom";

export default function DashboardSecure() {
  const tools = [
    { name: "Protect PDF", path: "/protect", desc: "Add password protection to PDF", icon: "🔒" },
    { name: "Unlock PDF", path: "/unlock", desc: "Remove password protection", icon: "🔓" },
    { name: "Sign PDF", path: "/sign", desc: "Add digital signatures to PDF", icon: "✍️" },
    { name: "Watermark PDF", path: "/watermark", desc: "Insert watermark into PDF pages", icon: "💧" },
    { name: "eSign Flow", path: "/esign", desc: "Full e-signature workflow", icon: "🖊" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">🔐 Secure PDF Tools</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, i) => (
          <Link
            key={i}
            to={tool.path}
            className="block bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition-all p-6"
          >
            <h2 className="text-lg font-semibold mb-2">{tool.icon} {tool.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
