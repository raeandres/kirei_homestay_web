"use client";

import { SimpleBookingComponent } from "./components/simple-booking-component";

interface IntroSectionProps {
  occupiedDates?: Date[];
  onSearchRooms?: (searchData: any) => void;
}

export function IntroSection({
  occupiedDates = [],
  onSearchRooms,
}: IntroSectionProps) {
  return (
    <section
      id="intro"
      className="pt-12 md:pt-16 bg-background flex flex-col items-center justify-center"
    >
      <div className="container max-w-full mx-auto px-4 2k:px-16 4k:px-24">
        {/* Simplified Booking Component */}
        <SimpleBookingComponent
          occupiedDates={occupiedDates}
          onSearchRooms={onSearchRooms}
        />
      </div>
    </section>
  );
}
