import { useEffect, useRef, useState } from "react";

import LoaderLogo from "./LoadingLogo";
import { createLoaderAnimation } from "./LoadingAnimation";

import { useApp } from "../../context/AppContext";

/**
 * LoadingScreen Component
 *
 * High-end entrance splash loader with:
 * - Real-time percentage ticker
 * - Ambient emerald lighting
 * - Technical grid
 * - GSAP exit animation
 *
 * IMPORTANT:
 * When the loader finishes, finishLoading() updates
 * the global AppContext so Lenis can start scrolling.
 */
const LoadingScreen = () => {
  const loaderRef = useRef(null);
  const percentageRef = useRef(null);

  const [isVisible, setIsVisible] = useState(true);

  const { finishLoading } = useApp();

  useEffect(() => {
    const loader = loaderRef.current;

    if (!loader) return;

    let cleanup;
    let percentInterval;
    let isMounted = true;

    const initializeLoader = async () => {
      /*
       * 1. Wait until the document is fully loaded.
       */
      if (document.readyState !== "complete") {
        await new Promise((resolve) => {
          window.addEventListener(
            "load",
            resolve,
            { once: true }
          );
        });
      }

      /*
       * Component may have unmounted while waiting.
       */
      if (!isMounted) return;

      /*
       * 2. Progress ticker
       */
      let currentProgress = 0;

      percentInterval = setInterval(() => {
        if (!percentageRef.current) return;

        currentProgress +=
          Math.floor(Math.random() * 12) + 3;

        if (currentProgress >= 100) {
          currentProgress = 100;

          clearInterval(percentInterval);
          percentInterval = null;
        }

        percentageRef.current.textContent =
          `${currentProgress}%`;
      }, 45);

      /*
       * 3. Minimum loader duration
       */
      await new Promise((resolve) =>
        setTimeout(resolve, 850)
      );

      if (!isMounted) return;

      /*
       * 4. Exit animation
       */
      cleanup = createLoaderAnimation({
        loader,

        onComplete: () => {
          if (!isMounted) return;

          /*
           * Hide loader
           */
          setIsVisible(false);

          /*
           * VERY IMPORTANT:
           *
           * This changes:
           *
           * isLoading: true
           *        ↓
           * isLoading: false
           *
           * MainLayout then calls:
           *
           * lenis.start()
           */
          finishLoading();
        },
      });
    };

    initializeLoader();

    /*
     * Cleanup
     */
    return () => {
      isMounted = false;

      if (percentInterval) {
        clearInterval(percentInterval);
      }

      cleanup?.();
    };
  }, [finishLoading]);

  /*
   * Once the exit animation has completed,
   * completely remove the loader from the DOM.
   */
  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={loaderRef}
      className="
        fixed
        inset-0
        z-[99999]
        flex
        h-screen
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[#F4F7F5]
        select-none
      "
      aria-label="Loading website"
      role="status"
    >
      {/* =====================================================
          AMBIENT GLOW
      ===================================================== */}

      <div
        className="
          loader-glow
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[45vw]
          w-[45vw]
          min-h-[320px]
          min-w-[320px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#1E513B]/10
          blur-[120px]
        "
      />

      {/* =====================================================
          TECHNICAL GRID
      ===================================================== */}

      <div
        className="
          loader-grid
          pointer-events-none
          absolute
          inset-0
          opacity-[0.4]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(30,81,59,0.06) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(30,81,59,0.06) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* =====================================================
          TOP LEFT
      ===================================================== */}

      <div
        className="
          loader-label
          absolute
          left-6
          top-6
          flex
          items-center
          gap-2
          font-mono
          text-[10px]
          uppercase
          tracking-[0.25em]
          text-[#4B6354]
          sm:left-10
          sm:top-10
        "
      >
        <span
          className="
            h-1.5
            w-1.5
            rounded-full
            bg-[#1E513B]
            animate-pulse
          "
        />

        GFG / BVM
      </div>

      {/* =====================================================
          TOP RIGHT
      ===================================================== */}

      <div
        className="
          loader-year
          absolute
          right-6
          top-6
          font-mono
          text-[10px]
          uppercase
          tracking-[0.25em]
          text-[#4B6354]
          sm:right-10
          sm:top-10
        "
      >
        2026 EDITION
      </div>

      {/* =====================================================
          CENTER LOGO
      ===================================================== */}

      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-center
          gap-6
        "
      >
        <LoaderLogo />

        <div className="overflow-hidden">
          <p
            className="
              font-montserrat
              text-xs
              font-semibold
              uppercase
              tracking-[0.3em]
              text-[#0D1F15]/70
            "
          >
            Student Chapter
          </p>
        </div>
      </div>

      {/* =====================================================
          BOTTOM STATUS & PERCENTAGE TICKER
      ===================================================== */}

      <div
        className="
          loader-status
          absolute
          bottom-8
          left-6
          right-6
          flex
          flex-col
          items-center
          justify-center
          gap-3
          pointer-events-none
          sm:bottom-12
          sm:left-10
          sm:right-10
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            font-mono
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-[#4B6354]
          "
        >
          <span
            className="
              inline-block
              h-1
              w-1
              rounded-full
              bg-[#1E513B]
            "
          />

          <span>
            Initializing Experience
          </span>
        </div>

        {/* Clean, high-visibility percentage counter spaced cleanly below status text */}
        <span
          ref={percentageRef}
          className="
            loader-percentage
            font-mono
            text-2xl
            font-bold
            tracking-wider
            text-[#1E513B]
            sm:text-3xl
          "
          aria-hidden="true"
        >
          0%
        </span>
      </div>

      {/* =====================================================
          PROGRESS BAR
      ===================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          h-[2px]
          w-full
          bg-[#DCE5E0]
        "
      />

      <div
        className="
          loader-progress
          absolute
          bottom-0
          left-0
          h-[2px]
          w-0
          bg-gradient-to-r
          from-[#1E513B]
          to-[#286E50]
          shadow-[0_0_10px_rgba(30,81,59,0.5)]
          transition-all
          duration-300
        "
      />
    </div>
  );
};

export default LoadingScreen;