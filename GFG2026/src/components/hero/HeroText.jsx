import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import siteData from "../../data/site";
import MagneticButton from "../common/MagneticButton";

/**
 * HeroText Component
 * 
 * Primary typography layout for the Hero section.
 * Features line-masked GSAP reveal targets, Montserrat typography,
 * and magnetic actions styled in the Forest Mint palette.
 */
const HeroText = () => {
  const scrollToEvents = () => {
    document.querySelector("#Events")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="hero-content flex w-full flex-col select-none">
      {/* Technical Eyebrow Tag */}
      <div className="hero-eyebrow mb-7 flex items-center gap-3">
        <span className="h-px w-8 bg-[#1E513B]" />

        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#1E513B] sm:text-xs">
          GeeksforGeeks Student Chapter
        </span>
      </div>

      {/* Main Headline Title */}
      <h1 className="hero-title max-w-[1000px] font-montserrat text-[clamp(3.5rem,10vw,9.2rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.06em] text-[#0D1F15]">
        <span className="hero-title-line block overflow-hidden">
          <span className="hero-title-word inline-block">
            Code.
          </span>
        </span>

        <span className="hero-title-line block overflow-hidden">
          <span className="hero-title-word inline-block text-[#1E513B]">
            Create.
          </span>
        </span>

        <span className="hero-title-line block overflow-hidden">
          <span className="hero-title-word inline-block">
            Contribute.
          </span>
        </span>
      </h1>

      {/* Description + CTA Buttons Area */}
      <div className="mt-10 flex flex-col gap-8 lg:ml-[18%] lg:mt-12 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        {/* Subtitle Description */}
        <p className="hero-description max-w-xl text-base leading-relaxed text-[#4B6354] sm:text-lg sm:leading-8">
          {siteData?.tagline || "Empowering developers through technology and collaboration."}{" "}
          A premier student chapter at Birla Vishvakarma Mahavidyalaya dedicated to fostering algorithmic excellence and innovation.
        </p>

        {/* Action Buttons */}
        <div className="hero-actions flex flex-wrap items-center gap-4">
          <MagneticButton
            onClick={scrollToEvents}
            variant="primary"
            className="group !bg-[#1E513B] !px-7 !py-4 !text-white hover:!bg-[#286E50] hover:!shadow-[0_8px_25px_rgba(30,81,59,0.25)]"
          >
            <span className="flex items-center gap-2.5 font-montserrat text-xs font-bold uppercase tracking-wider">
              Explore Events
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </span>
          </MagneticButton>

          <a
            href="#About"
            className="hero-secondary-button group inline-flex items-center gap-2 rounded-full border border-[#DCE5E0] bg-white px-7 py-4 font-montserrat text-xs font-bold uppercase tracking-wider text-[#0D1F15] shadow-xs transition-all duration-300 hover:border-[#1E513B] hover:text-[#1E513B] hover:shadow-md"
          >
            Discover GFG BVM
            <ArrowDownRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </a>
        </div>
      </div>

      {/* Bottom Technical Metadata Bar */}
      <div className="hero-meta mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[#DCE5E0] pt-6 lg:mt-20">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4B6354]">
          BVM / Anand / Gujarat
        </span>

        <span className="h-1.5 w-1.5 rounded-full bg-[#1E513B]" />

        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4B6354]">
          Chapter / {siteData?.year || "2026"}
        </span>

        <span className="h-1.5 w-1.5 rounded-full bg-[#1E513B]" />

        <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#1E513B]">
          &lt;gfg_bvm&gt;
        </span>
      </div>
    </div>
  );
};

export default HeroText;