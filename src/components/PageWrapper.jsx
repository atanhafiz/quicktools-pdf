import React from "react";

export default function PageWrapper({ title, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-8 md:p-12 lg:p-16">
      {title && (
        <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900 dark:text-gray-100">
          {title}
        </h1>
      )}
      {children}
    </div>
  );
}
