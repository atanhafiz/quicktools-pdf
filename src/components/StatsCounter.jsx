import React, { useEffect, useState } from "react";

export default function StatsCounter({
  files = 20000000,     // default 20M
  users = 500000,       // default 500k
  uptime = 99.9,        // default 99.9%
  countries = 120       // default 120
}) {
  const [stats, setStats] = useState({ files: 0, users: 0, uptime: 0, countries: 0 });

  useEffect(() => {
    const target = { files, users, uptime, countries };
    const duration = 2000; // 2s animation
    const frameRate = 30;
    let frame = 0;
    const totalFrames = Math.round(duration / frameRate);

    const interval = setInterval(() => {
      frame++;
      setStats({
        files: Math.round((target.files / totalFrames) * frame),
        users: Math.round((target.users / totalFrames) * frame),
        uptime: ((target.uptime / totalFrames) * frame).toFixed(1),
        countries: Math.round((target.countries / totalFrames) * frame),
      });
      if (frame === totalFrames) clearInterval(interval);
    }, frameRate);

    return () => clearInterval(interval);
  }, [files, users, uptime, countries]);

  return (
    <div className="max-w-6xl mx-auto mb-12 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
          {stats.files.toLocaleString()}+
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">Files Processed</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
          {stats.users.toLocaleString()}+
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">Active Users</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
          {stats.uptime}%
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">Uptime</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
          {stats.countries}+
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">Countries</p>
      </div>
    </div>
  );
}
