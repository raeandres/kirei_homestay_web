// ==========================================
// Booking Hook - useBooking
// ==========================================

import { useState, useCallback, useEffect, useMemo } from 'react';
import type { CalendarRange, BookingData, BookingFormValues } from '@/lib/types';

/**
 * Custom hook for managing booking state
 */
export function useBooking(basePrice: number = 0) {
  // Date range
  const [dateRange, setDateRange] = useState<CalendarRange>({
    from: undefined,
    to: undefined,
  });

  // Guest details
  const [guests, setGuests] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [pets, setPets] = useState<number>(0);

  // Validation state
  const [isBookingValid, setIsBookingValid] = useState<boolean>(false);
  const [totalNights, setTotalNights] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Calculate booking details when date range changes
  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      const nights = getDaysInRange(dateRange.from, dateRange.to);

      // Validate dates
      if (nights <= 0) {
        setTotalNights(0);
        setTotalPrice(0);
        setIsBookingValid(false);
        return;
      }

      setTotalNights(nights);
      setTotalPrice(calculatePrice(nights));
      setIsBookingValid(true);
    } else {
      setTotalNights(0);
      setTotalPrice(0);
      setIsBookingValid(false);
    }
  }, [dateRange, basePrice]);

  /**
   * Calculate price for given nights
   */
  const calculatePrice = useCallback((nights: number): number => {
    return nights * basePrice;
  }, [basePrice]);

  /**
   * Set date range
   */
  const setRange = useCallback((range: CalendarRange) => {
    setDateRange(range);
  }, []);

  /**
   * Reset booking state
   */
  const clearBooking = useCallback(() => {
    setDateRange({ from: undefined, to: undefined });
    setGuests(1);
    setChildren(0);
    setPets(0);
    setTotalNights(0);
    setTotalPrice(0);
    setIsBookingValid(false);
  }, []);

  /**
   * Get booking data object
   */
  const getBookingData = useCallback((): BookingData | null => {
    if (!isBookingValid || !dateRange.from || !dateRange.to) {
      return null;
    }

    return {
      checkIn: dateRange.from,
      checkOut: dateRange.to,
      guests,
      children,
      pets,
      totalNights,
      totalPrice,
      paymentMethod: 'card' as const,
    };
  }, [
    isBookingValid,
    dateRange,
    guests,
    children,
    pets,
    totalNights,
    totalPrice,
  ]);

  /**
   * Validate booking form
   */
  const validateBooking = useCallback(() => {
    if (!dateRange.from || !dateRange.to) {
      return { valid: false, error: 'Please select both check-in and check-out dates' };
    }

    if (getDaysInRange(dateRange.from, dateRange.to) <= 0) {
      return { valid: false, error: 'Check-out must be after check-in' };
    }

    return { valid: true };
  }, [dateRange]);

  return {
    // State
    dateRange,
    guests,
    children,
    pets,
    isBookingValid,
    totalNights,
    totalPrice,

    // Updaters
    setRange,
    setGuests,
    setChildren,
    setPets,

    // Calculated
    calculatePrice,
    getBookingData,
    validateBooking,
    clearBooking,

    // Form values
    formValues: {
      checkIn: dateRange.from,
      checkOut: dateRange.to,
      guests,
      children,
      pets,
    } satisfies BookingFormValues,
  };
}

// ==========================================
// Availability Hook - useAvailability
// ==========================================

import { useState, useEffect, useCallback } from 'react';
import type { BookingDateRangeStrings } from '@/lib/types';

/**
 * Custom hook for checking room availability
 */
