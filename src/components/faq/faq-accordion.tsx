"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How does AXIOM prevent hallucinated APIs and broken packages?",
    answer:
      "Unlike simple LLM wrappers that emit unvalidated markdown, AXIOM executes every code change in an ephemeral micro-container. The agent must actually run `npm install`, compile through the TypeScript compiler without errors, and execute existing test suites before any pull request is opened. If an API doesn't exist, the build fails in the sandbox and the agent automatically self-heals or rolls back.",
  },
  {
    question: "Does AXIOM train models on our private repository code?",
    answer:
      "Never. We maintain a zero data-retention agreement with our model inference clusters. Your code is tokenized exclusively in memory for runtime AST analysis and ephemeral sandbox execution. It is never logged to external disks, never stored permanently, and strictly never used to train foundation models.",
  },
  {
    question: "What happens if an agent gets caught in an infinite loop or test hang?",
    answer:
      "All sandboxes enforce strict deterministic resource limits: 120-second hard wall-clock timeouts, bounded CPU memory quotas (4GB default), and token expenditure thresholds. If an execution exceeds its envelope, the orchestrator triggers an automatic SIGKILL, takes an AST state snapshot, and flags the incident for supervisor review.",
  },
  {
    question: "How does human supervision integrate with GitHub Branch Protections?",
    answer:
      "AXIOM operates via a dedicated GitHub App bot. It opens draft pull requests on isolated feature branches, provides unified diff summaries, attaches video recordings of headless browser test runs, and requests review from your team. It cannot merge directly into protected branches like `main` or `release` without your explicit cryptographic signature or team approvals.",
  },
  {
    question: "Can we deploy AXIOM inside our private AWS or GCP VPC?",
    answer:
      "Yes. Our Enterprise Mesh tier provides a self-hosted runner daemon packaged as a Helm chart or Docker Compose cluster. You can run all agent container sandboxes entirely inside your private VPC, behind your corporate VPN, with zero ingress traffic required.",
  },
  {
    question: "How are database migrations and sensitive schemas handled safely?",
    answer:
      "Database schema mutations always run against an ephemeral PostgreSQL/MySQL clone provisioned with anonymized mock data. Destructive migrations (e.g. `DROP TABLE`, `CASCADE`) trigger a mandatory supervisor stop-hook that requires manual approval in the AXIOM console before proceeding.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 sm:py-32 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-mono text-xs mb-4">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          TECHNICAL FAQ
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-slate-100 dark:text-slate-100 light:text-slate-900">
          Frequently Answered Inquiries
        </h2>
        <p className="text-base sm:text-lg text-slate-300 dark:text-slate-300 light:text-slate-600">
          Everything you need to know about architecture, sandboxes, and security.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`rounded-2xl glass-panel border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "border-cyan-400/50 shadow-lg shadow-cyan-500/10 bg-white/[0.03]"
                  : "border-white/10 dark:border-white/10 light:border-violet-300/40 hover:border-white/20"
              }`}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-expanded={isOpen}
              >
                <span className="font-display text-base sm:text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-cyan-400 shrink-0"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
