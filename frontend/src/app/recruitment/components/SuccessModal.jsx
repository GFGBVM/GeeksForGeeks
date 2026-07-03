"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Home, Mail, Clock3, Sparkles } from "lucide-react";
import Link from "next/link";

export default function SuccessModal() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    let cancelled = false;
    import("canvas-confetti").then(({ default: confetti }) => {
      if (cancelled) return;
      const colors = ["#34d399", "#10b981", "#6ee7b7", "#a7f3d0", "#22c55e"];
      const fire = (ratio, opts) =>
        confetti({
          origin: { y: 0.35 },
          colors,
          zIndex: 100000,
          disableForReducedMotion: true,
          particleCount: Math.floor(180 * ratio),
          ...opts,
        });
      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.9 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }).catch(() => {
      /* confetti is optional — ignore if the package isn't installed */
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-black/70 p-4 sm:p-6 backdrop-blur-md">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-aurora absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-emerald-500/20 blur-[120px]" />
        <div className="animate-aurora-slow absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-green-600/15 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#070d0a] shadow-2xl shadow-emerald-950/60"
      >
        {/* Decorative glows */}
        <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-20 h-56 w-56 rounded-full bg-green-500/20 blur-3xl" />

        {/* Header */}
        <div className="relative border-b border-white/5 bg-gradient-to-b from-emerald-500/15 to-transparent px-6 py-8 text-center sm:px-10 sm:py-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 12,
              delay: 0.15,
            }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-500 shadow-[0_0_40px_rgba(16,185,129,0.5)] sm:h-24 sm:w-24"
          >
            <CheckCircle2 className="h-10 w-10 text-[#04120b] sm:h-[56px] sm:w-[56px]" />
          </motion.div>

          <h1 className="text-glow mt-5 text-2xl font-extrabold text-white sm:mt-6 sm:text-4xl">
            Application Submitted!
          </h1>

          <p className="mt-2 text-sm text-emerald-200/80 sm:mt-3 sm:text-lg">
            Thank you for applying to the
            <span className="font-semibold text-emerald-300">
              {" "}
              GFG BVM Core Team 2026–27
            </span>
          </p>
        </div>

        {/* Body */}
        <div className="relative px-5 py-8 sm:px-10 sm:py-10">
          <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/[0.06] p-5 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <Sparkles className="h-5 w-5 text-emerald-400 sm:h-6 sm:w-6" />
              <h2 className="text-base font-bold text-emerald-200 sm:text-xl">
                Your application has been received successfully!
              </h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:mt-4 sm:text-base sm:leading-8">
              We appreciate the time and effort you invested in completing the
              recruitment form.
              <br />
              <br />
              Every application will be carefully reviewed by our Core Team. If
              you&apos;re shortlisted, we&apos;ll contact you using your
              registered email address with further instructions.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-white sm:text-xl">What happens next?</h3>
            <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
              <div className="flex items-start gap-3 sm:gap-4">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20 sm:h-9 sm:w-9">
                  <Clock3 className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white sm:text-base">Application Review</p>
                  <p className="text-xs text-zinc-400 sm:text-sm">
                    Our team will evaluate every application carefully.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-4">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20 sm:h-9 sm:w-9">
                  <Mail className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white sm:text-base">
                    Shortlisting &amp; Communication
                  </p>
                  <p className="text-xs text-zinc-400 sm:text-sm">
                    Shortlisted candidates will receive an email regarding the
                    next recruitment rounds.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-dashed border-emerald-400/30 bg-emerald-500/[0.04] p-4 text-center sm:mt-10 sm:p-5">
            <p className="text-xs text-zinc-400 sm:text-sm">Need any assistance?</p>
            <p className="mt-1.5 break-all font-mono text-xs font-semibold text-emerald-300 sm:mt-2 sm:break-normal sm:text-sm">
              geeksforgeeksbvm@bvmengineering.ac.in
            </p>
          </div>

          <div className="mt-8 flex justify-center sm:mt-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-6 py-3 text-base font-semibold text-[#04120b] shadow-lg shadow-emerald-500/25 transition hover:scale-105 hover:shadow-emerald-400/40 sm:px-8 sm:py-4 sm:text-lg"
            >
              <Home className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px]" />
              Return to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}