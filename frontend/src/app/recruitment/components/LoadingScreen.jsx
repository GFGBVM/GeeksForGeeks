"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, CheckCircle2, ServerCrash, Terminal, Info } from "lucide-react";

export default function LoadingScreen({ onReady }) {
  const [status, setStatus] = useState("Initializing portal...");
  const [error, setError] = useState(false);

  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        setStatus("Connecting to recruitment systems...");
        await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/recruitment/wake-up`
        );
        setStatus("Connection established!");
        setTimeout(() => {
          onReady();
        }, 800);
      } catch (err) {
        console.error(err);
        setError(true);
        setStatus("System offline. Please reboot the portal.");
      }
    };

    wakeUpServer();
  }, [onReady]);

  const isReady = status === "Connection established!";

  return (
    <div className="fixed inset-0 z-[9999] flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#05080a] p-4 font-sans">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-aurora absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-[110px]" />
        <div className="animate-aurora-slow absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-green-600/15 blur-[110px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(52,211,153,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(52,211,153,0.05)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_35%,transparent_100%)]" />
      </div>

      {/* Main Card */}
      <div className="relative flex w-full max-w-md flex-col items-center overflow-hidden rounded-2xl border border-emerald-500/20 bg-white/[0.02] p-10 text-center shadow-[0_0_40px_-15px_rgba(16,185,129,0.3)] backdrop-blur-2xl transition-all duration-700">
        {/* Top edge glowing accent line */}
        <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-70"></div>

        {/* Brand */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-green-600 font-mono text-xs font-bold text-[#04120b] shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400/50">
            {"</>"}
          </div>
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300/80">
            GFG · BVM
          </span>
        </div>

        {/* Icon Container with Ping Effect */}
        <div className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/10 shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]">
          {/* Subtle radar ping animation when loading */}
          {!error && !isReady && (
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20 opacity-30" />
          )}
          
          {error ? (
            <ServerCrash className="relative z-10 h-11 w-11 text-red-400" />
          ) : isReady ? (
            <CheckCircle2 className="relative z-10 h-11 w-11 text-emerald-400" />
          ) : (
            <Loader2 className="relative z-10 h-11 w-11 animate-spin text-emerald-400" />
          )}
        </div>

        <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-white drop-shadow-sm">
          Core Team Recruitment
        </h2>

        {/* Status Pill */}
        <div
          className={`mb-6 flex items-center gap-2.5 rounded-full border px-4 py-1.5 font-mono text-sm transition-colors ${
            error
              ? "border-red-500/20 bg-red-500/10 text-red-300"
              : isReady
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border-emerald-500/20 bg-emerald-500/5 text-emerald-300/90"
          }`}
        >
          <Terminal size={14} className={!error && !isReady ? "animate-pulse" : ""} />
          {status}
        </div>

        {/* Info Box (Replaces the 'Render free tier' text with in-universe copy) */}
        {!error && !isReady && (
          <div className="mt-4 flex w-full flex-col gap-3">
            {/* Simple Loading Bar */}
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
              <div className="h-full w-full origin-left animate-pulse bg-gradient-to-r from-emerald-500/20 via-emerald-400 to-emerald-500/20" />
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-emerald-500/10 bg-emerald-500/5 px-4 py-3.5 text-left transition-colors hover:bg-emerald-500/10">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/80" />
              <p className="text-xs leading-relaxed text-emerald-100/60">
                Establishing a secure handshake with the recruitment database. The initial connection may take
                <span className="font-semibold text-emerald-300"> 30–60 seconds </span>
                to synchronize.
              </p>
            </div>
          </div>
        )}

        {/* Error State Button */}
        {error && (
          <button
            onClick={() => window.location.reload()}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500/80 to-rose-500/80 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-900/20 transition-all hover:-translate-y-0.5 hover:from-red-500 hover:to-rose-500 hover:shadow-red-500/30 active:translate-y-0"
          >
            Retry 
          </button>
        )}
      </div>
    </div>
  );
}