export function useAvailability() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [availability, setAvailability] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  /**
   * Check availability for multiple rooms
   */
  const checkAvailability = useCallback(async (
    rooms: string[],
    checkIn: Date,
    checkOut: Date,
    calendarUrls: Record<string, string[]>
  ): Promise<Record<string, boolean>> => {
    setIsLoading(true);
    setError(null);

    try {
      const availabilityResults: Record<string, boolean> = {};

      for (const roomName of rooms) {
        const urls = calendarUrls[roomName] || [];

        if (urls.length === 0) {
          availabilityResults[roomName] = true; // Assume available if no calendar
          continue;
        }

        // Check all calendar sources for this room
        let isAvailable = true;

        for (const url of urls) {
          try {
            const bookedRanges = await fetchBookedDates(url);
            const hasConflict = bookedRanges.some(range => {
              const bookedStart = new Date(range.from);
              const bookedEnd = new Date(range.to);
              return checkIn < bookedEnd && checkOut > bookedStart;
            });

            if (hasConflict) {
              isAvailable = false;
              break;
            }
          } catch {
            // Continue checking other sources even if one fails
            continue;
          }
        }

        availabilityResults[roomName] = isAvailable;
      }

      setAvailability(availabilityResults);
      return availabilityResults;
    } catch (err) {
      setError('Failed to check availability. Please try again.');
      return {};
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Fetch booked dates from ICS URL
   */
  const fetchBookedDates = async (icsUrl: string): Promise<BookingDateRangeStrings[]> => {
    // This would typically call a server action
    // For now, returning empty array as placeholder
    return [];
  };

  /**
   * Reset availability state
   */
  const resetAvailability = useCallback(() => {
    setAvailability({});
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    isLoading,
    availability,
    error,
    checkAvailability,
    resetAvailability,
  };
}

// ==========================================
// Currency Hook - useCurrency
// ==========================================

import { useState, useEffect, useCallback } from 'react';
import type { CurrencyInfo } from '@/lib/types';

/**
 * Default currency map
 */
export const DEFAULT_CURRENCY_MAP: Record<string, CurrencyInfo> = {
  SG: { code: 'SGD', symbol: '$', rate: 1 },
  US: { code: 'USD', symbol: '$', rate: 0.74 },
  GB: { code: 'GBP', symbol: '£', rate: 0.58 },
  EU: { code: 'EUR', symbol: '€', rate: 0.68 },
  JP: { code: 'JPY', symbol: '¥', rate: 110 },
  AU: { code: 'AUD', symbol: 'A$', rate: 1.12 },
  CA: { code: 'CAD', symbol: 'C$', rate: 1.01 },
  PH: { code: 'PHP', symbol: '₱', rate: 42 },
  MY: { code: 'MYR', symbol: 'RM', rate: 3.15 },
  TH: { code: 'THB', symbol: '฿', rate: 26 },
  ID: { code: 'IDR', symbol: 'Rp', rate: 11200 },
  VN: { code: 'VND', symbol: '₫', rate: 18500 },
  DE: { code: 'EUR', symbol: '€', rate: 0.68 },
  FR: { code: 'EUR', symbol: '€', rate: 0.68 },
  IT: { code: 'EUR', symbol: '€', rate: 0.68 },
  ES: { code: 'EUR', symbol: '€', rate: 0.68 },
  NL: { code: 'EUR', symbol: '€', rate: 0.68 },
};

/**
 * Custom hook for currency management
 */
export function useCurrency(defaultCurrency: CurrencyInfo = DEFAULT_CURRENCY_MAP.DEFAULT) {
  const [userCurrency, setUserCurrency] = useState<CurrencyInfo>(defaultCurrency);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Detect user currency from IP
   */
  const detectUserCurrency = useCallback(async (): Promise<CurrencyInfo> => {
    try {
      setIsLoading(true);
      const response = await fetch('https://ipapi.co/json/');

      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }

      const data = await response.json();

      if (data.country_code) {
        const countryCode = data.country_code.toUpperCase();
        const currency = DEFAULT_CURRENCY_MAP[countryCode] || DEFAULT_CURRENCY_MAP.DEFAULT;
        return currency;
      }

      return DEFAULT_CURRENCY_MAP.DEFAULT;
    } catch (error) {
      console.log('Could not detect location, using default currency:', error);
      return DEFAULT_CURRENCY_MAP.DEFAULT;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Initialize currency on mount
   */
  useEffect(() => {
    detectUserCurrency().then(currency => {
      setUserCurrency(currency);
      setIsLoading(false);
    });
  }, [detectUserCurrency]);

  /**
   * Format price with current currency
   */
  const formatPriceWithCurrency = useCallback((basePriceSGD: number): string => {
    const convertedPrice = basePriceSGD * userCurrency.rate;

    // Format based on currency
    if (userCurrency.code === 'JPY' || userCurrency.code === 'IDR' || userCurrency.code === 'VND') {
      return `${userCurrency.symbol}${Math.round(convertedPrice).toLocaleString()}`;
    } else {
      return `${userCurrency.symbol}${convertedPrice.toFixed(2)}`;
    }
  }, [userCurrency]);

  /**
   * Get formatted price string
   */
  const getPriceString = useCallback((basePriceSGD: number, currency?: CurrencyInfo): string => {
    const curr = currency || userCurrency;
    return formatPriceWithCurrency(basePriceSGD);
  }, [userCurrency, formatPriceWithCurrency]);

  /**
   * Convert SGD to another currency
   */
  const convertPrice = useCallback((basePriceSGD: number, rate: number): number => {
    return Number((basePriceSGD * rate).toFixed(2));
  }, []);

  /**
   * Manual currency override
   */
  const setCurrency = useCallback((currency: CurrencyInfo) => {
    setUserCurrency(currency);
    setIsLoading(false);
  }, []);

  return {
    userCurrency,
    isLoading,
    initializeCurrency: detectUserCurrency,
    formatPriceWithCurrency,
    getPriceString,
    convertPrice,
    setCurrency,
    currencyMap: DEFAULT_CURRENCY_MAP,
  };
}

// ==========================================
// Device Hook - useDevice
// ==========================================

import { useState, useEffect, useCallback } from 'react';

/**
 * Breakpoint configuration
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2k': 1440,
  '4k': 2560,
};

/**
 * Custom hook for device detection
 */
export function useDevice() {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    screenWidth: 0,
    screenHeight: 0,
    breakpoint: 'xs' as keyof typeof BREAKPOINTS | 'xs',
  });

  /**
   * Update device info based on window size
   */
  const updateDeviceInfo = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    let breakpoint: keyof typeof BREAKPOINTS | 'xs' = 'xs';
    if (width >= BREAKPOINTS['4k']) breakpoint = '4k';
    else if (width >= BREAKPOINTS['2k']) breakpoint = '2k';
    else if (width >= BREAKPOINTS.xl) breakpoint = 'xl';
    else if (width >= BREAKPOINTS.lg) breakpoint = 'lg';
    else if (width >= BREAKPOINTS.md) breakpoint = 'md';
    else if (width >= BREAKPOINTS.sm) breakpoint = 'sm';

    setDeviceInfo({
      isMobile: width < BREAKPOINTS.md,
      isTablet: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
      isDesktop: width >= BREAKPOINTS.lg,
      screenWidth: width,
      screenHeight: height,
      breakpoint,
    });
  }, []);

  /**
   * Check if currently on mobile
   */
  const isMobile = useCallback(() => {
    return window.innerWidth < BREAKPOINTS.md;
  }, []);

  /**
   * Check if currently on tablet
   */
  const isTablet = useCallback(() => {
    return window.innerWidth >= BREAKPOINTS.md && window.innerWidth < BREAKPOINTS.lg;
  }, []);

  /**
   * Check if currently on desktop
   */
  const isDesktop = useCallback(() => {
    return window.innerWidth >= BREAKPOINTS.lg;
  }, []);

  useEffect(() => {
    // Initial update
    updateDeviceInfo();

    // Event listener for resize
    window.addEventListener('resize', updateDeviceInfo);

    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
    };
  }, [updateDeviceInfo]);

  return {
    ...deviceInfo,
    isMobile,
    isTablet,
    isDesktop,
    breakpoints: BREAKPOINTS,
  };
}

