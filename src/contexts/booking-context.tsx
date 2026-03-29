/**
 * Booking Context - Manages booking state across components
 */

import React, { createContext, useContext, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type {
  BookingData,
  BookingFormValues,
  CalendarRange,
  BookingDateRangeStrings,
} from '@/lib/types';
import { getDaysInRange } from '@/lib/utils';

// ==========================================
// Booking Context Type
// ==========================================

interface BookingContextType {
  dateRange: CalendarRange;
  guests: number;
  children: number;
  pets: number;
  totalPrice: number;
  totalNights: number;
  isBookingValid: boolean;

  // Actions
  setRange: (range: CalendarRange) => void;
  setGuests: (count: number) => void;
  setChildren: (count: number) => void;
  setPets: (count: number) => void;
  calculatePrice: (basePrice: number) => number;
  validateBooking: () => { valid: boolean; error?: string };
  getBookingData: () => BookingData | null;
  clearBooking: () => void;
  formValues: BookingFormValues;
}

// ==========================================
// Booking Provider Component
// ==========================================

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  // State
  const [dateRange, setDateRange] = React.useState<CalendarRange>({
    from: undefined,
    to: undefined,
  });
  const [guests, setGuests] = React.useState<number>(1);
  const [children, setChildren] = React.useState<number>(0);
  const [pets, setPets] = React.useState<number>(0);
  const [isBookingValid, setIsBookingValid] = React.useState<boolean>(false);
  const [totalNights, setTotalNights] = React.useState<number>(0);
  const [totalPrice, setTotalPrice] = React.useState<number>(0);

  // Recalculate when date range changes
  React.useEffect(() => {
    if (dateRange.from && dateRange.to) {
      const nights = getDaysInRange(dateRange.from, dateRange.to);

      if (nights <= 0) {
        setTotalNights(0);
        setTotalPrice(0);
        setIsBookingValid(false);
        return;
      }

      setTotalNights(nights);
      setIsBookingValid(true);
    } else {
      setTotalNights(0);
      setTotalPrice(0);
      setIsBookingValid(false);
    }
  }, [dateRange]);

  // Actions
  const setRange = useCallback((range: CalendarRange) => {
    setDateRange(range);
  }, []);

  const setGuests = useCallback((count: number) => {
    setGuests(Math.max(1, Math.min(count, 20))); // Limit to reasonable range
  }, []);

  const setChildren = useCallback((count: number) => {
    setChildren(Math.max(0, Math.min(count, 10)));
  }, []);

  const setPets = useCallback((count: number) => {
    setPets(Math.max(0, Math.min(count, 5)));
  }, []);

  const calculatePrice = useCallback((basePrice: number): number => {
    return totalNights * basePrice;
  }, [totalNights]);

  const validateBooking = useCallback(() => {
    if (!dateRange.from || !dateRange.to) {
      return { valid: false, error: 'Please select both check-in and check-out dates' };
    }

    const nights = getDaysInRange(dateRange.from, dateRange.to);
    if (nights <= 0) {
      return { valid: false, error: 'Check-out must be after check-in' };
    }

    if (guests < 1) {
      return { valid: false, error: 'At least one guest is required' };
    }

    return { valid: true };
  }, [dateRange, guests]);

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

  const clearBooking = useCallback(() => {
    setDateRange({ from: undefined, to: undefined });
    setGuests(1);
    setChildren(0);
    setPets(0);
    setTotalNights(0);
    setTotalPrice(0);
    setIsBookingValid(false);
  }, []);

  const formValues = useMemo(
    () => ({
      checkIn: dateRange.from,
      checkOut: dateRange.to,
      guests,
      children,
      pets,
    }),
    [dateRange, guests, children, pets]
  );

  return (
    <BookingContext.Provider
      value={{
        dateRange,
        guests,
        children,
        pets,
        totalPrice,
        totalNights,
        isBookingValid,
        setRange,
        setGuests,
        setChildren,
        setPets,
        calculatePrice,
        validateBooking,
        getBookingData,
        clearBooking,
        formValues,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

// ==========================================
// Booking Hook
// ==========================================

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    // Default values for when context is not available
    return {
      dateRange: { from: undefined, to: undefined },
      guests: 1,
      children: 0,
      pets: 0,
      totalPrice: 0,
      totalNights: 0,
      isBookingValid: false,
      setRange: () => {},
      setGuests: () => {},
      setChildren: () => {},
      setPets: () => {},
      calculatePrice: () => 0,
      validateBooking: () => ({ valid: false }),
      getBookingData: () => null,
      clearBooking: () => {},
      formValues: {
        checkIn: undefined,
        checkOut: undefined,
        guests: 1,
        children: 0,
        pets: 0,
      },
    };
  }
  return context;
}

// ==========================================
// Booking Form Hook
// ==========================================

export function useBookingForm(basePrice: number = 0) {
  const {
    dateRange,
    guests,
    children,
    pets,
    totalPrice,
    totalNights,
    isBookingValid,
    setRange,
    setGuests,
    setChildren,
    setPets,
    calculatePrice,
    validateBooking,
    getBookingData,
    clearBooking,
    formValues,
  } = useBooking();

  // Price calculation helper
  const updatePrice = useCallback(() => {
    if (totalNights > 0) {
      return calculatePrice(basePrice);
    }
    return 0;
  }, [totalNights, calculatePrice, basePrice]);

  return {
    // State
    dateRange,
    guests,
    children,
    pets,
    totalPrice: updatePrice(),
    totalNights,
    isBookingValid,
    formValues,

    // Actions
    setRange,
    setGuests,
    setChildren,
    setPets,
    validateBooking,
    getBookingData,
    clearBooking,
  };
}
