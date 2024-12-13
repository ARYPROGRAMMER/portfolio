"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Coffee } from "lucide-react";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const previous = scrollYProgress.getPrevious();
      const direction = previous !== undefined ? current - previous : 0;
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  const downloadResume = () => {
    window.open("/resume.pdf", "_blank");
  };

  const buyMeACoffee = () => {
    window.open("https://www.buymeacoffee.com/aryasingh", "_blank");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 0,
          y: -50,
        }}
        animate={{
          y: visible ? 0 : -50,
          opacity: visible ? 1 : 0,
          filter: visible ? "blur(0px)" : "blur(10px)",
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        className={cn(
          "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-5 rounded-lg border shadow-xl items-center justify-center space-x-4",
          className
        )}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          background:
            "linear-gradient(145deg, rgba(17, 25, 40, 0.8), rgba(40, 50, 60, 0.8))",
          borderRadius: "16px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        {navItems.map((navItem, idx) => (
          <Link
            key={`link-${idx}`}
            href={navItem.link}
            className="group relative flex items-center space-x-1 text-neutral-600 dark:text-neutral-50"
          >
            <motion.span
              className="block sm:hidden text-neutral-400 dark:group-hover:text-neutral-300 transition-all"
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              {navItem.icon}
            </motion.span>
            <motion.span
              className="text-sm !cursor-pointer relative"
              whileHover={{
                y: -2,
                color: "#ffa500",
                transition: { duration: 0.2 },
              }}
            >
              {navItem.name}
            </motion.span>
          </Link>
        ))}

        <button
          onClick={downloadResume}
          className="relative group border text-sm font-medium border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full overflow-hidden transition-all duration-300"
        >
          <span className="relative z-10">Download Résumé</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-500 opacity-0 group-hover:opacity-20"
            layoutId="hoverEffect"
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-blue-500 group-hover:border-opacity-100 opacity-0 group-hover:opacity-100"
            animate={{ opacity: 1, scale: [1, 1.05, 1] }}
          />
        </button>

        <motion.button
          onClick={buyMeACoffee}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{ scale: 0.9 }}
          className="relative flex items-center space-x-2 bg-gradient-to-br from-[#ff5f5f] via-[#ff9130] to-[#ffdb58] text-sm font-medium text-white px-5 py-2.5 rounded-full shadow-lg hover:shadow-2xl overflow-hidden"
        >
          <motion.div
            animate={{
              rotate: isHovered ? [0, 20, -20, 15, -15, 10, -10, 0] : 0,
              transition: {
                duration: 0.6,
                type: "spring",
                stiffness: 300,
                damping: 10,
              },
            }}
            whileHover={{
              scale: 1.2,
              rotate: [0, 20, -20, 0],
              transition: {
                duration: 0.4,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          >
            <Coffee className="w-5 h-5" />
          </motion.div>
          <span>Support Me Building CodeX</span>
          <motion.div
            className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100"
            layoutId="hoverEffectCoffee"
          />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};
