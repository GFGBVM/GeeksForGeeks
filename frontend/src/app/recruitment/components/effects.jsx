"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ *
 * SpotlightCard — a glass card that glows where the cursor hovers.
 * Drop-in replacement for a <div>; pass the same className.
 * ------------------------------------------------------------------ */
export function SpotlightCard({
  as: Tag = "div",
  className = "",
  spot = "rgba(16,185,129,0.14)",
  children,
  ...rest
}) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      className={`group/spot relative ${className}`}
      {...rest}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(480px circle at var(--mx, 50%) var(--my, 0px), ${spot}, transparent 45%)`,
        }}
      />
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ *
 * TiltCard — subtle 3D tilt toward the cursor.
 * ------------------------------------------------------------------ */
export function TiltCard({ className = "", max = 6, children, ...rest }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${
      -py * max
    }deg)`;
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateY(0) rotateX(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`group/spot relative transition-transform duration-200 ease-out will-change-transform ${className}`}
      {...rest}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.06), transparent 45%)",
        }}
      />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Typewriter — types text out with a blinking caret. Loops gently.
 * ------------------------------------------------------------------ */
export function Typewriter({ text, speed = 55, startDelay = 350 }) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    let i = 0;
    let timer;
    const start = setTimeout(function tick() {
      setShown(text.slice(0, i + 1));
      i += 1;
      if (i < text.length) {
        timer = setTimeout(tick, speed);
      }
    }, startDelay);

    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [text, speed, startDelay]);

  return (
    <span>
      {shown}
      <span className="animate-caret ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[2px] bg-emerald-400 align-middle" />
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * FloatingParticles — faint drifting "code" glyphs in the background.
 * ------------------------------------------------------------------ */
const GLYPHS = ["</>", "{ }", "()", "=>", "[]", "01", "##", "&&", "::", "0x"];

export function FloatingParticles({ count = 16 }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const next = Array.from({ length: count }).map((_, i) => ({
      id: i,
      glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      left: Math.random() * 100,
      size: 10 + Math.random() * 16,
      duration: 14 + Math.random() * 18,
      delay: -Math.random() * 30,
      drift: (Math.random() - 0.5) * 80,
    }));
    setItems(next);
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{
            y: "-15vh",
            x: [0, p.drift, 0],
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute font-mono font-semibold text-emerald-400/25"
          style={{ left: `${p.left}%`, fontSize: `${p.size}px` }}
        >
          {p.glyph}
        </motion.span>
      ))}
    </div>
  );
}
