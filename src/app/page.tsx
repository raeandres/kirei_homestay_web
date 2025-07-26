"use client";

import { Header } from "./layout/header";
import { Footer } from "./layout/footer";
import { HeroSection } from "./sections/hero-section";
import { IntroSection } from "./sections/intro-section";
import { AboutSection } from "./sections/about-section";
import { GallerySection } from "./sections/gallery-section";
import { AmenitiesSection } from "./sections/amenities-section";
import { ReviewsSection } from "./sections/review-section";
import { ContactSection } from "./sections/contact-section";

export default function HomePage() {
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

  // Room search handler
  const handleSearchRooms = (searchData: any) => {
    console.log("Room search:", searchData);
    // Here you would typically search for available rooms
    const checkInStr = searchData.checkIn
      ? searchData.checkIn.toDateString()
      : "Not selected";
    const checkOutStr = searchData.checkOut
      ? searchData.checkOut.toDateString()
      : "Not selected";
    alert(
      `Searching for rooms...\nCheck-in: ${checkInStr}\nCheck-out: ${checkOutStr}\nAdults: ${searchData.adults}\nChildren: ${searchData.children}\nPets: ${searchData.pets}`
    );
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
        <GallerySection />
        <AboutSection />
        <ReviewsSection />

        <AmenitiesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
