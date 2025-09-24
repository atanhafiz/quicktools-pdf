import React from "react";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      desc: "For personal use with basic PDF tools.",
      features: [
        "Merge, Split, Rotate, Delete",
        "PDF → Word (basic)",
        "Watermark & Protect",
        "Limited AI Summary",
      ],
      cta: "Get Started",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$9 /mo",
      desc: "For professionals who need advanced tools.",
      features: [
        "All Free features",
        "Unlimited PDF Conversions",
        "Advanced AI Summary & OCR",
        "e-Signature Workflow",
        "Priority Support",
      ],
      cta: "Upgrade Now",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "For teams and businesses with large needs.",
      features: [
        "All Pro features",
        "Team Management",
        "API Access",
        "Custom Branding",
        "Dedicated Support Manager",
      ],
      cta: "Contact Sales",
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 text-center mb-4">
          💰 Pricing Plans
        </h1>
        <p className="text-center text-gray-700 dark:text-gray-300 mb-12">
          Choose a plan that fits your needs. Upgrade anytime.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-2xl shadow-lg p-8 bg-white dark:bg-gray-800 transform transition hover:-translate-y-1 hover:shadow-2xl ${
                plan.highlight ? "border-4 border-blue-500 scale-105" : ""
              }`}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {plan.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{plan.desc}</p>
              <p className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-6">
                {plan.price}
              </p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center text-gray-700 dark:text-gray-300">
                    ✅ <span className="ml-2">{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-lg font-bold transition ${
                  plan.highlight
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
