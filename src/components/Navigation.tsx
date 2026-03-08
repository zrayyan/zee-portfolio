"use client";

import React from "react";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Research", href: "/research" },
  { name: "Projects", href: "/projects" },
  { name: "Writing", href: "/writing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-primary/20"
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* logo / left space could go here if needed */}

        {/* desktop links */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-foreground hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* mobile toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-md text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* theme toggle always visible */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary ml-4"
          aria-label="Toggle dark/light theme"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      {/* mobile menu overlay */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md">
          <div className="flex flex-col items-center space-y-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMenu}
                className="text-foreground text-lg hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.header>
  );
}