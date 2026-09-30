"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "violet" | "cyan" | "emerald";
}

export function BentoCard({
  children,
  className = "",
  glowColor = "violet",
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  // Calculate 3D tilt angles
  let rotateX = 0;
  let rotateY = 0;
  if (isHovered && cardRef.current && !prefersReducedMotion) {
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    rotateX = ((mousePos.y - centerY) / centerY) * -6; // max 6deg
    rotateY = ((mousePos.x - centerX) / centerX) * 6;  // max 6deg
  }

  const glowGradients = {
    violet: "rgba(124, 58, 237, 0.22)",
    cyan: "rgba(6, 182, 212, 0.22)",
    emerald: "rgba(16, 185, 129, 0.22)",
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered && !prefersReducedMotion ? 1.015 : 1,
      }}
      transition={{ type: "spring", damping: 20, stiffness: 260, mass: 0.6 }}
      className={`relative rounded-3xl p-6 sm:p-8 glass-panel overflow-hidden border border-white/10 dark:border-white/10 light:border-violet-300/40 shadow-xl shadow-black/20 ${className}`}
    >
      {/* Dynamic Cursor Spotlight Radial Highlight */}
      {isHovered && !prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowGradients[glowColor]}, transparent 75%)`,
          }}
        />
      )}

      {/* Subtle border highlight */}
      <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </motion.div>
  );
}
