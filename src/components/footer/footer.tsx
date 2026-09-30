"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Cpu, Send, CheckCircle2 } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
  };

  const footerLinks = {
    Platform: [
      { name: "Agent Mesh Topology", href: "#features" },
      { name: "Interactive Console", href: "#console" },
      { name: "Ephemeral Sandboxes", href: "#features" },
      { name: "Self-Healing CI", href: "#features" },
      { name: "Pricing Tiers", href: "#pricing" },
    ],
    Architecture: [
      { name: "AST Code Graph", href: "#features" },
      { name: "Deterministic Guardrails", href: "#features" },
      { name: "Process Timeline", href: "#process" },
      { name: "Zero-Retention Protocol", href: "#faq" },
      { name: "Air-Gapped VPC Runner", href: "#faq" },
    ],
    Developers: [
      { name: "CLI Tooling (npm/brew)", href: "#console" },
      { name: "GitHub App Integration", href: "#marquee" },
      { name: "Architecture RFCs", href: "#" },
      { name: "SDK Documentation", href: "#" },
      { name: "Open Source Benchmarks", href: "#" },
    ],
    Company: [
      { name: "Security & SOC2", href: "#faq" },
      { name: "Privacy Manifesto", href: "#" },
      { name: "Engineering Careers", href: "#" },
      { name: "Changelog v2.4", href: "#" },
      { name: "Brand Assets", href: "#" },
    ],
  };

  return (
    <footer className="relative bg-[#030408] text-slate-400 border-t border-white/10 pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Tier: Brand, Newsletter, and Status */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Mission Statement (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-[#070913] rounded-[11px] flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="font-display text-2xl font-bold tracking-wider text-white">
                AXIOM
              </span>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Autonomous multi-agent engineering fleets that plan, build, test, and ship software. Software that writes itself while you steer.
            </p>

            {/* Live Operational Status Indicator */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>ALL FLEET RUNNERS OPERATIONAL (99.99%)</span>
            </div>
          </div>

          {/* Newsletter Box (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 bg-white/[0.02]">
              <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2">
                Subscribe to Autonomous Fleet Engineering
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed">
                Bi-weekly teardowns on agent orchestration, AST memory graphs, and self-healing CI pipelines. Zero marketing fluff.
              </p>

              {subscribed ? (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Subscribed to engineering briefs. Welcome aboard.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="architect@company.com"
                    required
                    className="flex-1 px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-90 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-opacity cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Middle Tier: Multi-column Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-slate-200">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Tier: Copyright & Socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} AXIOM Technologies, Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-5 text-slate-400">
            <a href="#" className="hover:text-cyan-400 transition-colors" aria-label="GitHub">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors" aria-label="Discord">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Huge Outlined Wordmark Bleeding off Bottom Edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none text-center mt-12 -mb-8 sm:-mb-16 overflow-hidden"
      >
        <span
          className="font-display font-black tracking-tighter text-[18vw] leading-none uppercase inline-block text-transparent"
          style={{
            WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.06)",
          }}
        >
          AXIOM
        </span>
      </div>
    </footer>
  );
}
