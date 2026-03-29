"use client";

import type { LucideIcon } from "lucide-react";
import { useState, useEffect, useId } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useDevice } from "@/hooks/use-device";
import {
  BathIcon,
  BatteryCharging,
  BedDouble,
  BedDoubleIcon,
  Blocks,
  BookOpen,
  Building2,
  Coffee,
  Dumbbell,
  Microwave,
  ParkingCircle,
  PawPrintIcon,
  Refrigerator,
  ShieldCheck,
  Shirt,
  ShowerHeadIcon,
  Thermometer,
  Toilet,
  Tv,
  Users,
  Utensils,
  WashingMachine,
  WavesLadder,
  Wifi,
  Wind,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/ui/card";
import { Button } from "@/app/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/app/ui/dialog"; // Removed DialogHeader as it's not used directly for title here
import { ScrollArea } from "@/app/ui/scroll-area";
import { AmenitiesCollection } from "../data/local/amenities-collection";



const ITEMS_PREVIEW_COUNT_MOBILE = 5;

export function AmenitiesSection() {
  const amenityCategories = AmenitiesCollection.amenityCategories;
  const { isMobile } = useDevice();
  const generatedDialogTitleId = useId();

  const allAmenities = amenityCategories.flatMap(
    (category) => category.amenities
  );

  const amenitiesToDisplayOnPage =
    isMobile && allAmenities.length > ITEMS_PREVIEW_COUNT_MOBILE
      ? allAmenities.slice(0, ITEMS_PREVIEW_COUNT_MOBILE)
      : allAmenities;

  return (
    <section id="amenities" className="py-0 md:py-0 pb-8 md:pb-8 bg-background">
      <div className="container max-w-6xl 2k:max-w-full 4k:max-w-full mx-auto px-4 2k:px-16 4k:px-24">
        <h2
          className="text-2xl md:text-lg lg:text-xl 2k:text-4xl 4k:text-7xl text-stormy-blue/80 font-playfair-display"
          style={{
            letterSpacing: "0.01em",
            fontWeight: "500",
          }}
        >
          Amenities
        </h2>
        <div className="border-t border-gray-200 my-6" />
        {/* Amenities section - Single Grid */}
        <Card className="border rounded-none border-gray-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-2 gap-x-6">
              {amenitiesToDisplayOnPage.map((amenity) => {
                const AmenityIconComponent = amenity.icon;
                return (
                  <div
                    key={amenity.name}
                    className="flex items-center text-sm md:text-sm lg:text-base 2k:text-base 4k:text-lg tracking-tighter text-stormy-blue/60 font-playfair-display min-h-[28px] p-2 rounded-none hover:bg-muted/50 transition-colors duration-200 ease-in-out"
                  >
                    <AmenityIconComponent className="mr-3 h-5 w-5 text-slate-400 flex-shrink-0" />
                    <span className="leading-tight">{amenity.name}</span>
                  </div>
                );
              })}
            </div>

            {isMobile && allAmenities.length > ITEMS_PREVIEW_COUNT_MOBILE && (
              <div className="mt-6 flex justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto font-playfair-display text-base text-stormy-blue/60"
                    >
                      Show all {allAmenities.length} amenities
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    className="sm:max-w-md md:max-w-lg lg:max-w-xl"
                    aria-labelledby={generatedDialogTitleId}
                  >
                    <VisuallyHidden>
                      <DialogTitle>All Available Amenities</DialogTitle>
                    </VisuallyHidden>

                    <ScrollArea className="max-h-[60vh] pr-3 pt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 py-4">
                        {allAmenities.map((amenity) => {
                          const AmenityIconComponent = amenity.icon;
                          return (
                            <div
                              key={amenity.name + "-dialog"}
                              className="flex items-center text-sm md:text-sm lg:text-base 2k:text-base 4k:text-lg tracking-tighter text-stormy-blue/60 font-playfair-display min-h-[28px] p-2 rounded-none hover:bg-muted/50 transition-colors duration-200 ease-in-out"
                            >
                              <AmenityIconComponent className="mr-3 h-5 w-5 text-slate-400 flex-shrink-0" />
                              <span>{amenity.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
