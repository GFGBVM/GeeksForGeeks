"use client";

import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandInstagram,
} from "@tabler/icons-react";

export default function Contact() {
  return (
    <section
      id="Contact"
      className="py-20 bg-gray-50 dark:bg-neutral-900 font-roboto"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-semibold text-[#0F9D58] dark:text-[#34A853] mb-4">
          Contact Us
        </h2>

        {/* Description */}
        <p className="text-neutral-600 dark:text-neutral-300 text-base mb-10">
          Connect with GeeksforGeeks Student Chapter BVM on social media for
          updates, workshops, and technical events.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-6">
          <SocialLink
            href="https://www.facebook.com/people/Gfgstudentchapter-Bvm/pfbid034ygBEqk3Szhs5q4AuEQLnbM3K4xqSeUaq6AvqAEZLdyPammWL2K1WiDuVjgtv4fyl/"
            label="Facebook"
          >
            <IconBrandFacebook size={22} />
          </SocialLink>

          <SocialLink href="https://x.com/GfgBvm" label="Twitter">
            <IconBrandTwitter size={22} />
          </SocialLink>

          <SocialLink
            href="https://www.linkedin.com/in/gfg-student-chapter-bvm-643736253/"
            label="LinkedIn"
          >
            <IconBrandLinkedin size={22} />
          </SocialLink>

          <SocialLink
            href="https://www.instagram.com/gfgbvm/"
            label="Instagram"
          >
            <IconBrandInstagram size={22} />
          </SocialLink>
        </div>
      </div>
    </section>
  );
}

/* ---------- Social Icon Wrapper ---------- */

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        flex items-center justify-center
        h-12 w-12
        rounded-full
        bg-white dark:bg-neutral-800
        text-neutral-600 dark:text-neutral-300
        border border-neutral-200 dark:border-neutral-700
        shadow-sm
        transition-all duration-300
        hover:text-[#0F9D58]
        hover:border-[#0F9D58]/40
        hover:shadow-md
        focus:outline-none
        focus:ring-2 focus:ring-[#0F9D58]/30
      "
    >
      {children}
    </a>
  );
}