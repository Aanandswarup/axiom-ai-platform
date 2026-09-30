"use client";

import React, { useState } from "react";
import { Check, Sparkles, Terminal, ArrowRight, ShieldCheck } from "lucide-react";

export function Pricing() {
  const [isYearly, setIsYearly] = useState(true);

  const tiers = [
    {
      name: "Solo Pilot",
      tagline: "For individual builders and senior engineers 10x-ing their output",
      monthlyPrice: 49,
      yearlyPrice: 39,
      agentsCount: "2 Concurrent Agents",
      isPopular: false,
      features: [
        "2 concurrent autonomous agent runners",
        "Ephemeral Docker container sandboxes",
        "AST codebase graph cache up to 50k LOC",
        "Automated Playwright test execution",
        "GitHub & GitLab pull request sync",
        "Community Discord support",
      ],
      ctaText: "Start 14-Day Free Fleet",
      ctaHref: "#console",
    },
    {
      name: "Pro Fleet",
      tagline: "For growing engineering squads shipping features without sprint bottlenecks",
      monthlyPrice: 199,
      yearlyPrice: 159,
      agentsCount: "8 Concurrent Agents",
      isPopular: true,
      features: [
        "8 concurrent specialized agents (Lead, UI, Core, QA)",
        "Zero-latency AST memory across unlimited repos",
        "Self-healing CI test failure hot-patching",
        "Human-in-the-loop granular diff approvals",
        "Linear, Jira, Notion, Slack bidirectional sync",
        "SOC2 Type II compliance report included",
        "Priority engineering support with 1-hr SLA",
      ],
      ctaText: "Deploy Pro Fleet Cluster",
      ctaHref: "#console",
    },
    {
      name: "Enterprise Mesh",
      tagline: "For security-conscious enterprises requiring air-gapped private execution",
      monthlyPrice: 990,
      yearlyPrice: 790,
      agentsCount: "Unlimited Concurrency",
      isPopular: false,
      features: [
        "Dedicated private VPC or on-prem cluster runners",
        "Zero data retention & zero external model training",
        "Custom agent fine-tuning on internal framework conventions",
        "Air-gapped and hybrid cloud deployment options",
        "Custom SSO (SAML, Okta) & audit logging export",
        "Dedicated Solutions Architect & 24/7 emergency pager",
      ],
      ctaText: "Schedule Technical Deep Dive",
      ctaHref: "#console",
    },
  ];

  return (
    <section id="pricing" className="relative py-24 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-mono text-xs mb-4">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          TRANSPARENT FLEET CAPACITY
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-slate-100 dark:text-slate-100 light:text-slate-900">
          Predictable engineering bandwidth.
        </h2>
        <p className="text-base sm:text-lg text-slate-300 dark:text-slate-300 light:text-slate-600 mb-8">
          Pay for agent concurrency, not seat licenses. Add unlimited human supervisors to your team at zero extra cost.
        </p>

        {/* Monthly / Yearly Billing Switch */}
        <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl glass-panel border border-white/10 dark:border-white/10 light:border-violet-300">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              !isYearly
                ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              isYearly
                ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span>Annual Billing</span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-400/30">
              SAVE 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier) => {
          const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice;

          return (
            <div
              key={tier.name}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                tier.isPopular
                  ? "glass-panel border-2 border-cyan-400/60 shadow-2xl shadow-violet-950/40 lg:-translate-y-3 bg-gradient-to-b from-violet-950/30 via-slate-900/60 to-black/80"
                  : "glass-panel border border-white/10 dark:border-white/10 light:border-violet-300/40 shadow-xl"
              }`}
            >
              {/* Popular Badge */}
              {tier.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/30 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                  <span>Most Popular Fleet</span>
                </div>
              )}

              <div>
                {/* Tier Title & Description */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-2xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                    {tier.name}
                  </h3>
                  <span className="font-mono text-xs text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
                    {tier.agentsCount}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 mb-6 leading-relaxed">
                  {tier.tagline}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-white/10">
                  <span className="font-display text-4xl sm:text-5xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900">
                    ${price}
                  </span>
                  <span className="text-sm font-mono text-slate-400">
                    / month {isYearly && <span className="text-xs text-emerald-400">(billed yearly)</span>}
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3.5 mb-8">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                    Included capabilities:
                  </span>
                  {tier.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 dark:text-slate-200 light:text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tier CTA Button */}
              <a
                href={tier.ctaHref}
                className={`w-full py-3.5 px-6 rounded-2xl text-center text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 ${
                  tier.isPopular
                    ? "bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 text-white shadow-lg shadow-violet-600/30 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-cyan-400"
                    : "glass-panel text-slate-200 dark:text-slate-200 light:text-slate-800 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-violet-100 border border-white/10 hover:border-violet-500/40 focus-visible:ring-violet-400"
                }`}
              >
                <span>{tier.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
