"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

/* ---------------- EVENT DATA ---------------- */
const events = [
  {
    id: 1,
    title: "SkillUp101 - From Code to Confidence",
    shortDesc: "Hands-on technical skill workshop",
    fullDesc:
      "SkillUp101-From Code to Confidence is an immersive learning experience designed to help students transition from code to confidence. The event focuses on communication, resume building, LinkedIn optimization, and problem-solving skills essential for placements.",
    date: "Wednesday, 12th November 2025",
    time: "3:00 PM – 5:00 PM",
    venue: "B Block, Room 401, Birla Vishvakarma Mahavidyalaya",
    speakers: [
      "Aditya Desai (4th Year CP) – Professional Communication",
      "Kavya Zinzuvadiya (2nd Year IT) – Data Structures",
      "Vihaa Shah (3rd Year IT) – Resume Building",
      "Parv Luhar (2nd Year CP) – LinkedIn & Personal Branding",
    ],
    images: [
      "/events/skillup101.jpeg",
      "/events/skillup101-5.jpeg",
      "/events/skillup101-3.jpeg",
      "/events/skillup101-4.jpeg",
      "/events/skillup101-1.jpg",
      "/events/skillup101-2.jpg",
    ],
    report: "/reports/Skillup-101reportfinal.pdf",
  },
];

export default function EventPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = "hidden";
      setTimeout(() => setAnimate(true), 10);
    } else {
      document.body.style.overflow = "";
      setAnimate(false);
    }
  }, [selectedEvent]);

  const next = () =>
    setCurrentIndex((i) =>
      i === selectedEvent.images.length - 1 ? 0 : i + 1
    );

  const prev = () =>
    setCurrentIndex((i) =>
      i === 0 ? selectedEvent.images.length - 1 : i - 1
    );

  return (
    <section className="py-15 bg-gray-50 font-roboto">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#0F9D58] text-center mb-12">
          Events
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => {
                setSelectedEvent(event);
                setCurrentIndex(0);
              }}
              className="cursor-pointer bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="relative h-44 rounded-lg overflow-hidden mb-4 bg-black">
                <Image
                  src={event.images[0]}
                  alt={event.title}
                  fill
                  className="object-contain"
                />
              </div>

              <h3 className="text-lg font-semibold text-[#0F9D58] mb-1">
                {event.title}
              </h3>

              <p className="text-neutral-700 text-sm mb-2">
                {event.shortDesc}
              </p>

              <p className="text-xs text-neutral-600 flex items-center gap-1 mb-1">
                <span>📅</span>
                <span>{event.date}</span>
              </p>

              <p className="text-xs text-neutral-600 flex items-center gap-1 line-clamp-1">
                <span>📍</span>
                <span>{event.venue}</span>
              </p>
            </div>
          ))}
        </div>

        {mounted &&
          selectedEvent &&
          createPortal(
            <div
              className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center"
              onClick={() => setSelectedEvent(null)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className={`relative bg-white rounded-xl w-[95%] max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-8 transform transition-all duration-300 ${
                  animate ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
              >
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 text-xl text-neutral-500 hover:text-red-500"
                >
                  ✕
                </button>

                <h2 className="text-xl md:text-2xl font-semibold text-[#0F9D58] mb-4">
                  {selectedEvent.title}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm">
                  <div>
                    <p className="font-semibold">📅 Date</p>
                    <p className="text-neutral-600">{selectedEvent.date}</p>
                  </div>

                  <div>
                    <p className="font-semibold">⏰ Time</p>
                    <p className="text-neutral-600">{selectedEvent.time}</p>
                  </div>

                  <div>
                    <p className="font-semibold">📍 Venue</p>
                    <p className="text-neutral-600">{selectedEvent.venue}</p>
                  </div>

                  <div>
                    <p className="font-semibold">🎤 Speakers</p>
                    <ul className="list-disc list-inside text-neutral-600">
                      {selectedEvent.speakers.map((sp, i) => (
                        <li key={i}>{sp}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="text-neutral-700 leading-relaxed mb-6">
                  {selectedEvent.fullDesc}
                </p>

                <a
                  href={selectedEvent.report}
                  download
                  className="inline-block mb-6 px-5 py-2.5 bg-[#0F9D58] text-white rounded-md text-sm font-medium hover:bg-[#0c7c45] transition"
                >
                  Download Event Report
                </a>

                <div className="relative h-72 sm:h-96 rounded-lg overflow-hidden bg-black">
                  <Image
                    src={selectedEvent.images[currentIndex]}
                    alt="Event"
                    fill
                    className="object-contain"
                  />

                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded-full"
                  >
                    ‹
                  </button>

                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded-full"
                  >
                    ›
                  </button>
                </div>

                <div className="flex justify-center gap-2 mt-4">
                  {selectedEvent.images.map((_, i) => (
                    <span
                      key={i}
                      className={`h-2 w-2 rounded-full ${
                        i === currentIndex
                          ? "bg-[#0F9D58]"
                          : "bg-neutral-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>,
            document.body
          )}
      </div>
    </section>
  );
}