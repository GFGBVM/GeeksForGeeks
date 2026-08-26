import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import LoadingScreen from "../components/loader/LoadingScreen";
import CustomCursor from "../components/common/CustomCursor";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

import { useLenis } from "../hooks/useLenis";
import { useApp } from "../context/AppContext";

const MainLayout = ({ children }) => {
  const { isLoading } = useApp();
  const { pathname } = useLocation();

  /*
   * Initialize Lenis.
   *
   * All Lenis configuration is handled inside
   * useLenis.js. Do not pass deprecated options here.
   */
  const lenisRef = useLenis();

  /*
   * Scroll to top whenever the route changes.
   */
  useEffect(() => {
    const lenis = lenisRef.current;

    if (lenis) {
      lenis.scrollTo(0, {
        immediate: true,
      });
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    }
  }, [pathname, lenisRef]);

  /*
   * Control Lenis based on the loading screen.
   *
   * While the loader is visible:
   *     Lenis is stopped.
   *
   * After loading:
   *     Lenis starts.
   */
  useEffect(() => {
    const lenis = lenisRef.current;

    if (!lenis) return;

    if (isLoading) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [isLoading, lenisRef]);

  return (
    <>
      {/* =====================================================
          CUSTOM CURSOR
      ===================================================== */}

      <CustomCursor />

      {/* =====================================================
          LOADING SCREEN
      ===================================================== */}

      <LoadingScreen />

      {/* =====================================================
          WEBSITE WRAPPER
      ===================================================== */}

      <div
        id="smooth-wrapper"
        className="
          relative
          min-h-screen
          bg-white
          text-[#111111]
          antialiased
          selection:bg-[#2F8D46]
          selection:text-white
        "
      >
        {/* ===================================================
            NAVBAR
        =================================================== */}

        <Navbar />

        {/* ===================================================
            PAGE CONTENT
        =================================================== */}

        <main
          id="smooth-content"
          className="
            relative
            z-10
            flex
            min-h-screen
            flex-col
          "
        >
          {children ?? <Outlet />}
        </main>

        {/* ===================================================
            FOOTER
        =================================================== */}

        <Footer />
      </div>
    </>
  );
};

export default MainLayout;