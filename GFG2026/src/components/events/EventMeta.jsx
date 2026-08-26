import { CalendarDays, Clock3, MapPin } from "lucide-react";

/**
 * EventMeta Component
 * 
 * Reusable event metadata renderer for dates, times, and venue locations.
 * Supports compact (card footer) and detailed (modal body) layouts.
 */
const EventMeta = ({ event = {}, compact = false }) => {
  return (
    <div className={compact ? "grid grid-cols-2 gap-4" : "space-y-5"}>
      {/* Date */}
      {event.date && (
        <div className="flex items-start gap-3">
          <CalendarDays
            size={compact ? 14 : 17}
            strokeWidth={1.75}
            className="mt-0.5 shrink-0 text-[#1E513B]"
          />

          <div>
            {!compact && (
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-[#A0B0A5]">
                Date
              </p>
            )}

            <p
              className={
                compact
                  ? "text-xs font-medium text-[#4B6354]"
                  : "mt-1 text-sm font-medium text-[#0D1F15]"
              }
            >
              {event.date}
            </p>
          </div>
        </div>
      )}

      {/* Time */}
      {event.time && (
        <div className="flex items-start gap-3">
          <Clock3
            size={compact ? 14 : 17}
            strokeWidth={1.75}
            className="mt-0.5 shrink-0 text-[#1E513B]"
          />

          <div>
            {!compact && (
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-[#A0B0A5]">
                Time
              </p>
            )}

            <p
              className={
                compact
                  ? "text-xs font-medium text-[#4B6354]"
                  : "mt-1 text-sm font-medium text-[#0D1F15]"
              }
            >
              {event.time}
            </p>
          </div>
        </div>
      )}

      {/* Venue */}
      {event.venue && (
        <div
          className={
            compact
              ? "col-span-2 flex items-start gap-3"
              : "flex items-start gap-3"
          }
        >
          <MapPin
            size={compact ? 14 : 17}
            strokeWidth={1.75}
            className="mt-0.5 shrink-0 text-[#1E513B]"
          />

          <div>
            {!compact && (
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-[#A0B0A5]">
                Venue
              </p>
            )}

            <p
              className={
                compact
                  ? "line-clamp-1 text-xs font-medium text-[#4B6354]"
                  : "mt-1 text-sm font-medium text-[#0D1F15]"
              }
            >
              {event.venue}
            </p>

            {!compact && event.location && (
              <p className="mt-1 text-xs text-[#4B6354]">
                {event.location}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventMeta;