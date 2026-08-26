import { useRef } from "react";
import { useGSAP } from "../../hooks/useGSAP";
import { gsap, ScrollTrigger } from "../../animations/gsapConfig";

/**
 * AnimatedText Component
 * 
 * Reusable, high-performance typography animation component supporting word/character 
 * splitting, scroll-triggered entrances, and technical blur reveals.
 * 
 * @param {React.ReactNode|string} children - Text content or nested JSX
 * @param {string|React.Component} as - HTML tag / component to render as (e.g. "h1", "p", "span")
 * @param {string} animation - Animation variant: "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale" | "fade" | "wordReveal" | "charReveal" | "blurReveal"
 * @param {number} duration - Animation duration in seconds (default: 0.8)
 * @param {number} delay - Initial delay before animation triggers (default: 0)
 * @param {number} stagger - Stagger time between characters/words (default: 0.03)
 * @param {boolean} triggerOnScroll - Whether to trigger on scroll entering viewport (default: true)
 * @param {string} scrollStart - ScrollTrigger start position (default: "top 85%")
 * @param {string} className - Additional Tailwind / CSS classes
 */
const AnimatedText = ({
  children,
  as: Tag = "div",
  animation = "fadeUp",
  duration = 0.8,
  delay = 0,
  stagger = 0.03,
  triggerOnScroll = true,
  scrollStart = "top 85%",
  className = "",
  ...props
}) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const element = containerRef.current;
    if (!element) return;

    // ScrollTrigger configuration object
    const scrollTriggerConfig = triggerOnScroll
      ? {
          trigger: element,
          start: scrollStart,
          toggleActions: "play none none none",
        }
      : undefined;

    // 1. Character Reveal Animation
    if (animation === "charReveal" && typeof children === "string") {
      const chars = element.querySelectorAll(".char-item");
      if (chars.length) {
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: 20,
            filter: "blur(4px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration,
            delay,
            stagger,
            ease: "power3.out",
            scrollTrigger: scrollTriggerConfig,
          }
        );
      }
      return;
    }

    // 2. Word Reveal Animation
    if (animation === "wordReveal" && typeof children === "string") {
      const words = element.querySelectorAll(".word-item");
      if (words.length) {
        gsap.fromTo(
          words,
          {
            opacity: 0,
            y: 24,
          },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            stagger: stagger * 2,
            ease: "power3.out",
            scrollTrigger: scrollTriggerConfig,
          }
        );
      }
      return;
    }

    // 3. Preset Structural Animations
    const presets = {
      fadeUp: { y: 40, opacity: 0 },
      fadeDown: { y: -40, opacity: 0 },
      fadeLeft: { x: -40, opacity: 0 },
      fadeRight: { x: 40, opacity: 0 },
      scale: { scale: 0.94, opacity: 0 },
      fade: { opacity: 0 },
      blurReveal: { opacity: 0, filter: "blur(10px)", y: 15 },
    };

    const initialState = presets[animation] || presets.fadeUp;

    gsap.fromTo(
      element,
      initialState,
      {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: scrollTriggerConfig,
      }
    );
  }, containerRef, [animation, duration, delay, stagger, triggerOnScroll, scrollStart]);

  // Helper renderer for character splitting
  const renderSplitContent = () => {
    if (typeof children !== "string") return children;

    if (animation === "charReveal") {
      return children.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="char-item inline-block whitespace-pre opacity-0"
        >
          {char}
        </span>
      ));
    }

    if (animation === "wordReveal") {
      return children.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden mr-[0.25em]">
          <span className="word-item inline-block opacity-0">
            {word}
          </span>
        </span>
      ));
    }

    return children;
  };

  return (
    <Tag ref={containerRef} className={className} {...props}>
      {renderSplitContent()}
    </Tag>
  );
};

export default AnimatedText;