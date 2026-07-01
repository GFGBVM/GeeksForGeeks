"use client";

import { motion } from "framer-motion";
import { Check, User, ListChecks, Code2, ClipboardCheck } from "lucide-react";

const STEPS = [
  { label: "Personal Details", icon: User },
  { label: "Preferences", icon: ListChecks },
  { label: "Proof of Work", icon: Code2 },
  { label: "Review & Submit", icon: ClipboardCheck },
];

export default function ProgressBar({ currentStep }) {
  const percent = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="mb-12 w-full">
      {/* Mobile label */}
      <p className="mb-5 text-center font-mono text-sm text-emerald-300 md:hidden">
        <span className="text-zinc-500">step</span> {currentStep}
        <span className="text-zinc-500">/{STEPS.length}</span> ·{" "}
        {STEPS[currentStep - 1].label}
      </p>

      <div className="relative flex items-start justify-between">
        {/* Track */}
        <div className="absolute left-0 right-0 top-6 h-0.5 -translate-y-1/2 rounded-full bg-white/10" />
        <motion.div
          className="absolute left-0 top-6 h-0.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-emerald-400 to-green-400 shadow-[0_0_12px_rgba(16,185,129,0.7)]"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          {percent > 0 && (
            <span className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-emerald-200 shadow-[0_0_12px_3px_rgba(16,185,129,0.9)]" />
          )}
        </motion.div>

        {STEPS.map((step, index) => {
          const stepNumber = index + 1;
          const completed = currentStep > stepNumber;
          const active = currentStep === stepNumber;
          const Icon = step.icon;

          return (
            <div
              key={step.label}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Outer div applies a solid background mask to hide the track line */}
              <motion.div
                initial={false}
                animate={{ scale: active ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className={`flex h-12 w-12 items-center justify-center rounded-full border bg-[#04120b] transition-all duration-300 ${
                  completed
                    ? "border-emerald-400 shadow-[0_0_18px_rgba(16,185,129,0.55)]"
                    : active
                    ? "animate-pulse-ring border-emerald-400 shadow-[0_0_18px_rgba(16,185,129,0.45)]"
                    : "border-white/10"
                }`}
              >
                {/* Inner div handles the semi-transparent tints and solid gradients */}
                <div className={`flex h-full w-full items-center justify-center rounded-full ${
                  completed
                    ? "bg-gradient-to-br from-emerald-400 to-green-500 text-[#04120b]"
                    : active
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "bg-white/[0.03] text-zinc-600"
                }`}>
                  {completed ? <Check size={22} /> : <Icon size={20} />}
                </div>
              </motion.div>

              <p
                className={`mt-3 hidden w-24 text-center text-xs font-medium md:block lg:w-32 lg:text-sm ${
                  active
                    ? "text-emerald-300"
                    : completed
                    ? "text-emerald-400/80"
                    : "text-zinc-600"
                }`}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}