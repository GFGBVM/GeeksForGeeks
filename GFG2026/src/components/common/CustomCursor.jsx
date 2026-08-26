import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * CustomCursor Component
 *
 * Smooth GSAP-driven cursor dot and outer follower ring with dynamic 
 * hover detection for interactive elements. Automatically disables on touch 
 * screens or when reduced motion preferences are active.
 */
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Disable custom cursor on touch devices or under reduced motion preferences
    const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouchDevice || prefersReducedMotion) {
      return;
    }

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const text = textRef.current;

    if (!cursor || !follower || !text) return;

    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const followerPosition = {
      x: mouse.x,
      y: mouse.y,
    };

    let animationFrame;

    // Mouse position tracking
    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;

      gsap.to(cursor, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.08,
        ease: "power2.out",
      });
    };

    // Smooth follower lerp loop
    const animateFollower = () => {
      followerPosition.x += (mouse.x - followerPosition.x) * 0.14;
      followerPosition.y += (mouse.y - followerPosition.y) * 0.14;

      gsap.set(follower, {
        x: followerPosition.x,
        y: followerPosition.y,
      });

      animationFrame = requestAnimationFrame(animateFollower);
    };

    // Event Delegation for dynamic interactive element hover handling
    const handleMouseOver = (event) => {
      const target = event.target.closest("a, button, [data-cursor]");
      if (!target) return;

      const cursorType = target.dataset.cursor || "interactive";

      gsap.to(follower, {
        width: cursorType === "view" ? 88 : cursorType === "text" ? 96 : 56,
        height: cursorType === "view" ? 88 : cursorType === "text" ? 96 : 56,
        backgroundColor: cursorType === "view" ? "rgba(30, 81, 59, 0.12)" : "rgba(30, 81, 59, 0.08)",
        borderColor: "#1E513B",
        duration: 0.3,
        ease: "power3.out",
      });

      gsap.to(cursor, {
        scale: 0.4,
        duration: 0.25,
        ease: "power3.out",
      });

      const cursorText = target.dataset.cursorText;
      if (cursorText) {
        text.textContent = cursorText;
        gsap.to(text, {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: "power3.out",
        });
      }
    };

    const handleMouseOut = (event) => {
      const target = event.target.closest("a, button, [data-cursor]");
      if (!target) return;

      gsap.to(follower, {
        width: 38,
        height: 38,
        backgroundColor: "rgba(30, 81, 59, 0.03)",
        borderColor: "rgba(30, 81, 59, 0.4)",
        duration: 0.3,
        ease: "power3.out",
      });

      gsap.to(cursor, {
        scale: 1,
        duration: 0.25,
        ease: "power3.out",
      });

      gsap.to(text, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
      });
    };

    // Hide cursor when mouse leaves the browser window
    const handleMouseLeaveWindow = () => {
      gsap.to([cursor, follower], {
        opacity: 0,
        duration: 0.2,
      });
    };

    const handleMouseEnterWindow = () => {
      gsap.to([cursor, follower], {
        opacity: 1,
        duration: 0.3,
      });
    };

    // Event listener registration
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    animateFollower();

    // Cleanup listeners and animation frame on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      {/* Center dot */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[999999] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1E513B] lg:block"
      />

      {/* Outer follower ring */}
      <div
        ref={followerRef}
        className="pointer-events-none fixed left-0 top-0 z-[999998] hidden h-[38px] w-[38px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#1E513B]/40 bg-[#1E513B]/[0.03] backdrop-blur-[2px] lg:flex"
      >
        <span
          ref={textRef}
          className="scale-75 whitespace-nowrap font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-[#1E513B] opacity-0"
        />
      </div>
    </>
  );
};

export default CustomCursor;