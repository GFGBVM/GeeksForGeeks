import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { navigationLinks } from "../../data/navigation";
import siteData from "../../data/site";

/**
 * MobileMenu Component
 * 
 * Fullscreen premium overlay navigation with GSAP clip-path wipe animation
 * and staggered typography reveals styled in the Forest Mint theme.
 */
const MobileMenu = ({ isOpen, onClose }) => {
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const linksRef = useRef([]);
  const infoRef = useRef(null);

  useEffect(() => {
    const menu = menuRef.current;
    const overlay = overlayRef.current;

    if (!menu || !overlay) return;

    const ctx = gsap.context(() => {
      if (isOpen) {
        gsap.set(menu, { display: "flex" });

        // Smooth clip-path wipe effect from top to bottom
        gsap.to(overlay, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.75,
          ease: "power4.inOut",
        });

        // Staggered slide and fade-in for links
        gsap.fromTo(
          linksRef.current,
          {
            y: 40,
            opacity: 0,
            filter: "blur(4px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.6,
            stagger: 0.08,
            delay: 0.25,
            ease: "power3.out",
          }
        );

        // Bottom footer info reveal
        if (infoRef.current) {
          gsap.fromTo(
            infoRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, delay: 0.5, ease: "power3.out" }
          );
        }
      } else {
        // Reverse clip-path transition closing upwards
        gsap.to(overlay, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.65,
          ease: "power4.inOut",
          onComplete: () => {
            gsap.set(menu, { display: "none" });
          },
        });
      }
    }, menuRef);

    return () => ctx.revert();
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-[900] hidden lg:hidden"
      aria-hidden={!isOpen}
    >
      <div
        ref={overlayRef}
        className="flex h-full w-full flex-col justify-between bg-[#F4F7F5] px-6 pt-28 pb-8 sm:px-10 sm:pb-10"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        {/* Navigation Links */}
        <nav className="flex flex-col">
          <p className="mb-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#4B6354]">
            // Navigation
          </p>

          <div className="flex flex-col">
            {navigationLinks.map((link, index) => (
              <a
                key={link.id || link.label}
                href={link.href}
                onClick={onClose}
                ref={(element) => {
                  linksRef.current[index] = element;
                }}
                className="group flex items-center justify-between border-b border-[#DCE5E0] py-5 font-montserrat text-3xl font-extrabold tracking-tight text-[#0D1F15] transition-colors duration-300 hover:text-[#1E513B] sm:text-4xl"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs font-normal text-[#4B6354] group-hover:text-[#1E513B]">
                    0{index + 1}.
                  </span>
                  <span>{link.label}</span>
                </div>

                <ArrowUpRight
                  size={24}
                  strokeWidth={2}
                  className="text-[#4B6354] opacity-60 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100 group-hover:text-[#1E513B]"
                />
              </a>
            ))}
          </div>
        </nav>

        {/* Bottom Information */}
        <div ref={infoRef} className="flex flex-col gap-6 pt-8">
          <div>
            <p className="font-montserrat text-sm font-bold text-[#0D1F15]">
              {siteData?.shortName || "GFG BVM"}
            </p>

            <p className="mt-1 max-w-xs text-xs leading-relaxed text-[#4B6354]">
              {siteData?.tagline || "Student Chapter BVM Engineering College"}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-[#DCE5E0] pt-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#4B6354]">
              © {siteData?.year || "2026"} GFG BVM
            </span>

            <span className="font-mono text-[11px] font-bold text-[#1E513B]">
              &lt;gfg_bvm&gt;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;