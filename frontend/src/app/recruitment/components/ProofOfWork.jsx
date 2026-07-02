"use client";

import { useEffect } from "react";
import {
  CalendarDays,
  Palette,
  Users,
  Megaphone,
  Code2,
  Link2,
  PenLine,
  Info,
} from "lucide-react";
import { QUESTIONS } from "../constants/questions";
import { SpotlightCard } from "./effects";

const ROLE_META = {
  "Operations & Outreach Head": {
    icon: CalendarDays,
    accent: "text-sky-300",
    chip: "bg-sky-500/15 ring-sky-400/20",
    bar: "bg-sky-400/70",
  },
  "Design & Creative Head": {
    icon: Palette,
    accent: "text-pink-300",
    chip: "bg-pink-500/15 ring-pink-400/20",
    bar: "bg-pink-400/70",
  },
  "Social Media & Promotion Head": {
    icon: Megaphone,
    accent: "text-violet-300",
    chip: "bg-violet-500/15 ring-violet-400/20",
    bar: "bg-violet-400/70",
  },
  "BR Head": {
    icon: Users,
    accent: "text-emerald-300",
    chip: "bg-emerald-500/15 ring-emerald-400/20",
    bar: "bg-emerald-400/70",
  },
};

export default function ProofOfWork({ formData, setFormData }) {
  useEffect(() => {
    setFormData((prev) => {
      const updatedResponses = [];

      prev.preferences.forEach((post) => {
        if (!post) return;

        QUESTIONS[post]?.forEach((item) => {
          const existing = prev.responses.find(
            (response) =>
              response.post === post && response.question === item.question
          );

          updatedResponses.push(
            existing || { post, question: item.question, answer: "" }
          );
        });
      });

      return { ...prev, responses: updatedResponses };
    });
  }, [formData.preferences, setFormData]);

  const handleAnswerChange = (post, question, answer) => {
    setFormData((prev) => ({
      ...prev,
      responses: prev.responses.map((response) =>
        response.post === post && response.question === question
          ? { ...response, answer }
          : response
      ),
    }));
  };

  const getAnswer = (post, question) => {
    const response = formData.responses.find(
      (item) => item.post === post && item.question === question
    );
    return response ? response.answer : "";
  };

  const fieldClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] p-3 text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-emerald-400/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-emerald-500/10";

  return (
    <SpotlightCard className="overflow-hidden rounded-2xl border border-emerald-500/15 bg-white/[0.03] shadow-2xl shadow-emerald-950/40 backdrop-blur-xl">
      <div className="relative z-10 border-b border-white/5 bg-white/[0.02] px-8 py-6">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20">
            <Code2 size={20} />
          </span>
          Additional Information
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Share any relevant experience, portfolio links, or responses based on
          your selected preferences.
          <span className="font-medium text-emerald-300">
            {" "}
            All fields are optional.
          </span>
        </p>

        <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-500/10 p-4">
          <div className="flex items-center gap-2 text-amber-300">
            <Info size={18} />
            <h4 className="font-semibold">Interview Preparation</h4>
          </div>

          <p className="mt-2 text-sm leading-6 text-zinc-300">
            Your responses will be reviewed by the interview panel and may be
            discussed during your interview. Please answer thoughtfully and be
            prepared to explain your ideas, experiences, and responses.
            <span className="font-medium text-emerald-300">
              {" "}
              We wish you the very best of luck!
            </span>
          </p>
        </div>
      </div>

      <div className="relative z-10 p-8">
        {formData.preferences.map((post) => {
          if (!post) return null;

          const meta = ROLE_META[post];
          const Icon = meta?.icon ?? Code2;

          return (
            <div
              key={post}
              className="relative mb-8 overflow-hidden rounded-xl border border-white/8 bg-white/[0.02] p-6 last:mb-0"
            >
              <div
                className={`absolute left-0 top-0 h-full w-1 ${
                  meta?.bar ?? "bg-emerald-400/70"
                }`}
              />

              <h3 className="mb-6 flex items-center gap-3 text-lg font-semibold text-white">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ring-1 ${
                    meta?.chip ?? "bg-emerald-500/15 ring-emerald-400/20"
                  }`}
                >
                  <Icon
                    size={18}
                    className={meta?.accent ?? "text-emerald-300"}
                  />
                </span>

                {post}
              </h3>

              {QUESTIONS[post]?.map((item, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <label className="mb-2 flex items-start gap-2 text-sm font-medium text-zinc-300">
                    {item.type === "textarea" ? (
                      <PenLine
                        size={15}
                        className="mt-0.5 shrink-0 text-zinc-500"
                      />
                    ) : (
                      <Link2
                        size={15}
                        className="mt-0.5 shrink-0 text-zinc-500"
                      />
                    )}

                    <span className="whitespace-pre-line leading-relaxed">
                      {item.question}
                    </span>
                  </label>

                  {item.type === "textarea" ? (
                    <textarea
                      rows={5}
                      value={getAnswer(post, item.question)}
                      onChange={(e) =>
                        handleAnswerChange(post, item.question, e.target.value)
                      }
                      placeholder="Write your answer..."
                      className={`${fieldClass} resize-none`}
                    />
                  ) : (
                    <input
                      type="text"
                      value={getAnswer(post, item.question)}
                      onChange={(e) =>
                        handleAnswerChange(post, item.question, e.target.value)
                      }
                      placeholder="Paste a portfolio, Google Drive, or any relevant link (optional)..."
                      className={fieldClass}
                    />
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </SpotlightCard>
  );
}