/**
 * Home Page - Kirei House PH
 * Main landing page with hero, booking, gallery sections
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header } from './layout/header';
import { Footer } from './layout/footer';
import { HeroSection } from './sections/hero-section';
import { IntroSection } from './sections/intro-section';
import { AboutSection } from './sections/about-section';
import { GallerySection } from './sections/gallery-section';
import { AmenitiesSection } from './sections/amenities-section';
import { ReviewsSection } from './sections/review-section';
import { ContactSection } from './sections/contact-section';
import { getBookedDates } from './actions/get-booked-dates';

// ==========================================
// Types and Interfaces
// ==========================================

interface CalendarSource {
  source: string;
  url: string;
}

interface RoomCalendars {
  [roomName: string]: CalendarSource[];
}

interface BookingSearchParams {
  checkIn: Date;
  checkOut: Date;
  adults?: number;
  children?: number;
  pets?: number;
}

// ==========================================
// Main HomePage Component
// ==========================================

export default function HomePage() {
  const [availableRooms, setAvailableRooms] = useState<string[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sample occupied dates - can be fetched from an API
  const [occupiedDates, setOccupiedDates] = useState<Date[]>([
    new Date(2024, 12, 31), // December 31, 2024
    // new Date(2024, 11, 16), // December 16, 2024
    // new Date(2024, 11, 17), // December 17, 2024
    // new Date(2024, 11, 25), // December 25, 2024
    // new Date(2024, 11, 26), // December 26, 2024
    // new Date(2025, 0, 1), // January 1, 2025
    // new Date(2025, 0, 2), // January 2, 2025
  ]);

  // Room calendar URLs with multiple sources per room
  const roomCalendars: RoomCalendars = {
    Kirei: [
      createCalendarSource(
        'Airbnb',
        'https://www.airbnb.com.sg/calendar/ical/1030897971821606234.ics?s=1b728ed92d212d0e42783ed473c0bb0f'
      ),
      createCalendarSource(
        'Booking.com',
        'https://ical.booking.com/v1/export?t=8e69dadf-d9aa-4d48-b092-dc9042edeff7'
      ),
    ],
    'Kirei - Ito': [
      createCalendarSource(
        'Airbnb',
        'https://www.airbnb.com.sg/calendar/ical/1364997919482714933.ics?s=663892ccaa5dabea43e13966feabc6e1'
      ),
      createCalendarSource(
        'Booking.com',
        'https://ical.booking.com/v1/export?t=42eba3ad-a5f1-4f7a-b758-bdc17af96cc0'
      ),
    ],
  };

  // ==========================================
  // Helper Functions
  // ==========================================

  // Create calendar source object
  const createCalendarSource = useCallback((source: string, url: string): CalendarSource => ({
    source,
    url,
  }), []);

  // ==========================================
  // Availability Checking Logic
  // ==========================================

  /**
   * Check if dates are available for a room across all calendar sources
   */
  const checkRoomAvailability = useCallback(
    async (roomName: string, checkIn: Date, checkOut: Date): Promise<boolean> => {
      try {
        const calendarSources =
          roomCalendars[roomName as keyof typeof roomCalendars];
        if (!calendarSources || calendarSources.length === 0) return false;

        // Check all calendar sources for this room
        for (const calendarSource of calendarSources) {
          try {
            const bookedDateRanges = await getBookedDates(calendarSource.url);

            // Check if the requested dates overlap with any booked dates
            for (const range of bookedDateRanges) {
              const bookedStart = new Date(range.from);
              const bookedEnd = new Date(range.to);

              // Check for overlap: checkIn < bookedEnd && checkOut > bookedStart
              if (checkIn < bookedEnd && checkOut > bookedStart) {
                return false; // Room is not available if ANY source shows conflict
              }
            }
          } catch (sourceError) {
            console.error(
              `Error checking ${calendarSource.source} calendar for ${roomName}:`,
              sourceError
            );
            // Continue checking other sources even if one fails
          }
        }

        return true; // Room is available if NO conflicts found
      } catch (error) {
        console.error(`Error checking availability for ${roomName}:`, error);
        return false;
      }
    },
    []
  );

  /**
   * Handle room search and availability check
   */
  const handleSearchRooms = useCallback(
    async (searchData: BookingSearchParams): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        if (!searchData.checkIn || !searchData.checkOut) {
          setError('Please select both check-in and check-out dates');
          return;
        }

        const checkInStr = searchData.checkIn.toDateString();
        const checkOutStr = searchData.checkOut.toDateString();

        // Check availability for both rooms
        const room1Available = await checkRoomAvailability('Kirei', searchData.checkIn, searchData.checkOut);
        const room2Available = await checkRoomAvailability('Kirei - Ito', searchData.checkIn, searchData.checkOut);

        const availableRoomsList: string[] = [];
        if (room1Available) availableRoomsList.push('Studio');
        if (room2Available) availableRoomsList.push('One Bedroom');

        // Update available rooms state
        setAvailableRooms(availableRoomsList);

        // Log search results
        console.log('Room search completed:', {
          checkIn: checkInStr,
          checkOut: checkOutStr,
          guests: searchData.adults,
          availableRooms: availableRoomsList,
        });
      } catch (err) {
        setError('Failed to check availability. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [checkRoomAvailability]
  );

  // Reset search when navigating away from intro section
  const handleResetSearch = useCallback(() => {
    setAvailableRooms(undefined);
  }, []);

  // ==========================================
  // Effect Hooks
  // ==========================================

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className='flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300'>
      <Header />

      <main className='flex-grow pt-16'>
        <HeroSection />

        <IntroSection
          occupiedDates={occupiedDates}
          onSearchRooms={handleSearchRooms}
          isLoading={isLoading}
          error={error}
          onResetSearch={handleResetSearch}
        />

        <section id='intro' className='scroll-mt-16'>
          <GallerySection availableRooms={availableRooms} />
        </section>

        <AboutSection />
        <ReviewsSection />
        <AmenitiesSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
