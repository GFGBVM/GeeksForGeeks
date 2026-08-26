import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";

/**
 * Social media icons.
 *
 * Brand icons are provided by react-icons.
 * Lucide is used only for generic UI icons.
 */
const socialIcons = {
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  github: FaGithub,
};

const TeamCard = ({ member, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  return (
    <article
      className={`
        team-card
        group
        relative
        flex
        flex-col
        overflow-hidden
        rounded-2xl
        border
        bg-white
        p-3.5
        transition-all
        duration-500
        ease-out
        hover:-translate-y-1.5
        hover:shadow-[0_16px_36px_rgba(13,31,21,0.08)]
        ${
          isExpanded
            ? "border-[#1E513B] shadow-[0_16px_36px_rgba(13,31,21,0.08)]"
            : "border-[#DCE5E0] hover:border-[#1E513B]/40"
        }
      `}
      data-index={index}
    >
      {/* =====================================================
          IMAGE
      ===================================================== */}
      <div
        className="
          team-image-wrapper
          relative
          aspect-[4/5]
          w-full
          overflow-hidden
          rounded-xl
          bg-[#E8EFEA]
        "
      >
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="
            team-image
            h-full
            w-full
            object-cover
            object-center
            grayscale-[12%]
            transition-all
            duration-700
            ease-out
            group-hover:scale-[1.06]
            group-hover:grayscale-0
          "
        />

        {/* Hover Gradient */}
        <div
          className="
            team-image-overlay
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-[#0D1F15]/60
            via-[#1E513B]/10
            to-transparent
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        />

        {/* MEMBER NUMBER */}
        <div
          className="
            absolute
            left-3.5
            top-3.5
            flex
            h-7
            min-w-[2.25rem]
            items-center
            justify-center
            rounded-full
            border
            border-[#DCE5E0]/60
            bg-white/90
            px-2
            font-mono
            text-[10px]
            font-bold
            text-[#1E513B]
            shadow-sm
            backdrop-blur-md
          "
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* SOCIAL ICONS (Always visible on mobile / touch, reveals on hover for desktop) */}
        <div
          className="
            team-socials
            absolute
            bottom-3.5
            right-3.5
            z-10
            flex
            items-center
            gap-1.5
            transition-all
            duration-500
            ease-out
            max-md:translate-y-0
            max-md:opacity-100
            md:translate-y-4
            md:opacity-0
            md:group-hover:translate-y-0
            md:group-hover:opacity-100
          "
        >
          {Object.entries(member.socials || {}).map(([platform, url]) => {
            const Icon = socialIcons[platform];

            if (!Icon || !url) return null;

            return (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} ${platform}`}
                onClick={(e) => e.stopPropagation()}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-white/90
                  text-[#0D1F15]
                  shadow-md
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:scale-110
                  hover:bg-[#1E513B]
                  hover:text-white
                "
              >
                <Icon size={15} />
              </a>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          MEMBER INFORMATION
      ===================================================== */}
      <div
        className="
          team-info
          relative
          flex
          flex-1
          flex-col
          justify-between
          px-1.5
          pb-1
          pt-4
        "
      >
        <div className="flex items-start justify-between gap-3">
          {/* Name + designation */}
          <div>
            <h3
              className="
                font-montserrat
                text-base
                font-bold
                tracking-tight
                text-[#0D1F15]
                transition-colors
                duration-300
                group-hover:text-[#1E513B]
              "
            >
              {member.name}
            </h3>

            <p
              className="
                mt-1
                font-mono
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-[#1E513B]
              "
            >
              {member.designation}
            </p>
          </div>

          {/* Interactive Action Arrow Button */}
          <button
            type="button"
            onClick={toggleExpand}
            aria-expanded={isExpanded}
            aria-label={
              isExpanded
                ? `Collapse info for ${member.name}`
                : `Expand details for ${member.name}`
            }
            className={`
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              transition-all
              duration-300
              ${
                isExpanded
                  ? "border-[#1E513B] bg-[#1E513B] text-white"
                  : "border-[#DCE5E0] text-[#4B6354] hover:border-[#1E513B] hover:bg-[#1E513B] hover:text-white"
              }
            `}
          >
            <ArrowUpRight
              size={14}
              className={`
                transition-transform
                duration-300
                ${
                  isExpanded
                    ? "rotate-90"
                    : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                }
              `}
            />
          </button>
        </div>

        {/* Fixed Collapsible Section */}
        <div
          className={`
            grid
            transition-all
            duration-300
            ease-in-out
            ${
              isExpanded
                ? "grid-rows-[1fr] opacity-100 mt-3 pt-3 border-t border-[#DCE5E0]"
                : "grid-rows-[0fr] opacity-0 mt-0 pt-0"
            }
          `}
        >
          <div className="min-h-0 overflow-hidden space-y-2.5">
            {member.bio && (
              <p className="text-xs leading-relaxed text-[#4B6354]">
                {member.bio}
              </p>
            )}

            {member.skills?.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="
                      rounded
                      bg-[#E8EFEA]
                      px-2
                      py-0.5
                      font-mono
                      text-[9px]
                      font-semibold
                      text-[#1E513B]
                    "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default TeamCard;