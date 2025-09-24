import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { motion } from "framer-motion";
import Slider from "react-slick";
import PageWrapper from "../components/PageWrapper";
import BrowserMockup from "../components/BrowserMockup";
import Testimonials from "../components/Testimonials";
import StatsCounter from "../components/StatsCounter";

export default function Landing() {
  const [count, setCount] = useState(0);
  const [liveFiles, setLiveFiles] = useState(0);
  const [wording, setWording] = useState("files processed today");

  useEffect(() => {
    // Growth counter animation
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
    // Live counter
    let live = 1200 + Math.floor(Math.random() * 300);
    setLiveFiles(live);

    const liveInterval = setInterval(() => {
      live += Math.floor(Math.random() * 20) + 5;
      setLiveFiles(live);
    }, 2000);

    return () => clearInterval(liveInterval);
  }, []);

  useEffect(() => {
    // Random wording
    const options = [
      "files processed in the last 24 hours 🔥",
      "documents converted this week ⚡",
      "files processed globally today 🌍",
    ];
    setWording(options[Math.floor(Math.random() * options.length)]);
  }, []);

  // Carousel settings
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
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "0px",
        },
      },
    ],
  };

  const miniTestimonials = [
    {
      name: "Sarah J.",
      role: "Student",
      feedback: "The PDF to Word tool saved my thesis work. Super easy!",
      stars: 5,
    },
    {
      name: "Michael K.",
      role: "Freelancer",
      feedback: "Quick and reliable. I use merge & compress daily.",
      stars: 5,
    },
    {
      name: "Aisha R.",
      role: "Project Manager",
      feedback: "Our team loves the eSign workflow. Smooth approvals 🚀",
      stars: 4,
    },
    {
      name: "Carlos G.",
      role: "Designer",
      feedback: "Image to PDF feature is perfect for portfolios!",
      stars: 5,
    },
    {
      name: "Yuki N.",
      role: "Researcher",
      feedback: "AI Summary helps me skim papers in seconds. Love it.",
      stars: 4,
    },
  ];

  return (
    <PageWrapper>
      {/* Hero Section (centered) */}
      <div className="text-center mb-20">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
          All-in-One <span className="text-blue-600 dark:text-blue-400">PDF</span> & AI Toolkit
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Edit, convert, secure, and enhance your documents instantly.  
          Trusted by students, professionals, and businesses worldwide.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/tools"
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold shadow-lg animate-pulse"
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

      {/* Stats Counter */}
      <StatsCounter files={2000000} users={50000} uptime={99.9} countries={40} />

      {/* Custom Live Counter */}
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <div className="bg-blue-600 dark:bg-blue-700 text-white rounded-xl shadow-md p-4">
          <p className="text-base">
            🚀 <span className="font-bold">{liveFiles.toLocaleString()}</span> {wording}
          </p>
        </div>
      </div>

      {/* Growth Text + Badge */}
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="inline-flex items-center gap-3"
        >
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            📈 Growing{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-extrabold text-2xl">
              {count.toLocaleString()}+
            </span>{" "}
            new users every month
          </p>
          <motion.span
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="px-3 py-1 text-xs font-bold rounded-full bg-yellow-300 text-gray-900 dark:bg-yellow-500 dark:text-gray-900 shadow animate-pulse"
          >
            Trending Now
          </motion.span>
        </motion.div>
      </div>

      {/* Mini Testimonials Carousel (fixed mobile) */}
      <div className="max-w-6xl mx-auto mb-20 text-center">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          What early users are saying
        </h3>
        <Slider {...sliderSettings}>
          {miniTestimonials.map((t, i) => (
            <div key={i} className="px-4">
              <motion.div
                layout
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-full flex flex-col justify-between"
              >
                <p className="text-gray-700 dark:text-gray-300 text-sm italic mb-3 sm:line-clamp-3">
                  “{t.feedback}”
                </p>
                <div className="flex mb-2">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <span key={j} className="text-yellow-400">★</span>
                  ))}
                  {Array.from({ length: 5 - t.stars }).map((_, j) => (
                    <span key={j} className="text-gray-300 dark:text-gray-600">★</span>
                  ))}
                </div>
                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {t.name}{" "}
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    – {t.role}
                  </span>
                </p>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Features Highlight */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
        {[
          { icon: "✂️", title: "Edit PDF", desc: "Merge, split, rotate, and organize your PDFs easily." },
          { icon: "🔄", title: "Convert", desc: "PDF to Word, Excel, PPT, Image, and vice versa." },
          { icon: "🔐", title: "Secure", desc: "Protect with password, unlock, sign, and watermark." },
          { icon: "🤖", title: "Smart AI", desc: "OCR, summaries, and AI-powered form filling." },
        ].map((f, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition p-6 text-center sm:text-left"
          >
            <div className="text-4xl mb-3">{f.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{f.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Dashboard Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 max-w-6xl mx-auto">
        <div className="flex justify-center lg:justify-start">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
            <BrowserMockup image="/images/dashboard.png" />
          </div>
        </div>
        <div className="text-center lg:text-left flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            ⚡ Powerful Dashboard
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Manage all your PDF tasks in one clean dashboard.  
            Access Edit, Convert, Secure, and AI tools in just a click.
          </p>
          <Link to="/dashboard" className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg transition mx-auto lg:mx-0">
            Open Dashboard →
          </Link>
        </div>
      </div>

      {/* Pricing Preview */}
      <div className="max-w-6xl mx-auto mb-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-10">
          💰 Simple Pricing for Everyone
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition p-8">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <p className="mb-4">Perfect for personal use.</p>
            <p className="text-4xl font-extrabold text-blue-600 mb-6">$0</p>
            <ul className="text-sm space-y-2 mb-6 text-left">
              <li>✅ Merge, Split, Rotate</li>
              <li>✅ PDF → Word (basic)</li>
              <li>✅ Protect & Unlock</li>
              <li>❌ Limited AI features</li>
            </ul>
            <Link to="/tools" className="w-full block py-3 bg-blue-600 text-white font-bold rounded-lg transition">
              Get Started Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition p-8 border-4 border-blue-500 scale-105">
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <p className="mb-4">For professionals & businesses.</p>
            <p className="text-4xl font-extrabold text-blue-600 mb-6">
              $9<span className="text-lg">/mo</span>
            </p>
            <ul className="text-sm space-y-2 mb-6 text-left">
              <li>✅ All Free features</li>
              <li>✅ Unlimited conversions</li>
              <li>✅ Advanced AI tools</li>
              <li>✅ eSign workflow</li>
              <li>✅ Priority support</li>
            </ul>
            <Link to="/pricing" className="w-full block py-3 bg-blue-600 text-white font-bold rounded-lg transition">
              Upgrade to Pro →
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition p-8">
            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
            <p className="mb-4">For large teams & organizations.</p>
            <p className="text-4xl font-extrabold text-blue-600 mb-6">Custom</p>
            <ul className="text-sm space-y-2 mb-6 text-left">
              <li>✅ All Pro features</li>
              <li>✅ Team management</li>
              <li>✅ API access</li>
              <li>✅ Custom branding</li>
              <li>✅ Dedicated support manager</li>
            </ul>
            <Link to="/contact" className="w-full block py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold rounded-lg transition">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <Testimonials />

      {/* Final CTA Banner */}
      <div className="w-full max-w-5xl bg-blue-600 dark:bg-blue-700 rounded-2xl shadow-xl p-10 text-center text-white mx-auto">
        <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Productivity?</h2>
        <p className="mb-6 text-lg">
          Join thousands of users who trust QuickToolsPDF to simplify their document workflow.
        </p>
        <Link to="/tools" className="px-10 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:bg-gray-100 transition">
          🚀 Get Started Free
        </Link>
      </div>

      {/* Floating Sticky Start Free */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          to="/tools"
          className="px-10 py-5 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-2xl transition transform hover:scale-105 animate-bounce"
        >
          🚀 Start Free
        </Link>
      </div>
    </PageWrapper>
  );
}
