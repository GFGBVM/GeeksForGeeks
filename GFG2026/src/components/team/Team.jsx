import { useRef } from "react";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import TeamGrid from "./TeamGrid";
import { initTeamAnimation } from "./TeamAnimation";
import { useGSAP } from "../../hooks/useGSAP";

/**
 * Team Component
 * 
 * Showcases core team members, lead executive leads, and domain heads.
 * Features ambient emerald background glows, pull-quote styling, and GSAP scroll reveals.
 */
const Team = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const cleanup = initTeamAnimation(sectionRef.current);
    return () => cleanup?.();
  }, sectionRef);

  return (
    <section
      ref={sectionRef}
      id="Team"
      className="team-section relative overflow-hidden bg-[#F4F7F5] py-24 select-none sm:py-32 lg:py-40"
    >
      {/* Background Ambient Radial Glow */}
      <div
        className="team-bg-glow pointer-events-none absolute right-[-15%] top-[15%] h-[500px] w-[500px] rounded-full bg-[#1E513B]/[0.07] blur-[120px]"
        aria-hidden="true"
      />

      <Container>
        {/* Section Header */}
        <div className="team-heading">
          <SectionHeading
            number="03"
            eyebrow="Our Team"
            title={
              <>
                The people
                <br />
                behind the
                <span className="text-[#1E513B]"> community.</span>
              </>
            }
            description="A dedicated team of passionate student leaders driving technical growth, organizing events, and building high-impact software at BVM."
          />
        </div>

        {/* Section Quote */}
        <blockquote className="team-quote mt-14 flex max-w-2xl items-start gap-4 border-l-2 border-[#1E513B] pl-5 sm:mt-16 sm:pl-7">
          <p className="font-montserrat text-base italic leading-7 text-[#4B6354] sm:text-lg">
            “Individually, we grow. Together, we empower the next generation of engineers.”
          </p>
        </blockquote>

        {/* Team Grid Layout */}
        <TeamGrid />

        {/* Bottom Closing Statement */}
        <div className="team-bottom mt-20 border-t border-[#DCE5E0] pt-8 sm:mt-28 sm:pt-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <p className="max-w-xl text-sm leading-6 text-[#4B6354]">
              From technology and content to design, events, marketing, and outreach — every domain head works in unison toward technical excellence.
            </p>

            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1E513B]">
              GFG BVM / 2026 EDITION
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Team;