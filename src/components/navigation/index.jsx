// src/components/navigation.jsx (Final Responsive Top Bar)

"use client";
import { Home, User, Palette, Phone } from "lucide-react";

const navLinks = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: Palette },
  { id: "contact", label: "Contact", icon: Phone },
];

const Navigation = ({ handleNavClick }) => {
  const handleItemClick = (sectionId) => {
    handleNavClick(sectionId);
  };

  return (
    // Fixed Top Bar: Responsive padding and blur
    <nav className="fixed top-0 left-0 w-full z-50 p-3 sm:p-4 lg:p-6 backdrop-blur-sm bg-black/10">
      <div className="flex items-center justify-between max-w-7xl mx-auto">

        {/* 1. Logo/Name (Left Side) - Responsive Text Size */}
        <div 
          className="text-white text-lg sm:text-xl lg:text-2xl font-bold cursor-pointer transition-colors hover:text-cyan-400 font-stardock"
          onClick={() => handleItemClick('hero')}
        >
          AKHILENDRA J.
        </div>

        {/* 2. Navigation Links (Right Side) - Responsive Spacing & Layout */}
        <div className="flex space-x-3 sm:space-x-4 lg:space-x-8">
          {navLinks.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleItemClick(id)}
              // Text size, padding, and hover effects
              className="group flex items-center space-x-0.5 text-white text-sm sm:text-base font-medium transition-colors hover:text-cyan-400 focus:outline-none"
            >
              {/* Icon - Always visible, slightly smaller on mobile */}
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:-translate-y-[1px]" strokeWidth={1.5} />
              
              {/* Label - Condensed on smaller mobile screens, full text on larger screens */}
              <span className="hidden xs:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;