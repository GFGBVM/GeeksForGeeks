import { useRef } from "react";
import HeroBackground from "./HeroBackground";
import HeroText from "./HeroText";
import { initHeroAnimation } from "./HeroAnimation";
import { useGSAP } from "../../hooks/useGSAP";

/**
 * Hero Component
 * 
 * High-impact entrance section featuring ambient mint glassmorphism,
 * technical corner labels, and a animated vertical scroll indicator.
 */
const Hero = () => {
  const heroRef = useRef(null);

  useGSAP(() => {
    if (!heroRef.current) return;
    const cleanup = initHeroAnimation(heroRef.current);
    return () => cleanup?.();
  }, heroRef);

  return (
    <section
      ref={heroRef}
      id="Home"
      className="hero-section relative flex min-h-screen w-full items-center overflow-hidden bg-[#F4F7F5] pt-24 select-none"
    >
      <HeroBackground />

      {/* Main Content Wrapper */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-[1500px] items-center px-5 py-16 sm:px-8 lg:px-10 xl:px-12">
        <HeroText />
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.25em] text-[#4B6354]">
          Scroll to explore
        </span>

        <div className="h-12 w-px overflow-hidden bg-[#DCE5E0]">
          <div className="hero-scroll-line h-full w-full origin-top bg-[#1E513B]" />
        </div>
      </div>

      {/* Decorative Technical Corner Label */}
      <div className="hero-corner-label absolute bottom-8 right-5 z-20 hidden font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#4B6354]/70 sm:right-8 lg:block lg:right-10 xl:right-12">
        BVM / 2026 EDITION
      </div>
    </section>
  );
};

export default Hero;