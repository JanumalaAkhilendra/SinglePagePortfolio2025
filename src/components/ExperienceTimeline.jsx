// components/ExperienceTimeline.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';

const ExperienceTimeline = ({ experiences }) => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Check mobile screen on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Asteroid movement transformation - different for mobile
  const asteroidY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  
  // Experience card animations
  const cardOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const index = Math.min(
        experiences.length - 1,
        Math.floor(latest * experiences.length)
      );
      setActiveIndex(index);
    });

    return () => unsubscribe();
  }, [scrollYProgress, experiences.length]);

  const getExperienceTypeColor = (type) => {
    switch (type) {
      case 'work': return 'from-green-500 to-emerald-600';
      case 'education': return 'from-blue-500 to-cyan-600';
      case 'internship': return 'from-purple-500 to-indigo-600';
      default: return 'from-cyan-500 to-blue-600';
    }
  };

  const getExperienceTypeLabel = (type) => {
    switch (type) {
      case 'work': return 'Professional Mission';
      case 'education': return 'Academic Training';
      case 'internship': return 'Exploratory Mission';
      default: return 'Experience';
    }
  };

  // Mobile-specific timeline
  if (isMobile) {
    return (
      <div ref={sectionRef} className="relative py-10">
        {/* Mobile Timeline - Horizontal Scroll */}
        <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
          <div className="flex gap-6 px-4">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                className="w-[17rem] flex-shrink-0 snap-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {/* Mobile Experience Card */}
                <div className="bg-gray-900/90 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 shadow-2xl hover:border-cyan-400/40 transition-all duration-300 h-full">
                  
                  {/* Experience Type Badge */}
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getExperienceTypeColor(experience.type)} text-white mb-4`}>
                    <span className="mr-2">{experience.icon}</span>
                    {getExperienceTypeLabel(experience.type)}
                  </div>

                  {/* Position & Company */}
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                    {experience.position}
                  </h3>
                  <h4 className="text-base font-semibold text-cyan-400 mb-3">
                    {experience.company}
                  </h4>

                  {/* Period & Duration - Mobile Optimized */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{experience.period}</span>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{experience.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{experience.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    {experience.description}
                  </p>

                  {/* Technologies - Scrollable for mobile */}
                  <div className="mb-4">
                    <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
                      {experience.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-300 whitespace-nowrap flex-shrink-0"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-semibold text-cyan-400">Key Achievements:</h5>
                    <ul className="text-xs text-gray-400 space-y-1">
                      {experience.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1 mr-2 flex-shrink-0"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Mobile Progress Indicator */}
                <div className="flex justify-center mt-4">
                  <div className="flex space-x-1">
                    {experiences.map((_, dotIndex) => (
                      <div
                        key={dotIndex}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          dotIndex === index 
                            ? 'bg-cyan-400 scale-125' 
                            : 'bg-gray-600'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Instructions */}
        <div className="text-center mt-6 px-4">
          <p className="text-cyan-400 text-sm animate-pulse">
            ← Scroll horizontally to explore →
          </p>
        </div>
      </div>
    );
  }

  // Desktop Timeline (Original with improvements)
  return (
    <div ref={sectionRef} className="relative min-h-screen py-20">
      {/* Central Timeline with Moving Asteroid */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full">
        {/* Timeline Line */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-blue-500/40 to-purple-500/20"></div>
        
        {/* Moving Asteroid */}
        <motion.div
          style={{ y: asteroidY }}
          className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <div className="relative">
            {/* Asteroid Core */}
            <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg shadow-orange-500/50 animate-pulse">
              {/* Asteroid Craters */}
              <div className="absolute top-1 left-1 w-1 h-1 bg-orange-700 rounded-full"></div>
              <div className="absolute top-3 right-2 w-1.5 h-1.5 bg-orange-800 rounded-full"></div>
              <div className="absolute bottom-2 left-3 w-1 h-1 bg-orange-700 rounded-full"></div>
            </div>
            
            {/* Asteroid Glow */}
            <div className="absolute inset-0 w-8 h-8 -translate-x-1 -translate-y-1 bg-orange-400/20 rounded-full animate-ping"></div>
            <div className="absolute inset-0 w-10 h-10 -translate-x-2 -translate-y-2 bg-orange-400/10 rounded-full animate-pulse"></div>
            
            {/* Motion Trail */}
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-0.5 h-20 bg-gradient-to-t from-orange-400/50 to-transparent"></div>
          </div>
        </motion.div>

        {/* Timeline Nodes */}
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 ${
              index <= activeIndex ? 'opacity-100' : 'opacity-30'
            } transition-all duration-500`}
            style={{
              top: `${(index / (experiences.length - 1)) * 100}%`
            }}
          >
            <div className={`w-4 h-4 rounded-full border-2 ${
              index <= activeIndex 
                ? 'bg-cyan-400 border-cyan-400 shadow-lg shadow-cyan-400/50' 
                : 'bg-gray-600 border-gray-500'
            } transition-all duration-300`}></div>
          </motion.div>
        ))}
      </div>

      {/* Experience Cards - Improved Responsive */}
      <div className="relative z-10">
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            className={`absolute left-0 right-0 transform -translate-y-1/2 ${
              experience.side === 'left' 
                ? 'lg:pr-1/2 pr-4 pl-4 lg:pl-0' 
                : 'lg:pl-1/2 pl-4 pr-4 lg:pr-0'
            }`}
            style={{
              top: `${(index / (experiences.length - 1)) * 100}%`,
              opacity: cardOpacity,
              scale: cardScale
            }}
          >
            <div className={`flex ${
              experience.side === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'
            } flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-8`}>
              
              {/* Content Card */}
              <motion.div 
                className={`flex-1 ${
                  experience.side === 'left' ? 'lg:text-right' : 'lg:text-left'
                } text-center lg:text-left max-w-lg w-full`}
                initial={{ opacity: 0, x: experience.side === 'left' ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 shadow-2xl hover:border-cyan-400/40 transition-all duration-300">
                  
                  {/* Experience Type Badge */}
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getExperienceTypeColor(experience.type)} text-white mb-4`}>
                    <span className="mr-2">{experience.icon}</span>
                    {getExperienceTypeLabel(experience.type)}
                  </div>

                  {/* Position & Company */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {experience.position}
                  </h3>
                  <h4 className="text-lg font-semibold text-cyan-400 mb-3">
                    {experience.company}
                  </h4>

                  {/* Period & Duration */}
                  <div className="flex flex-col sm:flex-row sm:items-center text-gray-400 text-sm mb-4 gap-2 lg:justify-start justify-center">
                    <div className="flex items-center justify-center lg:justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{experience.period}</span>
                    </div>
                    <span className="hidden sm:inline">•</span>
                    <div className="flex items-center justify-center lg:justify-start">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{experience.duration}</span>
                    </div>
                    <span className="hidden sm:inline">•</span>
                    <div className="flex items-center justify-center lg:justify-start">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{experience.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-4 leading-relaxed text-sm lg:text-base">
                    {experience.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4 justify-center lg:justify-start">
                    {experience.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-300 hover:bg-cyan-500/20 transition-colors cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Achievements */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-semibold text-cyan-400">Key Achievements:</h5>
                    <ul className="text-sm text-gray-400 space-y-1">
                      {experience.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Spacer for desktop */}
              <div className="hidden lg:block w-8"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;