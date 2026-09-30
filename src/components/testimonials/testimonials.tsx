"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Quote, Star, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatarSeed: string;
  metric: string;
  metricLabel: string;
  quote: string;
  tags: string[];
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Dr. Elena Rostova",
    role: "VP of Engineering",
    company: "VectorScale Labs",
    avatarSeed: "elena",
    metric: "-84%",
    metricLabel: "Sprint Backlog Time",
    quote:
      "AXIOM replaced the grueling chore of boilerplate migrations. Our human engineers focus entirely on core algorithm design while our agent fleet handles PRDs, refactors, and test coverage.",
    tags: ["Distributed Systems", "TypeScript", "Microservices"],
  },
  {
    name: "Marcus Vance",
    role: "Principal Infrastructure Architect",
    company: "FinHyper Payments",
    avatarSeed: "marcus",
    metric: "18 PRs",
    metricLabel: "Shipped Overnight",
    quote:
      "The zero-hallucination sandbox is the game changer. If an agent writes code that fails typechecking or unit tests, it doesn't pollute my inbox. It self-heals in Docker and delivers a clean diff in the morning.",
    tags: ["Fintech", "SOC2", "Kubernetes"],
  },
  {
    name: "Aria Chen",
    role: "Head of Developer Platform",
    company: "NexusCloud",
    avatarSeed: "aria",
    metric: "0",
    metricLabel: "Breaking Changes in 9 Mos",
    quote:
      "We gave AXIOM our monolithic REST migration. It mapped 420 endpoints, generated strict tRPC routers, and verified backward compatibility with legacy consumers. Flawless execution.",
    tags: ["API Platform", "tRPC", "GraphQL"],
  },
  {
    name: "Devon Thorne",
    role: "Open Source Maintainer",
    company: "CoreEngine OSS",
    avatarSeed: "devon",
    metric: "4.2x",
    metricLabel: "Community PR Velocity",
    quote:
      "Triaging hundreds of community pull requests used to eat my weekends. AXIOM's QA Sentinel reproduces issues in sandboxes, writes regression tests, and drafts fixes before I even wake up.",
    tags: ["Open Source", "Rust", "Node.js"],
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-mono text-xs mb-4">
            <Star className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/30" />
            FIELD RESULTS
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900">
            Validated by Staff Engineers.
          </h2>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevTestimonial}
            className="p-3 rounded-xl glass-panel border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextTestimonial}
            className="p-3 rounded-xl glass-panel border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Next testimonial"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grid of Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TESTIMONIALS.map((t, idx) => (
          <div
            key={t.name}
            className={`flex flex-col justify-between p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 dark:border-white/10 light:border-violet-300/40 shadow-xl transition-all duration-300 hover:border-cyan-400/40 hover:-translate-y-1 ${
              idx === currentIndex
                ? "ring-2 ring-cyan-400/40 shadow-cyan-500/10"
                : ""
            }`}
          >
            <div>
              {/* Metric Callout Pill */}
              <div className="mb-6 p-3 rounded-2xl bg-gradient-to-r from-violet-950/40 to-cyan-950/30 border border-violet-500/20">
                <div className="font-display text-2xl font-extrabold text-cyan-400">
                  {t.metric}
                </div>
                <div className="font-mono text-[11px] text-slate-400">
                  {t.metricLabel}
                </div>
              </div>

              {/* Quote */}
              <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            {/* Author details */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 p-[1.5px] flex items-center justify-center font-bold text-xs text-white">
                  <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                    {t.name.slice(0, 2).toUpperCase()}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 font-display text-sm font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                    {t.name}
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
                  </div>
                  <span className="text-xs text-slate-400">
                    {t.role} · <strong className="text-slate-300">{t.company}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
