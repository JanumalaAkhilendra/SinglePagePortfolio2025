import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Briefcase, Mail } from "lucide-react";

const careerData = [
  {
    type: "research",
    title: "Major Project: Multichannel Biometric Recognition and Authentication using Machine Learning",
    company: "Guru Ghasidas Vishwavidyalaya, Bilaspur, India",
    period: "Jan 2024 - May 2024",
    description: [
      "Developed a secure biometric authentication system integrating face recognition with token-based verification over Wi-Fi networks.",
      "Implemented the Local Binary Pattern Histogram (LBPH) algorithm for real-time facial recognition and token validation.",
      "Collected and processed a dataset of 10,000 images from 1,000 individuals, achieving 80–89% accuracy for frontal face detection.",
      "Enhanced model robustness through image augmentation techniques such as rotation, zooming, and flipping.",
      "Identified and analyzed limitations in side-angle and multi-face recognition, proposing future integration of deep learning and liveness detection."
    ],
    icon: "🧠",
    details:
      "Designed a hybrid face-token authentication framework using machine learning and wireless communication for secure, scalable applications in education, healthcare, and e-governance."
  },
  {
  type: "work",
  title: "PHP Developer Intern",
  company: "CCBUL Consulting",
  period: "Sep 2024 - Dec 2024",
  description: [
    "Developed a high-performance modular system using PHP and Laravel, improving API response time by 25% and reducing server load by 30%.",
    "Redesigned the core website architecture, resulting in a 40% increase in user engagement and a 25% rise in conversion rates.",
    "Optimized backend queries to improve user retention by 10% and enhance rendering speed by 15%."
  ],
  icon: "💻",
  details:
    "Skills: PHP, Laravel, Backend Optimization, API Development, and Performance Tuning."
  },
  {
    type: "work",
    title: "Web Developer Intern",
    company: "BollyGrad Studioz (Remote)",
    period: "Jan 2025 - April 2025",
    description: [
      "Revamped core website architecture, increasing visitor engagement by 40% and boosting conversion rates by 25%.",
      "Improved website SEO by 30% through content enhancements, lazy loading, and meta tag optimization, leading to higher organic traffic.",
      "Diagnosed performance bottlenecks and led backend optimizations, reducing load times by 15%."
    ],
    icon: "🌐",
    details:
      "Skills: Web Development, SEO Optimization, Performance Enhancement, and Frontend Optimization."
  },
  {
    type: "education",
    title: "Bachelor of Technology",
    company: "Guru Ghasidas Vishwavidyalaya, Bilaspur, India",
    period: "Dec 2020 - May 2024",
    description: [
      "Cumulative GPA: 8.48/10 (Top 10% of class).",
      "Relevant Coursework: Data Structures, Algorithms, Database Management, Machine Learning, Computer Networks.",
    ],
    icon: "🎓",
    details: "Activities: Coding Club, Tech Fest, Hackathons.",
  },
];

const Timeline = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = ["all", ...new Set(careerData.map((item) => item.type))];

  const filteredData =
    activeFilter === "all"
      ? careerData
      : careerData.filter((item) => item.type === activeFilter);

  // Reveal animation on scroll
  useEffect(() => {
    const items = document.querySelectorAll(".timeline-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [filteredData]);

  return (
    <div className="min-h-screen text-white px-4 py-12 relative overflow-hidden">
      {/* ✨ Background Stars */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-pulse opacity-30 bg-[radial-gradient(circle_at_center,_#ffffff33_1px,_transparent_1px)] bg-[length:20px_20px]" />
      </div>

      {/* 🪐 Filters */}
      <div className="relative z-10 flex flex-wrap justify-center gap-4 mb-12">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full border transition-all duration-300 ${
              activeFilter === filter
                ? "bg-cyan-600 border-cyan-400 shadow-md shadow-cyan-500/40"
                : "border-gray-600 hover:border-cyan-400"
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* 🚀 Timeline */}
      <div className="relative z-10">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-[3px] bg-cyan-500/90 top-0 bottom-0" />

        {filteredData.map((item, index) => (
          <motion.div
            key={index}
            className={`timeline-item relative w-full mb-16 flex ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            }`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            
          <div
            className={`timeline-content relative bg-gradient-to-br from-white/10 via-cyan-500/5 to-transparent backdrop-blur-xl border border-cyan-400/90 rounded-2xl p-6 w-full md:w-[45%] shadow-[0_0_20px_rgba(0,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-all duration-500`}
          >
            {/* Floating glowing border animation */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/10 via-transparent to-transparent pointer-events-none animate-pulse"></div>

            {/* Icon */}
            <div className="absolute left-1/2 top-6 transform -translate-x-1/2 w-10 h-10 bg-black/60 backdrop-blur-md border-2 border-cyan-400 rounded-full flex items-center justify-center text-2xl shadow-[0_0_10px_rgba(0,255,255,0.3)]">
              {item.icon}
            </div>

            {/* Content */}
            <p className="text-cyan-300 text-sm mt-8 mb-2">{item.period}</p>
            <h3 className="text-xl font-bold mb-1 text-white drop-shadow-[0_0_6px_rgba(0,255,255,0.3)]">
              {item.title}
            </h3>
            <p className="text-cyan-200 text-sm mb-3">{item.company}</p>

            <ul className="list-disc list-inside text-gray-200 text-sm space-y-1">
              {item.description.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>

            <p className="text-gray-400 text-sm mt-3 border-t border-cyan-800/40 pt-3">
              {item.details}
            </p>
          </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
