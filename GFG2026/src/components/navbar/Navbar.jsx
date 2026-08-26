import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import siteData from "../../data/site";
import { useApp } from "../../context/AppContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  // Use global AppContext for mobile menu state so body scroll lock is handled centrally
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    toggleMobileMenu();
  };

  const closeMenu = () => {
    closeMobileMenu();
  };

  return (
    <>
      <header
        className={`
          fixed left-0 top-0 z-[1000] w-full
          transition-all duration-500
          ${
            isScrolled
              ? "border-b border-[#DCE5E0] bg-[#F4F7F5]/90 py-3 shadow-[0_8px_30px_rgba(13,31,21,0.05)] backdrop-blur-xl"
              : "bg-transparent py-5"
          }
        `}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-10 xl:px-12">
          
          {/* Logo */}
          <a
            href="#Home"
            onClick={closeMenu}
            className="group relative z-[1100] flex items-center gap-3"
          >
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#1E513B] ring-2 ring-[#1E513B]/20 transition-transform duration-300 group-hover:scale-105">
              <img
                src={siteData?.branding?.logo || "/logo.jpg"}
                alt={siteData?.name || "GFG BVM"}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <div className="hidden sm:block">
              <p className="font-montserrat text-sm font-bold leading-none tracking-tight text-[#0D1F15]">
                GFG BVM
              </p>
              <p className="mt-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#4B6354]">
                Student Chapter
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <DesktopNav />

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={
              isMobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMobileMenuOpen}
            className="
              relative z-[1100]
              flex h-11 w-11 items-center justify-center
              rounded-full border border-[#DCE5E0]
              bg-[#F4F7F5] text-[#0D1F15]
              shadow-sm transition-all duration-300
              hover:border-[#1E513B] hover:bg-[#1E513B]/10 hover:text-[#1E513B]
              lg:hidden
            "
          >
            {isMobileMenuOpen ? (
              <X size={21} strokeWidth={2} />
            ) : (
              <Menu size={21} strokeWidth={2} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMenu}
      />
    </>
  );
};

export default Navbar;