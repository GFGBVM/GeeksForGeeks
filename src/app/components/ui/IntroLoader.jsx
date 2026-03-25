"use client";

import { useEffect, useState } from "react";

export default function IntroLoader() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setMounted(true);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!reduceMotion) {
      setShow(true);

      // ⏳ Increased timing
      setTimeout(() => setFadeOut(true), 3200); // start fading
      setTimeout(() => setShow(false), 3600);  // remove loader
    }
  }, []);

  if (!mounted || !show) return null;

  return (
    <div className={`intro-loader ${fadeOut ? "fade-out" : ""}`}>
      <h1 className="gfg-text fill-effect font-dancing
               text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
  GeeksforGeeks
</h1>
    </div>
  );
}
