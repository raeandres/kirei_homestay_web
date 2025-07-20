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
      <h4
        className="text-2xl md:text-2xl xl:text-3xl 2k:text-2xl 4k:text-7xl text-stormy-blue/60 font-playfair-display mb-4 font-light"
        style={
          isMobile
            ? {
                lineHeight: "1",
                letterSpacing: "0.01em",
              }
            : {
                lineHeight: "1.3",
                letterSpacing: "0.01em",
              }
        }
      >
        {isMobile ? "Availability" : ""}
      </h4>

      <div className="space-y-1">
        <div className="w-full max-w-none">
          <Calendar
            mode="single"
            selected={date}
            // onSelect={setDate}
            showOutsideDays={false}
            className="h-full w-full font-playfair-display max-w-none border [&_.rdp]:w-full [&_.rdp-table]:w-full [&_.rdp-cell]:p-0 [&_.rdp-day]:w-full [&_.rdp-day]:h-8 flex justify-center"
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
          <p
            className="text-base md:text-xs lg:text-sm xl:text-base 2k:text-base text-center 4k:text-xl font-playfair-display text-stormy-blue/80 font-normal leading-relaxed mb-1"
            style={
              isMobile
                ? {
                    lineHeight: "1.3",
                    letterSpacing: "0.01em",
                  }
                : {
                    lineHeight: "1.5",
                    letterSpacing: "0.05em",
                  }
            }
          >
            Check our availability and book your stay on your favorite platform.
          </p>
          <div className="id airbnb-button content-center text-center mt-1 mb-1">
            <Button
              asChild
              className="text-lg rounded-none w-full sm:mx-2 md:mx-2 lg:mx-4 xl:mx-4 2k:mx-4 4k:mx-4 bg-stormy-blue/80 font-playfair-display"
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
              className="text-lg rounded-none w-full sm:mx-2 md:mx-2 lg:mx-4 xl:mx-4 2k:mx-4 4k:mx-4 bg-stormy-blue/80 font-playfair-display"
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
          <h3 className="text-2xl font-normal text-center font-playfair-display">
            {" "}
            or{" "}
          </h3>
          <div className="id contact-host-button content-center text-center mt-1 mb-1">
            {/* Contact Host Button */}
            <Button
              onClick={onContactHostClick}
              className="text-lg rounded-none w-full sm:mx-2 md:mx-2 lg:mx-4 xl:mx-4 2k:mx-4 4k:mx-4 bg-stormy-blue/80 font-playfair-display"
            >
              Message us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
