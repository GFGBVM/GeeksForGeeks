import { useRef } from "react";
import { useGSAP } from "../../hooks/useGSAP";
import { gsap } from "../../animations/gsapConfig";
import { navigationLinks } from "../../data/navigation";
import MagneticButton from "../common/MagneticButton";

/**
 * DesktopNav Component
 * 
 * Desktop navbar links featuring GSAP magnetic underline animation,
 * styled with the Forest Mint color system and Montserrat typography.
 */
const DesktopNav = () => {
  const navRef = useRef(null);

  useGSAP(() => {
    const nav = navRef.current;
    if (!nav) return;

    const links = nav.querySelectorAll(".nav-link");

    links.forEach((link) => {
      const underline = link.querySelector(".nav-underline");

      const handleEnter = () => {
        gsap.to(underline, {
          width: "100%",
          duration: 0.35,
          ease: "power3.out",
        });
      };

      const handleLeave = () => {
        gsap.to(underline, {
          width: "0%",
          duration: 0.3,
          ease: "power3.out",
        });
      };

      link.addEventListener("mouseenter", handleEnter);
      link.addEventListener("mouseleave", handleLeave);

      link._cleanup = () => {
        link.removeEventListener("mouseenter", handleEnter);
        link.removeEventListener("mouseleave", handleLeave);
      };
    });

    return () => {
      links.forEach((link) => link._cleanup?.());
    };
  }, navRef);

  return (
    <nav
      ref={navRef}
      className="hidden items-center gap-7 lg:flex"
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-6 rounded-full border border-[#DCE5E0] bg-[#F4F7F5]/80 px-6 py-2 shadow-xs backdrop-blur-md">
        {navigationLinks.map((link) => (
          <a
            key={link.id || link.label}
            href={link.href}
            className="nav-link group relative py-1 font-montserrat text-xs font-bold uppercase tracking-[0.14em] text-[#4B6354] transition-colors duration-300 hover:text-[#0D1F15]"
          >
            <span>{link.label}</span>

            {/* Premium Greenish Animated Underline */}
            <span
              className="nav-underline absolute bottom-0 left-0 h-[2px] w-0 bg-[#1E513B] transition-colors"
            />
          </a>
        ))}
      </div>

    </nav>
  );
};

export default DesktopNav;