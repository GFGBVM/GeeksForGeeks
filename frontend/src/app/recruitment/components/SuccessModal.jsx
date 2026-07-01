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
    <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-black/70 p-6 backdrop-blur-md">
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
        <div className="pointer-events-none absolute -top-24 -left-20 h-56 w-56 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-20 h-56 w-56 rounded-full bg-green-500/20 blur-3xl" />

        {/* Header */}
        <div className="relative border-b border-white/5 bg-gradient-to-b from-emerald-500/15 to-transparent px-10 py-10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 12,
              delay: 0.15,
            }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-500 shadow-[0_0_40px_rgba(16,185,129,0.5)]"
          >
            <CheckCircle2 size={56} className="text-[#04120b]" />
          </motion.div>

          <h1 className="text-glow mt-6 text-4xl font-extrabold text-white">
            Application Submitted!
          </h1>

          <p className="mt-3 text-lg text-emerald-200/80">
            Thank you for applying to the
            <span className="font-semibold text-emerald-300">
              {" "}
              GFG BVM Core Team 2026–27
            </span>
          </p>
        </div>

        {/* Body */}
        <div className="relative px-10 py-10">
          <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/[0.06] p-6">
            <div className="flex items-center gap-3">
              <Sparkles className="text-emerald-400" />
              <h2 className="text-xl font-bold text-emerald-200">
                Your application has been received successfully!
              </h2>
            </div>
            <p className="mt-4 leading-8 text-zinc-300">
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
            <h3 className="text-xl font-bold text-white">What happens next?</h3>
            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20">
                  <Clock3 size={18} />
                </span>
                <div>
                  <p className="font-semibold text-white">Application Review</p>
                  <p className="text-sm text-zinc-400">
                    Our team will evaluate every application carefully.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="font-semibold text-white">
                    Shortlisting &amp; Communication
                  </p>
                  <p className="text-sm text-zinc-400">
                    Shortlisted candidates will receive an email regarding the
                    next recruitment rounds.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-xl border border-dashed border-emerald-400/30 bg-emerald-500/[0.04] p-5 text-center">
            <p className="text-sm text-zinc-400">Need any assistance?</p>
            <p className="mt-2 font-mono text-sm font-semibold text-emerald-300">
              geeksforgeeksbvm@bvmengineering.ac.in
            </p>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-8 py-4 text-lg font-semibold text-[#04120b] shadow-lg shadow-emerald-500/25 transition hover:scale-105 hover:shadow-emerald-400/40"
            >
              <Home size={20} />
              Return to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
