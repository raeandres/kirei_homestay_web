"use client";

import type { LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
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
import { AmenitiesCard } from "./components/amenities-card";

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

  useEffect(() => {
    setIsMobileView(isMobileHookResult);
  }, [isMobileHookResult]);

  const allAmenities = amenityCategories.flatMap(
    (category) => category.amenities
  );

  return (
    <section id="amenities" className="py-8 md:py-24 bg-background">
      <div className="container max-w-6xl mx-auto px-4">
        <h2
          className={
            isMobileHookResult
              ? "text-lg md:text-xl text-left font-headline mb-8 tracking-wide"
              : "text-lg md:text-xl text-center text-justify-center font-headline tracking-wide mb-8"
          }
        >
          AMENITIES
        </h2>
        {/* Amenities section */}
        <AmenitiesCard
          amenities={allAmenities}
          isMobileView={isMobileView}
          previewCount={ITEMS_PREVIEW_COUNT_MOBILE}
        />
      </div>
    </section>
  );
}
