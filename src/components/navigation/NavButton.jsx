import {
  Github,
  Home,
  Linkedin,
  NotebookText,
  Palette,
  Phone,
  Twitter,
  User,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import ResponsiveComponent from "../ResponsiveComponent";
import clsx from "clsx";
import { motion } from "framer-motion";

const getIcon = (icon) => {
  switch (icon) {
    case "home":
      return <Home className="w-full h-auto ani" strokeWidth={1.5} />;
    case "about":
      return <User className="w-full h-auto" strokeWidth={1.5} />;
    case "projects":
      return <Palette className="w-full h-auto" strokeWidth={1.5} />;
    case "contact":
      return <Phone className="w-full h-auto" strokeWidth={1.5} />;
    case "github":
      return <Github className="w-full h-auto" strokeWidth={1.5} />;
    case "linkedin":
      return <Linkedin className="w-full h-auto" strokeWidth={1.5} />;
    case "twitter":
      return <Twitter className="w-full h-auto" strokeWidth={1.5} />;
    case "resume":
      return <NotebookText className="w-full h-auto" strokeWidth={1.5} />;

    default:
      return <Home className="w-full h-auto" strokeWidth={1.5} />;
  }
};

const item = {
  hidden: { scale: 0 },
  show: { scale: 1 },
};

const NavLink = motion(Link);

const NavButton = ({
  x,
  y,
  label,
  link,
  icon,
  newTab,
  labelDirection = "right",
}) => {
  return (
    <ResponsiveComponent>
      {({ size }) => {
        return size && size >= 480 ? (
          <div
            className="absolute cursor-pointer z-50"
            style={{ transform: `translate(${x}, ${y})` }}
          >
            <NavLink
              variants={item}
              href={link}
              target={newTab ? "_blank" : "_self"}
              className="text-foreground  rounded-full flex items-center justify-center"
              aria-label={label}
              name={label}
              prefetch={false}
              scroll={false}
            >
              <span className="relative w-14 h-14 p-4 rounded-xl bg-black/50 backdrop-blur-md 
             border border-cyan-400/30 shadow-lg  hover:ring-cyan-300 ">
                 <span className="block w-full h-full">
                  {getIcon(icon)}
                </span>


                <span className="peer bg-transparent absolute top-0 left-0 w-full h-full" />

                <span className="absolute hidden peer-hover:block px-2 py-1 left-full mx-2 top-1/2 -translate-y-1/2 bg-background text-foreground text-sm rounded-md shadow-lg whitespace-nowrap">
                  {label}
                </span>
              </span>
            </NavLink>
          </div>
        ) : (
          <div className="w-fit cursor-pointer z-50">
            <NavLink
              variants={item}
              href={link}
              target={newTab ? "_blank" : "_self"}
              className="text-foreground  rounded-xl flex items-center justify-center"
              aria-label={label}
              name={label}
              prefetch={false}
              scroll={false}
            >
             <span className="relative w-10 h-10 xs:w-14 xs:h-14 p-2.5 xs:p-4 rounded-full border border-cyan-400/50 shadow-[0_0_15px_2px_rgba(34,211,238,0.4)] hover:shadow-[0_0_20px_4px_rgba(34,211,238,0.6)] transition-all duration-300 bg-black/30 backdrop-blur-md">
              {/* Cosmic Glow Ring */}
              <span className="absolute -inset-1 rounded-full bg-cyan-400/10 blur-lg animate-pulse z-[-1]" />

              {/* Icon itself */}
              <span className="block w-full h-full">
                {getIcon(icon)}
              </span>
            </span>

            </NavLink>
          </div>
        );
      }}
    </ResponsiveComponent>
  );
};

export default NavButton;
