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
  "Event & Operations Head",
  "Design & Creative Head",
  "Public Relations & Outreach Head",
  "Social Media & Promotion Head",
];

const ROLE_DETAILS = [
  {
    title: "Event & Operations Head",
    icon: CalendarDays,
    accent: "text-sky-300",
    ring: "ring-sky-400/20",
    chip: "bg-sky-500/15",
    bar: "from-sky-400 to-blue-500",
    glow: "hover:shadow-[0_0_30px_-8px_rgba(56,189,248,0.5)] hover:border-sky-400/40",
    description: "Plan, organize and execute all chapter events efficiently.",
    responsibilities: [
      "Manage event logistics",
      "Coordinate with faculty & volunteers",
      "Ensure smooth event execution",
    ],
    skills: "Leadership, Planning, Communication",
  },
  {
    title: "Design & Creative Head",
    icon: Palette,
    accent: "text-pink-300",
    ring: "ring-pink-400/20",
    chip: "bg-pink-500/15",
    bar: "from-pink-400 to-fuchsia-500",
    glow: "hover:shadow-[0_0_30px_-8px_rgba(244,114,182,0.5)] hover:border-pink-400/40",
    description:
      "Create visually appealing content that represents the GFG chapter.",
    responsibilities: [
      "Design posters & certificates",
      "Create presentations",
      "Maintain chapter branding",
    ],
    skills: "Canva, Figma, Creativity",
  },
  {
    title: "Public Relations & Outreach Head",
    icon: Users,
    accent: "text-orange-300",
    ring: "ring-orange-400/20",
    chip: "bg-orange-500/15",
    bar: "from-orange-400 to-amber-500",
    glow: "hover:shadow-[0_0_30px_-8px_rgba(251,146,60,0.5)] hover:border-orange-400/40",
    description:
      "Build collaborations and strengthen the chapter's external network.",
    responsibilities: [
      "Connect with clubs & communities",
      "Coordinate guest speakers",
      "Manage official communications",
    ],
    skills: "Networking, Communication, Confidence",
  },
  {
    title: "Social Media & Promotion Head",
    icon: Megaphone,
    accent: "text-violet-300",
    ring: "ring-violet-400/20",
    chip: "bg-violet-500/15",
    bar: "from-violet-400 to-purple-500",
    glow: "hover:shadow-[0_0_30px_-8px_rgba(167,139,250,0.5)] hover:border-violet-400/40",
    description:
      "Increase the online presence of the chapter through engaging content.",
    responsibilities: [
      "Manage Instagram & LinkedIn",
      "Publish event updates",
      "Promote chapter activities",
    ],
    skills: "Content Creation, Social Media, Marketing",
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
      <div className="relative z-10 border-b border-white/5 bg-white/[0.02] px-8 py-6">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20">
            <Code2 size={20} />
          </span>
          Choose Your Preferred Roles
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          Understand each role, then pick the positions that best match your
          strengths.
        </p>
      </div>

      <div className="relative z-10 p-8">
        {/* Role cards */}
        <motion.div
          className="mb-10 grid gap-5 md:grid-cols-2"
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
                className={`group relative overflow-hidden rounded-xl border border-white/8 bg-white/[0.02] p-6 transition-shadow duration-300 ${role.glow}`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${role.bar}`}
                />

                {rank !== -1 && (
                  <span
                    className={`absolute right-4 top-5 rounded-full px-3 py-1 text-xs font-bold ring-1 ${RANK_STYLE[rank]}`}
                  >
                    {RANK_LABEL[rank]}
                  </span>
                )}

                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`rounded-xl ${role.chip} p-3 ring-1 ${role.ring}`}
                  >
                    <Icon className={`h-6 w-6 ${role.accent}`} />
                  </div>
                  <h3 className="pr-20 text-lg font-semibold text-white">
                    {role.title}
                  </h3>
                </div>

                <p className="mb-4 text-sm text-zinc-400">{role.description}</p>

                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Responsibilities
                </h4>
                <ul className="mb-5 space-y-2 text-sm text-zinc-300">
                  {role.responsibilities.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check
                        size={15}
                        className={`mt-0.5 shrink-0 ${role.accent}`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Preferred Skills
                  </span>
                  <p className="mt-1 text-sm text-zinc-300">{role.skills}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mb-8 h-px w-full bg-white/5" />

        <h3 className="mb-2 flex items-center gap-2 text-xl font-semibold text-emerald-300">
          <ListChecks size={20} />
          Select Your Preferences
        </h3>
        <p className="mb-6 text-sm text-zinc-400">
          Choose three different roles in order of your preference.
        </p>

        <div className="space-y-5">
          {[0, 1, 2].map((index) => (
            <div key={index}>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ring-1 ${RANK_STYLE[index]}`}
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
                  className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.03] p-3 pr-10 text-zinc-100 outline-none transition focus:border-emerald-400/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-emerald-500/10"
                >
                  <option value="">Select a Position</option>
                  {getAvailableOptions(index).map((post) => (
                    <option key={post} value={post}>
                      {post}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
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

        <div className="mt-8 rounded-xl border border-emerald-400/20 bg-emerald-500/[0.06] p-5">
          <h3 className="mb-2 flex items-center gap-2 font-semibold text-emerald-300">
            <Info size={18} />
            Important Instructions
          </h3>
          <ul className="ml-1 space-y-2 text-sm text-zinc-300">
            {[
              "Choose exactly three different preferences.",
              "Your first preference will receive the highest priority.",
              "No duplicate preferences are allowed.",
              "Proof of Work questions will be generated based on your selected preferences.",
              "You may leave Proof of Work questions unanswered if they are not applicable.",
            ].map((line) => (
              <li key={line} className="flex items-start gap-2">
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
