"use client";

import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import {
  ClipboardCheck,
  User,
  Mail,
  Phone,
  Hash,
  Building2,
  GraduationCap,
  Gauge,
  Link2,
  ListChecks,
  Code2,
  ArrowLeft,
  Loader2,
  Send,
} from "lucide-react";
import { SpotlightCard } from "./effects";

const RANK_STYLE = [
  "bg-amber-400/15 text-amber-300 ring-amber-400/30",
  "bg-slate-300/10 text-slate-300 ring-slate-300/30",
  "bg-orange-400/15 text-orange-300 ring-orange-400/30",
];

const SUMMARY_ROWS = [
  { key: "fullName", label: "Name", icon: User },
  { key: "email", label: "Email", icon: Mail },
  { key: "phoneNumber", label: "Phone", icon: Phone },
  { key: "IdNumber", label: "ID Number", icon: Hash },
  { key: "department", label: "Department", icon: Building2 },
  { key: "year", label: "Year", icon: GraduationCap },
  { key: "cpi", label: "CPI", icon: Gauge },
  { key: "resumelink", label: "Resume", icon: Link2 },
];

export default function ReviewSubmit({ formData, previousStep, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/recruitment/apply`,
        formData
      );

      if (response.data.success) {
        onSuccess();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: err.response?.data?.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#10b981", // Matches your emerald-500 theme
        background: "#18181b", // Dark theme background
        color: "#f4f4f5", // Light text
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SpotlightCard className="overflow-hidden rounded-2xl border border-emerald-500/15 bg-white/[0.03] shadow-2xl shadow-emerald-950/40 backdrop-blur-xl">
      <div className="relative z-10 border-b border-white/5 bg-white/[0.02] px-8 py-6">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20">
            <ClipboardCheck size={20} />
          </span>
          Review &amp; Submit
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          Please review your details before submitting your application.
        </p>
      </div>

      <div className="relative z-10 p-8">
        {/* Personal details */}
        <div className="mb-8 grid gap-3 sm:grid-cols-2">
          {SUMMARY_ROWS.map(({ key, label, icon: Icon }) => (
            <div
              key={key}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3"
            >
              <span className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                <Icon size={15} className="text-emerald-400" />
                {label}
              </span>
              <span className="max-w-[55%] truncate text-sm font-semibold text-white">
                {formData[key] || "—"}
              </span>
            </div>
          ))}
        </div>

        {/* Preferences */}
        <div className="mb-8">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-emerald-300">
            <ListChecks size={18} />
            Preferences
          </h3>
          <div className="space-y-2.5">
            {formData.preferences.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3"
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ring-1 ${RANK_STYLE[index]}`}
                >
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-zinc-200">
                  {item || "—"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Proof of Work */}
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-emerald-300">
            <Code2 size={18} />
            Proof of Work
          </h3>

          {formData.responses.length === 0 ? (
            <p className="text-sm text-zinc-500">
              No optional responses were provided.
            </p>
          ) : (
            <div className="space-y-3">
              {formData.responses.map((response, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/8 bg-white/[0.02] p-4"
                >
                  <p className="text-sm font-semibold text-emerald-300">
                    {response.post}
                  </p>
                  <p className="mt-2 whitespace-pre-line text-sm font-medium text-zinc-300">
                    {response.question}
                  </p>
                  <p className="mt-2 whitespace-pre-line break-words rounded-lg border border-white/5 bg-black/20 px-3 py-2 text-sm text-zinc-400">
                    {response.answer || "—"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-10 flex justify-between">
          <motion.button
            whileHover={{ scale: loading ? 1 : 1.03 }}
            whileTap={{ scale: loading ? 1 : 0.97 }}
            onClick={previousStep}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 font-semibold text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white disabled:opacity-50"
          >
            <ArrowLeft size={18} /> Previous
          </motion.button>

          <motion.button
            whileHover={{ scale: loading ? 1 : 1.03 }}
            whileTap={{ scale: loading ? 1 : 0.97 }}
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-8 py-3 font-semibold text-[#04120b] shadow-lg shadow-emerald-500/25 transition hover:shadow-emerald-400/40 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Submitting...
              </>
            ) : (
              <>
                Submit Application <Send size={18} />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </SpotlightCard>
  );
}