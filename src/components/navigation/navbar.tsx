"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Cpu, Menu, X, ArrowRight, ShieldCheck, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Platform", href: "#features" },
    { name: "Agent Console", href: "#console" },
    { name: "Workflow", href: "#process" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 transition-all duration-300 pointer-events-none">
      <div
        className={`pointer-events-auto w-full max-w-7xl transition-all duration-500 rounded-2xl ${
          isScrolled
            ? "mt-3 py-2.5 px-5 glass-panel bg-opacity-80 dark:bg-opacity-80 shadow-2xl shadow-violet-950/20 border border-white/10 dark:border-white/10 light:border-violet-300/40"
            : "mt-5 py-4 px-6 bg-transparent border border-transparent"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 p-[1px] shadow-lg shadow-violet-500/20 group-hover:shadow-cyan-500/30 transition-shadow duration-300">
              <div className="w-full h-full bg-[#070913] rounded-[11px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              {/* Telemetry ping dot */}
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-xl font-bold tracking-wider bg-gradient-to-r from-white via-slate-100 to-slate-400 dark:from-white dark:via-slate-100 dark:to-slate-300 light:from-slate-950 light:to-violet-900 bg-clip-text text-transparent">
                  AXIOM
                </span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold tracking-wider">
                  v2.4
                </span>
              </div>
              <span className="font-mono text-[9px] tracking-widest text-slate-400 dark:text-slate-400 light:text-slate-500 uppercase -mt-0.5">
                Autonomous Fleet
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full glass-panel border border-white/5 dark:border-white/5 light:border-violet-200/50">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-xs lg:text-sm font-medium text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-cyan-400 dark:hover:text-cyan-400 light:hover:text-violet-600 rounded-full transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Stack */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />

            <a
              href="#console"
              className="relative group inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white overflow-hidden transition-all duration-300 shadow-md shadow-violet-600/20 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              {/* Radiant animated conic background */}
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 group-hover:from-violet-500 group-hover:to-cyan-400 transition-all duration-300" />
              <span className="relative flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-200" />
                <span>Deploy Fleet</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl glass-panel text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="sm:hidden mt-3 pt-3 border-t border-white/10 dark:border-white/10 light:border-violet-200/50 flex flex-col gap-2"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-200 dark:text-slate-200 light:text-slate-800 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#console"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-violet-600/30 cursor-pointer"
              >
                <Terminal className="w-4 h-4" />
                <span>Deploy Fleet</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
