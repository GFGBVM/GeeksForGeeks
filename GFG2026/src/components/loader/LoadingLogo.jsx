import siteData from "../../data/site";

/**
 * LoaderLogo Component
 * 
 * Standalone logo layout used inside the entrance loading screen.
 * Styled with Montserrat typography, monospace code markers, and a layered glassmorphic badge.
 */
const LoaderLogo = () => {
  return (
    <div className="loader-logo relative z-10 flex flex-col items-center select-none">
      {/* Central Emblem Badge */}
      <div className="loader-mark mb-8 relative">
        {/* Soft Ambient Glow Halo */}
        <div className="absolute -inset-2 rounded-3xl bg-[#1E513B]/20 blur-xl transition-all" />

        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-[#DCE5E0] bg-white shadow-[0_20px_50px_rgba(30,81,59,0.12)] sm:h-24 sm:w-24">
          <span className="font-mono text-2xl font-black tracking-tighter text-[#1E513B] sm:text-3xl">
            &lt;gfg&gt;
          </span>
        </div>
      </div>

      {/* Primary Headline Title */}
      <div className="overflow-hidden text-center">
        <h1 className="loader-title font-montserrat text-4xl font-extrabold uppercase leading-none tracking-[-0.05em] text-[#0D1F15] sm:text-6xl md:text-7xl">
          {siteData?.name || "GeeksforGeeks"}
        </h1>
      </div>

      {/* Subtitle & Chapter Tag */}
      <div className="mt-4 flex items-center gap-3 overflow-hidden text-center">
        <span className="h-[1px] w-6 bg-[#DCE5E0] sm:w-10" />
        <p className="loader-subtitle font-mono text-xs font-bold uppercase tracking-[0.35em] text-[#1E513B] sm:text-sm">
          Student Chapter BVM
        </p>
        <span className="h-[1px] w-6 bg-[#DCE5E0] sm:w-10" />
      </div>
    </div>
  );
};

export default LoaderLogo;