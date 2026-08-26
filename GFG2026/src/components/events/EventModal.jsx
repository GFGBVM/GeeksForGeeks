import { useEffect, useRef } from "react";
import { ArrowDownToLine, ArrowUpRight, Users, X } from "lucide-react";
import gsap from "gsap";
import EventGallery from "./EventGallery";
import EventMeta from "./EventMeta";

/**
 * EventModal Component
 * 
 * Interactive detailed modal for events. Includes image gallery,
 * speaker spotlights, event metadata, and report download triggers.
 */
const EventModal = ({ event, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !event) return;

    // Pause Lenis (if present) so that the modal can control scrolling independently
    try {
      if (window.__LENIS && typeof window.__LENIS.stop === "function") {
        window.__LENIS.stop();
      }
    } catch (e) {}

    // Save current body style to restore cleanly
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        contentRef.current,
        {
          y: 40,
          opacity: 0,
          scale: 0.98,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
        }
      );
    }, modalRef);

    return () => {
      document.body.style.overflow = originalStyle;

      // Resume Lenis after modal closes
      try {
        if (window.__LENIS && typeof window.__LENIS.start === "function") {
          window.__LENIS.start();
        }
      } catch (e) {}

      ctx.revert();
    };
  }, [isOpen, event]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  // Ensure images array is properly populated (fallback to coverImage if images list is empty)
  const eventImages = event.images?.length > 0 
    ? event.images 
    : event.coverImage 
      ? [event.coverImage] 
      : [];

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[5000] flex items-center justify-center p-3 select-none sm:p-5 lg:p-8"
    >
      {/* Backdrop Overlay */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-[#0D1F15]/75 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        ref={contentRef}
        className="relative z-10 flex max-h-[90vh] w-full max-w-6xl flex-col overflow-y-auto overscroll-contain rounded-3xl bg-white shadow-[0_40px_120px_rgba(13,31,21,0.25)] [webkit-overflow-scrolling:touch] lg:flex-row lg:overflow-hidden"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close event detail modal"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#0D1F15] shadow-md transition-all duration-300 hover:bg-[#1E513B] hover:text-white"
        >
          <X size={19} />
        </button>

        {/* Left Column: Gallery Container */}
        <div className="w-full shrink-0 bg-[#F4F7F5] p-4 sm:p-6 lg:w-[52%] lg:p-8">
          <EventGallery images={eventImages} title={event.title} />
        </div>

        {/* Right Column: Detailed Description & Metadata */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 sm:p-8 lg:p-10" style={{ WebkitOverflowScrolling: 'touch' }}>
          {/* Tag Badges */}
          {event.tags?.length > 0 && (
            <div className="mb-5 flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#EBF2EE] px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-[#1E513B]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Event Title */}
          <h2 className="font-montserrat text-3xl font-extrabold leading-[0.98] tracking-[-0.04em] text-[#0D1F15] sm:text-4xl lg:text-5xl">
            {event.title}
          </h2>

          {/* Main Description */}
          <p className="mt-5 text-sm leading-relaxed text-[#4B6354] sm:text-base">
            {event.description}
          </p>

          {/* Event Meta Block */}
          <div className="mt-8 border-y border-[#DCE5E0] py-6">
            <EventMeta event={event} />
          </div>

          {/* Speakers Section */}
          {event.speakers?.length > 0 && (
            <div className="mt-7">
              <div className="mb-4 flex items-center gap-2">
                <Users size={16} className="text-[#1E513B]" />
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#0D1F15]">
                  Speakers
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {event.speakers.map((speaker) => (
                  <div
                    key={speaker.name}
                    className="flex items-center gap-3 rounded-2xl border border-[#DCE5E0] bg-[#F4F7F5]/50 p-3"
                  >
                    {speaker.image && (
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    )}

                    <div>
                      <p className="text-sm font-bold text-[#0D1F15]">
                        {speaker.name}
                      </p>
                      <p className="mt-0.5 text-xs font-medium text-[#4B6354]">
                        {speaker.designation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Callouts */}
          <div className="mt-8 flex flex-wrap gap-3">
            {event.report && (
              <a
                href={event.report}
                download
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#1E513B] px-6 py-3.5 font-montserrat text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#286E50] hover:shadow-[0_8px_25px_rgba(30,81,59,0.3)]"
              >
                <ArrowDownToLine size={16} />
                Download Report
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full border border-[#DCE5E0] px-6 py-3.5 font-montserrat text-xs font-bold uppercase tracking-wider text-[#0D1F15] transition-all duration-300 hover:border-[#1E513B] hover:text-[#1E513B]"
            >
              Close
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;