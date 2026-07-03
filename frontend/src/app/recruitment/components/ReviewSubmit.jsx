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
        confirmButtonColor: "#10b981",
        background: "#18181b",
        color: "#f4f4f5",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SpotlightCard className="overflow-hidden rounded-2xl border border-emerald-500/15 bg-white/[0.03] shadow-2xl shadow-emerald-950/40 backdrop-blur-xl">
      <div className="relative z-10 border-b border-white/5 bg-white/[0.02] px-5 py-5 sm:px-8 sm:py-6">
        <h2 className="flex items-center gap-3 text-lg font-bold text-white sm:text-2xl">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20 sm:h-10 sm:w-10">
            <ClipboardCheck size={20} className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px]" />
          </span>
          Review &amp; Submit
        </h2>
        <p className="mt-2 text-xs text-zinc-400 sm:mt-1 sm:text-sm">
          Please review your details before submitting your application.
        </p>
      </div>

      <div className="relative z-10 p-5 sm:p-8">
        {/* Personal details */}
        <div className="mb-8 grid gap-3 sm:grid-cols-2">
          {SUMMARY_ROWS.map(({ key, label, icon: Icon }) => (
            <div
              key={key}
              className="flex min-w-0 flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3"
            >
              <span className="flex items-center gap-2 text-xs font-medium text-zinc-400 shrink-0 sm:text-sm">
                <Icon size={14} className="text-emerald-400 shrink-0 sm:h-[15px] sm:w-[15px]" />
                {label}
              </span>
              <span className="break-all pl-6 text-xs font-semibold text-white sm:max-w-[60%] sm:truncate sm:break-normal sm:pl-0 sm:text-right sm:text-sm">
                {formData[key] || "—"}
              </span>
            </div>
          ))}
        </div>

        {/* Preferences */}
        <div className="mb-8">
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-emerald-300 sm:text-lg">
            <ListChecks size={18} className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px]" />
            Preferences
          </h3>
          <div className="space-y-2.5">
            {formData.preferences.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3"
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ring-1 sm:h-7 sm:w-7 sm:text-xs ${RANK_STYLE[index]}`}
                >
                  {index + 1}
                </span>
                <span className="break-words text-xs font-medium text-zinc-200 sm:text-sm">
                  {item || "—"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Proof of Work */}
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-emerald-300 sm:text-lg">
            <Code2 size={18} className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px]" />
            Proof of Work
          </h3>

          {formData.responses.length === 0 ? (
            <p className="text-xs text-zinc-500 sm:text-sm">
              No optional responses were provided.
            </p>
          ) : (
            <div className="space-y-3">
              {formData.responses.map((response, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/8 bg-white/[0.02] p-4"
                >
                  <p className="break-words text-xs font-semibold text-emerald-300 sm:text-sm">
                    {response.post}
                  </p>
                  <p className="mt-1 whitespace-pre-line break-words text-xs font-medium text-zinc-300 sm:mt-2 sm:text-sm">
                    {response.question}
                  </p>
                  <p className="mt-2 whitespace-pre-line break-words rounded-lg border border-white/5 bg-black/20 px-3 py-2 text-xs text-zinc-400 sm:text-sm">
                    {response.answer || "—"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col-reverse justify-between gap-3 sm:mt-10 sm:flex-row sm:gap-0">
          <motion.button
            whileHover={{ scale: loading ? 1 : 1.03 }}
            whileTap={{ scale: loading ? 1 : 0.97 }}
            onClick={previousStep}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white disabled:opacity-50 sm:w-auto sm:text-base"
          >
            <ArrowLeft size={18} className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px]" /> Previous
          </motion.button>

          <motion.button
            whileHover={{ scale: loading ? 1 : 1.03 }}
            whileTap={{ scale: loading ? 1 : 0.97 }}
            onClick={handleSubmit}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-8 py-3 text-sm font-semibold text-[#04120b] shadow-lg shadow-emerald-500/25 transition hover:shadow-emerald-400/40 disabled:opacity-60 sm:w-auto sm:text-base"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="h-[16px] w-[16px] animate-spin sm:h-[18px] sm:w-[18px]" /> Submitting...
              </>
            ) : (
              <>
                Submit Application <Send size={18} className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px]" />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </SpotlightCard>
  );
}