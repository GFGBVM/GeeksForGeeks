import { useRef } from "react";
import { useGSAP } from "../../hooks/useGSAP";
import { gsap } from "../../animations/gsapConfig";

/**
 * Marquee Component
 * 
 * Seamless, infinitely looping horizontal ticker driven by GSAP.
 * Features pause-on-hover and seamless twin-track cloning for smooth infinite motion.
 * 
 * @param {React.ReactNode} children - Ticker items/content
 * @param {number} speed - Seconds per full loop iteration (lower = faster, default: 25)
 * @param {string} direction - "left" | "right"
 * @param {boolean} pauseOnHover - Pause ticker animation on hover (default: true)
 * @param {string} className - Additional CSS classes
 */
const Marquee = ({
  children,
  speed = 25,
  direction = "left",
  pauseOnHover = true,
  className = "",
}) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    // Measure the exact width of one content clone block
    const firstChild = track.children[0];
    if (!firstChild) return;

    const width = firstChild.offsetWidth;

    // Set up continuous loop x Translation
    const startX = direction === "left" ? 0 : -width;
    const endX = direction === "left" ? -width : 0;

    gsap.set(track, { x: startX });

    tweenRef.current = gsap.to(track, {
      x: endX,
      duration: speed,
      ease: "none",
      repeat: -1,
      overwrite: "auto",
    });
  }, containerRef, [speed, direction]);

  const handleMouseEnter = () => {
    if (pauseOnHover && tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0, duration: 0.5, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5, ease: "power2.out" });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative flex w-full overflow-hidden select-none border-y border-[#E8ECE9] bg-[#F8FAF9]/50 py-3 backdrop-blur-xs ${className}`}
    >
      {/* Edge Soft Fade Gradients */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent" />

      {/* Infinite Twin Track */}
      <div ref={trackRef} className="flex shrink-0 items-center">
        <div className="flex shrink-0 items-center whitespace-nowrap font-mono text-xs md:text-sm font-semibold tracking-widest text-[#111111] uppercase">
          {children}
        </div>

        {/* Duplicate clone for seamless continuous scroll */}
        <div
          aria-hidden="true"
          className="flex shrink-0 items-center whitespace-nowrap font-mono text-xs md:text-sm font-semibold tracking-widest text-[#111111] uppercase"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Marquee;