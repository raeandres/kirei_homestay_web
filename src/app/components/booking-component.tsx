"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/ui/card";
import { Calendar } from "@/app/ui/calendar";
import { useDevice } from "@/hooks/use-device";
import {
  CalendarDays,
  Users,
  Baby,
  Heart,
  MapPin,
  AlertCircle,
  CheckCircle,
  Clock,
  CreditCard,
  QrCode,
} from "lucide-react";
import { format, startOfDay } from "date-fns";
import type { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Badge } from "@/app/ui/badge";
import { Separator } from "@/app/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/app/ui/radio-group";
import { Label } from "@/app/ui/label";

interface BookingComponentProps {
  propertyName: string;
  unitType: string;
  basePriceSGD: number;
  location: string;
  maxGuests: number;
  occupiedDates?: Date[];
  onBookingSubmit?: (bookingData: BookingData) => void;
}

interface BookingData {
  checkIn: Date;
  checkOut: Date;
  guests: number;
  children: number;
  pets: number;
  totalNights: number;
  totalPrice: number;
  paymentMethod: "card" | "qr";
}

export function BookingComponent({
  propertyName,
  unitType,
  basePriceSGD,
  location,
  maxGuests = 4,
  occupiedDates = [],
  onBookingSubmit,
}: BookingComponentProps) {
  const { isMobile } = useDevice();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(1);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "qr">("card");
  const [isBookingValid, setIsBookingValid] = useState(false);
  const [totalNights, setTotalNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Create disabled dates (occupied dates + past dates)
  const disabledDates = [
    ...occupiedDates,
    // Disable past dates
    { before: startOfDay(new Date()) },
  ];

  // Calculate booking details when date range changes
  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      const nights = Math.ceil(
        (dateRange.to.getTime() - dateRange.from.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      setTotalNights(nights);
      setTotalPrice(nights * basePriceSGD);
      setIsBookingValid(nights > 0);
    } else {
      setTotalNights(0);
      setTotalPrice(0);
      setIsBookingValid(false);
    }
  }, [dateRange, basePriceSGD]);

  const handleBookingSubmit = () => {
    if (dateRange?.from && dateRange?.to && isBookingValid && onBookingSubmit) {
      const bookingData: BookingData = {
        checkIn: dateRange.from,
        checkOut: dateRange.to,
        guests,
        children,
        pets,
        totalNights,
        totalPrice,
        paymentMethod,
      };
      onBookingSubmit(bookingData);
    }
  };

  return (
    <div className={`w-full mx-auto ${isMobile ? "max-w-md" : "max-w-7xl"}`}>
      <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-3"}`}>
        {/* First Section - Calendar */}
        <Card className="shadow-lg border border-gray-200 rounded-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-playfair-display text-stormy-blue/80 flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Select Dates
            </CardTitle>
            <div className="space-y-1">
              <p className="text-xs text-stormy-blue/60 font-playfair-display">
                {propertyName}
              </p>
              <p className="text-xs text-stormy-blue/50 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {location}
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {/* Calendar */}
            <div className="space-y-3">
              <div className="border border-gray-200 rounded-none overflow-hidden">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  disabled={disabledDates}
                  numberOfMonths={1}
                  className="w-full [&_.rdp]:w-full [&_.rdp-table]:w-full [&_.rdp-cell]:p-0.5 [&_.rdp-day]:w-full [&_.rdp-day]:h-7"
                  classNames={{
                    day_selected: "bg-primary text-primary-foreground",
                    day_disabled:
                      "text-muted-foreground opacity-50 line-through",
                    day_range_middle: "bg-primary/20",
                    month: "w-full",
                    table: "w-full border-collapse",
                    head_row: "flex w-full",
                    head_cell:
                      "flex-1 text-center text-xs font-medium text-stormy-blue/60 p-1",
                    row: "flex w-full",
                    cell: "flex-1 text-center p-0",
                    day: "w-full h-7 text-xs hover:bg-muted/50 flex items-center justify-center",
                  }}
                />
              </div>

              {/* Date Display */}
              {dateRange?.from && (
                <div className="flex items-center justify-between text-xs bg-muted/30 p-2 rounded-none">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-stormy-blue/60" />
                    <span className="font-playfair-display text-stormy-blue/80">
                      {format(dateRange.from, "MMM dd")} -{" "}
                      {dateRange.to
                        ? format(dateRange.to, "MMM dd")
                        : "Select end date"}
                    </span>
                  </div>
                  {totalNights > 0 && (
                    <Badge variant="secondary" className="rounded-none text-xs">
                      {totalNights} night{totalNights > 1 ? "s" : ""}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Second Section - Guest Details */}
        <Card className="shadow-lg border border-gray-200 rounded-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-playfair-display text-stormy-blue/80 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Guest Details
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {/* Guests Selection */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-stormy-blue/80 font-playfair-display">
                Guests
              </Label>
              {/* Adults */}
              <div className="flex items-center justify-between border border-gray-200 rounded-none p-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-stormy-blue/60" />
                  <div>
                    <span className="text-xs font-playfair-display text-stormy-blue/80">
                      Adults
                    </span>
                    <p className="text-xs text-stormy-blue/50">Ages 13+</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    disabled={guests <= 1}
                    className="h-8 w-8 p-0 rounded-none"
                  >
                    -
                  </Button>
                  <span className="text-sm font-playfair-display text-stormy-blue/80 min-w-[20px] text-center">
                    {guests}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setGuests(Math.min(maxGuests, guests + 1))}
                    disabled={guests >= maxGuests}
                    className="h-8 w-8 p-0 rounded-none"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between border border-gray-200 rounded-none p-2">
                <div className="flex items-center gap-2">
                  <Baby className="h-4 w-4 text-stormy-blue/60" />
                  <div>
                    <span className="text-xs font-playfair-display text-stormy-blue/80">
                      Children
                    </span>
                    <p className="text-xs text-stormy-blue/50">Ages 2-12</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    disabled={children <= 0}
                    className="h-8 w-8 p-0 rounded-none"
                  >
                    -
                  </Button>
                  <span className="text-sm font-playfair-display text-stormy-blue/80 min-w-[20px] text-center">
                    {children}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setChildren(Math.min(4, children + 1))}
                    disabled={children >= 4}
                    className="h-8 w-8 p-0 rounded-none"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Pets */}
              <div className="flex items-center justify-between border border-gray-200 rounded-none p-2">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-stormy-blue/60" />
                  <div>
                    <span className="text-xs font-playfair-display text-stormy-blue/80">
                      Pets
                    </span>
                    <p className="text-xs text-stormy-blue/50">
                      Pet-friendly property
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPets(Math.max(0, pets - 1))}
                    disabled={pets <= 0}
                    className="h-8 w-8 p-0 rounded-none"
                  >
                    -
                  </Button>
                  <span className="text-sm font-playfair-display text-stormy-blue/80 min-w-[20px] text-center">
                    {pets}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPets(Math.min(2, pets + 1))}
                    disabled={pets >= 2}
                    className="h-8 w-8 p-0 rounded-none"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Guest Summary */}
              {(guests > 0 || children > 0 || pets > 0) && (
                <div className="text-xs text-stormy-blue/60 font-playfair-display bg-muted/30 p-2 rounded-none">
                  Total: {guests} adult{guests > 1 ? "s" : ""}
                  {children > 0 &&
                    `, ${children} child${children > 1 ? "ren" : ""}`}
                  {pets > 0 && `, ${pets} pet${pets > 1 ? "s" : ""}`}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Third Section - Payment & Booking */}
        <Card className="shadow-lg border border-gray-200 rounded-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-playfair-display text-stormy-blue/80 flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment & Booking
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {/* Payment Method Selection */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-stormy-blue/80 font-playfair-display">
                Payment Method
              </Label>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) =>
                  setPaymentMethod(value as "card" | "qr")
                }
                className="space-y-1"
              >
                <div className="flex items-center space-x-2 border border-gray-200 rounded-none p-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label
                    htmlFor="card"
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    <CreditCard className="h-3 w-3 text-stormy-blue/60" />
                    <div>
                      <p className="text-xs font-playfair-display text-stormy-blue/80">
                        Online Payment
                      </p>
                      <p className="text-xs text-stormy-blue/50">
                        Credit/debit card
                      </p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border border-gray-200 rounded-none p-2">
                  <RadioGroupItem value="qr" id="qr" />
                  <Label
                    htmlFor="qr"
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    <QrCode className="h-3 w-3 text-stormy-blue/60" />
                    <div>
                      <p className="text-xs font-playfair-display text-stormy-blue/80">
                        Local Payment (QR)
                      </p>
                      <p className="text-xs text-stormy-blue/50">
                        QR code transfer
                      </p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Price Summary */}
            {totalNights > 0 && (
              <div className="space-y-2">
                <Separator />
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-playfair-display text-stormy-blue/60">
                      ${basePriceSGD} × {totalNights} night
                      {totalNights > 1 ? "s" : ""}
                    </span>
                    <span className="font-playfair-display text-stormy-blue/80">
                      ${totalPrice}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="font-playfair-display text-stormy-blue/80">
                      Total
                    </span>
                    <span className="font-playfair-display text-stormy-blue/80">
                      ${totalPrice} SGD
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Booking Button */}
            <Button
              onClick={handleBookingSubmit}
              disabled={!isBookingValid}
              className={cn(
                "w-full rounded-none font-playfair-display",
                isBookingValid
                  ? "bg-primary hover:bg-primary/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              {isBookingValid ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Reserve Now
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Select dates to book
                </div>
              )}
            </Button>

            {/* Booking Notice */}
            <div className="text-xs text-stormy-blue/50 text-center font-playfair-display">
              You won't be charged yet. Review your booking details before final
              confirmation.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
