"use client";

import React from "react";
import { BentoCard } from "./bento-card";
import { BentoAnchorCard } from "./bento-anchor-card";
import {
  Box,
  CheckCircle2,
  Database,
  Sliders,
  ShieldCheck,
  Zap,
  Lock,
  GitPullRequest,
  Activity,
  Code2,
} from "lucide-react";

export function BentoGrid() {
  return (
    <section id="features" className="relative py-24 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-mono text-xs mb-4">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          SYSTEM CAPABILITIES
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 text-slate-100 dark:text-slate-100 light:text-slate-900">
          Engineered for velocity. <br className="hidden sm:inline" />
          Fortified for production.
        </h2>
        <p className="text-base sm:text-lg text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
          AXIOM doesn&apos;t spit out raw markdown suggestions. It executes in isolated environments, compiles real code, runs headless browsers, and only presents verified solutions.
        </p>
      </div>

      {/* Asymmetric 4-column Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: 2x2 Large Interactive Anchor Card */}
        <BentoAnchorCard />

        {/* Card 2: Wide 2x1 Card — Ephemeral Sandboxes */}
        <BentoCard className="md:col-span-2 lg:col-span-2 flex flex-col justify-between" glowColor="violet">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
                <Box className="w-5 h-5" />
              </div>
              <span className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                SPINUP: 240MS
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold mb-2 text-slate-100 dark:text-slate-100 light:text-slate-900">
              Ephemeral Micro-VM Sandboxes
            </h3>
            <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed mb-6">
              Every task executes in an isolated micro-container. Agents install dependencies, run build tools, and execute tests without touching your host machine or production networks.
            </p>
          </div>

          {/* Sandbox Terminal Mock */}
          <div className="p-4 rounded-xl bg-[#060812] border border-white/10 font-mono text-xs text-slate-300">
            <div className="flex items-center gap-2 mb-2 text-slate-500 text-[10px] border-b border-white/5 pb-1">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="ml-2 text-slate-400">container://sandbox-vm-09f</span>
            </div>
            <p className="text-cyan-400">$ docker run --rm -v /repo:/workspace axiom/runner:v2</p>
            <p className="text-slate-400">&gt; Memory allocated: 4096MB | Cold boot: 238ms</p>
            <p className="text-emerald-400 flex items-center gap-1.5 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Isolated network environment ready.
            </p>
          </div>
        </BentoCard>

        {/* Card 3: 1x1 Card — Self-Healing CI/CD */}
        <BentoCard glowColor="emerald">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="font-display text-lg font-bold mb-1 text-slate-100 dark:text-slate-100 light:text-slate-900">
            Self-Healing CI/CD
          </h3>
          <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed mb-4">
            Flaky tests or unexpected breaking changes trigger an immediate triage-and-patch loop before you ever see the PR.
          </p>
          <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px]">
            <span className="text-slate-400">Pass Rate</span>
            <span className="text-emerald-400 font-bold">99.8% First Try</span>
          </div>
        </BentoCard>

        {/* Card 4: 1x1 Card — AST Codebase Memory */}
        <BentoCard glowColor="cyan">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="font-display text-lg font-bold mb-1 text-slate-100 dark:text-slate-100 light:text-slate-900">
            AST Code Graph
          </h3>
          <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed mb-4">
            Full codebase semantic graph memory. Ingests 500,000 LOC in seconds and traces cross-package call graphs accurately.
          </p>
          <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px]">
            <span className="text-slate-400">Query Speed</span>
            <span className="text-cyan-400 font-bold">&lt;11ms AST</span>
          </div>
        </BentoCard>

        {/* Card 5: Wide 2x1 Card — Human Supervisor Override */}
        <BentoCard className="md:col-span-2 lg:col-span-2 flex flex-col justify-between" glowColor="violet">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Sliders className="w-5 h-5" />
              </div>
              <span className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-violet-500/10 text-violet-400 border border-violet-500/20">
                HUMAN-IN-THE-LOOP
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold mb-2 text-slate-100 dark:text-slate-100 light:text-slate-900">
              One-Click Supervisor Override
            </h3>
            <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed mb-6">
              You maintain total authority. Review granular diffs, inspect intermediate AST snapshots, or hijack the terminal with standard bash at any moment.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2 text-slate-300">
              <GitPullRequest className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Step-by-step diff review</span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2 text-slate-300">
              <Lock className="w-4 h-4 text-violet-400 shrink-0" />
              <span>Restricted destructive commands</span>
            </div>
          </div>
        </BentoCard>

        {/* Card 6: 1x1 Card — Deterministic Guardrails */}
        <BentoCard className="md:col-span-2 lg:col-span-2" glowColor="emerald">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              ENFORCING
            </span>
          </div>
          <h3 className="font-display text-xl font-bold mb-2 text-slate-100 dark:text-slate-100 light:text-slate-900">
            Deterministic Security Guardrails
          </h3>
          <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed mb-4">
            Static analysis, secret leak scans, and dependency vulnerability audits run before any pull request is opened. Zero rogue network calls.
          </p>
          <div className="flex flex-wrap gap-2 font-mono text-[10px]">
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">SOC2 Type II</span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">Zero Retention</span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">Air-Gapped Option</span>
          </div>
        </BentoCard>
      </div>
    </section>
  );
}
