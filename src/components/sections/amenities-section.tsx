"use client";

import type { LucideIcon } from "lucide-react";
import { useState, useEffect, useId } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Bath,
  BathIcon,
  BatteryCharging,
  BedDouble,
  BedDoubleIcon,
  Blocks,
  BookOpen,
  Brush,
  Building,
  Building2,
  Coffee,
  Dumbbell,
  LucideBrush,
  Microwave,
  ParkingCircle,
  PawPrintIcon,
  Refrigerator,
  ShieldCheck,
  Shirt,
  ShowerHeadIcon,
  Speaker,
  Sun,
  Thermometer,
  Toilet,
  Trees,
  Tv,
  Users,
  Utensils,
  WashingMachine,
  WavesLadder,
  Wifi,
  Wind,
  WindArrowDownIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Removed DialogHeader as it's not used directly for title here
import { ScrollArea } from "@/components/ui/scroll-area";

interface Amenity {
  name: string;
  icon: LucideIcon;
}

interface AmenityCategory {
  title: string;
  amenities: Amenity[];
}

const amenityCategories: AmenityCategory[] = [
  {
    title: "Amenities",
    amenities: [
      { name: "Pet-Friendly", icon: PawPrintIcon },
      { name: "Gym", icon: Dumbbell },
      { name: "Swimming Pool", icon: WavesLadder },
      { name: "Kids Playground", icon: Blocks },
      { name: "Sauna", icon: BathIcon },
      { name: "City View", icon: Building2 },
    ],
  },
  {
    title: "Bedroom",
    amenities: [
      { name: "King Bed", icon: BedDoubleIcon },
      { name: "Futon Bed (upon request)", icon: BedDouble },
    ],
  },
  {
    title: "Family",
    amenities: [
      { name: "Air Conditioning", icon: Thermometer },
      { name: "Board Games", icon: Users },
    ],
  },
  {
    title: "Entertainment",
    amenities: [
      { name: "Smart TV", icon: Tv },
      { name: "Books and Reading Material", icon: BookOpen },
    ],
  },
  {
    title: "Home Safety",
    amenities: [
      { name: "Smoke Alarm", icon: ShieldCheck },
      { name: "Carbon Monoxide Alarm", icon: ShieldCheck },
      { name: "First Aid Kit", icon: ShieldCheck },
    ],
  },
  {
    title: "Kitchen and Dining",
    amenities: [
      { name: "Refrigerator", icon: Refrigerator },
      { name: "Microwave", icon: Microwave },
      { name: "Coffee Maker", icon: Coffee },
      { name: "Dishes and Silverware", icon: Utensils },
      { name: "Cooking Basics (Pots, Pans)", icon: Utensils },
    ],
  },
  {
    title: "Bathroom",
    amenities: [
      { name: "Hot Water", icon: ShowerHeadIcon },
      { name: "Bidet", icon: Toilet },
      { name: "Hair Dryer", icon: Wind },
      { name: "Towels", icon: Shirt },
    ],
  },
  {
    title: "Internet and Office",
    amenities: [
      { name: "High-speed Wi-Fi", icon: Wifi },
      { name: "Dedicated Workspace", icon: BookOpen },
    ],
  },
  {
    title: "Utilities",
    amenities: [
      { name: "Washing Machine", icon: WashingMachine },
      { name: "Charging wall socket", icon: BatteryCharging },
      { name: "Iron & Board", icon: Shirt },
      { name: "Hangers", icon: Shirt },
    ],
  },
  {
    title: "Parking and Facilities",
    amenities: [
      { name: "Available Parking", icon: ParkingCircle },
      { name: "Elevator", icon: Users },
    ],
  },
];

const ITEMS_PREVIEW_COUNT_MOBILE = 5;

export function AmenitiesSection() {
  const [isMobileView, setIsMobileView] = useState(false);
  const isMobileHookResult = useIsMobile();
  const generatedDialogTitleId = useId();

  useEffect(() => {
    setIsMobileView(isMobileHookResult);
  }, [isMobileHookResult]);

  const allAmenities = amenityCategories.flatMap(
    (category) => category.amenities
  );

  const amenitiesToDisplayOnPage =
    isMobileView && allAmenities.length > ITEMS_PREVIEW_COUNT_MOBILE
      ? allAmenities.slice(0, ITEMS_PREVIEW_COUNT_MOBILE)
      : allAmenities;

  return (
    <section id="amenities" className="py-16 md:py-24 bg-background">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl text-center font-headline mb-8">
          Amenities
        </h2>
        <Card className="shadow-lg">
          <CardHeader className="pb-4"></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-4">
              {amenitiesToDisplayOnPage.map((amenity) => {
                const AmenityIconComponent = amenity.icon;
                return (
                  <div
                    key={amenity.name}
                    className="flex items-center text-foreground/80 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 ease-in-out"
                  >
                    <AmenityIconComponent className="mr-3 h-5 w-5 text-accent flex-shrink-0" />
                    <span>{amenity.name}</span>
                  </div>
                );
              })}
            </div>

            {isMobileView &&
              allAmenities.length > ITEMS_PREVIEW_COUNT_MOBILE && (
                <div className="mt-6 flex justify-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full sm:w-auto">
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 py-4">
                          {allAmenities.map((amenity) => {
                            const AmenityIconComponent = amenity.icon;
                            return (
                              <div
                                key={amenity.name + "-dialog"}
                                className="flex items-center text-foreground/80 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 ease-in-out"
                              >
                                <AmenityIconComponent className="mr-3 h-5 w-5 text-accent flex-shrink-0" />
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
