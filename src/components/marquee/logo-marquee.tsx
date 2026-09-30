"use client";

import React from "react";
import { DEV_TOOL_LOGOS } from "@/lib/svgl-logos";

export function LogoMarquee() {
  // Double buffer array for seamless infinite marquee loop
  const marqueeItems = [...DEV_TOOL_LOGOS, ...DEV_TOOL_LOGOS];

  return (
    <section id="marquee" className="relative py-14 border-y border-white/5 dark:border-white/5 light:border-violet-200/50 bg-[var(--color-surface)]/50 backdrop-blur-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-slate-400 light:text-slate-600">
          Native bidirectional sync with your existing engineering stack
        </p>
      </div>

      {/* Infinite scrolling marquee container */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="animate-marquee flex items-center gap-12 sm:gap-16 py-2">
          {marqueeItems.map((tool, idx) => (
            <div
              key={`${tool.name}-${idx}`}
              className="group flex items-center gap-3 px-5 py-2.5 rounded-2xl glass-panel border border-white/5 dark:border-white/5 light:border-violet-200/50 hover:border-violet-500/40 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-violet-100/60 transition-all duration-300 cursor-pointer shrink-0"
              title={`${tool.name} — ${tool.category}`}
            >
              <div className="text-slate-300 dark:text-slate-300 light:text-slate-800 group-hover:text-cyan-400 transition-colors">
                {tool.svg("w-5 h-5 sm:w-6 sm:h-6")}
              </div>
              <div className="flex flex-col">
                <span className="font-display text-sm font-semibold text-slate-200 dark:text-slate-200 light:text-slate-900 group-hover:text-white dark:group-hover:text-white transition-colors">
                  {tool.name}
                </span>
                <span className="font-mono text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500">
                  {tool.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
