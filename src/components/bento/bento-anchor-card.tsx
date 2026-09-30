"use client";

import React, { useState } from "react";
import { BentoCard } from "./bento-card";
import { Cpu, Terminal, Shield, GitBranch, Sparkles, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface AgentNode {
  id: string;
  name: string;
  role: string;
  status: "idle" | "active" | "verifying";
  task: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export function BentoAnchorCard() {
  const [selectedAgent, setSelectedAgent] = useState<string>("lead");

  const agents: Record<string, AgentNode> = {
    lead: {
      id: "lead",
      name: "ARCH-LEAD",
      role: "System Orchestrator",
      status: "active",
      task: "Decomposing epic into atomic git commits & assigning sub-tasks",
      icon: Cpu,
      color: "from-violet-500 to-indigo-500",
    },
    frontend: {
      id: "frontend",
      name: "UI-SENTINEL",
      role: "Client Architecture",
      status: "active",
      task: "Writing accessible Tailwind + Framer Motion components",
      icon: Terminal,
      color: "from-cyan-500 to-blue-500",
    },
    backend: {
      id: "backend",
      name: "CORE-KERNEL",
      role: "API & Data Layer",
      status: "active",
      task: "Generating Prisma migrations and idempotent edge handlers",
      icon: GitBranch,
      color: "from-purple-500 to-pink-500",
    },
    qa: {
      id: "qa",
      name: "QA-VERIFIER",
      role: "Deterministic Sentinel",
      status: "verifying",
      task: "Running headless Playwright end-to-end regression suites",
      icon: Shield,
      color: "from-emerald-500 to-teal-500",
    },
  };

  const active = agents[selectedAgent];

  return (
    <BentoCard className="md:col-span-2 md:row-span-2 flex flex-col justify-between" glowColor="cyan">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            LIVE AGENT TOPOLOGY
          </div>
          <span className="font-mono text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
            AUTO-SYNC 60FPS
          </span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-bold mb-2 text-slate-100 dark:text-slate-100 light:text-slate-900">
          Autonomous Multi-Agent Mesh
        </h3>
        <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 max-w-lg mb-6 leading-relaxed">
          Four specialized agents work in synchronized concurrency. While the Architect decomposes the PRD, UI and Backend agents write code simultaneously in sandboxed virtual filesystems.
        </p>
      </div>

      {/* Interactive Topology Visual Canvas */}
      <div className="relative my-4 p-5 rounded-2xl bg-[#060812] border border-white/10 overflow-hidden">
        {/* Animated packet flow SVG lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none stroke-violet-500/30"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        >
          <line x1="50%" y1="28%" x2="22%" y2="78%" />
          <line x1="50%" y1="28%" x2="50%" y2="78%" />
          <line x1="50%" y1="28%" x2="78%" y2="78%" />
        </svg>

        {/* Central Lead Node */}
        <div className="flex justify-center mb-8 relative z-10">
          <button
            onClick={() => setSelectedAgent("lead")}
            className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
              selectedAgent === "lead"
                ? "bg-violet-950/80 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-105"
                : "bg-slate-900/80 border-white/10 hover:border-violet-400/50"
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                ARCH-LEAD
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="font-mono text-[10px] text-cyan-400">Orchestrator</div>
            </div>
          </button>
        </div>

        {/* Child Agent Cluster */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 relative z-10">
          {[
            { id: "frontend", node: agents.frontend },
            { id: "backend", node: agents.backend },
            { id: "qa", node: agents.qa },
          ].map(({ id, node }) => {
            const Icon = node.icon;
            const isSelected = selectedAgent === id;
            return (
              <button
                key={id}
                onClick={() => setSelectedAgent(id)}
                className={`group flex flex-col items-center p-3 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-violet-950/70 border-cyan-400 shadow-md shadow-cyan-500/20 scale-105"
                    : "bg-slate-900/60 border-white/5 hover:border-violet-500/40"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg bg-gradient-to-br ${node.color} flex items-center justify-center text-white mb-2 shadow-sm`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="font-mono text-[11px] font-semibold text-slate-200 truncate w-full">
                  {node.name}
                </span>
                <span className="font-mono text-[9px] text-slate-400 truncate w-full">
                  {node.role}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Telemetry Inspector Box */}
        <div className="mt-4 p-3 rounded-xl bg-black/50 border border-white/10 font-mono text-xs">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 border-b border-white/5 pb-1">
            <span className="text-cyan-400">INSPECTING: {active.name}</span>
            <span className="text-emerald-400 uppercase tracking-wider">{active.status}</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            &gt; {active.task}
          </p>
        </div>
      </div>

      {/* Footer metrics */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10 dark:border-white/10 light:border-violet-200/50 text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-600">
        <span className="flex items-center gap-1.5">
          <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          Latency: <strong className="text-white dark:text-white light:text-slate-900">42ms</strong>
        </span>
        <span>
          Throughput: <strong className="text-white dark:text-white light:text-slate-900">3,820 Nodes/s</strong>
        </span>
      </div>
    </BentoCard>
  );
}
