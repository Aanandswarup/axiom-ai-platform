"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { MessageSquare, GitFork, Cpu, ShieldCheck, ArrowDown } from "lucide-react";

interface Step {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  deliverable: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "DESCRIBE",
    subtitle: "State Intent in Plain Engineering English",
    description:
      "Paste an issue link, PRD document, or simple terminal command. AXIOM parses requirements, detects edge cases, and maps required codebase touchpoints.",
    icon: MessageSquare,
    tags: ["GitHub Issues", "Jira / Linear", "Raw Markdown PRD"],
    deliverable: "Decomposed task dependency graph with scoped AST targets",
  },
  {
    number: "02",
    title: "PLAN",
    subtitle: "Architecture Breakdown & ADR Synthesis",
    description:
      "The Architect Agent drafts an Architecture Decision Record (ADR), models data schemas, and writes test contracts before touching a single line of production code.",
    icon: GitFork,
    tags: ["ADR Generation", "Schema Migrations", "Contract Tests"],
    deliverable: "Executable sprint specification signed by static analyzers",
  },
  {
    number: "03",
    title: "BUILD",
    subtitle: "Concurrent Multi-Agent Code Synthesis",
    description:
      "Specialized frontend, backend, and infrastructure agents spin up ephemeral sandboxes and author typed code simultaneously in isolated git branches.",
    icon: Cpu,
    tags: ["Parallel Worktrees", "AST Manipulation", "Strict Typing"],
    deliverable: "Zero-conflict atomic git commits with formatted code",
  },
  {
    number: "04",
    title: "VERIFY",
    subtitle: "Self-Healing Tests & Supervisor Merge",
    description:
      "Headless browsers execute end-to-end user flows. Flakes are self-healed, security policies verified, and a clean PR is queued for your final click.",
    icon: ShieldCheck,
    tags: ["Playwright / Vitest", "Secret Audit", "1-Click Merge"],
    deliverable: "Production-ready pull request with passing CI status",
  },
];

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative py-24 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      {/* Section Heading */}
      <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-mono text-xs mb-4">
          <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
          FOUR-STAGE AUTONOMY PIPELINE
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-slate-100 dark:text-slate-100 light:text-slate-900">
          From human intent to production code.
        </h2>
        <p className="text-base sm:text-lg text-slate-300 dark:text-slate-300 light:text-slate-600">
          How AXIOM turns vague sprint items into clean, tested pull requests without human micromanagement.
        </p>
      </div>

      {/* Timeline track container */}
      <div className="relative">
        {/* Background inactive vertical track line */}
        <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/10 dark:bg-white/10 light:bg-violet-200" />

        {/* Scroll-linked dynamic animated active line */}
        <motion.div
          style={{ scaleY }}
          className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-[2.5px] -translate-x-1/2 bg-gradient-to-b from-cyan-400 via-violet-500 to-emerald-400 origin-top z-10 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
        />

        {/* 4 Steps */}
        <div className="space-y-16 sm:space-y-24">
          {STEPS.map((step, idx) => {
            const isEven = idx % 2 === 0;
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? "sm:flex-row-reverse" : ""
                } gap-8 sm:gap-16 pl-14 sm:pl-0`}
              >
                {/* Central Milestone Node */}
                <div className="absolute left-6 sm:left-1/2 top-1.5 -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-2xl bg-[#080b18] border-2 border-cyan-400/80 shadow-lg shadow-cyan-500/30 flex items-center justify-center text-cyan-300 font-mono text-xs font-bold">
                    {step.number}
                  </div>
                </div>

                {/* Content Card (fills 50% on desktop) */}
                <div
                  className={`w-full sm:w-[calc(50%-3rem)] ${
                    isEven ? "sm:text-right" : "sm:text-left"
                  }`}
                >
                  <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 dark:border-white/10 light:border-violet-300/40 shadow-xl shadow-black/20 hover:border-cyan-400/40 transition-all duration-300">
                    <div
                      className={`flex items-center gap-3 mb-4 ${
                        isEven ? "sm:justify-end" : ""
                      }`}
                    >
                      <div className="w-9 h-9 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-cyan-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                        Stage {step.number}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold mb-1 text-slate-100 dark:text-slate-100 light:text-slate-900">
                      {step.title}
                    </h3>
                    <div className="font-mono text-xs text-violet-400 mb-4 font-medium">
                      {step.subtitle}
                    </div>

                    <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Tag Pills */}
                    <div
                      className={`flex flex-wrap gap-2 mb-4 ${
                        isEven ? "sm:justify-end" : ""
                      }`}
                    >
                      {step.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Deliverable info */}
                    <div
                      className={`pt-3 border-t border-white/10 text-xs font-mono text-slate-400 ${
                        isEven ? "sm:text-right" : ""
                      }`}
                    >
                      <span className="text-slate-500">Output: </span>
                      <span className="text-emerald-400 font-medium">
                        {step.deliverable}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
