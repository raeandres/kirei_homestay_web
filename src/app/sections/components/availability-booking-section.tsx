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
            : "text-lg md:text-lg lg:text-xl 2k:text-xl 4k:text-3xl tracking-tight text-stormy-blue text-center text-muted-foreground"
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
            showOutsideDays={false}
            className="h-full w-full max-w-none border [&_.rdp]:w-full [&_.rdp-table]:w-full [&_.rdp-cell]:p-0 [&_.rdp-day]:w-full [&_.rdp-day]:h-8 flex justify-center"
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
        <div className="flex flex-col justify-center pt-0 md:pt-0">
          <p className="text-sm md:text-sm text-center px-2 md:text-cemter my-2 font-normal">
            Check our availability and book your stay on your favorite platform.
          </p>
          <div className="id airbnb-button content-center text-center mt-1 mb-1">
            <Button
              asChild
              className="rounded-none w-full sm:mx-2 md:mx-2 lg:mx-4 xl:mx-4 2k:mx-4 4k:mx-4 bg-stormy-blue/80"
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

          <div className="id booking-dot-com-button content-center text-center mt-1 mb-1">
            <Button
              asChild
              className="rounded-none w-full sm:mx-2 md:mx-2 lg:mx-4 xl:mx-4 2k:mx-4 4k:mx-4 bg-stormy-blue/80"
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
          <h3 className="text-base font-normal text-center"> OR </h3>
          <div className="id contact-host-button content-center text-center mt-1 mb-1">
            {/* Contact Host Button */}
            <Button
              onClick={onContactHostClick}
              className="rounded-none w-full sm:mx-2 md:mx-2 lg:mx-4 xl:mx-4 2k:mx-4 4k:mx-4 bg-stormy-blue/80"
            >
              Message us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
