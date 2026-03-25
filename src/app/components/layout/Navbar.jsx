"use client";

import React, { useState } from "react";
import {
  IconHome,
  IconUser,
  IconMessage,
  IconCalendarEvent,
  IconUsers,
  IconChevronDown,
  IconHistory,
  IconX,
  IconMenu,
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  const [isFlashbackOpen, setIsFlashbackOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileFlashbackOpen, setIsMobileFlashbackOpen] = useState(false);

  const baseNavItems = [
    { name: "Home", link: "#Home", icon: <IconHome className="h-5 w-5" /> },
    { name: "About Us", link: "#About", icon: <IconUser className="h-5 w-5" /> },
    { name: "Events", link: "#Event", icon: <IconCalendarEvent className="h-5 w-5" /> },
    { name: "Team", link: "#Team", icon: <IconUsers className="h-5 w-5" /> },
    { name: "BR Team", link: "/BRTeam", icon: <IconUsers className="h-5 w-5" /> },
    { name: "Contact Us", link: "#Contact", icon: <IconMessage className="h-5 w-5" /> },
  ];

  const flashbackItems = [
    { label: "2022–23", url: "https://gfgbvm.github.io/gfgweb/core-team-2022/index.html" },
    { label: "2023–24", url: "https://gfgbvm.github.io/gfgweb/core-team-2023.html" },
    { label: "2024–25", url: "https://gfgbvm.github.io/gfgweb" },
  ];

  return (
    <>
      {/* ================= DESKTOP SPACER ONLY ================= */}
      <div className="hidden md:block h-[10px]" />

      {/* ================= MOBILE NAVBAR (UNCHANGED) ================= */}
      <nav className="md:hidden fixed top-0 left-0 w-full z-50 flex items-center justify-between px-5 py-3 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.jpg"
            alt="GeeksforGeeks Logo"
            width={36}
            height={36}
            className="rounded-sm"
            priority
          />
          <span className="text-base font-semibold text-neutral-900 leading-none">
            GeeksforGeeks
          </span>
        </Link>

        <button onClick={() => setIsMobileMenuOpen(true)}>
          <IconMenu className="h-6 w-6 text-neutral-700" />
        </button>
      </nav>

      {/* ================= MOBILE MENU (UNCHANGED) ================= */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsMobileFlashbackOpen(false);
            }}
          />

          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.jpg"
                  alt="GeeksforGeeks Logo"
                  width={36}
                  height={36}
                  className="rounded-sm"
                />
                <span className="text-sm font-semibold">GeeksforGeeks</span>
              </div>

              <button onClick={() => setIsMobileMenuOpen(false)}>
                <IconX className="h-5 w-5 text-neutral-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
              {baseNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}

              {/* MOBILE FLASHBACK */}
              <button
                onClick={() => setIsMobileFlashbackOpen(!isMobileFlashbackOpen)}
                className="flex w-full items-center gap-3 px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
              >
                <IconHistory className="h-5 w-5" />
                Flashback
                <IconChevronDown
                  className={`ml-auto h-4 w-4 transition-transform ${
                    isMobileFlashbackOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isMobileFlashbackOpen &&
                flashbackItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileFlashbackOpen(false)}
                    className="block pl-14 py-2 text-sm text-neutral-600 hover:bg-neutral-100"
                  >
                    {item.label}
                  </a>
                ))}
            </div>
          </div>
        </>
      )}

      {/* ================= DESKTOP NAVBAR (STICKY) ================= */}
      <header className="hidden md:block sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <nav className="flex items-center justify-between px-10 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="GeeksforGeeks Logo"
              width={44}
              height={44}
              className="rounded-sm"
              priority
            />
            <span className="text-lg font-semibold text-neutral-900 leading-none">
              GeeksforGeeks
            </span>
          </Link>

          <div className="flex items-center gap-8">
            {baseNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-900"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}

            {/* DESKTOP FLASHBACK */}
            <div className="relative">
              <button
                onClick={() => setIsFlashbackOpen(!isFlashbackOpen)}
                className="flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-900"
              >
                <IconHistory className="h-5 w-5" />
                Flashback
                <IconChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isFlashbackOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isFlashbackOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg border z-50">
                  {flashbackItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsFlashbackOpen(false)}
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
