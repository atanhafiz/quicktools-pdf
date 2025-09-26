import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function BackButton({ to = "/dashboard" }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
    >
      <FaArrowLeft /> Back
    </Link>
  );
}
