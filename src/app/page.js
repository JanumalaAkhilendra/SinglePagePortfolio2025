// Home.js (WITH EXPERIENCE TIMELINE)
'use client';

import { useEffect, useState, Suspense, useCallback, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ChevronDown, Mail, MapPin, ExternalLink, Calendar, Rocket, Satellite, Cpu } from "lucide-react";
import { OrbitControls } from '@react-three/drei';

// Components
import StarsBackground from "@/components/StarsBackground";
import SpaceButton from "@/components/SpaceButton";
import SpaceStationModel from "@/components/models/SpaceStationModel";
import Navigation from "@/components/navigation";
import Loader from "@/components/Loader/Loader";
import ElectricBorder from "@/components/ElectricBorder"; 
import CircularGallery from "@/components/CircularGallery"; 
import ExperienceTimeline from "@/components/ExperienceTimeline"; // New component

// Constants
const SOCIAL_LINKS = [
  { label: "GITHUB", href: "https://github.com/JanumalaAkhilendra", icon: "👨‍💻" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/akhilendra/", icon: "💼" },
  { label: "X", href: "https://x.com/JanumalaAkhilendra", icon: "🐦" },
  { label: "Resume", href: "/Akhilendra6.pdf", icon: "📄" },
  { label: "Leetcode", href: "https://leetcode.com/u/janumala_akhilendra/", icon: "⚡" }
];

const SECTION_IDS = {
  HERO: 'hero',
  ABOUT: 'about',
  EXPERIENCE: 'experience',
  PROJECTS: 'projects',
  CONTACT: 'contact'
};

const PROJECT_DATA = [
  { 
    image: '/project_images/copilot.png', 
    text: 'Space Station Portal', 
    category: 'react',
    description: 'Advanced React-based portal with real-time data visualization',
    tech: ['React', 'Three.js', 'WebGL']
  },
  { 
    image: '/project_images/artisthub.png', 
    text: 'AI Vision System', 
    category: 'ai',
    description: 'Computer vision platform for artistic style analysis and transfer',
    tech: ['Python', 'OpenCV', 'TensorFlow']
  },
  { 
    image: '/project_images/creatiport.png', 
    text: 'E-commerce Backend', 
    category: 'django',
    description: 'Scalable Django REST API with payment integration',
    tech: ['Django', 'PostgreSQL', 'Redis']
  },
  { 
    image: '/project_images/digilabs.png', 
    text: 'Cross-Platform Mobile App', 
    category: 'react-native',
    description: 'Mobile application for digital laboratory management',
    tech: ['React Native', 'Firebase', 'Redux']
  },
  { 
    image: '/project_images/inscripts.png', 
    text: 'Blockchain Explorer', 
    category: 'react',
    description: 'Real-time blockchain transaction visualization dashboard',
    tech: ['React', 'Web3.js', 'Node.js']
  },
  { 
    image: '/project_images/Uifry.png', 
    text: 'NLP Sentiment Analysis', 
    category: 'ai',
    description: 'Natural language processing for market sentiment analysis',
    tech: ['Python', 'NLTK', 'Transformers']
  },
];

const SKILLS = [
  { category: "Frontend", skills: ["React", "Next.js", "TypeScript", "Three.js", "Tailwind CSS"] },
  { category: "Backend", skills: ["Node.js", "Python", "Django", "PostgreSQL", "Redis"] },
  { category: "AI/ML", skills: ["Computer Vision", "TensorFlow", "OpenCV", "NLP", "PyTorch"] },
  { category: "Mobile", skills: ["React Native", "Flutter", "iOS/Android Development"] }
];

// Experience Data (Can be moved to separate JSON file)
const EXPERIENCE_DATA = [
  {
    id: 1,
    company: "Tech Innovators Inc.",
    position: "Senior Full Stack Developer",
    period: "2023 - Present",
    duration: "1+ years",
    location: "Remote",
    type: "work",
    side: "left",
    description: "Leading development of AI-powered SaaS platforms and mentoring junior developers in advanced React and Node.js patterns.",
    technologies: ["React", "Node.js", "AWS", "Python", "MLOps"],
    achievements: [
      "Reduced application load time by 40% through code splitting",
      "Led team of 4 developers on flagship product",
      "Implemented CI/CD pipeline reducing deployment time by 60%"
    ],
    icon: "🚀"
  },
  {
    id: 2,
    company: "AI Research Lab",
    position: "Computer Vision Engineer",
    period: "2022 - 2023",
    duration: "1 year",
    location: "San Francisco, CA",
    type: "work",
    side: "right",
    description: "Developed and deployed computer vision models for real-time object detection and image segmentation in production environments.",
    technologies: ["Python", "OpenCV", "TensorFlow", "PyTorch", "Docker"],
    achievements: [
      "Achieved 95% accuracy in object detection models",
      "Optimized model inference time by 50%",
      "Published research paper on advanced CV techniques"
    ],
    icon: "🛰️"
  },
  {
    id: 3,
    company: "Digital Solutions LLC",
    position: "Full Stack Developer",
    period: "2021 - 2022",
    duration: "1 year",
    location: "New York, NY",
    type: "work",
    side: "left",
    description: "Built scalable web applications for various clients using modern JavaScript frameworks and cloud technologies.",
    technologies: ["JavaScript", "React", "Express.js", "MongoDB", "Azure"],
    achievements: [
      "Delivered 15+ client projects on time and budget",
      "Improved application performance by 35%",
      "Implemented secure authentication systems"
    ],
    icon: "💻"
  },
  {
    id: 4,
    company: "University of Technology",
    position: "Bachelor in Computer Science",
    period: "2017 - 2021",
    duration: "4 years",
    location: "Boston, MA",
    type: "education",
    side: "right",
    description: "Focused on Artificial Intelligence, Machine Learning, and Software Engineering principles. Graduated with Honors.",
    technologies: ["Java", "C++", "Machine Learning", "Algorithms", "Data Structures"],
    achievements: [
      "Graduated Magna Cum Laude (GPA: 3.8/4.0)",
      "Lead Developer for University AI Research Project",
      "Published paper on Neural Network Optimization"
    ],
    icon: "🎓"
  },
  {
    id: 5,
    company: "Startup Accelerator",
    position: "Full Stack Development Intern",
    period: "Summer 2020",
    duration: "3 months",
    location: "Austin, TX",
    type: "internship",
    side: "left",
    description: "Worked with early-stage startups to develop MVP products and implement scalable architecture patterns.",
    technologies: ["React", "Firebase", "Node.js", "Stripe API", "WebSockets"],
    achievements: [
      "Built 3 successful MVP applications",
      "Learned agile development methodologies",
      "Implemented real-time features using WebSockets"
    ],
    icon: "⚡"
  }
];

export default function Home() {
  const [isLaptop, setIsLaptop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [canvasLoaded, setCanvasLoaded] = useState(false);
  const [modelScale, setModelScale] = useState([0.5, 0.5, 0.5]);
  const [activeSection, setActiveSection] = useState(SECTION_IDS.HERO);
  const experienceRef = useRef(null);

  // Enhanced responsive handling
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsLaptop(width >= 1024);
      setIsTablet(width >= 768 && width < 1024);
      setIsMobile(width < 768);
      
      if (width < 640) {
        setModelScale([0.25, 0.25, 0.25]);
      } else if (width < 768) {
        setModelScale([0.35, 0.35, 0.35]);
      } else if (width < 1024) {
        setModelScale([0.6, 0.6, 0.6]);
      } else {
        setModelScale([1, 1, 1]);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const CanvasWrapper = ({ children }) => {
    useEffect(() => {
      const timeout = setTimeout(() => setCanvasLoaded(true), 500);
      return () => clearTimeout(timeout);
    }, []);
    return children;
  };

  const scrollToSection = useCallback((sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleNavClick = useCallback((sectionId) => {
    setActiveSection(sectionId);
    if (sectionId !== SECTION_IDS.HERO) {
      scrollToSection(sectionId);
    }
  }, [scrollToSection]);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Enhanced Stars Background */}
      <StarsBackground />

      <div className="w-full relative z-10">
        {/* Enhanced Navigation & Social Links */}
        {canvasLoaded && (
          <div className="fixed inset-0 z-30 pointer-events-none">
            <div className="pointer-events-auto">
              <Navigation handleNavClick={handleNavClick} />
            </div>
            
            {/* Enhanced Social Links - Responsive */}
            {/* <div className={`absolute right-0 lg:right-24 mx-auto flex flex-col lg:flex-row items-end lg:items-center justify-center lg:justify-end gap-3 px-2 lg:px-4 py-4 mt-20 lg:mt-2 pointer-events-auto ${
              isMobile ? 'top-4 right-2' : 'top-auto'
            }`}>
              {SOCIAL_LINKS.map((link) => (
                <SpaceButton
                  key={link.label}
                  label={isMobile ? link.icon : link.label}
                  imgsrc="/spacebuttoncircle.jpg"
                  href={link.href}
                  className={isMobile ? "text-xs px-2 py-1" : ""}
                />
              ))}
            </div> */}
          </div>
        )}

        {/* Hero Section - Enhanced */}
        <section
          id={SECTION_IDS.HERO}
          className="min-h-screen pt-2 lg:pt-20 flex flex-col items-center text-white relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto w-full h-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 pt-20 z-20">
            <div className={`w-full ${isMobile ? 'text-center' : 'lg:w-1/2 text-left'} space-y-4 lg:space-y-6 mb-8 lg:mb-0`}>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                JANUMALA AKHILENDRA
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-cyan-400 font-light">
                Full-Stack Developer | Computer Vision Specialist | AI Innovator
              </p>
              <p className="text-gray-300 text-base lg:text-lg max-w-2xl">
                Crafting digital experiences at the intersection of cutting-edge web technologies 
                and artificial intelligence.
              </p>
              <button
                className="flex flex-row items-center text-cyan-400 hover:text-white transition-all duration-300 group pt-4"
                onClick={() => handleNavClick(SECTION_IDS.ABOUT)}
              >
                <span className="text-base lg:text-lg mr-2 group-hover:translate-y-1 transition-transform">
                  Explore My Universe
                </span>
                <ChevronDown className="w-6 h-6 lg:w-8 lg:h-8 animate-bounce group-hover:animate-pulse" />
              </button>
            </div>

            {/* Enhanced 3D Canvas - Responsive Positioning */}
            <div className={`relative z-40 ${
              isMobile ? 'w-full h-64 mt-3' : 
              isTablet ? 'w-1/2 h-80' : 
              'w-1/2 h-[500px] lg:h-[600px]'
            }`}>
              <Suspense fallback={<Loader />}>
                <CanvasWrapper>
                  <Canvas 
                    camera={{ 
                      position: isMobile ? [2.5, 0, 0] : [10, 0, 0], 
                      fov: isMobile ? 50 : 40, 
                      near: 0.1, 
                      far: 1000 
                    }}
                  >
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[5, 5, 5]} intensity={1.5} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />
                    <SpaceStationModel 
                      scale={modelScale} 
                      activeSection={activeSection} 
                      position={[0, -10, 0]} 
                    />
                    <OrbitControls 
                      enableZoom={!isMobile}
                      enablePan={!isMobile}
                      maxPolarAngle={Math.PI}
                      minPolarAngle={0}
                    />
                  </Canvas>
                </CanvasWrapper>
              </Suspense>
            </div>
          </div>
        </section>

        {/* Enhanced About Section */}
        <section
          id={SECTION_IDS.ABOUT}
          className="min-h-screen flex items-center justify-center p-4 sm:p-8 lg:p-20"
        >
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Skills & Expertise */}
            <div className="space-y-6">
              <ElectricBorder color="#00FFFF" thickness={2} className="w-full">
                <div className="bg-gray-900/80 backdrop-blur-sm p-6 lg:p-8 rounded-lg border border-cyan-500/20">
                  <h2 className="text-2xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Technical Arsenal
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SKILLS.map((skillGroup, index) => (
                      <div key={index} className="space-y-3">
                        <h3 className="text-cyan-400 font-semibold text-base lg:text-lg">{skillGroup.category}</h3>
                        <div className="flex flex-wrap gap-2">
                          {skillGroup.skills.map((skill, skillIndex) => (
                            <span 
                              key={skillIndex}
                              className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full  text-xs lg:text-sm text-cyan-300 hover:bg-cyan-500/20 transition-colors cursor-default"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ElectricBorder>
            </div>

            {/* Professional Summary */}
            <ElectricBorder color="#00FFFF" thickness={2} className="w-full">
              <div className="bg-gray-900/80 backdrop-blur-sm p-6 lg:p-8 rounded-lg border border-cyan-500/20 h-full">
                <h2 className="text-2xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Cosmic Coder
                </h2>
                <div className="space-y-4 text-gray-300">
                  <p className=" text-base lg:text-lg leading-relaxed">
                    I specialize in building scalable full-stack applications with a focus on 
                    <span className="text-cyan-400"> React/Next.js ecosystems </span>
                    and advanced AI implementations, particularly in Computer Vision and Deep Learning.
                  </p>
                  <p className=" text-base lg:text-lg leading-relaxed">
                    My approach combines robust backend architecture with immersive frontend experiences, 
                    creating solutions that are both technically sophisticated and user-centric.
                  </p>
                  <div className="pt-4">
                    <h4 className="text-cyan-400 font-semibold mb-3">Current Focus:</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                        Advanced Computer Vision Systems
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                        Real-time 3D Web Applications
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                        AI-Powered SaaS Platforms
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </ElectricBorder>
          </div>
        </section>

        {/* New Experience Timeline Section */}
        <section
          id={SECTION_IDS.EXPERIENCE}
          className="min-h-screen py-10 relative overflow-hidden"
          ref={experienceRef}
        >
          <div className="max-w-2xl lg:max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
                Mission Timeline
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                My journey through the cosmos of technology and innovation
              </p>
            </div>
            
            <ExperienceTimeline experiences={EXPERIENCE_DATA} />
          </div>
        </section>

        {/* Enhanced Projects Section */}
        <section
          id={SECTION_IDS.PROJECTS}
          className="min-h-screen flex flex-col items-center justify-center py-12 lg:py-20 px-4 sm:px-8 text-white"
        >
          <div className="max-w-7xl mx-auto w-full space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl lg:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Mission Portfolio
              </h2>
              <p className="text-base lg:text-xl  text-white/80 max-w-2xl mx-auto">
                A collection of my interstellar projects exploring the frontiers of technology
              </p>
            </div>
            
            <div className={`relative ${isMobile ? 'h-80' : 'h-96 lg:h-[600px]'} w-full`}>
              <CircularGallery 
                items={PROJECT_DATA.map(p => ({
                  image: p.image,
                  text: p.text,
                  description: p.description,
                  tech: p.tech
                }))}
                bend={isMobile ? 0.8 : 1}
                textColor="#ffffff"
                borderRadius={0.08}
                scrollSpeed={3}
              />
            </div>
          </div>
        </section>

        {/* Enhanced Contact Section */}
        <section
          id={SECTION_IDS.CONTACT}
          className="min-h-screen flex items-center justify-center p-4 sm:p-8 lg:p-20"
        >
          <div className="max-w-4xl mx-auto w-full">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-5xl  font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
                Initiate Contact
              </h2>
              <p className="text-sm lg:text-xl text-white/80 max-w-2xl mx-auto">
                Ready to launch your next project into orbit? Let's connect and create something extraordinary.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <ElectricBorder color="#00FFFF" thickness={2} className="w-full">
                <div className="bg-gray-900/80 backdrop-blur-sm p-6 lg:p-8 rounded-lg border border-cyan-500/20 h-full">
                  <h3 className="text-xl lg:text-2xl font-bold text-cyan-400 mb-6">Transmission Channels</h3>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 group cursor-pointer">
                      <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                        <Mail className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <p className="text-white group-hover:text-cyan-400 transition-colors">
                          your.email@domain.com
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Location</p>
                        <p className="text-white">Earth, Solar System</p>
                      </div>
                    </div>

                    {/* Availability Status */}
                    <div className="pt-4 border-t border-cyan-500/20">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-400 font-semibold">Currently Accepting Missions</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-2">
                        Available for freelance projects and full-time opportunities
                      </p>
                    </div>
                  </div>
                </div>
              </ElectricBorder>

              {/* Contact Form */}
              <ElectricBorder color="#00FFFF" thickness={2} className="w-full">
                <div className="bg-gray-900/80 backdrop-blur-sm p-6 lg:p-8 rounded-lg border border-cyan-500/20 h-full">
                  <h3 className=" text-xl  lg:text-2xl font-bold text-cyan-400 mb-6">Send Transmission</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-gray-400 transition-colors"
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-gray-400 transition-colors"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Subject"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-gray-400 transition-colors"
                    />
                    <textarea
                      placeholder="Your Message"
                      rows="5"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-gray-400 transition-colors resize-none"
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
                    >
                      Launch Message
                    </button>
                  </form>
                </div>
              </ElectricBorder>
            </div>
          </div>
        </section>
      </div>

      {/* Enhanced Footer */}
      <footer className="relative z-10 bg-gray-900/80 backdrop-blur-sm border-t border-cyan-500/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
          <p className="text-gray-400">
            Crafted with <span className="text-cyan-400">⚡</span> in the cosmos • © {new Date().getFullYear()} Janumala Akhilendra
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Exploring the final frontier of technology, one project at a time
          </p>
        </div>
      </footer>

      {/* Enhanced Buy Me a Coffee */}
      <a
        href="https://www.buymeacoffee.com/janumalaakr"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 z-50 transform hover:scale-110 transition-transform duration-300"
      >
        <img
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          alt="Buy Me A Coffee"
          className={`${isMobile ? 'h-8' : 'h-12'} w-auto drop-shadow-lg`}
        />
      </a>
    </main>
  );
}