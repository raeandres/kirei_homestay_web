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
    <div className="space-y-4">
      <h2
        className={
          isMobile
            ? "text-sm md:text-md flex font-normal md:font-normal justify-left font-headline mb-4"
            : "text-sm md:text-md flex font-normal md:font-normal justify-center font-headline mb-4"
        }
      >
        AVAILABILITY
      </h2>

      <div className="space-y-1">
        <div className="w-full max-w-none">
          <Calendar
            mode="single"
            selected={date}
            // onSelect={setDate}
            className="w-full max-w-none rounded-md border [&_.rdp]:w-full [&_.rdp-table]:w-full [&_.rdp-cell]:p-0 [&_.rdp-day]:w-full [&_.rdp-day]:h-8 flex justify-center"
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
        <div className="flex flex-col justify-left pt-0 md:pt-0">
          <p className="text-sm md:text-sm text-left px-2 md:text-left my-2 font-normal">
            Check our availability and book your stay on your favorite platform.
          </p>
          <div className="id airbnb-button mt-1 mb-1">
            <Button
              asChild
              className="w-full border border-spacing-safe bg-white hover:bg-zinc-600 hover:text-white"
            >
              <Link
                href={activeBookingLinks.airbnb}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book on Airbnb
              </Link>
            </Button>
          </div>

          <div className="id booking-dot-com-button mt-1 mb-1">
            <Button
              asChild
              className="w-full border border-spacing-safe bg-white hover:bg-zinc-600 hover:text-white"
            >
              <Link
                href={activeBookingLinks.booking}
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Book on Booking.com
              </Link>
            </Button>
          </div>
          <h3 className="id or text-md md:text-md font-normal text-center">
            {" "}
            OR{" "}
          </h3>

          <div className="id contact-host-button mt-1 mb-1">
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
    </div>
  );
}
