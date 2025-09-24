import React from "react";
import Slider from "react-slick";

export default function Testimonials() {
  const testimonials = [
    { name: "Sarah J.", role: "University Student", feedback: "QuickToolsPDF saved me hours during my thesis. The PDF to Word tool is a lifesaver!", stars: 5, avatar: "https://i.pravatar.cc/150?img=47" },
    { name: "Michael K.", role: "Freelancer", feedback: "I use the compress and merge tools daily. Simple, fast, and reliable.", stars: 5, avatar: "https://i.pravatar.cc/150?img=12" },
    { name: "Aisha R.", role: "Project Manager", feedback: "Our team uses the eSign workflow — it streamlined our approvals. Highly recommend!", stars: 4, avatar: "https://i.pravatar.cc/150?img=36" },
    { name: "Ken T.", role: "Startup Founder", feedback: "Pro plan ROI is insane — saves us hours every week handling client documents.", stars: 5, avatar: "https://i.pravatar.cc/150?img=21" },
    { name: "Emily W.", role: "Teacher", feedback: "I use the PDF to PPT converter for my lectures. It works like magic every time.", stars: 5, avatar: "https://i.pravatar.cc/150?img=56" },
    { name: "Rajesh P.", role: "Software Engineer", feedback: "OCR tool works great for scanned PDFs. Love the AI summary too!", stars: 4, avatar: "https://i.pravatar.cc/150?img=17" },
    { name: "Lisa M.", role: "HR Manager", feedback: "Managing employee contracts is so much easier with eSign Flow. Total game-changer.", stars: 5, avatar: "https://i.pravatar.cc/150?img=30" },
    { name: "Ahmed B.", role: "Lawyer", feedback: "I use Protect/Unlock daily for client docs. Secure and reliable.", stars: 5, avatar: "https://i.pravatar.cc/150?img=41" },
    { name: "Carlos G.", role: "Designer", feedback: "Image to PDF feature is simple and works perfectly for portfolios.", stars: 5, avatar: "https://i.pravatar.cc/150?img=65" },
    { name: "Yuki N.", role: "Researcher", feedback: "AI Summary helps me skim through papers quickly. Saves so much time.", stars: 4, avatar: "https://i.pravatar.cc/150?img=77" },
    { name: "Sophie L.", role: "Content Creator", feedback: "I export PDFs to images for my posts. Works flawlessly every time!", stars: 5, avatar: "https://i.pravatar.cc/150?img=8" },
    { name: "David P.", role: "Consultant", feedback: "Watermark feature is perfect for protecting my client reports.", stars: 5, avatar: "https://i.pravatar.cc/150?img=19" },
    { name: "Maria S.", role: "Business Owner", feedback: "The Dashboard gives me quick access to everything. Love the UI!", stars: 5, avatar: "https://i.pravatar.cc/150?img=29" },
    { name: "James C.", role: "Marketer", feedback: "PDF to Excel is my daily driver. Accurate tables extraction 👌", stars: 4, avatar: "https://i.pravatar.cc/150?img=39" },
    { name: "Hannah B.", role: "Non-Profit Coordinator", feedback: "We manage donation receipts with QuickTools. Saves us so much manual work.", stars: 5, avatar: "https://i.pravatar.cc/150?img=59" },
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
    <div className="max-w-6xl mx-auto mb-20">
      {/* Rating Badge */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900 px-4 py-2 rounded-full shadow mb-4">
          <span className="text-yellow-500 text-lg">⭐</span>
          <span className="font-semibold text-gray-900 dark:text-gray-100">4.8/5</span>
          <span className="text-sm text-gray-700 dark:text-gray-300">by 200k+ users</span>
        </div>

        {/* Fake Partner Logos */}
        <div className="flex gap-6 opacity-80">
          <div className="w-24 h-8 bg-gray-300 dark:bg-gray-700 rounded-md flex items-center justify-center text-xs font-semibold text-gray-700 dark:text-gray-300">Top Rated</div>
          <div className="w-24 h-8 bg-gray-300 dark:bg-gray-700 rounded-md flex items-center justify-center text-xs font-semibold text-gray-700 dark:text-gray-300">Trusted</div>
          <div className="w-24 h-8 bg-gray-300 dark:bg-gray-700 rounded-md flex items-center justify-center text-xs font-semibold text-gray-700 dark:text-gray-300">Secure</div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-10 text-center">
        💬 What Our Users Say
      </h2>

      {/* Mobile Slider */}
      <div className="block lg:hidden">
        <Slider {...sliderSettings}>
          {testimonials.map((t, i) => (
            <div key={i} className="px-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-left">
                <div className="flex items-center mb-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{t.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{t.role}</p>
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <span key={j} className="text-yellow-400 text-lg">★</span>
                  ))}
                  {Array.from({ length: 5 - t.stars }).map((_, j) => (
                    <span key={j} className="text-gray-300 dark:text-gray-600 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{t.feedback}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:grid grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition p-6 text-left">
            <div className="flex items-center mb-3">
              <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full mr-3" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{t.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{t.role}</p>
              </div>
            </div>
            <div className="flex items-center mb-3">
              {Array.from({ length: t.stars }).map((_, j) => (
                <span key={j} className="text-yellow-400 text-lg">★</span>
              ))}
              {Array.from({ length: 5 - t.stars }).map((_, j) => (
                <span key={j} className="text-gray-300 dark:text-gray-600 text-lg">★</span>
              ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{t.feedback}</p>
          </div>
        ))}
      </div>

      {/* Featured In Section */}
      <div className="mt-16 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-6">🌐 Featured In</p>
        <div className="flex flex-wrap justify-center gap-6 opacity-80">
          <div className="w-28 h-10 bg-gray-300 dark:bg-gray-700 rounded-md flex items-center justify-center text-xs font-semibold text-gray-700 dark:text-gray-300">Tech News</div>
          <div className="w-28 h-10 bg-gray-300 dark:bg-gray-700 rounded-md flex items-center justify-center text-xs font-semibold text-gray-700 dark:text-gray-300">Startup Hub</div>
          <div className="w-28 h-10 bg-gray-300 dark:bg-gray-700 rounded-md flex items-center justify-center text-xs font-semibold text-gray-700 dark:text-gray-300">Global SaaS</div>
          <div className="w-28 h-10 bg-gray-300 dark:bg-gray-700 rounded-md flex items-center justify-center text-xs font-semibold text-gray-700 dark:text-gray-300">Cloud Today</div>
          <div className="w-28 h-10 bg-gray-300 dark:bg-gray-700 rounded-md flex items-center justify-center text-xs font-semibold text-gray-700 dark:text-gray-300">App Review</div>
        </div>
      </div>
    </div>
  );
}
