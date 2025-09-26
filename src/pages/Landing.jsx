import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Slider from "react-slick";
import PageWrapper from "../components/PageWrapper";
import BrowserMockup from "../components/BrowserMockup";
import Testimonials from "../components/Testimonials";
import StatsCounter from "../components/StatsCounter";
import { FaEdit, FaExchangeAlt, FaLock, FaRobot } from "react-icons/fa";

export default function Landing() {
  const [count, setCount] = useState(0);
  const [liveFiles, setLiveFiles] = useState(0);
  const [wording, setWording] = useState("files processed today");

  useEffect(() => {
    let start = 0;
    const end = 10000;
    const duration = 2000;
    const increment = end / (duration / 30);

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(interval);

        const loopInterval = setInterval(() => {
          setCount((prev) => prev + Math.floor(Math.random() * 50) + 1);
        }, 2000);

        return () => clearInterval(loopInterval);
      }
      setCount(Math.floor(start));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let live = 1200 + Math.floor(Math.random() * 300);
    setLiveFiles(live);

    const liveInterval = setInterval(() => {
      live += Math.floor(Math.random() * 20) + 5;
      setLiveFiles(live);
    }, 2000);

    return () => clearInterval(liveInterval);
  }, []);

  useEffect(() => {
    const options = [
      "files processed in the last 24 hours 🔥",
      "documents converted this week ⚡",
      "files processed globally today 🌍",
    ];
    setWording(options[Math.floor(Math.random() * options.length)]);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, centerMode: true, centerPadding: "0px" },
      },
    ],
  };

  const miniTestimonials = [
    { name: "Sarah J.", role: "Student", feedback: "The PDF to Word tool saved my thesis work. Super easy!", stars: 5 },
    { name: "Michael K.", role: "Freelancer", feedback: "Quick and reliable. I use merge & compress daily.", stars: 5 },
    { name: "Aisha R.", role: "Project Manager", feedback: "Our team loves the eSign workflow. Smooth approvals 🚀", stars: 4 },
  ];

  return (
    <PageWrapper>
      {/* Hero Section */}
      <div className="text-center mb-20">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
          All-in-One <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">PDF & AI Toolkit</span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Edit, convert, secure, and enhance your documents instantly. Trusted by students, professionals, and businesses worldwide.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/tools"
            className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg transition transform hover:scale-105"
          >
            🚀 Start Free
          </Link>
          <Link
            to="/pricing"
            className="px-8 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-bold shadow-lg transition"
          >
            💰 See Pricing
          </Link>
        </div>
      </div>

      {/* Stats */}
      <StatsCounter files={2000000} users={50000} uptime={99.9} countries={40} />

      {/* Live Counter */}
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-md p-4">
          🚀 <span className="font-bold">{liveFiles.toLocaleString()}</span> {wording}
        </div>
      </div>

      {/* Mini Testimonials Carousel */}
      <div className="max-w-6xl mx-auto mb-20 text-center">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">What early users are saying</h3>
        <Slider {...sliderSettings}>
          {miniTestimonials.map((t, i) => (
            <div key={i} className="px-4">
              <motion.div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-full hover:shadow-lg transition">
                <p className="text-gray-700 dark:text-gray-300 text-sm italic mb-3">“{t.feedback}”</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {t.name} <span className="text-xs text-gray-500">– {t.role}</span>
                </p>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
        {[
          { icon: <FaEdit className="text-4xl text-blue-500 mx-auto" />, title: "Edit PDF", desc: "Merge, split, rotate, and organize your PDFs easily." },
          { icon: <FaExchangeAlt className="text-4xl text-green-500 mx-auto" />, title: "Convert", desc: "PDF to Word, Excel, PPT, Image, and vice versa." },
          { icon: <FaLock className="text-4xl text-red-500 mx-auto" />, title: "Secure", desc: "Protect with password, unlock, sign, and watermark." },
          { icon: <FaRobot className="text-4xl text-purple-500 mx-auto" />, title: "Smart AI", desc: "OCR, summaries, and AI-powered form filling." },
        ].map((f, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition p-6 text-center">
            {f.icon}
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-3 mb-2">{f.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Final CTA */}
      <div className="w-full max-w-5xl bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-10 text-center text-white mx-auto">
        <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Productivity?</h2>
        <p className="mb-6 text-lg">Join thousands of users who trust QuickToolsPDF to simplify their workflow.</p>
        <Link to="/tools" className="px-10 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:bg-gray-100 transition">
          🚀 Get Started Free
        </Link>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          to="/tools"
          className="px-8 py-4 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-2xl transition transform hover:scale-110"
        >
          🚀 Start Free
        </Link>
      </div>
    </PageWrapper>
  );
}
