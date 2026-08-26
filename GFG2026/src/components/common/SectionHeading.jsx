import { useRef } from "react";
import { useGSAP } from "../../hooks/useGSAP";
import { animateLineReveal } from "../../animations/textAnimations";

/**
 * SectionHeading Component
 * 
 * Consistent, editorial-grade section title component with integrated GSAP 
 * scroll-triggered reveals and GFG technical accents.
 * 
 * @param {string} number - Numerical index (e.g., "01", "02")
 * @param {string} eyebrow - Category / Section tagline (e.g., "ABOUT US", "EVENTS")
 * @param {string|React.ReactNode} title - Main header title
 * @param {string} description - Optional paragraph body text
 * @param {string} align - "left" | "center" | "right" alignment
 * @param {boolean} highlightGreen - Automatically highlight text wrapped in <span> or green accent
 * @param {string} className - Additional CSS classes
 */
const SectionHeading = ({
  number,
  eyebrow,
  title,
  description,
  align = "left",
  highlightGreen = true,
  className = "",
}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  // GSAP Scroll Reveal
  useGSAP(() => {
    if (titleRef.current) {
      animateLineReveal(titleRef.current.querySelectorAll(".heading-line"));
    }
  }, containerRef);

  const alignmentClasses = {
    left: "items-start text-left",
    center: "items-center text-center mx-auto",
    right: "items-end text-right ml-auto",
  };

  const currentAlignment = alignmentClasses[align] || alignmentClasses.left;

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col ${currentAlignment} max-w-5xl ${className}`}
    >
      {/* Background Subtle Green Glow */}
      <div 
        className="pointer-events-none absolute -top-12 -left-12 -z-10 h-32 w-32 rounded-full bg-[#2F8D46]/5 blur-3xl" 
        aria-hidden="true"
      />

      {/* Eyebrow / Technical Tag */}
      {(number || eyebrow) && (
        <div className="mb-4 flex items-center gap-2.5 font-mono select-none">
          {/* Subtle Grid Dot */}
          <span className="h-1.5 w-1.5 rounded-full bg-[#2F8D46]" />

          {number && (
            <span className="text-xs font-semibold tracking-widest text-[#2F8D46]">
              {number}
            </span>
          )}

          {number && eyebrow && (
            <span className="text-[#8A8F98] text-xs">/</span>
          )}

          {eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5F6368]">
              {eyebrow}
            </span>
          )}

          {/* Code Bracket Accent */}
          <span className="text-xs text-[#8A8F98] font-light">&lt;/&gt;</span>
        </div>
      )}

      {/* Title with Masked Line-Reveal Structure */}
      <div ref={titleRef} className="overflow-hidden">
        <h2 className="heading-line text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] leading-[0.98] text-[#111111] uppercase">
          {typeof title === "string" ? (
            <span
              dangerouslySetInnerHTML={{
                __html: highlightGreen
                  ? title
                      .replace(/([A-Z0-9_-]+\.)/g, '<span class="text-[#2F8D46] font-mono">$1</span>')
                      .replace(/<gfg>/g, '<span class="text-[#2F8D46] font-mono">&lt;gfg&gt;</span>')
                  : title,
              }}
            />
          ) : (
            title
          )}
        </h2>
      </div>

      {/* Description Body Text */}
      {description && (
        <p
          ref={descRef}
          className={`mt-6 text-sm sm:text-base md:text-lg leading-relaxed text-[#5F6368] font-normal ${
            align === "center" ? "max-w-2xl" : "max-w-xl"
          }`}
        >
          {description}
        </p>
      )}

      {/* Technical Grid Divider Accent Line */}
      <div 
        className={`mt-6 h-[1px] w-12 bg-[#E8ECE9] transition-all duration-500 ${
          align === "center" ? "mx-auto" : ""
        }`} 
      />
    </div>
  );
};

export default SectionHeading;