import { useLayoutEffect, useRef } from "react";
import MainLayout from "../layouts/MainLayout";
import Container from "../components/common/Container";
import SectionHeading from "../components/common/SectionHeading";
import TeamCard from "../components/team/TeamCard";
import { brTeamMembers } from "../data/team";
import { scrollToTop } from "../utils/scrollToSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * BRTeam Page Component
 * 
 * Dedicated showcase page for Branch Representatives.
 * Reuses the core `TeamCard` component for design consistency across the site.
 */
const BRTeam = () => {
  const pageRef = useRef(null);

  // Ensure scroll position resets to top on initial mount
  useLayoutEffect(() => {
    scrollToTop("auto");
  }, []);

  // Entrance animations using GSAP and ScrollTrigger
  useLayoutEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      const heading = pageRef.current.querySelector(".br-heading");
      const cards = pageRef.current.querySelectorAll(".br-card");

      if (heading) {
        gsap.fromTo(
          heading,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
          }
        );
      }

      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            y: 60,
            opacity: 0,
            scale: 0.97,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cards[0],
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <MainLayout>
      <main
        ref={pageRef}
        className="min-h-screen bg-[#F4F7F5] pb-24 pt-32 sm:pb-32"
      >
        <Container>
          {/* Header */}
          <div className="br-heading">
            <SectionHeading
              number="BR"
              eyebrow="Branch Representatives"
              title={
                <>
                  Meet the
                  <br />
                  <span className="text-[#1E513B]">
                    BR Team.
                  </span>
                </>
              }
              description="
                Our Branch Representatives connect the GFG Student Chapter with students across different departments and help build a stronger technical community at BVM.
              "
            />
          </div>

          {/* Section Divider */}
          <div className="my-12 h-px w-full bg-[#DCE5E0] sm:my-16" />

          {/* BR Cards Grid */}
          {brTeamMembers?.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {brTeamMembers.map((member, index) => (
                <div key={member.id || member.name || index} className="br-card">
                  <TeamCard member={member} index={index} />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#DCE5E0] bg-white p-12 text-center shadow-sm">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#4B6354]">
                BR Team information coming soon.
              </p>
            </div>
          )}
        </Container>
      </main>
    </MainLayout>
  );
};

export default BRTeam;