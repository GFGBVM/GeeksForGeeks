"use client";

export default function GFGSeparator() {
  return (
    <div className="flex items-center justify-center my-16 px-6">
      {/* Left line */}
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#0F9D58]" />

      {/* Center icon */}
      <div className="mx-4 flex items-center justify-center w-10 h-10 rounded-full border font-dancing  border-[#0F9D58] text-[#0F9D58] font-semibold">
        {"<gfg>"}
      </div>

      {/* Right line */}
      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#0F9D58]" />
    </div>
  );
}
