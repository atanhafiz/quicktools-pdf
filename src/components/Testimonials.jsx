import React from "react";
import Slider from "react-slick";

export default function Testimonials() {
  const testimonials = [
    { name: "Sarah J.", role: "University Student", feedback: "QuickToolsPDF saved me hours during my thesis. The PDF to Word tool is a lifesaver!", stars: 5 },
    { name: "Michael K.", role: "Freelancer", feedback: "I use the compress and merge tools daily. Simple, fast, and reliable.", stars: 5 },
    { name: "Aisha R.", role: "Project Manager", feedback: "Our team uses the eSign workflow — it streamlined our approvals. Highly recommend!", stars: 4 },
    { name: "Carlos G.", role: "Designer", feedback: "Image to PDF feature is simple and works perfectly for portfolios.", stars: 5 },
    { name: "Yuki N.", role: "Researcher", feedback: "AI Summary helps me skim through papers quickly. Saves so much time.", stars: 4 },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    adaptiveHeight: true,
  };

  return (
    <div className="max-w-5xl mx-auto mb-16">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
        💬 What Our Users Say
      </h2>

      {/* Mobile Slider */}
      <div className="block lg:hidden">
        <Slider {...sliderSettings}>
          {testimonials.map((t, i) => (
            <div key={i} className="px-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-left">
                <div className="flex items-center mb-2">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <span key={j} className="text-yellow-400 text-base">★</span>
                  ))}
                  {Array.from({ length: 5 - t.stars }).map((_, j) => (
                    <span key={j} className="text-gray-300 dark:text-gray-600 text-base">★</span>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  “{t.feedback}”
                </p>
                <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                  {t.name} <span className="text-gray-500 dark:text-gray-400">– {t.role}</span>
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:grid grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-4 text-left">
            <div className="flex items-center mb-2">
              {Array.from({ length: t.stars }).map((_, j) => (
                <span key={j} className="text-yellow-400 text-base">★</span>
              ))}
              {Array.from({ length: 5 - t.stars }).map((_, j) => (
                <span key={j} className="text-gray-300 dark:text-gray-600 text-base">★</span>
              ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
              “{t.feedback}”
            </p>
            <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">
              {t.name} <span className="text-gray-500 dark:text-gray-400">– {t.role}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
