"use client";

import { useState } from "react";
import { IconHome, IconUsers, IconMenu, IconX } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";

export function BRNavbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "/", icon: <IconHome className="h-5 w-5" /> },
    { name: "BR Team", link: "/BRTeam", icon: <IconUsers className="h-5 w-5" /> },
  ];

  return (
    <>
      {/* ================= DESKTOP SPACER ONLY ================= */}
      <div className="hidden md:block h-[10px]" />

      {/* ================= MOBILE NAVBAR ================= */}
      <nav className="md:hidden fixed top-0 left-0 w-full z-50 flex items-center justify-between px-5 py-3 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.jpg"
            alt="GeeksforGeeks Logo"
            width={36}
            height={36}
            className="rounded-sm"
          />
          <span className="text-base font-semibold">
            GeeksforGeeks
          </span>
        </div>

        <button onClick={() => setIsMobileOpen(true)}>
          <IconMenu className="h-6 w-6 text-neutral-700" />
        </button>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {isMobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsMobileOpen(false)}
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
                <span className="text-sm font-semibold leading-none">
                  GeeksforGeeks
                </span>
              </div>

              <button onClick={() => setIsMobileOpen(false)}>
                <IconX className="h-5 w-5 text-neutral-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ================= DESKTOP NAVBAR ================= */}
      <header className="hidden md:block sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <nav className="flex items-center justify-between px-10 py-4">
          <div className="flex items-center gap-2">
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
          </div>

          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-900"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
}