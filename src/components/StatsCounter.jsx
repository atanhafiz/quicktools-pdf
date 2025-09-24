import React, { useEffect, useState } from "react";

export default function StatsCounter() {
  const [stats, setStats] = useState({ files: 0, users: 0, uptime: 0, countries: 0 });
  const [liveFiles, setLiveFiles] = useState(0);

  useEffect(() => {
    // 🎯 Target angka → edit sini je kalau nak ubah
    const target = { 
      files: 20000000,     // 20M files
      users: 500000,       // 500k users
      uptime: 99.9,        // 99.9%
      countries: 120       // 120 countries
    };

    const duration = 2000; // 2s animate
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

    // 🚀 Real-time counter
    let live = 1000 + Math.floor(Math.random() * 300);
    setLiveFiles(live);
    const liveInterval = setInterval(() => {
      live += Math.floor(Math.random() * 10) + 1;
      setLiveFiles(live);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(liveInterval);
    };
  }, []);

  return (
    <>
      {/* Stats Section */}
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

      {/* Real-time Counter */}
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <div className="bg-blue-600 dark:bg-blue-700 text-white rounded-xl shadow-md p-4">
          <p className="text-base">
            🚀 <span className="font-bold">{liveFiles.toLocaleString()}</span> files processed today
          </p>
        </div>
      </div>
    </>
  );
}
