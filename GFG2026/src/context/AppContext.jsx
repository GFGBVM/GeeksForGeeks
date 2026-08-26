import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AppContext = createContext(null);

/**
 * AppProvider Component
 * 
 * Central context provider for global UI states:
 * - Mobile navigation menu toggle
 * - Initial loading screen state
 * - Active scroll section tracking via IntersectionObserver
 * - Global event modal selection
 * - Body scroll locking during modal/menu overlays
 */
export const AppProvider = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("Home");
  const [selectedEvent, setSelectedEvent] = useState(null);

  /*
   * 1. Mobile Menu Controllers
   */
  const openMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((current) => !current);
  }, []);

  /*
   * 2. Loading State Controller
   */
  const finishLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  /*
   * 3. Global Event Modal Controllers
   */
  const openEvent = useCallback((event) => {
    setSelectedEvent(event);
  }, []);

  const closeEvent = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  /*
   * 4. Body Scroll Lock Management
   */
  useEffect(() => {
    const shouldLockScroll = isMobileMenuOpen || Boolean(selectedEvent);

    if (shouldLockScroll) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, selectedEvent]);

  /*
   * 5. Auto-close Mobile Menu on Desktop Resize
   */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /*
   * 6. Global Active Section Observer
   */
  useEffect(() => {
    const sectionIds = ["Home", "About", "Events", "Team", "Contact"];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -50% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const value = useMemo(
    () => ({
      // Mobile Menu
      isMobileMenuOpen,
      openMobileMenu,
      closeMobileMenu,
      toggleMobileMenu,

      // Loader State
      isLoading,
      finishLoading,

      // Navigation Tracking
      activeSection,
      setActiveSection,

      // Global Events Modal
      selectedEvent,
      openEvent,
      closeEvent,
    }),
    [
      isMobileMenuOpen,
      isLoading,
      activeSection,
      selectedEvent,
      openMobileMenu,
      closeMobileMenu,
      toggleMobileMenu,
      finishLoading,
      openEvent,
      closeEvent,
    ]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside an AppProvider");
  }

  return context;
};

export default AppContext;