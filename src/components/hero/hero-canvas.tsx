"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleField({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 2200;

  // Generate particle positions and colors
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const color1 = new THREE.Color("#7c3aed"); // Electric violet
    const color2 = new THREE.Color("#06b6d4"); // Luminous cyan
    const color3 = new THREE.Color("#10b981"); // Sentinel green

    for (let i = 0; i < count; i++) {
      // Cylindrical/spherical spread across the hero field
      const radius = THREE.MathUtils.randFloat(3, 16);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const y = THREE.MathUtils.randFloat(-6, 6);

      pos[i * 3] = radius * Math.cos(theta);
      pos[i * 3 + 1] = y + Math.sin(radius) * 0.8;
      pos[i * 3 + 2] = radius * Math.sin(theta) - 5;

      // Color interpolation
      const mixRatio = Math.random();
      const chosenColor = mixRatio > 0.6 ? color2 : mixRatio > 0.3 ? color1 : color3;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    // Slow organic rotation
    pointsRef.current.rotation.y += delta * 0.05;
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      mouse.current[1] * 0.15,
      0.03
    );
    pointsRef.current.rotation.z = THREE.MathUtils.lerp(
      pointsRef.current.rotation.z,
      mouse.current[0] * 0.15,
      0.03
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function HeroCanvas() {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const mouse = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    setMounted(true);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouse.current = [
        (e.clientX / innerWidth) * 2 - 1,
        -(e.clientY / innerHeight) * 2 + 1,
      ];
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted || prefersReducedMotion) {
    // Elegant CSS animated fallback for SSR or reduced motion
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-violet-600/20 via-cyan-500/20 to-transparent rounded-full blur-[120px] pointer-events-none opacity-60" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField mouse={mouse} />
      </Canvas>
      {/* Soft gradient masks to seamlessly blend canvas with content */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-background)]/40 to-[var(--color-background)] pointer-events-none" />
    </div>
  );
}
