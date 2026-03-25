"use client";

export default function Hero() {
  return (
    <div
      id="Home"
      className="relative w-full h-[420px] md:h-[600px] overflow-hidden bg-black"
    >
      {/* 🎥 Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover animate-fade-in"
        src="/hero_video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 🌑 Overlay for readability */}
      <div className="absolute inset-0 bg-black/40 animate-fade-in" />

      {/* 📝 Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 animate-fade-in">
        <h1 className="text-3xl md:text-6xl font-bold font-montserrat text-white">
          GeeksforGeeks Student Chapter BVM
        </h1>

        <p className="mt-4 text-sm md:text-xl italic font-montserrat text-white/90">
          Empowering students with coding culture and technical excellence.
        </p>
      </div>
    </div>
  );
}
