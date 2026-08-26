import { ArrowUpRight } from "lucide-react";
import EventMeta from "./EventMeta";

/**
 * EventCard Component
 * 
 * Image-heavy, interactive card component for displaying individual events.
 * Features hover transformations, dynamic tag pills, and meta details.
 */
const EventCard = ({ event, index, onOpen }) => {
  return (
    <article
      className="
        event-card
        group
        relative
        flex
        flex-col
        cursor-pointer
        overflow-hidden
        rounded-2xl
        border
        border-[#DCE5E0]
        bg-white
        transition-all
        duration-500
        hover:border-[#1E513B]/30
        hover:shadow-[0_25px_70px_rgba(30,81,59,0.12)]
      "
      onClick={onOpen}
      data-index={index}
    >
      {/* Cover Image Wrapper */}
      <div className="event-image-wrapper relative aspect-[16/10] overflow-hidden bg-[#EBF2EE]">
        <img
          src={event.coverImage}
          alt={event.title}
          loading="lazy"
          className="
            event-image
            h-full
            w-full
            object-contain
            object-center
            p-2
            transition-transform
            duration-700
            ease-out
            group-hover:scale-105
          "
        />

        {/* Hover Overlay Gradient */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-[#0D1F15]/70
            via-[#0D1F15]/15
            to-transparent
            opacity-60
            transition-opacity
            duration-500
            group-hover:opacity-80
          "
        />

        {/* Event Index Badge */}
        <div
          className="
            absolute
            left-4
            top-4
            flex
            h-9
            min-w-9
            items-center
            justify-center
            rounded-full
            bg-white/95
            px-2.5
            font-mono
            text-[10px]
            font-bold
            text-[#1E513B]
            shadow-xs
            backdrop-blur-sm
          "
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Featured Tag Badge */}
        {event.featured && (
          <div
            className="
              absolute
              right-4
              top-4
              rounded-full
              bg-[#1E513B]
              px-3
              py-1.5
              font-mono
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-white
              shadow-xs
            "
          >
            Featured
          </div>
        )}

        {/* Hover CTA Trigger Button */}
        <div
          className="
            absolute
            bottom-4
            right-4
            flex
            h-11
            w-11
            translate-y-3
            items-center
            justify-center
            rounded-full
            bg-white
            text-[#0D1F15]
            opacity-0
            shadow-lg
            transition-all
            duration-500
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <ArrowUpRight
            size={18}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          />
        </div>
      </div>

      {/* Card Content Block */}
      <div className="event-content flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          {/* Category / Topic Tags */}
          {event.tags?.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {event.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="
                    rounded-full
                    bg-[#EBF2EE]
                    px-2.5
                    py-1
                    font-mono
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.08em]
                    text-[#1E513B]
                  "
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Event Title */}
          <h3
            className="
              text-xl
              font-bold
              leading-snug
              tracking-[-0.03em]
              text-[#0D1F15]
              transition-colors
              duration-300
              group-hover:text-[#1E513B]
            "
          >
            {event.title}
          </h3>

          {/* Description Excerpt */}
          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-[#4B6354]">
            {event.shortDescription}
          </p>
        </div>

        {/* Event Meta Details */}
        <div className="mt-6 border-t border-[#DCE5E0] pt-5">
          <EventMeta event={event} compact />
        </div>
      </div>
    </article>
  );
};

export default EventCard;