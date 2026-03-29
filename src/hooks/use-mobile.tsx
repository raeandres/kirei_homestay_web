import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    // Mark as hydrated to prevent SSR/client mismatch
    setIsHydrated(true);

    const checkIsMobile = () => {
      // Use both window.innerWidth and matchMedia for more reliable detection
      const width = window.innerWidth;
      const isMobileWidth = width < MOBILE_BREAKPOINT;

      // Additional check for tablet devices that might report incorrect viewport
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isLikelyTablet = width >= 768 && width <= 1024 && isTouchDevice;

      // For tablets, we'll treat them as desktop to avoid hydration issues
      const shouldBeMobile = isMobileWidth && !isLikelyTablet;

      setIsMobile(shouldBeMobile);
    };

    // Set initial value
    checkIsMobile();

    // Use both resize and orientationchange for better tablet support
    const handleResize = () => {
      // Add a small delay to ensure viewport has settled
      setTimeout(checkIsMobile, 100);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // Also use matchMedia as backup
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handleMediaChange = () => {
      setTimeout(checkIsMobile, 100);
    };

    mql.addEventListener("change", handleMediaChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      mql.removeEventListener("change", handleMediaChange);
    };
  }, []);

  // Always return false until hydrated to prevent mismatch
  return isHydrated ? isMobile : false;
}
