"use client";

import { useState } from "react";
import { Button } from "@/app/ui/button";
import { Card, CardContent } from "@/app/ui/card";
import { Calendar } from "@/app/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/ui/dialog";
import { useDevice } from "@/hooks/use-device";
import { CalendarDays, Users, Search, Baby, Heart } from "lucide-react";
import { format, startOfDay } from "date-fns";

interface SimpleBookingComponentProps {
  occupiedDates?: Date[];
  onSearchRooms?: (searchData: SearchData) => void;
}

interface SearchData {
  checkIn: Date | null;
  checkOut: Date | null;
  adults: number;
  children: number;
  pets: number;
}

export function SimpleBookingComponent({
  occupiedDates = [],
  onSearchRooms,
}: SimpleBookingComponentProps) {
  const { isMobile } = useDevice();
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(0);

  // Dialog states for auto-dismiss
  const [isCheckInDialogOpen, setIsCheckInDialogOpen] = useState(false);
  const [isCheckOutDialogOpen, setIsCheckOutDialogOpen] = useState(false);
  const [isGuestsDialogOpen, setIsGuestsDialogOpen] = useState(false);

  // Create disabled dates (occupied dates + past dates)
  const disabledDates = [...occupiedDates, { before: startOfDay(new Date()) }];

  // Handlers with auto-dismiss
  const handleCheckInSelect = (date: Date | undefined) => {
    setCheckIn(date || null);
    if (date) {
      setIsCheckInDialogOpen(false);
    }
  };

  const handleCheckOutSelect = (date: Date | undefined) => {
    setCheckOut(date || null);
    if (date) {
      setIsCheckOutDialogOpen(false);
    }
  };

  const handleSearchRooms = () => {
    if (onSearchRooms) {
      onSearchRooms({
        checkIn,
        checkOut,
        adults,
        children,
        pets,
      });
    }
  };

  const totalGuests = adults + children + pets;

  return (
    <Card className="w-full max-w-full mx-auto shadow-none border border-gray-200 rounded-none">
      <CardContent className="p-6">
        {/* 1. Title and Subtitle */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl 2k:text-xl font-playfair-display text-stormy-blue/80 font-light mb-2">
            Check available rooms
          </h2>
          {/* <p className="text-sm md:text-base text-stormy-blue/60 font-playfair-display">
            Experience slow intentional living at our thoughtfully designed
            spaces
          </p> */}
        </div>

        {/* Booking Controls */}
        <div
          className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-4"}`}
        >
          {/* 1. Title and Subtitle */}
          {/* <div className="text-center mb-2">
            <h2 className="text-2xl md:text-3xl 2k:text-xl font-playfair-display text-stormy-blue/80 font-light mb-2">
              Check our available rooms
            </h2> */}
          {/* <p className="text-sm md:text-base 2k:text-sm  text-stormy-blue/60 font-playfair-display"> */}
          {/* Experience slow intentional living at our thoughtfully designed
            spaces */}
          {/* Accomodation Guaranteed */}
          {/* </p> */}
          {/* </div> */}
          {/* 2. Check-in Calendar Button */}
          <Dialog
            open={isCheckInDialogOpen}
            onOpenChange={setIsCheckInDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="h-16 flex flex-col items-start justify-center p-4 rounded-none border-gray-200 hover:bg-muted/50"
              >
                <div className="flex items-center gap-2 mb-1">
                  <CalendarDays className="h-4 w-4 text-stormy-blue/60" />
                  <span className="text-xs font-playfair-display text-stormy-blue/60">
                    Check-in
                  </span>
                </div>
                <span className="text-sm font-playfair-display text-stormy-blue/80">
                  {checkIn ? format(checkIn, "MMM dd, yyyy") : "Select date"}
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="font-playfair-display text-stormy-blue/80 text-center">
                  Select Check-in Date
                </DialogTitle>
              </DialogHeader>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={checkIn || undefined}
                  onSelect={handleCheckInSelect}
                  disabled={disabledDates}
                  className="w-full flex justify-center"
                  classNames={{
                    day_selected: "bg-primary text-primary-foreground",
                    day_disabled:
                      "text-muted-foreground opacity-50 line-through",
                  }}
                />
              </div>
            </DialogContent>
          </Dialog>

          {/* 3. Check-out Calendar Button */}
          <Dialog
            open={isCheckOutDialogOpen}
            onOpenChange={setIsCheckOutDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="h-16 flex flex-col items-start justify-center p-4 rounded-none border-gray-200 hover:bg-muted/50"
              >
                <div className="flex items-center gap-2 mb-1">
                  <CalendarDays className="h-4 w-4 text-stormy-blue/60" />
                  <span className="text-xs font-playfair-display text-stormy-blue/60">
                    Check-out
                  </span>
                </div>
                <span className="text-sm font-playfair-display text-stormy-blue/80">
                  {checkOut ? format(checkOut, "MMM dd, yyyy") : "Select date"}
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="font-playfair-display text-stormy-blue/80 text-center">
                  Select Check-out Date
                </DialogTitle>
              </DialogHeader>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={checkOut || undefined}
                  onSelect={handleCheckOutSelect}
                  disabled={[
                    ...disabledDates,
                    ...(checkIn ? [{ before: checkIn }] : []),
                  ]}
                  className="w-full flex justify-center"
                  classNames={{
                    day_selected: "bg-primary text-primary-foreground",
                    day_disabled:
                      "text-muted-foreground opacity-50 line-through",
                  }}
                />
              </div>
            </DialogContent>
          </Dialog>

          {/* 4. Guests Button */}
          <Dialog
            open={isGuestsDialogOpen}
            onOpenChange={setIsGuestsDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="h-16 flex flex-col items-start justify-center p-4 rounded-none border-gray-200 hover:bg-muted/50"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-stormy-blue/60" />
                  <span className="text-xs font-playfair-display text-stormy-blue/60">
                    Guests
                  </span>
                </div>
                <span className="text-sm font-playfair-display text-stormy-blue/80">
                  {totalGuests} guest{totalGuests !== 1 ? "s" : ""}
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="font-playfair-display text-stormy-blue/80 text-center">
                  Select Guests
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {/* Adults */}
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-none">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-stormy-blue/60" />
                    <div>
                      <span className="text-sm font-playfair-display text-stormy-blue/80">
                        Adults
                      </span>
                      <p className="text-xs text-stormy-blue/50">Ages 13+</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      disabled={adults <= 1}
                      className="h-8 w-8 p-0 rounded-none"
                    >
                      -
                    </Button>
                    <span className="text-sm font-playfair-display text-stormy-blue/80 min-w-[20px] text-center">
                      {adults}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAdults(Math.min(8, adults + 1))}
                      disabled={adults >= 8}
                      className="h-8 w-8 p-0 rounded-none"
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-none">
                  <div className="flex items-center gap-2">
                    <Baby className="h-4 w-4 text-stormy-blue/60" />
                    <div>
                      <span className="text-sm font-playfair-display text-stormy-blue/80">
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
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-none">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-stormy-blue/60" />
                    <div>
                      <span className="text-sm font-playfair-display text-stormy-blue/80">
                        Pets
                      </span>
                      <p className="text-xs text-stormy-blue/50">
                        Pet-friendly
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
              </div>
            </DialogContent>
          </Dialog>

          {/* 5. Find Room Button */}
          <Button
            onClick={handleSearchRooms}
            className="h-16 bg-primary hover:bg-primary/90 text-primary-foreground rounded-none font-playfair-display"
          >
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Find Room
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
