import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

import siteData from "../../data/site";

import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import AboutStats from "./AboutStats";

import { initAboutAnimation } from "./AboutAnimation";
import { scrollToSection } from "../../utils/scrollToSection";
import { SECTION_IDS } from "../../utils/constants";

const About = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const cleanup = initAboutAnimation(
      sectionRef.current
    );

    return cleanup;
  }, []);

  const handleExploreClick = (e) => {
    e.preventDefault();

    scrollToSection(SECTION_IDS.EVENTS);
  };

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.ABOUT}
      className="
        about-section
        relative
        overflow-hidden
        bg-[#F4F7F5]
        py-24
        sm:py-32
        lg:py-40
      "
    >
      {/* =====================================================
          RADIAL BACKGROUND GLOW
      ===================================================== */}

      <div
        className="
          about-glow
          pointer-events-none
          absolute
          -left-40
          top-[20%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#1E513B]/[0.06]
          blur-[120px]
        "
      />

      {/* =====================================================
          BACKGROUND MICRO TYPOGRAPHY
      ===================================================== */}

      <div
        className="
          about-background-text
          pointer-events-none
          absolute
          right-[-5%]
          top-[8%]
          select-none
          font-mono
          text-[18vw]
          font-bold
          leading-none
          tracking-[-0.1em]
          text-[#1E513B]/[0.025]
        "
      >
        {"<gfg>"}
      </div>

      <Container>
        {/* ===================================================
            SECTION HEADING
        =================================================== */}

        <div className="about-heading">
          <SectionHeading
            number="01"
            eyebrow="About Us"
            title={
              <>
                More than
                <br />
                just
                <span className="text-[#1E513B]">
                  {" "}
                  code.
                </span>
              </>
            }
            description={siteData.description}
          />
        </div>

        {/* ===================================================
            CONTENT & VISUAL
        =================================================== */}

        <div
          className="
            about-content
            mt-16
            grid
            grid-cols-1
            gap-12
            lg:mt-24
            lg:grid-cols-[0.8fr_1.2fr]
            lg:gap-24
          "
        >
          {/* =================================================
              LEFT LOGO VISUAL
          ================================================= */}

          <div className="about-visual">
            <div
              className="
                relative
                aspect-square
                max-w-md
                overflow-hidden
                rounded-3xl
                bg-[#0D1F15]
                shadow-xl
              "
            >
              {/* Green ambient circle */}
              <div
                className="
                  about-circle
                  absolute
                  left-1/2
                  top-1/2
                  h-[70%]
                  w-[70%]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-[#1E513B]
                "
              />

              {/* Official GFG BVM Logo */}
              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  z-10
                  flex
                  h-[58%]
                  w-[58%]
                  -translate-x-1/2
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-white
                  p-8
                  shadow-2xl
                  backdrop-blur-sm
                  sm:p-10
                "
              >
                <img
                  src={
                    siteData?.branding?.logo ||
                    "/assets/brand/gfg-bvm-logo.ico"
                  }
                  alt={
                    siteData?.name ||
                    "GeeksforGeeks Student Chapter BVM"
                  }
                  className="
                    h-full
                    w-full
                    object-contain
                  "
                />
              </div>

              {/* =================================================
                  TECHNICAL DECORATORS
              ================================================= */}

              <div
                className="
                  absolute
                  left-6
                  right-6
                  top-6
                  h-px
                  bg-white/10
                "
              />

              <div
                className="
                  absolute
                  bottom-6
                  left-6
                  right-6
                  h-px
                  bg-white/10
                "
              />

              {/* Bottom Label */}
              <div
                className="
                  absolute
                  bottom-6
                  left-6
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  text-white/50
                "
              >
                Learn / Build / Grow
              </div>

              {/* Year Label */}
              <div
                className="
                  absolute
                  right-6
                  top-6
                  font-mono
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#86C39D]
                "
              >
                BVM / 2026
              </div>
            </div>
          </div>

          {/* ===================================================
              RIGHT COPY
          =================================================== */}

          <div className="about-copy">
            <div className="max-w-2xl">
              <p
                className="
                  font-montserrat
                  text-xl
                  font-bold
                  leading-relaxed
                  tracking-tight
                  text-[#0D1F15]
                  sm:text-2xl
                  sm:leading-snug
                "
              >
                The GeeksforGeeks Student Chapter at BVM
                exists to cultivate a strong culture of
                coding, problem solving, and technical
                exploration.
              </p>

              <p
                className="
                  mt-6
                  text-sm
                  leading-relaxed
                  text-[#4B6354]
                  sm:text-base
                  sm:leading-relaxed
                "
              >
                Through workshops, hands-on sessions,
                coding activities, competitions, and
                collaborative initiatives, we create an
                environment where students can transform
                what they learn into what they build.
              </p>

              <p
                className="
                  mt-4
                  text-sm
                  leading-relaxed
                  text-[#4B6354]
                  sm:text-base
                  sm:leading-relaxed
                "
              >
                Whether you're taking your first step
                into programming or already building
                complex projects, GFG BVM is a community
                where you can learn from others, share
                your knowledge, and grow together.
              </p>

              {/* CTA */}
              <a
                href={`#${SECTION_IDS.EVENTS}`}
                onClick={handleExploreClick}
                className="
                  about-cta
                  group
                  mt-8
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-[#DCE5E0]
                  bg-white
                  px-6
                  py-3.5
                  text-sm
                  font-bold
                  text-[#0D1F15]
                  shadow-sm
                  transition-all
                  duration-300
                  hover:border-[#1E513B]
                  hover:bg-[#1E513B]
                  hover:text-white
                "
              >
                Explore our events

                <ArrowUpRight
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </a>
            </div>
          </div>
        </div>

        {/* ===================================================
            DYNAMIC CHAPTER METRICS
        =================================================== */}

        <AboutStats />
      </Container>
    </section>
  );
};

export default About;