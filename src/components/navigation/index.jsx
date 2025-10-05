"use client";
import { useState } from "react";
import { Home, User, Palette, Phone, Menu, X } from "lucide-react";

const navLinks = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: Palette },
  { id: "contact", label: "Contact", icon: Phone },
];

const Navigation = ({ handleNavClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (sectionId) => {
    handleNavClick(sectionId);
    setIsOpen(false); // Close menu on link click
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-3 sm:p-4 lg:p-6 backdrop-blur-md bg-black/10 border-b border-cyan-400/10">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div
          className="text-white text-lg sm:text-xl lg:text-xl font-bold cursor-pointer transition-colors hover:text-cyan-400 font-stardock"
          onClick={() => handleItemClick("hero")}
        >
          AKHILENDRA J.
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 lg:space-x-8">
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleItemClick(id)}
              className="relative text-cyan-300 font-stardock text-xs sm:text-base lg:text-sm transition-all hover:text-cyan-400"
            >
              {label.toUpperCase()}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-cyan-300 hover:text-cyan-400 transition-transform"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-2xl border-t border-cyan-400/20 shadow-[0_8px_32px_rgba(0,255,255,0.2)] rounded-b-2xl mt-2 px-6 py-4 flex flex-col space-y-3 md:hidden animate-slideDown"
        >
          {navLinks.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleItemClick(id)}
              className="flex items-center space-x-3 text-white text-base font-medium hover:text-cyan-400 transition-all"
            >
              <Icon className="w-5 h-5 text-cyan-300" />
              <span className="font-stardock">{label}</span>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
