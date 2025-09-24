import React from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

export default function DashboardSecure() {
  const tools = [
    { icon: "🔒", name: "Protect PDF", path: "/protect", desc: "Add password protection to PDF" },
    { icon: "🔓", name: "Unlock PDF", path: "/unlock", desc: "Remove password protection" },
    { icon: "✍️", name: "Sign PDF", path: "/sign", desc: "Add digital signatures" },
    { icon: "💧", name: "Watermark PDF", path: "/watermark", desc: "Insert watermark" },
    { icon: "🖊️", name: "eSign Flow", path: "/esign", desc: "Full e-signature workflow" },
  ];

  return (
    <PageWrapper title="🔐 Secure PDF Tools">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool, i) => (
          <Link
            key={i}
            to={tool.path}
            className="block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all p-6 text-center sm:text-left"
          >
            <div className="text-4xl mb-3">{tool.icon}</div>
            <h2 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">{tool.name}</h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </PageWrapper>
  );
}
