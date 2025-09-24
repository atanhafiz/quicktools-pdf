import React from "react";

export default function BrowserMockup({ image }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden w-full max-w-2xl">
      {/* Browser Bar */}
      <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        <div className="flex-1 text-center text-xs text-gray-500 dark:text-gray-400">
          quicktools.ai
        </div>
      </div>

      {/* Screenshot Image */}
      <img src={image} alt="QuickTools Screenshot" className="w-full h-auto" />
    </div>
  );
}
