"use client";

import { motion } from "framer-motion";
import {
  Code2,
  CalendarDays,
  Palette,
  Users,
  Megaphone,
  ListChecks,
  Info,
  Check,
} from "lucide-react";
import { SpotlightCard } from "./effects";

const POSTS = [
  "Operations & Outreach Head",
  "Design & Creative Head",
  "Social Media & Promotion Head",
  "BR Head",
];

const ROLE_DETAILS = [
  {
    title: "Operations & Outreach Head",
    icon: CalendarDays,
    accent: "text-sky-300",
    ring: "ring-sky-400/20",
    chip: "bg-sky-500/15",
    bar: "from-sky-400 to-blue-500",
    glow:
      "hover:shadow-[0_0_30px_-8px_rgba(56,189,248,0.5)] hover:border-sky-400/40",
    description:
      "Plan, organize, and execute chapter events while building strong relationships with students, faculty, and industry partners.",
    responsibilities: [
      "Plan and manage chapter events efficiently",
      "Coordinate with faculty, speakers, and volunteers",
      "Build collaborations with clubs, communities, and sponsors",
    ],
    skills:
      "Leadership, Communication, Event Management, Networking",
  },
  {
    title: "Design & Creative Head",
    icon: Palette,
    accent: "text-pink-300",
    ring: "ring-pink-400/20",
    chip: "bg-pink-500/15",
    bar: "from-pink-400 to-fuchsia-500",
    glow:
      "hover:shadow-[0_0_30px_-8px_rgba(244,114,182,0.5)] hover:border-pink-400/40",
    description:
      "Create visually appealing content that represents the GFG chapter and strengthens its brand identity.",
    responsibilities: [
      "Design posters, certificates, and promotional graphics",
      "Create presentations and event branding materials",
      "Maintain a consistent visual identity across all platforms",
    ],
    skills:
      "Canva, Figma, Creativity, Graphic Design",
  },
  {
    title: "Social Media & Promotion Head",
    icon: Megaphone,
    accent: "text-violet-300",
    ring: "ring-violet-400/20",
    chip: "bg-violet-500/15",
    bar: "from-violet-400 to-purple-500",
    glow:
      "hover:shadow-[0_0_30px_-8px_rgba(167,139,250,0.5)] hover:border-violet-400/40",
    description:
      "Promote chapter activities through engaging content and strategic campaigns to maximize reach and participation.",
    responsibilities: [
      "Manage social media platforms and promotional campaigns",
      "Create and schedule engaging posts for events and announcements",
      "Curate relevant technical and community content for social media (Content Curation)",
      "Monitor engagement and increase the chapter's online presence",
    ],
    skills:
      "Content Creation, Social Media Management, Copywriting, Marketing",
  },
  {
    title: "BR Head",
    icon: Users,
    accent: "text-emerald-300",
    ring: "ring-emerald-400/20",
    chip: "bg-emerald-500/15",
    bar: "from-emerald-400 to-green-500",
    glow:
      "hover:shadow-[0_0_30px_-8px_rgba(16,185,129,0.5)] hover:border-emerald-400/40",
    description:
      "Coordinate with Branch Representatives to ensure smooth communication, maximum outreach, and active participation across all departments.",
    responsibilities: [
      "Manage and coordinate Branch Representatives from all branches",
      "Ensure announcements, event updates, and important information reach every branch effectively",
      "Monitor branch-wise engagement and encourage participation in chapter activities",
    ],
    skills:
      "Leadership, Communication, Coordination, Team Management",
  },
];

const RANK_LABEL = ["1st Pick", "2nd Pick", "3rd Pick"];
const RANK_STYLE = [
  "bg-amber-400/15 text-amber-300 ring-amber-400/30",
  "bg-slate-300/10 text-slate-300 ring-slate-300/30",
  "bg-orange-400/15 text-orange-300 ring-orange-400/30",
];

