import { motion } from "framer-motion";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import PropTypes from 'prop-types';

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: "spring", damping: 10 } }
};

const ProjectLink = motion(Link);

const ProjectLayout = ({ 
  name, 
  description, 
  date, 
  demoLink, 
  category = 'react', 
  tags = [], 
  imageUrl = null ,
  githublink = null
}) => {
  const getCategoryColor = () => {
    switch (category) {
      case "react": 
        return {
          bg: "bg-blue-900/80 hover:bg-blue-800/80",
          border: "border-blue-500/30 hover:border-blue-400",
          text: "text-blue-200",
          accent: "bg-blue-800/60 text-blue-100"
        };
      case "django": 
        return {
          bg: "bg-emerald-900/80 hover:bg-emerald-800/80",
          border: "border-emerald-500/30 hover:border-emerald-400",
          text: "text-emerald-200",
          accent: "bg-emerald-800/60 text-emerald-100"
        };
      case "react-native": 
        return {
          bg: "bg-sky-900/80 hover:bg-sky-800/80",
          border: "border-sky-500/30 hover:border-sky-400",
          text: "text-sky-200",
          accent: "bg-sky-800/60 text-sky-100"
        };
      case "ai": 
        return {
          bg: "bg-purple-900/80 hover:bg-purple-800/80",
          border: "border-purple-500/30 hover:border-purple-400",
          text: "text-purple-200",
          accent: "bg-purple-800/60 text-purple-100"
        };
      default: 
        return {
          bg: "bg-gray-900/80 hover:bg-gray-800/80",
          border: "border-gray-500/30 hover:border-gray-400",
          text: "text-gray-200",
          accent: "bg-gray-800/60 text-gray-100"
        };
    }
  };

  const colors = getCategoryColor();

  return (
    <div className="relative h-full w-full flex flex-row flex-wrap group">

      {/* Project Card */}
      <ProjectLink
        variants={item}
        href={demoLink}
        target="_blank"
        className={`relative flex flex-col justify-center w-[350px] h-full p-6 rounded-2xl overflow-hidden ${colors.bg} ${colors.border} shadow-xl hover:shadow-2xl transition-all duration-300`}
        whileHover={{ 
          y: -5,
          scale: 1.03,
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Project Image (if provided) */}
        {imageUrl && (
          <div className="w-full h-40 mb-4 rounded-lg overflow-hidden relative">
            <motion.img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col flex-1 space-y-4 z-10">
          <div className="flex justify-between items-start">
            <h2 className={`text-xl font-bold tracking-wide group-hover:text-cyan-300 transition-colors ${colors.text}`}>
              {name}
            </h2>
            <span className={`text-xs px-3 py-1 rounded-full ${colors.accent}`}>
              {category}
            </span>
          </div>

          
          <p className="text-sm text-white/80 line-clamp-3">
            {description}
          </p>
          
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-1 rounded-full bg-black/40 text-white/80"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="mt-auto flex items-center justify-between pt-2">
            <p className="text-xs text-white/60">
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </p>
            <div className="mt-0">
              {githublink && (
                <a 
                  href={githublink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-end gap-1 text-xl text-blue-300 hover:underline"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-6 h-6"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M12 0C5.371 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.613-4.042-1.613-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.086 1.84 1.24 1.84 1.24 1.07 1.832 2.809 1.303 3.494.996.108-.776.418-1.303.76-1.603-2.665-.303-5.466-1.336-5.466-5.933 0-1.31.469-2.381 1.235-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.51 11.51 0 0 1 3.003-.404c1.02.004 2.046.137 3.003.404 2.29-1.552 3.295-1.23 3.295-1.23.655 1.653.244 2.873.12 3.176.77.84 1.234 1.91 1.234 3.221 0 4.61-2.806 5.627-5.478 5.922.43.37.814 1.1.814 2.22 0 1.604-.015 2.896-.015 3.293 0 .32.19.694.8.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </a>
              )}
          </div>
          </div>
          

        </div>
        {/* Animated star with tail */}

      </ProjectLink>
    </div>
  );
};

ProjectLayout.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  demoLink: PropTypes.string.isRequired,
  category: PropTypes.oneOf(['react', 'django', 'react-native', 'ai']),
  tags: PropTypes.arrayOf(PropTypes.string),
  imageUrl: PropTypes.string,
  githublink: PropTypes.string // <-- Add this line
};


export default ProjectLayout;