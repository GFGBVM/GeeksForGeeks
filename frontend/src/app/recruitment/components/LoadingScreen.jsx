"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, CheckCircle2, ServerCrash, Terminal } from "lucide-react";

export default function LoadingScreen({ onReady }) {
  const [status, setStatus] = useState("Starting server...");
  const [error, setError] = useState(false);

  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        setStatus("Starting backend server...");
        await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/recruitment/wake-up`
        );
        setStatus("Backend is ready!");
        setTimeout(() => {
          onReady();
        }, 800);
      } catch (err) {
        console.error(err);
        setError(true);
        setStatus("Unable to connect to the backend. Please refresh the page.");
      }
    };

    wakeUpServer();
  }, [onReady]);

  const isReady = status === "Backend is ready!";

  return (
    <div className="fixed inset-0 z-[9999] flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#05080a] p-4">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-aurora absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-[110px]" />
        <div className="animate-aurora-slow absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-green-600/15 blur-[110px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(52,211,153,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(52,211,153,0.05)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_35%,transparent_100%)]" />
      </div>

      <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-emerald-500/15 bg-white/[0.03] p-10 text-center shadow-2xl shadow-emerald-950/50 backdrop-blur-xl">
        {/* Brand */}
        <div className="mb-8 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-green-600 font-mono text-xs font-bold text-[#04120b] shadow-lg shadow-emerald-500/30">
            {"</>"}
          </div>
          <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-emerald-300/70">
            GFG · BVM
          </span>
        </div>

        {/* Icon */}
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-500/10">
          {error ? (
            <ServerCrash className="h-12 w-12 text-red-400" />
          ) : isReady ? (
            <CheckCircle2 className="h-12 w-12 text-emerald-400" />
          ) : (
            <Loader2 className="h-12 w-12 animate-spin text-emerald-400" />
          )}
        </div>

        <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-white">
          Core Team Recruitment
        </h2>

        <p
          className={`mb-6 flex items-center gap-2 font-mono text-sm ${
            error ? "text-red-300" : "text-emerald-300"
          }`}
        >
          <Terminal size={14} />
          {status}
        </p>

        {!error && !isReady && (
          <div className="mt-2 rounded-xl border border-white/8 bg-white/[0.02] px-5 py-4">
            <p className="text-sm leading-relaxed text-zinc-400">
              Our backend is hosted on Render&apos;s free tier and may take
              <span className="font-semibold text-emerald-300">
                {" "}
                30–60 seconds{" "}
              </span>
              to wake up after inactivity.
            </p>
          </div>
        )}

        {error && (
          <button
            onClick={() => window.location.reload()}
            className="mt-8 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-3.5 text-base font-semibold text-[#04120b] shadow-lg shadow-emerald-500/25 transition-all hover:-translate-y-0.5 hover:shadow-emerald-400/40 active:translate-y-0"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