export default function Preferences({ formData, setFormData }) {
  const handlePreferenceChange = (index, value) => {
    const updatedPreferences = [...formData.preferences];
    updatedPreferences[index] = value;
    setFormData((prev) => ({ ...prev, preferences: updatedPreferences }));
  };

  const getAvailableOptions = (currentIndex) =>
    POSTS.filter(
      (post) =>
        !formData.preferences.includes(post) ||
        formData.preferences[currentIndex] === post
    );

  return (
    <SpotlightCard className="overflow-hidden rounded-2xl border border-emerald-500/15 bg-white/[0.03] shadow-2xl shadow-emerald-950/40 backdrop-blur-xl">
      <div className="relative z-10 border-b border-white/5 bg-white/[0.02] px-5 py-5 sm:px-8 sm:py-6">
        <h2 className="flex items-center gap-2 text-lg font-bold text-white sm:gap-3 sm:text-2xl">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20 sm:h-10 sm:w-10">
            <Code2 size={20} className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px]" />
          </span>
          Choose Your Preferred Roles
        </h2>
        <p className="mt-2 text-xs text-zinc-400 sm:mt-1 sm:text-sm">
          Understand each role, then pick the positions that best match your
          strengths.
        </p>
      </div>

      <div className="relative z-10 p-5 sm:p-8">
        {/* Role cards */}
        <motion.div
          className="mb-8 grid gap-4 sm:mb-10 sm:gap-5 md:grid-cols-2"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {ROLE_DETAILS.map((role) => {
            const Icon = role.icon;
            const rank = formData.preferences.indexOf(role.title);

            return (
              <motion.div
                key={role.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className={`group relative min-w-0 overflow-hidden rounded-xl border border-white/8 bg-white/[0.02] p-5 transition-shadow duration-300 sm:p-6 ${role.glow}`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${role.bar}`}
                />

                {rank !== -1 && (
                  <span
                    className={`absolute right-3 top-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold ring-1 sm:right-4 sm:top-5 sm:px-3 sm:py-1 sm:text-xs ${RANK_STYLE[rank]}`}
                  >
                    {RANK_LABEL[rank]}
                  </span>
                )}

                <div className="mb-3 flex items-center gap-2.5 sm:mb-4 sm:gap-3">
                  <div
                    className={`shrink-0 rounded-xl ${role.chip} p-2.5 ring-1 sm:p-3 ${role.ring}`}
                  >
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${role.accent}`} />
                  </div>
                  <h3 className="break-words pr-16 text-base font-semibold text-white sm:pr-20 sm:text-lg">
                    {role.title}
                  </h3>
                </div>

                <p className="mb-3 text-xs text-zinc-400 sm:mb-4 sm:text-sm">{role.description}</p>

                <h4 className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-500 sm:mb-2 sm:text-xs">
                  Responsibilities
                </h4>
                <ul className="mb-4 space-y-1.5 text-xs text-zinc-300 sm:mb-5 sm:space-y-2 sm:text-sm">
                  {role.responsibilities.map((item) => (
                    <li key={item} className="flex items-start gap-2 break-words">
                      <Check
                        size={15}
                        className={`mt-0.5 h-[14px] w-[14px] shrink-0 sm:h-[15px] sm:w-[15px] ${role.accent}`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500 sm:text-xs">
                    Preferred Skills
                  </span>
                  <p className="mt-1 break-words text-xs text-zinc-300 sm:text-sm">{role.skills}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mb-6 h-px w-full bg-white/5 sm:mb-8" />

        <h3 className="mb-1.5 flex items-center gap-2 text-lg font-semibold text-emerald-300 sm:mb-2 sm:text-xl">
          <ListChecks size={20} className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px]" />
          Select Your Preferences
        </h3>
        <p className="mb-5 text-xs text-zinc-400 sm:mb-6 sm:text-sm">
          Choose three different roles in order of your preference.
        </p>

        <div className="space-y-4 sm:space-y-5">
          {[0, 1, 2].map((index) => (
            <div key={index}>
              <label className="mb-2 flex items-center gap-2 text-xs font-medium text-zinc-300 sm:text-sm">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ring-1 sm:h-6 sm:w-6 sm:text-xs ${RANK_STYLE[index]}`}
                >
                  {index + 1}
                </span>
                {index + 1}
                {index === 0 ? "st" : index === 1 ? "nd" : "rd"} Preference
                <span className="text-emerald-400">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.preferences[index] || ""}
                  onChange={(e) => handlePreferenceChange(index, e.target.value)}
                  className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.03] p-3 pr-10 text-xs text-zinc-100 outline-none transition focus:border-emerald-400/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-emerald-500/10 sm:text-sm"
                >
                  <option value="">Select a Position</option>
                  {getAvailableOptions(index).map((post) => (
                    <option key={post} value={post}>
                      {post}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-zinc-500 sm:h-4 sm:w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-emerald-400/20 bg-emerald-500/[0.06] p-4 sm:mt-8 sm:p-5">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-300 sm:text-base">
            <Info size={18} className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px]" />
            Important Instructions
          </h3>
          <ul className="ml-1 space-y-1.5 text-xs text-zinc-300 sm:space-y-2 sm:text-sm">
            {[
              "Choose exactly three different preferences.",
              "Your first preference will receive the highest priority.",
              "No duplicate preferences are allowed.",
              "Proof of Work questions will be generated based on your selected preferences.",
              "You may leave Proof of Work questions unanswered if they are not applicable.",
            ].map((line) => (
              <li key={line} className="flex items-start gap-2 break-words">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SpotlightCard>
  );
}