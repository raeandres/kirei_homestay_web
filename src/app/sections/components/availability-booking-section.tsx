"use client";

import Link from "next/link";
import { type DayPickerProps } from "react-day-picker";
import { Button } from "@/app/ui/button";
import { Calendar } from "@/app/ui/calendar";
import { Home, Briefcase, MessageSquare } from "lucide-react";

interface BookingLinks {
  airbnb: string;
  booking: string;
}

interface AvailabilityBookingSectionProps {
  isMobile: boolean;
  date: Date | undefined;
  isLoadingCalendar: boolean;
  disabledDates: DayPickerProps["disabled"];
  activeBookingLinks: BookingLinks;
  onContactHostClick: () => void;
}

export function AvailabilityBookingSection({
  isMobile,
  date,
  isLoadingCalendar,
  disabledDates,
  activeBookingLinks,
  onContactHostClick,
}: AvailabilityBookingSectionProps) {
  return (
    <div className="sticky top-4 space-y-4 bg-background/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg z-10">
      <h2
        className={
          isMobile
            ? "text-sm md:text-md flex font-normal md:font-normal justify-left font-headline mb-4"
            : "text-sm md:text-md flex font-normal md:font-normal justify-center font-headline mb-4"
        }
      >
        AVAILABILITY
      </h2>

      <div className="space-y-6">
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            // onSelect={setDate}
            className="rounded-md border"
            disabled={isLoadingCalendar ? true : disabledDates}
            footer={
              isLoadingCalendar ? (
                <p className="text-center text-sm text-muted-foreground p-2">
                  Loading calendar...
                </p>
              ) : (
                ""
              )
            }
          />
        </div>
        <div className="flex flex-col justify-center space-y-4 pt-0 md:pt-0">
          <p className="text-sm text-left px-10 md:text-left pb-2 font-normal">
            Check our availability and book your stay on your favorite platform.
          </p>
          <Button asChild className="w-full" size="lg">
            <Link
              href={activeBookingLinks.airbnb}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Home className="mr-2 h-5 w-5" />
              Book on Airbnb
            </Link>
          </Button>
          <Button asChild className="w-full" size="lg" variant="secondary">
            <Link
              href={activeBookingLinks.booking}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Briefcase className="mr-2 h-5 w-5" />
              Book on Booking.com
            </Link>
          </Button>

          {/* Contact Host Button */}
          <Button
            onClick={onContactHostClick}
            className="w-full"
            size="lg"
            variant="outline"
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Contact Host
          </Button>
        </div>
      </div>
    </div>
  );
}
