"use client";

import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import {
  Terminal,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Clock,
  GitPullRequest,
  AlertCircle,
  FileCode,
  ShieldCheck,
  Cpu,
  ChevronRight,
  Send,
  Zap,
} from "lucide-react";

interface LogStep {
  agent: string;
  agentColor: string;
  phase: "PLAN" | "BUILD" | "TEST" | "SHIP";
  message: string;
  timestamp: string;
  duration?: string;
  codeSnippet?: {
    file: string;
    diff: string[];
  };
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  branch: string;
  prTitle: string;
  steps: LogStep[];
}

const SCENARIOS: Scenario[] = [
  {
    id: "passkeys",
    title: "Passkey Auth (FIDO2 / WebAuthn)",
    description: "Upgrade legacy bcrypt password auth to zero-friction biometric passkeys",
    branch: "feat/passkey-webauthn-flow",
    prTitle: "feat(auth): add passkey registration and biometric challenge verification",
    steps: [
      {
        agent: "ARCH-LEAD",
        agentColor: "text-violet-400",
        phase: "PLAN",
        message: "Parsed epic: Biometric WebAuthn passkeys. Specifying PRD, FIDO2 credential storage schema, and fallback cookie token revocation.",
        timestamp: "00:01.12",
        duration: "1.2s",
      },
      {
        agent: "CORE-KERNEL",
        agentColor: "text-purple-400",
        phase: "BUILD",
        message: "Generated Prisma migration for AuthenticatorCredential. Implemented @simplewebauthn/server challenge verification handlers.",
        timestamp: "00:03.45",
        duration: "2.3s",
        codeSnippet: {
          file: "src/server/auth/passkey.ts",
          diff: [
            "- import { compare } from 'bcrypt';",
            "+ import { verifyRegistrationResponse } from '@simplewebauthn/server';",
            "+ export async function verifyPasskey(challenge: string, response: any) {",
            "+   const verification = await verifyRegistrationResponse({ response, expectedChallenge: challenge });",
            "+   if (!verification.verified) throw new AuthError('Biometric mismatch');",
            "+   return verification.registrationInfo;",
            "+ }",
          ],
        },
      },
      {
        agent: "UI-SENTINEL",
        agentColor: "text-cyan-400",
        phase: "BUILD",
        message: "Built accessible biometric trigger button with WebAuthn browser capability detection and fallback modal.",
        timestamp: "00:05.10",
        duration: "1.6s",
      },
      {
        agent: "QA-VERIFIER",
        agentColor: "text-emerald-400",
        phase: "TEST",
        message: "Executed 14 Playwright integration specs in ephemeral headless Chromium. Detected challenge timeout on Safari; injected 60s window fallback. 100% tests passing.",
        timestamp: "00:07.88",
        duration: "2.7s",
      },
      {
        agent: "SUPERVISOR",
        agentColor: "text-amber-400",
        phase: "SHIP",
        message: "Deterministic security audit passed (0 vulnerabilities, 0 secret leaks). Awaiting Human Supervisor final merge sign-off.",
        timestamp: "00:09.15",
      },
    ],
  },
  {
    id: "trpc",
    title: "Migrate REST to tRPC v11",
    description: "End-to-end type safety across 24 routes with automatic client contract generation",
    branch: "refactor/rest-to-trpc-v11",
    prTitle: "refactor(api): replace legacy REST endpoints with type-safe tRPC routers",
    steps: [
      {
        agent: "ARCH-LEAD",
        agentColor: "text-violet-400",
        phase: "PLAN",
        message: "Scanning 24 Express REST endpoints. Generating AST dependency matrix and input Zod schemas.",
        timestamp: "00:01.05",
        duration: "0.9s",
      },
      {
        agent: "CORE-KERNEL",
        agentColor: "text-purple-400",
        phase: "BUILD",
        message: "Constructing appRouter with merged sub-routers for billing, team, and telemetry queries.",
        timestamp: "00:03.20",
        duration: "2.1s",
        codeSnippet: {
          file: "src/server/trpc/routers/team.ts",
          diff: [
            "- app.get('/api/teams/:id', async (req, res) => {",
            "+ export const teamRouter = router({",
            "+   getById: protectedProcedure",
            "+     .input(z.object({ teamId: z.string().uuid() }))",
            "+     .query(async ({ ctx, input }) => ctx.db.team.findUnique({ where: { id: input.teamId } })),",
            "+ });",
          ],
        },
      },
      {
        agent: "QA-VERIFIER",
        agentColor: "text-emerald-400",
        phase: "TEST",
        message: "Typecheck passed with 0 errors across 180 consumer files. Response payload size reduced by 34%.",
        timestamp: "00:06.40",
        duration: "1.8s",
      },
      {
        agent: "SUPERVISOR",
        agentColor: "text-amber-400",
        phase: "SHIP",
        message: "Zero breaking changes detected. Backward compatibility middleware validated for legacy clients.",
        timestamp: "00:08.22",
      },
    ],
  },
  {
    id: "flaky-test",
    title: "Self-Healing CI Pipeline",
    description: "Autonomous race condition detection, mutex injection, and flake elimination",
    branch: "fix/flaky-websocket-sync-spec",
    prTitle: "fix(test): resolve async race condition in cluster sync test via event latch",
    steps: [
      {
        agent: "QA-VERIFIER",
        agentColor: "text-emerald-400",
        phase: "PLAN",
        message: "Detected 12% intermittent failure in tests/cluster-sync.spec.ts. AST analysis isolated unawaited websocket ACK packet.",
        timestamp: "00:00.95",
        duration: "0.8s",
      },
      {
        agent: "CORE-KERNEL",
        agentColor: "text-purple-400",
        phase: "BUILD",
        message: "Replaced brittle setTimeout(500) with deterministic EventTarget promise latch in sandbox.",
        timestamp: "00:02.80",
        duration: "1.8s",
        codeSnippet: {
          file: "tests/cluster-sync.spec.ts",
          diff: [
            "- await new Promise(r => setTimeout(r, 500));",
            "- expect(cluster.isReady()).toBe(true);",
            "+ await cluster.waitForState('SYNCHRONIZED', { timeout: 3000 });",
            "+ expect(cluster.getNodeCount()).toBe(4);",
          ],
        },
      },
      {
        agent: "QA-VERIFIER",
        agentColor: "text-emerald-400",
        phase: "TEST",
        message: "Executed 100 consecutive stress runs in parallel containers. Flake rate dropped from 12.4% to 0.00%.",
        timestamp: "00:05.90",
        duration: "3.1s",
      },
      {
        agent: "SUPERVISOR",
        agentColor: "text-amber-400",
        phase: "SHIP",
        message: "Hot-patch verified in CI runner. Ready to squash and merge.",
        timestamp: "00:07.45",
      },
    ],
  },
];

