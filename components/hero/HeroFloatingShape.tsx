"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

/**
 * Low-poly icosahedron floating near the Hero headline: slow idle rotation
 * plus a gentle tilt toward the cursor. Kept deliberately cheap — a single
 * mesh, no textures, no post-processing — and skipped entirely on mobile
 * and under prefers-reduced-motion (static 2D glow fallback instead), so
 * there's never a hidden perf cost for visitors who won't see it move.
 */
function RotatingIcosahedron({ reduceMotion }: { reduceMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reduceMotion) return;
    const handlePointerMove = (e: PointerEvent) => {
      target.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reduceMotion]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    if (reduceMotion) {
      mesh.rotation.set(0.4, 0.6, 0);
      return;
    }

    // Slow constant idle spin…
    mesh.rotation.y += delta * 0.18;
    mesh.rotation.x += delta * 0.05;
    // …plus a gentle, damped tilt following the cursor.
    mesh.rotation.x += (target.current.y * 0.25 - mesh.rotation.x * 0.02) * delta;
    mesh.rotation.z += (target.current.x * -0.2 - mesh.rotation.z * 0.02) * delta;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.4, 0]} />
      <meshPhysicalMaterial
        color="#34b98a"
        emissive="#068562"
        emissiveIntensity={0.25}
        metalness={0.1}
        roughness={0.12}
        clearcoat={1}
        clearcoatRoughness={0.1}
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

export function HeroFloatingShape() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // SSR-safe mount flag: avoids hydration mismatch by rendering the
    // static fallback on both server and first client paint, then
    // deciding whether to mount the 3D canvas only once on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Static 2D fallback: mobile (skip the 3D scene entirely for perf) and
  // the initial SSR/pre-mount render (avoids any hydration flash).
  if (!mounted || isMobile) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-[22%] h-32 w-32 rounded-full bg-primary-500/25 blur-2xl sm:h-40 sm:w-40"
      />
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-[2%] top-[34%] h-44 w-44 opacity-90 sm:right-[3%] sm:h-52 sm:w-52 lg:h-56 lg:w-56"
    >
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 4]} intensity={1.4} color="#cdf3e3" />
        <pointLight position={[-3, -2, 2]} intensity={0.6} color="#569578" />
        <RotatingIcosahedron reduceMotion={Boolean(prefersReducedMotion)} />
      </Canvas>
    </div>
  );
}
