import { useRef, useState } from "react";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { events } from "../../data/events";
import EventCard from "./EventCard";
import EventModal from "./EventModal";
import { initEventsAnimation } from "./EventAnimation";
import { useGSAP } from "../../hooks/useGSAP";

/**
 * Events Component
 * 
 * Displays the chapter's upcoming and past technical events in a grid layout
 * with modal dynamic inspection and GSAP-triggered entrance sequences.
 */
const Events = () => {
  const sectionRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const cleanup = initEventsAnimation(sectionRef.current);
    return () => cleanup?.();
  }, sectionRef);

  const openEvent = (event) => {
    setSelectedEvent(event);
  };

  const closeEvent = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="Events"
        className="events-section relative overflow-hidden bg-[#F4F7F5] py-24 select-none sm:py-32 lg:py-40"
      >
        {/* Forest Mint Glow Effect */}
        <div
          className="events-glow pointer-events-none absolute right-[-15%] top-[10%] h-[550px] w-[550px] rounded-full bg-[#1E513B]/[0.06] blur-[130px]"
          aria-hidden="true"
        />

        <Container size="large">
          {/* Section Heading */}
          <div className="events-heading">
            <SectionHeading
              number="02"
              eyebrow="Our Events"
              title={
                <>
                  Where
                  <br />
                  learning
                  <span className="text-[#1E513B]"> happens.</span>
                </>
              }
              description="From technical workshops and coding sessions to community-driven initiatives, every event is designed to help students learn, build, and connect."
            />
          </div>

          {/* Events Grid */}
          {events?.length > 0 ? (
            <div className="events-grid mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-24 xl:grid-cols-3">
              {events.map((event, index) => (
                <EventCard
                  key={event.id || index}
                  event={event}
                  index={index}
                  onOpen={() => openEvent(event)}
                />
              ))}
            </div>
          ) : (
            /* Fallback Empty State */
            <div className="mt-20 border-t border-[#DCE5E0] pt-10 text-center">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#4B6354]">
                More events coming soon...
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* Event Details Modal */}
      <EventModal
        event={selectedEvent}
        isOpen={Boolean(selectedEvent)}
        onClose={closeEvent}
      />
    </>
  );
};

export default Events;