// ==========================================
// Toast Hook - useToast
// ==========================================

import { useState, useCallback } from 'react';
import type { ToastMessage, ToastVariant } from '@/lib/types';

/**
 * Default toast configuration
 */
export const TOAST_CONFIG = {
  DEFAULT_DURATION: 5000,
  MAX_TOASTS: 3,
};

/**
 * Custom hook for toast notifications
 */
export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  /**
   * Add toast notification
   */
  const toast = useCallback((options: {
    title?: string;
    description: string;
    variant?: ToastVariant;
    duration?: number;
    action?: ToastMessage['action'];
  }) => {
    const id = Math.random().toString(36).substring(2, 9);
    const toastMessage: ToastMessage = {
      id,
      title: options.title,
      description: options.description,
      variant: options.variant || 'default',
      duration: options.duration || TOAST_CONFIG.DEFAULT_DURATION,
      action: options.action,
    };

    setToasts(prev => [...prev.slice(0, TOAST_CONFIG.MAX_TOASTS - 1), toastMessage]);

    // Auto dismiss
    if (toastMessage.duration) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, toastMessage.duration);
    }

    return id;
  }, []);

  /**
   * Remove toast by ID
   */
  const dismiss = useCallback((id?: string) => {
    if (id) {
      setToasts(prev => prev.filter(t => t.id !== id));
    } else {
      setToasts([]);
    }
  }, []);

  /**
   * Clear all toasts
   */
  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  /**
   * Success toast helper
   */
  const success = useCallback((description: string, title?: string) => {
    return toast({ title, description, variant: 'success' });
  }, [toast]);

  /**
   * Error toast helper
   */
  const error = useCallback((description: string, title?: string) => {
    return toast({ title, description, variant: 'destructive' });
  }, [toast]);

  /**
   * Info toast helper
   */
  const info = useCallback((description: string, title?: string) => {
    return toast({ title, description, variant: 'info' });
  }, [toast]);

  return {
    toasts,
    toast,
    dismiss,
    clearToasts,
    success,
    error,
    info,
  };
}
