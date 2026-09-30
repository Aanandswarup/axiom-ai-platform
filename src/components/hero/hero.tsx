"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { HeroCanvas } from "./hero-canvas";
import { ArrowRight, Play, Terminal, Shield, Sparkles, CheckCircle2, ChevronDown } from "lucide-react";

export function Hero() {
  const headlineWords = "Software that writes itself. You just steer.".split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
      {/* 3D WebGL Particle Canvas */}
      <HeroCanvas />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Live Fleet Telemetry Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-violet-500/30 shadow-lg shadow-violet-950/30 mb-8 cursor-pointer hover:border-cyan-400/50 transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-xs font-medium text-slate-200 dark:text-slate-200 light:text-slate-800 tracking-wide">
            FLEET STATUS: <span className="text-cyan-400 font-semibold">4,218 AGENTS ACTIVE</span> ACROSS 340 REPOSITORIES
          </span>
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
        </motion.div>

        {/* Word-by-Word Staggered Headline */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.08] mb-6 max-w-4xl"
        >
          {headlineWords.map((word, idx) => {
            const isHighlighted = word.includes("writes") || word.includes("steer.");
            return (
              <motion.span
                key={idx}
                variants={wordVariants}
                className={`inline-block mr-2.5 sm:mr-3.5 ${
                  isHighlighted
                    ? "bg-gradient-to-r from-cyan-400 via-indigo-300 to-violet-500 bg-clip-text text-transparent"
                    : "text-slate-100 dark:text-slate-100 light:text-slate-900"
                }`}
              >
                {word}
              </motion.span>
            );
          })}
        </motion.h1>

        {/* Confident Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          className="text-base sm:text-xl md:text-2xl text-slate-300 dark:text-slate-300 light:text-slate-700 max-w-3xl mb-10 leading-relaxed font-normal"
        >
          Deploy an autonomous multi-agent engineering fleet that plans architecture, writes typed code, runs end-to-end test suites, and merges PRs. You set the guardrails. AXIOM handles the sprint.
        </motion.p>

        {/* Dual CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16"
        >
          {/* Primary CTA with animated gradient border */}
          <a
            href="#console"
            className="relative group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-white overflow-hidden shadow-xl shadow-violet-600/30 hover:shadow-cyan-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 group-hover:opacity-90 transition-opacity" />
            <span className="absolute inset-[-100%] animate-conic-spin bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.4)_180deg,transparent_360deg)] opacity-30" />
            <span className="relative flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyan-300" />
              <span>Initialize Agent Fleet</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>

          {/* Secondary CTA */}
          <a
            href="#console"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl text-base font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 glass-panel border border-white/10 dark:border-white/10 light:border-violet-300 hover:border-cyan-400/40 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-violet-50 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <Play className="w-4 h-4 text-cyan-400 fill-cyan-400/30" />
            <span>Simulate Live Sprint</span>
          </a>
        </motion.div>

        {/* Proof Badges Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-600"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Deterministic Guardrails</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>Zero Data Training Retention</span>
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-violet-400" />
            <span>Dockerized Ephemeral Sandboxes</span>
          </div>
        </motion.div>

        {/* Bouncing Scroll Cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 flex flex-col items-center gap-2 text-slate-400 dark:text-slate-400 light:text-slate-500 cursor-pointer"
          onClick={() => {
            const marquee = document.getElementById("marquee");
            marquee?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="font-mono text-[10px] tracking-widest uppercase">Explore Fleet Architecture</span>
          <div className="w-5 h-9 rounded-full border-2 border-slate-600/50 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
