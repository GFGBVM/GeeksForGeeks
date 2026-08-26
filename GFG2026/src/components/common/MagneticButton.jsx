import { useRef, useEffect } from "react";
import gsap from "gsap";

/**
 * MagneticButton Component
 * 
 * High-end interactive magnetic CTA button. Moves slightly towards the cursor 
 * on hover with physics-based elastic return, featuring 2.5D inner element translation.
 * 
 * @param {React.ReactNode} children - Button text / icon content
 * @param {string} className - Extra CSS classes
 * @param {number} strength - Overall magnetic pull strength (default 0.3)
 * @param {number} textStrength - Inner content pull factor for 2.5D parallax (default 0.15)
 * @param {string} variant - "primary" | "secondary" | "outline" | "ghost"
 * @param {string} href - Optional link destination (renders as <a>)
 * @param {Function} onClick - Click handler
 */
const MagneticButton = ({
  children,
  className = "",
  strength = 0.3,
  textStrength = 0.15,
  variant = "primary",
  href,
  onClick,
  ...props
}) => {
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  // Clear GSAP tweens on unmount to prevent layout jumps
  useEffect(() => {
    return () => {
      if (buttonRef.current) gsap.killTweensOf(buttonRef.current);
      if (textRef.current) gsap.killTweensOf(textRef.current);
    };
  }, []);

  const handleMouseMove = (event) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    // Outer container pull
    gsap.to(button, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: "power3.out",
    });

    // Inner content parallax pull (2.5D effect)
    if (textRef.current) {
      gsap.to(textRef.current, {
        x: x * textStrength,
        y: y * textStrength,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  };

  const handleMouseLeave = () => {
    const button = buttonRef.current;
    if (!button) return;

    // Elastic snap back to origin
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1.1, 0.3)",
    });

    if (textRef.current) {
      gsap.to(textRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1.1, 0.3)",
      });
    }
  };

  // Base styling following GFG BVM design identity
  const baseStyles =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-mono text-xs md:text-sm font-semibold tracking-tight transition-colors duration-300 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F8D46] focus-visible:ring-offset-2 cursor-pointer";

  const variants = {
    primary:
      "bg-[#2F8D46] px-8 py-4 text-white shadow-sm hover:bg-[#176B36] hover:shadow-[0_8px_25px_rgba(47,141,70,0.3)]",

    secondary:
      "bg-[#111111] px-8 py-4 text-white hover:bg-[#2F8D46]",

    outline:
      "border border-[#E8ECE9] bg-white px-8 py-4 text-[#111111] hover:border-[#2F8D46] hover:text-[#2F8D46]",

    ghost:
      "bg-transparent px-6 py-3 text-[#5F6368] hover:bg-[#F8FAF9] hover:text-[#111111]",
  };

  const combinedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${className}`;

  const innerContent = (
    <>
      {/* Subtle radial sheen effect */}
      <span className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* 2.5D Parallax Container for Text/Icon */}
      <span ref={textRef} className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http://") || href.startsWith("https://") || href.endsWith(".pdf");

    return (
      <a
        ref={buttonRef}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={combinedClasses}
        {...props}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={combinedClasses}
      {...props}
    >
      {innerContent}
    </button>
  );
};

export default MagneticButton;