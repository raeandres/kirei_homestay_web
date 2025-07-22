"use client";

import { useDevice } from "@/hooks/use-device";
import { BookingComponent } from "./components/booking-component";

interface IntroSectionProps {
  occupiedDates?: Date[];
  onBookingSubmit?: (bookingData: any) => void;
}

export function IntroSection({
  occupiedDates = [],
  onBookingSubmit,
}: IntroSectionProps) {
  const { isMobile } = useDevice();

  // Sample property data - you can replace this with real data
  const propertyData = {
    name: "Kirei House PH",
    unitType: "Deluxe Studio",
    basePriceSGD: 120,
    location: "Eastwood City, Quezon City",
    maxGuests: 4,
  };

  return (
    <section
      id="intro"
      className="py-12 md:py-16 bg-background flex flex-col items-center justify-center"
    >
      <div className="container max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2
            className={
              isMobile
                ? "text-2xl md:text-3xl text-center text-stormy-blue/80 font-playfair-display font-light tracking-wide leading-relaxed mb-2"
                : "text-3xl md:text-4xl text-center text-stormy-blue/80 font-playfair-display font-light tracking-wide leading-relaxed mb-2"
            }
          >
            Reserve Your Stay
          </h2>
          <p
            className={
              isMobile
                ? "text-sm text-center text-stormy-blue/60 font-playfair-display font-normal tracking-wide leading-relaxed max-w-2xl mx-auto"
                : "text-base text-center text-stormy-blue/60 font-playfair-display font-normal tracking-wide leading-relaxed max-w-2xl mx-auto"
            }
          >
            Book your mindful stay at our thoughtfully designed spaces
          </p>
        </div>

        {/* Booking Component */}
        <div className="flex justify-center">
          <BookingComponent
            propertyName={propertyData.name}
            unitType={propertyData.unitType}
            basePriceSGD={propertyData.basePriceSGD}
            location={propertyData.location}
            maxGuests={propertyData.maxGuests}
            occupiedDates={occupiedDates}
            onBookingSubmit={onBookingSubmit}
          />
        </div>
      </div>
    </section>
  );
}
