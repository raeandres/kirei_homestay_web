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

  // Booking submission handler
  const handleBookingSubmit = (bookingData: any) => {
    console.log("Booking submitted:", bookingData);
    // Here you would typically send the booking data to your backend
    alert(
      `Booking submitted!\nCheck-in: ${bookingData.checkIn.toDateString()}\nCheck-out: ${bookingData.checkOut.toDateString()}\nGuests: ${
        bookingData.guests
      }\nTotal: $${bookingData.totalPrice} SGD\nPayment: ${
        bookingData.paymentMethod
      }`
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <HeroSection />
        <IntroSection
          occupiedDates={occupiedDates}
          onBookingSubmit={handleBookingSubmit}
        />
        <AboutSection />
        <ReviewsSection />
        <GallerySection />
        <AmenitiesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
