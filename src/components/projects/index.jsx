"use client";
import { motion } from "framer-motion";
import ProjectLayout from "./ProjectLayout";
import { useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 1.2,
    },
  },
};

const filters = ["all", "react", "django", "react-native", "ai"];

const ProjectList = ({ projects }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="w-full px-4 mx-auto max-w-7xl space-y-8">
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 text-sm rounded-full transition-colors duration-300 border ${
              activeFilter === filter
                ? "bg-cyan-600 text-white border-cyan-500"
                : "bg-white/10 text-white border-white/20 hover:bg-white/20"
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredProjects.map((project, index) => (
          <div key={index} className="w-full h-full">
            <ProjectLayout {...project} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProjectList;
