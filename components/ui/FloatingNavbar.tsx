"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Coffee, Menu, X, ChevronRight } from "lucide-react";

interface NavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
}

interface FloatingNavProps {
  navItems: NavItem[];
  className?: string;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({
  navItems,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [blurStrength, setBlurStrength] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsMenuOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(currentScrollY / maxScroll, 1);
      
      setScrollProgress(progress);
      
      // Smooth blur transition based on scroll
      const newBlurStrength = Math.min(10 + (progress * 15), 25);
      setBlurStrength(newBlurStrength);

      // Visibility control with smoother threshold
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY + 5) { // Reduced threshold
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 5) { // Reduced threshold
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const downloadResume = () => window.open("/resume.pdf", "_blank");
  const buyMeACoffee = () =>
    window.open("https://www.buymeacoffee.com/aryasingh", "_blank");

  return (
    <motion.div
      className="fixed flex items-center justify-center z-[5000] left-0 right-0 top-6 mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.95,
        }}
        transition={{
          duration: 0.6,
          ease: [0.32, 0.72, 0, 1], // Custom easing for smoother motion
        }}
        style={{
          backdropFilter: `blur(${blurStrength}px)`,
          WebkitBackdropFilter: `blur(${blurStrength}px)`, // For Safari support
        }}
        className={`
          pointer-events-auto
          flex items-center justify-center
          w-[96%] max-w-3xl
          px-3 py-2
          bg-white/[0.06]
          border border-white/[0.12]
          shadow-[0_8px_32px_rgba(0,0,0,0.12)]
          rounded-xl
          transform-gpu
          transition-all
          duration-700
          ${className}
        `}
      >
        <div className="flex items-center justify-between w-full">
          <AnimatePresence mode="wait">
            {(!isMobile || isMenuOpen) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  transition: { 
                    duration: 0.4,
                    ease: [0.32, 0.72, 0, 1]
                  },
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  transition: { duration: 0.3 },
                }}
                className={`flex ${
                  isMobile
                    ? "flex-col w-full absolute top-full left-0 mt-2 bg-black/40 backdrop-blur-xl rounded-xl p-2 border border-white/20"
                    : "flex-row items-center"
                }`}
              >
                {navItems.map((item, index) => (
                  <NavItem key={index} {...item} isMobile={isMobile} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className={`flex items-center gap-3 ${isMobile ? "ml-auto" : ""}`}>
            <AnimatedButton
              onClick={downloadResume}
              className="bg-blue-500/80 hover:bg-blue-500 transition-colors duration-300"
            >
              <span className="whitespace-nowrap">
                {isMobile ? "Résumé" : "Download Résumé"}
              </span>
            </AnimatedButton>

            <motion.button
              onClick={buyMeACoffee}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              className="px-3 py-1.5 rounded-md text-white text-sm font-medium 
                bg-gradient-to-r from-orange-400/80 to-pink-500/80 
                hover:from-orange-400 hover:to-pink-500
                shadow-md 
                transition-all duration-300
                flex items-center justify-center gap-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  rotate: isHovered ? [0, 15, -15, 10, -10, 5, -5, 0] : 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                  repeat: isHovered ? Infinity : 0,
                }}
              >
                <Coffee className="w-4 h-4" />
              </motion.div>
              <span className="whitespace-nowrap">
                {isMobile ? "Support Me" : "Support Me Building CodeX"}
              </span>
            </motion.button>

            {isMobile && (
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-white rounded-md hover:bg-white/10 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMenuOpen ? "close" : "open"}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            )}
          </div>
        </div>
      </motion.nav>
    </motion.div>
  );
};

const NavItem: React.FC<NavItem & { isMobile: boolean }> = ({
  name,
  link,
  icon,
  isMobile,
}) => (
  <Link href={link} className={`w-full ${!isMobile && "w-auto"}`}>
    <motion.div
      className={`flex items-center justify-center gap-2 px-3 py-1.5
        ${isMobile ? "rounded-md w-full" : "rounded-full"}
        text-white/80 hover:text-white hover:bg-white/10 
        transition-all duration-300`}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.2 },
      }}
    >
      {icon && (
        <span className="text-white/60 group-hover:text-white/80 transition-colors duration-300">{icon}</span>
      )}
      <span className="text-sm font-medium whitespace-nowrap">{name}</span>
      {isMobile && <ChevronRight size={16} className="ml-auto text-white/60" />}
    </motion.div>
  </Link>
);

const AnimatedButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}> = ({ children, className = "", onClick }) => (
  <motion.button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-md text-white text-sm font-medium 
      shadow-md transition-all duration-300 ease-in-out 
      flex items-center justify-center ${className}`}
    whileHover={{
      scale: 1.05,
      transition: { duration: 0.3 },
    }}
    whileTap={{
      scale: 0.95,
      transition: { duration: 0.2 },
    }}
  >
    {children}
  </motion.button>
);

export default FloatingNav;