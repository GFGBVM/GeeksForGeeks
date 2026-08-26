import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/**
 * EventGallery Component
 * 
 * Interactive image carousel and fullscreen lightbox viewer designed for the EventModal.
 * Supports arrow keyboard navigation and full image visibility via object-contain.
 */
const EventGallery = ({ images = [], title }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Keyboard navigation for both gallery stage and lightbox mode
  useEffect(() => {
    if (!images.length) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && lightboxOpen) {
        setLightboxOpen(false);
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
      }
      if (e.key === "ArrowRight") {
        setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, images.length]);

  if (!images.length) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl bg-[#EBF2EE] font-mono text-xs uppercase tracking-[0.15em] text-[#4B6354]">
        No images available
      </div>
    );
  }

  const currentImage = images[activeIndex];

  const previousImage = (event) => {
    if (event) event.stopPropagation();
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  const nextImage = (event) => {
    if (event) event.stopPropagation();
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  };

  return (
    <>
      <div className="event-gallery select-none">
        {/* Main Stage Image Wrapper */}
        <div
          className="group relative flex aspect-video cursor-zoom-in items-center justify-center overflow-hidden rounded-2xl bg-[#0D1F15]/90 p-2"
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={currentImage}
            alt={`${title} - image ${activeIndex + 1}`}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.01]"
          />

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 rounded-full bg-[#0D1F15]/85 px-3 py-1.5 font-mono text-[10px] font-medium text-white backdrop-blur-md">
            {activeIndex + 1} / {images.length}
          </div>

          {/* Inline Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={previousImage}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#0D1F15] opacity-0 shadow-md transition-all duration-300 hover:bg-[#1E513B] hover:text-white group-hover:opacity-100"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={nextImage}
                aria-label="Next image"
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#0D1F15] opacity-0 shadow-md transition-all duration-300 hover:bg-[#1E513B] hover:text-white group-hover:opacity-100"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Navigation Bar */}
        {images.length > 1 && (
          <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative flex h-16 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 bg-[#0D1F15]/20 p-1 transition-all duration-300 ${
                  activeIndex === index
                    ? "border-[#1E513B] opacity-100 ring-2 ring-[#1E513B]/20"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={image}
                  alt={`${title} thumbnail ${index + 1}`}
                  className="h-full w-full object-contain"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal Overlay */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0D1F15]/95 p-5 backdrop-blur-md"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Lightbox Close Button */}
          <button
            type="button"
            aria-label="Close gallery"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors duration-200 hover:bg-white/20"
          >
            <X size={20} />
          </button>

          {/* Lightbox Keyboard Navigation Controls */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={previousImage}
                aria-label="Previous image"
                className="absolute left-6 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-200 hover:bg-white/20"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                type="button"
                onClick={nextImage}
                aria-label="Next image"
                className="absolute right-6 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-200 hover:bg-white/20"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Fullscreen Displayed Image */}
          <div
            className="relative flex max-h-[90vh] max-w-[95vw] items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={currentImage}
              alt={title}
              className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
            />
            
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs font-medium text-white/80">
              {activeIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventGallery;