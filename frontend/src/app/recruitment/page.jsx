"use client";

import "./animations.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  GraduationCap,
  Phone,
  Mail as MailIcon,
  ArrowRight,
  ArrowLeft,
  Terminal,
} from "lucide-react";
import LoadingScreen from "./components/LoadingScreen";
import ProgressBar from "./components/ProgressBar";
import PersonalDetails from "./components/PersonalDetails";
import Preferences from "./components/Preferences";
import ProofOfWork from "./components/ProofOfWork";
import ReviewSubmit from "./components/ReviewSubmit";
import SuccessModal from "./components/SuccessModal";
import {
  SpotlightCard,
  Typewriter,
  FloatingParticles,
} from "./components/effects";

import {
  validatePersonalDetails,
  validatePreferences,
} from "./utils/validators";

export default function RecruitmentPage() {
  const [backendReady, setBackendReady] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    IdNumber: "",
    department: "",
    resumelink: "",
    year: "",
    cpi: "",
    preferences: ["", "", ""],
    responses: [],
  });

  const nextStep = () => {
    setError("");

    if (currentStep === 1) {
      const validationError = validatePersonalDetails(formData);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    if (currentStep === 2) {
      const validationError = validatePreferences(formData.preferences);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    setCurrentStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const previousStep = () => {
    setError("");
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!backendReady) {
    return <LoadingScreen onReady={() => setBackendReady(true)} />;
  }

  if (submitted) {
    return <SuccessModal />;
  }

  const pageTransition = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
    transition: { duration: 0.35, ease: "easeInOut" },
  };

  const primaryBtn =
    "group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-8 py-3.5 font-semibold text-[#04120b] shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-400/40 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-full";
  const ghostBtn =
    "flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-8 py-3.5 font-semibold text-zinc-300 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05080a] py-12 text-zinc-100">
      {/* ---- Ambient background ---- */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* aurora glows */}
        <div className="animate-aurora absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-emerald-500/20 blur-[120px]" />
        <div className="animate-aurora-slow absolute top-1/4 -right-40 h-[30rem] w-[30rem] rounded-full bg-green-600/15 blur-[120px]" />
        <div className="animate-aurora absolute -bottom-40 left-1/3 h-[28rem] w-[28rem] rounded-full bg-teal-500/10 blur-[120px]" />
        {/* grid */}
        <div className="animate-grid absolute inset-0 bg-[linear-gradient(to_right,rgba(52,211,153,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(52,211,153,0.06)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black_35%,transparent_100%)]" />
        {/* floating code glyphs */}
        <FloatingParticles count={18} />
        {/* vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_40%,rgba(5,8,10,0.8)_100%)]" />
      </div>

      <div className="mx-auto max-w-5xl px-5">
        {/* ---- Brand strip ---- */}
        <div className="mb-8 flex items-center justify-center gap-2.5 md:justify-start">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-green-600 font-mono text-sm font-bold text-[#04120b] shadow-lg shadow-emerald-500/30">
            {"</>"}
          </div>
          <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-emerald-300/70">
            GFG Student Chapter · BVM
          </span>
        </div>

        {/* ---- Header ---- */}
        <div className="mb-12 text-center md:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Applications Open
            <Sparkles className="h-3.5 w-3.5" />
          </div>

          <h1 className="text-glow text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-emerald-100 to-emerald-400 md:text-6xl lg:text-7xl">
            Core Team Recruitment
          </h1>

          {/* <p className="mt-4 flex items-center justify-center gap-x-2 font-mono text-sm text-zinc-400 md:justify-start md:text-base">
            <Terminal className="h-4 w-4 shrink-0 text-emerald-400" />
            <span className="text-emerald-400">$</span>
            <span className="text-zinc-200">
              <Typewriter text="join --core-team · Lead. Learn. Level Up." />
            </span>
          </p> */}
        </div>

        <ProgressBar currentStep={currentStep} />

        {/* ---- Validation Error ---- */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-8 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-300 backdrop-blur-sm"
            >
              <span className="mt-0.5 font-mono text-red-400">!</span>
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {/* ---- Step 1 ---- */}
          {currentStep === 1 && (
            <motion.div key="step1" {...pageTransition}>
              {/* Introduction */}
              <div className="mb-8 overflow-hidden rounded-2xl border border-emerald-500/15 bg-white/[0.03] shadow-2xl shadow-emerald-950/40 backdrop-blur-xl">
                {/* terminal titlebar */}
                <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-5 py-3">
                  <span className="h-3 w-3 rounded-full bg-red-400/70" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
                  <span className="ml-3 font-mono text-xs text-zinc-500">
                    welcome.md
                  </span>
                </div>

                <div className="p-8">
                  <p className="text-lg leading-relaxed text-zinc-300">
                    Welcome to the recruitment process for the
                    <span className="font-semibold text-emerald-300">
                      {" "}
                      GeeksforGeeks Student Chapter, BVM.
                    </span>
                    <br />
                    <br />
                    We&apos;re looking for passionate students who are eager to
                    learn, contribute, organize impactful events, and help build
                    one of the most active technical communities on campus. If
                    you&apos;re ready to challenge yourself and grow with us,
                    you&apos;re at the right place.
                  </p>

                  <div className="mt-10 grid gap-5 md:grid-cols-2">
                    {/* Faculty Advisor */}
                    <div className="group rounded-xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/30 hover:bg-emerald-500/[0.04]">
                      <h3 className="mb-4 flex items-center gap-2.5 text-lg font-bold text-white">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20">
                          <GraduationCap size={18} />
                        </span>
                        Faculty Advisor
                      </h3>
                      <div className="space-y-1.5">
                        <p className="text-lg font-semibold text-white">
                          Prof. Prachi Shah
                        </p>
                        <p className="text-sm font-medium text-emerald-300/90">
                          Faculty Advisor, GFG Student Chapter BVM
                        </p>
                        <p className="text-sm text-zinc-400">
                          Assistant Professor
                        </p>
                        <p className="text-sm text-zinc-400">
                          Department of Information Technology
                        </p>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="group rounded-xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/30 hover:bg-emerald-500/[0.04]">
                      <h3 className="mb-4 flex items-center gap-2.5 text-lg font-bold text-white">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20">
                          <Phone size={16} />
                        </span>
                        Need Help?
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="font-semibold text-white">
                            Kavya Zinzuvadiya
                          </p>
                          <p className="text-xs font-medium uppercase tracking-wide text-emerald-300/70">
                            Chairperson
                          </p>
                          <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-300">
                            <Phone size={13} className="text-emerald-400" /> +91
                            70690 17310
                          </p>
                        </div>
                        <div className="h-px w-full bg-white/5" />
                        <div>
                          <p className="font-semibold text-white">Vihaa Shah</p>
                          <p className="text-xs font-medium uppercase tracking-wide text-emerald-300/70">
                            Vice-Chairperson
                          </p>
                          <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-300">
                            <Phone size={13} className="text-emerald-400" /> +91
                            94271 07324
                          </p>
                        </div>
                        <div className="h-px w-full bg-white/5" />
                        <div>
                          <p className="font-semibold text-white">
                            Official Email
                          </p>
                          <p className="mt-1 flex items-start gap-1.5 break-all text-sm text-zinc-300 transition-colors hover:text-emerald-300">
                            <MailIcon
                              size={13}
                              className="mt-1 shrink-0 text-emerald-400"
                            />
                            geeksforgeeksbvm@bvmengineering.ac.in
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <PersonalDetails formData={formData} setFormData={setFormData} />

              <div className="mt-8 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={nextStep}
                  className={primaryBtn}
                >
                  Next <ArrowRight size={18} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ---- Step 2 ---- */}
          {currentStep === 2 && (
            <motion.div key="step2" {...pageTransition}>
              <Preferences formData={formData} setFormData={setFormData} />
              <div className="mt-8 flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={previousStep}
                  className={ghostBtn}
                >
                  <ArrowLeft size={18} /> Previous
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={nextStep}
                  className={primaryBtn}
                >
                  Next <ArrowRight size={18} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ---- Step 3 ---- */}
          {currentStep === 3 && (
            <motion.div key="step3" {...pageTransition}>
              <ProofOfWork formData={formData} setFormData={setFormData} />
              <div className="mt-8 flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={previousStep}
                  className={ghostBtn}
                >
                  <ArrowLeft size={18} /> Previous
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={nextStep}
                  className={primaryBtn}
                >
                  Review <ArrowRight size={18} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ---- Step 4 ---- */}
          {currentStep === 4 && (
            <motion.div key="step4" {...pageTransition}>
              <ReviewSubmit
                formData={formData}
                previousStep={previousStep}
                onSuccess={() => {
                  setTimeout(() => {
                    setSubmitted(true);
                  }, 1200);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-12 text-center font-mono text-xs text-zinc-600">
          © 2026 GeeksforGeeks Student Chapter · BVM · Built by the Core Team
        </p>
      </div>
    </main>
  );
}
