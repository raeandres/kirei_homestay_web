import * as React from "react";

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  deviceType: DeviceType;
  screenWidth: number;
}

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export function useDevice(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = React.useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true, // Default to desktop for SSR
    deviceType: 'desktop',
    screenWidth: 1024, // Default width for SSR
  });
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    setIsHydrated(true);

    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      let deviceType: DeviceType;
      let isMobile = false;
      let isTablet = false;
      let isDesktop = false;

      if (width < MOBILE_BREAKPOINT) {
        deviceType = 'mobile';
        isMobile = true;
      } else if (width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT) {
        // For devices between 768-1024px, check if it's a touch device
        if (isTouchDevice) {
          deviceType = 'tablet';
          isTablet = true;
        } else {
          deviceType = 'desktop';
          isDesktop = true;
        }
      } else {
        deviceType = 'desktop';
        isDesktop = true;
      }

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        deviceType,
        screenWidth: width,
      });
    };

    // Set initial value
    updateDeviceInfo();

    // Handle resize and orientation changes
    const handleResize = () => {
      // Small delay to ensure viewport has settled
      setTimeout(updateDeviceInfo, 150);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Return default desktop values during SSR to prevent hydration mismatch
  if (!isHydrated) {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      deviceType: 'desktop',
      screenWidth: 1024,
    };
  }

  return deviceInfo;
}

// Backward compatibility hook
export function useIsMobile(): boolean {
  const { isMobile } = useDevice();
  return isMobile;
}
