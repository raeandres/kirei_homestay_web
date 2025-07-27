"use client";

import { useState } from "react";
import { Header } from "./layout/header";
import { Footer } from "./layout/footer";
import { HeroSection } from "./sections/hero-section";
import { IntroSection } from "./sections/intro-section";
import { AboutSection } from "./sections/about-section";
import { GallerySection } from "./sections/gallery-section";
import { AmenitiesSection } from "./sections/amenities-section";
import { ReviewsSection } from "./sections/review-section";
import { ContactSection } from "./sections/contact-section";
import { getBookedDates } from "./actions/get-booked-dates";

// Types for calendar sources
interface CalendarSource {
  source: string;
  url: string;
}

interface RoomCalendars {
  [roomName: string]: CalendarSource[];
}

// Helper function to create calendar sources
const createCalendarSource = (source: string, url: string): CalendarSource => ({
  source,
  url,
});

export default function HomePage() {
  const [availableRooms, setAvailableRooms] = useState<string[]>([]);
  // Sample occupied dates (you can replace this with real data from your backend)
  const occupiedDates = [
    new Date(2024, 12, 31), // December 31, 2024
    // new Date(2024, 11, 16), // December 16, 2024
    // new Date(2024, 11, 17), // December 17, 2024
    // new Date(2024, 11, 25), // December 25, 2024
    // new Date(2024, 11, 26), // December 26, 2024
    // new Date(2025, 0, 1), // January 1, 2025
    // new Date(2025, 0, 2), // January 2, 2025
  ];

  // Room calendar URLs with multiple sources per room
  const roomCalendars: RoomCalendars = {
    Kirei: [
      createCalendarSource(
        "Airbnb",
        "https://www.airbnb.com.sg/calendar/ical/1030897971821606234.ics?s=1b728ed92d212d0e42783ed473c0bb0f"
      ),
      // Note: Add other calendar sources here when URLs are available
      createCalendarSource(
        "Booking.com",
        "https://ical.booking.com/v1/export?t=8e69dadf-d9aa-4d48-b092-dc9042edeff7"
      ),
      // createCalendarSource("Agoda", "https://agoda.com/actual-url"),
    ],
    "Kirei - Ito": [
      createCalendarSource(
        "Airbnb",
        "https://www.airbnb.com.sg/calendar/ical/1364997919482714933.ics?s=663892ccaa5dabea43e13966feabc6e1"
      ),
      // Note: Add other calendar sources here when URLs are available
      createCalendarSource(
        "Booking.com",
        "https://ical.booking.com/v1/export?t=42eba3ad-a5f1-4f7a-b758-bdc17af96cc0" // Example URL - replace with actual
      ),
      // createCalendarSource(
      //   "Agoda",
      //   "https://www.agoda.com/calendar/ical/kirei-ito.ics" // Example URL - replace with actual
      // ),
      // createCalendarSource(
      //   "Direct Bookings",
      //   "https://your-domain.com/calendar/ical/kirei-ito-direct.ics" // Example URL - replace with actual
      // ),
    ],

    // Example: How to add more rooms
    // "Kirei - Premium": [
    //   createCalendarSource("Airbnb", "https://airbnb.com/calendar/ical/premium-room.ics"),
    //   createCalendarSource("Booking.com", "https://booking.com/calendar/ical/premium-room.ics"),
    //   createCalendarSource("Expedia", "https://expedia.com/calendar/ical/premium-room.ics"),
    //   createCalendarSource("VRBO", "https://vrbo.com/calendar/ical/premium-room.ics"),
    //   createCalendarSource("Direct Bookings", "https://your-domain.com/calendar/ical/premium-direct.ics"),
    // ],
  };

  // Function to check if dates are available for a room across all calendar sources
  const checkRoomAvailability = async (
    roomName: string,
    checkIn: Date,
    checkOut: Date
  ): Promise<boolean> => {
    try {
      const calendarSources =
        roomCalendars[roomName as keyof typeof roomCalendars];
      if (!calendarSources || calendarSources.length === 0) return false;

      // Check all calendar sources for this room
      for (const calendarSource of calendarSources) {
        console.log(
          `Checking ${calendarSource.source} calendar for ${roomName}...`
        );

        try {
          const bookedDateRanges = await getBookedDates(calendarSource.url);

          // Check if the requested dates overlap with any booked dates from this source
          for (const range of bookedDateRanges) {
            const bookedStart = new Date(range.from);
            const bookedEnd = new Date(range.to);

            // Check for overlap: requested dates overlap if checkIn < bookedEnd && checkOut > bookedStart
            if (checkIn < bookedEnd && checkOut > bookedStart) {
              console.log(
                `${roomName} is not available - conflict found in ${calendarSource.source}`
              );
              return false; // Room is not available if ANY source shows conflict
            }
          }
        } catch (sourceError) {
          console.error(
            `Error checking ${calendarSource.source} calendar for ${roomName}:`,
            sourceError
          );
          // Continue checking other sources even if one fails
          // You might want to return false here if you want to be conservative
        }
      }

      console.log(`${roomName} is available across all calendar sources`);
      return true; // Room is available if NO conflicts found in ANY source
    } catch (error) {
      console.error(`Error checking availability for ${roomName}:`, error);
      return false; // Assume not available on error
    }
  };

  // Room search handler
  const handleSearchRooms = async (searchData: any) => {
    console.log("Room search:", searchData);

    if (!searchData.checkIn || !searchData.checkOut) {
      alert("Please select both check-in and check-out dates");
      return;
    }

    const checkInStr = searchData.checkIn.toDateString();
    const checkOutStr = searchData.checkOut.toDateString();

    // Check availability for both rooms
    const room1Available = await checkRoomAvailability(
      "Kirei",
      searchData.checkIn,
      searchData.checkOut
    );
    const room2Available = await checkRoomAvailability(
      "Kirei - Ito",
      searchData.checkIn,
      searchData.checkOut
    );

    const availableRoomsList = [];
    if (room1Available) availableRoomsList.push("Studio");
    if (room2Available) availableRoomsList.push("One Bedroom");

    // Update available rooms state
    setAvailableRooms(availableRoomsList);

    // Show results to user with calendar source information
    // if (availableRoomsList.length === 0) {
    //   alert(
    //     `No rooms available for the selected dates:\nCheck-in: ${checkInStr}\nCheck-out: ${checkOutStr}\n\nChecked across all calendar sources:\n• Airbnb\n• Booking.com\n• Agoda\n• Direct Bookings\n\nPlease try different dates.`
    //   );
    // } else {
    //   const calendarSourcesInfo =
    //     "Availability checked across multiple sources:\n• Airbnb calendars\n• Booking.com calendars\n• Agoda calendars\n• Direct booking calendars";

    //   alert(
    //     `Available rooms found!\nCheck-in: ${checkInStr}\nCheck-out: ${checkOutStr}\nGuests: ${
    //       searchData.adults
    //     } adults, ${searchData.children} children, ${
    //       searchData.pets
    //     } pets\n\nAvailable rooms:\n${availableRoomsList.join(
    //       ", "
    //     )}\n\n${calendarSourcesInfo}\n\nScroll down to see only available rooms in the gallery.`
    //   );
    // }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <HeroSection />
        <IntroSection
          occupiedDates={occupiedDates}
          onSearchRooms={handleSearchRooms}
        />
        <GallerySection availableRooms={availableRooms} />
        <AboutSection />
        <ReviewsSection />

        <AmenitiesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
