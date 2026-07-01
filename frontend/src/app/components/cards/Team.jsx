"use client";

import { Linkedin, Instagram, Github, Globe } from "lucide-react";
import Image from "next/image";

const MemberCard = ({
  name,
  role,
  image,
  instagram,
  linkedin,
  github,
  website,
}) => {
  return (
    <div
      className="
        group
        bg-white
        rounded-xl
        border border-neutral-200
        overflow-hidden
        w-full
        transition-all duration-300
        hover:border-[#0F9D58]/40
        hover:shadow-lg
      "
    >
      {/* Image */}
      <div className="relative w-full h-48 sm:h-52 bg-neutral-100 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="
              object-cover
              transition-transform duration-500
              group-hover:scale-[1.04]
            "
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-neutral-500 text-3xl font-semibold">
            {name.charAt(0)}
          </div>
        )}

        {/* Top green accent bar */}
        <span
          className="
            absolute top-0 left-0 h-[3px] w-full
            bg-[#0F9D58]
            scale-x-0
            origin-left
            transition-transform duration-300
            group-hover:scale-x-100
          "
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 text-center">
        <h2 className="text-base font-semibold text-neutral-900 transition-colors group-hover:text-[#0F9D58]">
          {name}
        </h2>

        <p className="text-sm text-neutral-600 mt-1">{role}</p>

        {/* Social Icons */}
        <div className="flex justify-center gap-3 mt-4">
          {linkedin && (
            <SocialIcon href={linkedin} label={`${name}'s LinkedIn`}>
              <Linkedin size={18} />
            </SocialIcon>
          )}
          {instagram && (
            <SocialIcon href={instagram} label={`${name}'s Instagram`}>
              <Instagram size={18} />
            </SocialIcon>
          )}
          {github && (
            <SocialIcon href={github} label={`${name}'s GitHub`}>
              <Github size={18} />
            </SocialIcon>
          )}
          {website && (
            <SocialIcon href={website} label={`${name}'s Website`}>
              <Globe size={18} />
            </SocialIcon>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberCard;

/* ---------- Social Icon ---------- */

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        p-2
        rounded-full
        text-neutral-500
        transition-colors
        hover:text-[#0F9D58]
        focus:outline-none
        focus:ring-2 focus:ring-[#0F9D58]/30
      "
    >
      {children}
    </a>
  );
}