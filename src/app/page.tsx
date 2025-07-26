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

export default function HomePage() {
  const [availableRooms, setAvailableRooms] = useState<string[]>([]);
  // Sample occupied dates (you can replace this with real data from your backend)
  const occupiedDates = [
    new Date(2024, 11, 15), // December 15, 2024
    new Date(2024, 11, 16), // December 16, 2024
    new Date(2024, 11, 17), // December 17, 2024
    new Date(2024, 11, 25), // December 25, 2024
    new Date(2024, 11, 26), // December 26, 2024
    new Date(2025, 0, 1), // January 1, 2025
    new Date(2025, 0, 2), // January 2, 2025
  ];

  // Room calendar URLs - these correspond to the ICS URLs from gallery items
  const roomCalendars = {
    Kirei:
      "https://www.airbnb.com.sg/calendar/ical/1030897971821606234.ics?s=1b728ed92d212d0e42783ed473c0bb0f",
    "Kirei - Ito":
      "https://www.airbnb.com.sg/calendar/ical/1364997919482714933.ics?s=663892ccaa5dabea43e13966feabc6e1",
  };

  // Function to check if dates are available for a room
  const checkRoomAvailability = async (
    roomName: string,
    checkIn: Date,
    checkOut: Date
  ): Promise<boolean> => {
    try {
      const icsUrl = roomCalendars[roomName as keyof typeof roomCalendars];
      if (!icsUrl) return false;

      const bookedDateRanges = await getBookedDates(icsUrl);

      // Check if the requested dates overlap with any booked dates
      for (const range of bookedDateRanges) {
        const bookedStart = new Date(range.from);
        const bookedEnd = new Date(range.to);

        // Check for overlap: requested dates overlap if checkIn < bookedEnd && checkOut > bookedStart
        if (checkIn < bookedEnd && checkOut > bookedStart) {
          return false; // Room is not available
        }
      }

      return true; // Room is available
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
    if (room1Available) availableRoomsList.push("Kirei");
    if (room2Available) availableRoomsList.push("Kirei - Ito");

    // Update available rooms state
    setAvailableRooms(availableRoomsList);

    // Show results to user
    if (availableRoomsList.length === 0) {
      alert(
        `No rooms available for the selected dates:\nCheck-in: ${checkInStr}\nCheck-out: ${checkOutStr}\n\nPlease try different dates.`
      );
    } else {
      alert(
        `Available rooms found!\nCheck-in: ${checkInStr}\nCheck-out: ${checkOutStr}\nGuests: ${
          searchData.adults
        } adults, ${searchData.children} children, ${
          searchData.pets
        } pets\n\nAvailable rooms:\n${availableRoomsList.join(
          ", "
        )}\n\nScroll down to see only available rooms in the gallery.`
      );
    }
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