export function AgentConsole() {
  const [activeScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[0]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMerged, setIsMerged] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>("");
  const [extraLogs, setExtraLogs] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Stepping simulation loop
  useEffect(() => {
    if (!isPlaying) return;
    if (currentStepIndex >= activeScenario.steps.length - 1) return;

    const timer = setTimeout(() => {
      setCurrentStepIndex((prev) => prev + 1);
    }, 2200);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, activeScenario]);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [currentStepIndex, extraLogs]);

  const handleScenarioChange = (scenario: Scenario) => {
    setActiveScenario(scenario);
    setCurrentStepIndex(0);
    setIsMerged(false);
    setExtraLogs([]);
    setIsPlaying(true);
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setIsMerged(false);
    setExtraLogs([]);
    setIsPlaying(true);
  };

  const handleApproveMerge = () => {
    setIsMerged(true);
    setIsPlaying(false);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#7c3aed", "#06b6d4", "#10b981", "#ffffff"],
    });
  };

  const handleSendPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    setExtraLogs((prev) => [
      ...prev,
      `[HUMAN_SUPERVISOR]: ${customInput}`,
      `[ARCH-LEAD]: Received override intent. Re-routing task graph and compiling sandbox diff...`,
    ]);
    setCustomInput("");
  };

  const visibleSteps = activeScenario.steps.slice(0, currentStepIndex + 1);
  const isFinished = currentStepIndex === activeScenario.steps.length - 1;

  return (
    <section id="console" className="relative py-24 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Background ambient radial glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-violet-600/15 via-cyan-500/15 to-transparent rounded-full blur-[140px] pointer-events-none"
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs mb-4">
          <Terminal className="w-3.5 h-3.5" />
          INTERACTIVE AGENT WORKSPACE
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-slate-100 dark:text-slate-100 light:text-slate-900">
          The Autonomous Console
        </h2>
        <p className="text-base sm:text-lg text-slate-300 dark:text-slate-300 light:text-slate-600">
          Watch a live multi-agent task execution. Pick a sprint scenario below or inject your own supervisor directive.
        </p>

        {/* Scenario Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleScenarioChange(sc)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                activeScenario.id === sc.id
                  ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-600/25"
                  : "glass-panel text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white border border-white/10"
              }`}
            >
              {sc.title}
            </button>
          ))}
        </div>
      </div>

      {/* The Main Terminal Container */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/15 dark:border-white/15 light:border-violet-300/60 shadow-2xl shadow-black/40">
        {/* Terminal Titlebar */}
        <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-[#080b16] border-b border-white/10 gap-3">
          {/* Window dots & Branch pill */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300">
              <GitPullRequest className="w-3 h-3 text-cyan-400" />
              <span>{activeScenario.branch}</span>
            </div>
          </div>

          {/* Phase Progress Pills */}
          <div className="flex items-center gap-1 sm:gap-2 font-mono text-[10px] sm:text-xs">
            {(["PLAN", "BUILD", "TEST", "SHIP"] as const).map((phase, idx) => {
              const currentPhaseIndex = ["PLAN", "BUILD", "TEST", "SHIP"].indexOf(
                visibleSteps[visibleSteps.length - 1]?.phase || "PLAN"
              );
              const isPast = idx < currentPhaseIndex;
              const isCurrent = idx === currentPhaseIndex;

              return (
                <div
                  key={phase}
                  className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-md transition-all ${
                    isPast
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold"
                      : isCurrent
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse font-semibold"
                      : "bg-white/5 text-slate-500 border border-white/5"
                  }`}
                >
                  {isPast ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  ) : isCurrent ? (
                    <Zap className="w-3 h-3 text-cyan-400 animate-spin" />
                  ) : (
                    <Clock className="w-3 h-3" />
                  )}
                  <span>{phase}</span>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
              title={isPlaying ? "Pause simulation" : "Resume simulation"}
              aria-label={isPlaying ? "Pause simulation" : "Resume simulation"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={handleRestart}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
              title="Restart execution"
              aria-label="Restart execution"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body & Split Diff Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#04060d]">
          {/* Left: Streaming Event Log (7 cols) */}
          <div
            ref={terminalRef}
            className="lg:col-span-7 p-5 sm:p-6 font-mono text-xs sm:text-sm h-[400px] sm:h-[480px] overflow-y-auto space-y-4 border-b lg:border-b-0 lg:border-r border-white/10"
          >
            <div className="text-slate-500 text-xs border-b border-white/5 pb-2">
              # Target PR: &quot;{activeScenario.prTitle}&quot;
            </div>

            {visibleSteps.map((step, idx) => (
              <div
                key={idx}
                className="space-y-1.5 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
              >
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="text-slate-500">[{step.timestamp}]</span>
                  <span className={`font-bold ${step.agentColor}`}>
                    @{step.agent}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-white/5 text-slate-400 text-[10px] border border-white/10">
                    {step.phase}
                  </span>
                  {step.duration && (
                    <span className="text-slate-500 text-[10px] ml-auto">
                      dt: {step.duration}
                    </span>
                  )}
                </div>
                <p className="text-slate-200 pl-4 border-l-2 border-violet-500/30 leading-relaxed">
                  {step.message}
                </p>
              </div>
            ))}

            {/* Injected user directives */}
            {extraLogs.map((log, idx) => (
              <div
                key={`extra-${idx}`}
                className="text-cyan-300 pl-4 border-l-2 border-cyan-400/50 py-1 bg-cyan-950/20 rounded-r-lg"
              >
                {log}
              </div>
            ))}

            {/* Stepping or Awaiting indicator */}
            {!isFinished && isPlaying && (
              <div className="flex items-center gap-2 text-cyan-400 text-xs animate-pulse pt-2">
                <span className="inline-block w-2 h-4 bg-cyan-400" />
                <span>Next agent executing pipeline step...</span>
              </div>
            )}

            {isFinished && !isMerged && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Pipeline complete. Human supervisor approval required to merge.</span>
                </div>
              </div>
            )}

            {isMerged && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 mt-4">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold">PR #389 MERGED INTO MAIN // DEPLOYED TO EDGE IN 840MS</span>
              </div>
            )}
          </div>

          {/* Right: Live Code Diff & AST Inspector (5 cols) */}
          <div className="lg:col-span-5 p-5 sm:p-6 bg-[#070a14] flex flex-col justify-between h-[400px] sm:h-[480px] overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400 border-b border-white/10 pb-2">
                <span className="flex items-center gap-1.5 text-slate-200">
                  <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                  LIVE CODE DIFF
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">
                  +18 / -4 lines
                </span>
              </div>

              {/* Code Diff Display */}
              {visibleSteps.find((s) => s.codeSnippet) ? (
                <div className="rounded-xl bg-[#030408] p-3.5 border border-white/10 font-mono text-xs overflow-x-auto space-y-1">
                  <div className="text-[11px] text-slate-500 mb-2 border-b border-white/5 pb-1">
                    {visibleSteps.find((s) => s.codeSnippet)?.codeSnippet?.file}
                  </div>
                  {visibleSteps
                    .find((s) => s.codeSnippet)
                    ?.codeSnippet?.diff.map((line, idx) => {
                      const isAdded = line.startsWith("+");
                      const isRemoved = line.startsWith("-");
                      return (
                        <div
                          key={idx}
                          className={`px-1.5 py-0.5 rounded ${
                            isAdded
                              ? "bg-emerald-500/15 text-emerald-300 font-medium"
                              : isRemoved
                              ? "bg-red-500/15 text-red-300 line-through opacity-70"
                              : "text-slate-400"
                          }`}
                        >
                          {line}
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="h-40 rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center p-4 text-slate-500 font-mono text-xs">
                  <Cpu className="w-6 h-6 mb-2 text-slate-600 animate-pulse" />
                  <span>Agent planning stage in progress...</span>
                  <span className="text-[10px] text-slate-600 mt-1">Code diff updates during BUILD phase</span>
                </div>
              )}
            </div>

            {/* Supervisor Action Button / Merge Bar */}
            <div className="mt-6 pt-4 border-t border-white/10">
              {isMerged ? (
                <div className="w-full py-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-center font-mono font-bold text-xs flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  PULL REQUEST MERGED &amp; VERIFIED
                </div>
              ) : (
                <button
                  onClick={handleApproveMerge}
                  className="w-full relative group py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white overflow-hidden shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 group-hover:opacity-90 transition-opacity" />
                  <span className="relative flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-200" />
                    <span>Approve &amp; Merge PR to Main</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Interactive Command Injection Bar */}
        <form
          onSubmit={handleSendPrompt}
          className="flex items-center gap-3 px-5 py-3 bg-[#070914] border-t border-white/10"
        >
          <span className="font-mono text-xs text-cyan-400 font-bold shrink-0">
            supervisor@axiom:~$
          </span>
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Inject directive (e.g. 'Ensure strict TypeScript noImplicitAny', 'Add rate limiter')..."
            className="flex-1 bg-transparent text-xs sm:text-sm font-mono text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <span>Send</span>
            <Send className="w-3 h-3" />
          </button>
        </form>
      </div>
    </section>
  );
}
