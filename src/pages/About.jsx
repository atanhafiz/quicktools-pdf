import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          🌟 About QuickToolsPDF
        </h1>

        <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg text-center">
          QuickToolsPDF is a modern platform that provides a complete set of tools 
          to edit, convert, secure, and enhance your PDF documents — powered by AI.
        </p>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              🚀 Our Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              To simplify document workflows for students, professionals, and businesses worldwide 
              by providing fast, reliable, and user-friendly tools.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              🌍 Our Vision
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              To become the leading global platform for smart PDF and AI document solutions, 
              empowering productivity in every corner of the world.
            </p>
          </div>
        </div>

        {/* Team */}
        <div className="mt-10 text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            💡 The Team
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            QuickToolsPDF is built with passion by a team dedicated to delivering 
            the best user experience for document management.
          </p>
        </div>
      </div>
    </div>
  );
}
