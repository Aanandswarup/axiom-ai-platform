"use client";

import React from "react";
import { Terminal, ArrowRight, ShieldCheck, Zap, Lock } from "lucide-react";

export function CTABanner() {
  return (
    <section className="relative py-28 sm:py-36 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Animated Multi-color Gradient Mesh Background */}
      <div className="relative rounded-[2.5rem] p-8 sm:p-16 lg:p-20 overflow-hidden border border-white/20 dark:border-white/20 light:border-violet-300 shadow-2xl shadow-violet-950/40 text-center">
        {/* Luminous Mesh Nodes */}
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-violet-600/35 rounded-full blur-[120px] pointer-events-none animate-pulse"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-cyan-500/30 rounded-full blur-[120px] pointer-events-none animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/25 rounded-full blur-[140px] pointer-events-none"
        />

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-cyan-300 font-mono text-xs mb-8">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>INSTANT INTEGRATION // NO CREDIT CARD REQUIRED</span>
          </div>

          {/* Oversized Statement Line */}
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.08]">
            Stop babysitting sprints. <br />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-200 to-violet-400 bg-clip-text text-transparent">
              Start directing fleets.
            </span>
          </h2>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
            Connect your repository in two minutes. Set your architecture guardrails, review atomic PRs, and accelerate velocity tenfold.
          </p>

          {/* One Strong Action */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
            <a
              href="#console"
              className="relative group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-base sm:text-lg font-bold text-white overflow-hidden shadow-2xl shadow-violet-600/40 hover:shadow-cyan-400/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 group-hover:opacity-95 transition-opacity" />
              <span className="relative flex items-center gap-2.5">
                <Terminal className="w-5 h-5 text-cyan-300" />
                <span>Launch Your First Agent Cluster</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>

          {/* Security & Compliance Assurance Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SOC2 Type II Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              <span>Zero Model Data Retention</span>
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-violet-400" />
              <span>Self-Hosted VPC Option</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
