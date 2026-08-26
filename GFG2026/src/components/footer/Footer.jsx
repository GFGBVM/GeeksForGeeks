import { useRef } from "react";

import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";

import siteData from "../../data/site";
import contactData from "../../data/contact";
import { navigationLinks } from "../../data/navigation";

import Container from "../common/Container";

import { initFooterAnimation } from "./FooterAnimation";
import { useGSAP } from "../../hooks/useGSAP";

/*
 * Social icons
 *
 * Brand icons come from react-icons.
 * Lucide is used only for generic UI icons.
 */
const socialIcons = {
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  github: FaGithub,
};

/*
 * Footer Component
 *
 * Deep Obsidian / Forest Mint footer featuring:
 * - Large typography CTA
 * - Social links
 * - Contact information
 * - Navigation
 * - Back-to-top interaction
 * - GSAP animations
 */

const Footer = () => {
  const footerRef = useRef(null);

  /*
   * Footer GSAP animation
   */
  useGSAP(() => {
    if (!footerRef.current) return;

    const cleanup = initFooterAnimation(
      footerRef.current
    );

    return () => cleanup?.();
  }, footerRef);

  /*
   * Scroll to top
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      ref={footerRef}
      className="
        footer
        relative
        overflow-hidden
        bg-[#0D1F15]
        text-white
        select-none
      "
    >
      {/* Forest Mint Radial Glow */}
      <div
        className="
          footer-glow
          pointer-events-none
          absolute
          -right-40
          -top-40
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#1E513B]/25
          blur-[130px]
        "
        aria-hidden="true"
      />

      {/* Background Graphic Watermark */}
      <div
        className="
          footer-background-text
          pointer-events-none
          absolute
          -bottom-5
          left-1/2
          -translate-x-1/2
          whitespace-nowrap
          font-montserrat
          text-[20vw]
          font-black
          uppercase
          leading-none
          tracking-[-0.08em]
          text-white/[0.03]
        "
        aria-hidden="true"
      >
        GFG BVM
      </div>

      <Container size="large">
        {/* =====================================================
            MAIN CTA
        ===================================================== */}

        <div
          className="
            footer-cta
            relative
            border-b
            border-white/10
            py-24
            sm:py-32
            lg:py-40
          "
        >
          <div className="max-w-5xl">
            {/* Eyebrow */}
            <p
              className="
                footer-eyebrow
                mb-7
                flex
                items-center
                gap-3
                font-mono
                text-[10px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#A3C9B6]
                sm:text-xs
              "
            >
              <span
                className="
                  h-px
                  w-8
                  bg-[#1E513B]
                "
              />

              Let's Connect
            </p>

            {/* Heading */}
            <h2
              className="
                footer-title
                font-montserrat
                text-[clamp(3.5rem,9vw,9rem)]
                font-extrabold
                uppercase
                leading-[0.84]
                tracking-[-0.06em]
              "
            >
              Let's
              <br />

              <span className="text-[#1E513B]">
                build
              </span>

              <br />

              together.
            </h2>

            {/* Description */}
            <p
              className="
                footer-description
                mt-10
                max-w-xl
                text-base
                leading-relaxed
                text-[#A3C9B6]/80
                sm:text-lg
                sm:leading-8
              "
            >
              Have an idea, want to collaborate, or
              simply want to be part of the chapter?
              Connect with us to drive technological
              innovation at BVM.
            </p>

            {/* Email */}
            <a
              href={`mailto:${contactData.email}`}
              className="
                footer-email
                group
                mt-8
                inline-flex
                items-center
                gap-3
                border-b
                border-white/20
                pb-2
                text-sm
                font-semibold
                text-white
                transition-colors
                duration-300
                hover:border-[#1E513B]
                hover:text-[#A3C9B6]
                sm:text-base
              "
            >
              {contactData.email}

              <ArrowUpRight
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </a>
          </div>
        </div>

        {/* =====================================================
            INFORMATION GRID
        ===================================================== */}

        <div
          className="
            footer-info
            grid
            grid-cols-1
            gap-12
            border-b
            border-white/10
            py-16
            sm:grid-cols-2
            lg:grid-cols-4
            lg:py-20
          "
        >
          {/* ===================================================
              BRAND
          =================================================== */}

          <div>
            <div className="flex items-center gap-3">
              {/* GFG Mark */}
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#1E513B]
                  text-white
                  shadow-md
                "
              >
                <span
                  className="
                    font-mono
                    text-xs
                    font-bold
                  "
                >
                  &lt;gfg&gt;
                </span>
              </div>

              {/* Name */}
              <div>
                <p
                  className="
                    font-montserrat
                    text-sm
                    font-bold
                    tracking-tight
                    text-white
                  "
                >
                  {siteData?.shortName ||
                    "GFG BVM"}
                </p>

                <p
                  className="
                    mt-0.5
                    font-mono
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#A3C9B6]
                  "
                >
                  Student Chapter
                </p>
              </div>
            </div>

            <p
              className="
                mt-6
                max-w-xs
                text-sm
                leading-relaxed
                text-white/50
              "
            >
              {siteData?.description ||
                "Empowering students through technical excellence and developer collaboration."}
            </p>
          </div>

          {/* ===================================================
              LOCATION
          =================================================== */}

          <div>
            <p
              className="
                mb-6
                font-mono
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#A3C9B6]
              "
            >
              Reach Us
            </p>

            <div className="space-y-5">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="
                    mt-1
                    shrink-0
                    text-[#A3C9B6]/60
                  "
                  strokeWidth={1.8}
                />

                <p
                  className="
                    text-sm
                    leading-relaxed
                    text-white/60
                  "
                >
                  {contactData.address.institution}
                  <br />
                  {contactData.address.line}
                  <br />
                  {contactData.address.state}
                </p>
              </div>

              {/* Email */}
              <a
                href={`mailto:${contactData.email}`}
                className="
                  flex
                  items-center
                  gap-3
                  text-sm
                  text-white/60
                  transition-colors
                  hover:text-[#A3C9B6]
                "
              >
                <Mail
                  size={16}
                  className="
                    shrink-0
                    text-[#A3C9B6]/60
                  "
                  strokeWidth={1.8}
                />

                <span>
                  {contactData.email}
                </span>
              </a>
            </div>
          </div>

          {/* ===================================================
              NAVIGATION
          =================================================== */}

          <div>
            <p
              className="
                mb-6
                font-mono
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#A3C9B6]
              "
            >
              Explore
            </p>

            <nav className="flex flex-col items-start gap-3">
              {navigationLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-white/60
                    transition-colors
                    hover:text-white
                  "
                >
                  <span
                    className="
                      font-montserrat
                      text-xs
                      font-medium
                    "
                  >
                    {link.label}
                  </span>

                  <ArrowUpRight
                    size={13}
                    className="
                      opacity-0
                      transition-all
                      duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                      group-hover:opacity-100
                    "
                  />
                </a>
              ))}
            </nav>
          </div>

          {/* ===================================================
              SOCIALS
          =================================================== */}

          <div>
            <p
              className="
                mb-6
                font-mono
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#A3C9B6]
              "
            >
              Follow Us
            </p>

            <div className="flex flex-wrap gap-2.5">
              {Object.entries(
                contactData.socials || {}
              ).map(([platform, url]) => {
                const Icon =
                  socialIcons[platform];

                if (!Icon || !url) return null;

                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GFG BVM on ${platform}`}
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/10
                      text-white/60
                      transition-all
                      duration-300
                      hover:border-[#1E513B]
                      hover:bg-[#1E513B]
                      hover:text-white
                    "
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>

            {/* Technical Contact */}
            <div className="mt-7">
              <p
                className="
                  mb-2
                  font-mono
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-white/30
                "
              >
                Technical Enquiries
              </p>

              <a
                href={`tel:${contactData.technicalQueries.phone}`}
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-white/60
                  transition-colors
                  hover:text-[#A3C9B6]
                "
              >
                <Phone
                  size={14}
                  strokeWidth={1.8}
                />

                <span>
                  {
                    contactData
                      .technicalQueries.name
                  }
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* =====================================================
            COPYRIGHT
        ===================================================== */}

        <div
          className="
            footer-bottom
            flex
            flex-col
            gap-5
            py-8
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div
            className="
              flex
              flex-col
              gap-2
              sm:flex-row
              sm:items-center
              sm:gap-5
            "
          >
            <p
              className="
                font-mono
                text-[9px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-white/40
              "
            >
              © {siteData?.year || "2026"} GFG BVM
            </p>

            <span
              className="
                hidden
                h-1
                w-1
                rounded-full
                bg-[#1E513B]
                sm:block
              "
            />

            <p
              className="
                font-mono
                text-[9px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-white/40
              "
            >
              All Rights Reserved
            </p>
          </div>

          <div className="flex items-center gap-5">
            <p
              className="
                font-mono
                text-[9px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-white/30
              "
            >
              Crafted & Developed by GFG BVM
            </p>

            {/* Back to top */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="
                group
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                text-white/60
                transition-all
                duration-300
                hover:border-[#1E513B]
                hover:bg-[#1E513B]
                hover:text-white
              "
            >
              <ArrowUpRight
                size={16}
                className="
                  rotate-[-45deg]
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                "
              />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;