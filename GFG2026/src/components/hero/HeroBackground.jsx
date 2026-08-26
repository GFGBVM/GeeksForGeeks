/**
 * HeroBackground Component
 * 
 * Creates an ambient technical backdrop featuring a forest mint grid system,
 * subtle radial glows, and floating code indicators for the GFG BVM chapter.
 */
const HeroBackground = () => {
  return (
    <div
      className="hero-background pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Precision Technical Grid */}
      <div
        className="hero-grid absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(30,81,59,0.07) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(30,81,59,0.07) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Primary Forest Mint Glow */}
      <div className="hero-glow absolute left-[55%] top-[25%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#1E513B]/10 blur-[120px]" />

      {/* Secondary Vibrant Forest Glow */}
      <div className="hero-glow-secondary absolute -right-32 bottom-[-150px] h-[450px] w-[450px] rounded-full bg-[#286E50]/[0.08] blur-[100px]" />

      {/* Floating Technical Badge 01 - <gfg> Badge */}
      <div className="hero-float hero-float-1 absolute right-[8%] top-[22%] hidden lg:block">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[#DCE5E0] bg-white/80 font-mono text-sm font-bold text-[#1E513B] shadow-[0_20px_50px_rgba(30,81,59,0.08)] backdrop-blur-md">
          {"<gfg>"}
        </div>
      </div>

      {/* Floating Technical Badge 02 - Code Tag */}
      <div className="hero-float hero-float-2 absolute right-[20%] top-[58%] hidden lg:block">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#DCE5E0] bg-white/90 font-mono text-xs font-semibold text-[#4B6354] shadow-xs backdrop-blur-xs">
          {"</>"}
        </div>
      </div>

      {/* Floating Technical Tag 03 - Status Pill */}
      <div className="hero-float hero-float-3 absolute left-[7%] top-[25%] hidden lg:block">
        <div className="flex items-center gap-2 rounded-full border border-[#DCE5E0] bg-white/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#4B6354] shadow-xs backdrop-blur-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1E513B] animate-pulse" />
          Build / Learn / Grow
        </div>
      </div>

      {/* Ambient Accent Dots */}
      <div className="hero-circle absolute left-[42%] top-[18%] h-3 w-3 rounded-full bg-[#1E513B]" />
      <div className="hero-circle absolute bottom-[25%] left-[12%] h-2 w-2 rounded-full bg-[#286E50]" />

      {/* Large Watermark Brackets */}
      <div className="hero-bracket absolute bottom-[18%] right-[8%] hidden font-mono text-8xl font-light text-[#1E513B]/10 lg:block">
        {"{ }"}
      </div>
    </div>
  );
};

export default HeroBackground;