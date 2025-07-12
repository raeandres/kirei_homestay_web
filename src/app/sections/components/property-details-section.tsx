"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/ui/button";
import { CardDescription, Card, CardContent } from "@/app/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { AmenitiesCard } from "./amenities-card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/ui/sheet";
import { ScrollArea } from "@/app/ui/scroll-area";
import type { LucideIcon } from "lucide-react";
import {
  BathIcon,
  BatteryCharging,
  BedDouble,
  BedDoubleIcon,
  Blocks,
  BookOpen,
  Building2,
  Check,
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
import { MapSection } from "./property-location/map-section";

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

// Amenity interface for the card
interface Amenity {
  name: string;
  icon: LucideIcon;
}

// Function to map amenity names to icons
const getAmenityIcon = (amenityName: string): LucideIcon => {
  const name = amenityName.toLowerCase().trim();

  // Map common amenity names to icons
  if (name.includes("pet") || name.includes("dog") || name.includes("cat"))
    return Check;
  if (name.includes("gym") || name.includes("fitness")) return Check;
  if (name.includes("pool") || name.includes("swimming")) return Check;
  if (name.includes("playground") || name.includes("kids")) return Check;
  if (name.includes("sauna") || name.includes("spa")) return Check;
  if (name.includes("view") || name.includes("city")) return Check;
  if (name.includes("bed") && name.includes("king")) return Check;
  if (name.includes("bed") || name.includes("futon")) return Check;
  if (
    name.includes("air conditioning") ||
    name.includes("ac") ||
    name.includes("cooling")
  )
    return Check;
  if (name.includes("game") || name.includes("board")) return Check;
  if (name.includes("tv") || name.includes("television")) return Check;
  if (name.includes("book") || name.includes("reading")) return Check;
  if (
    name.includes("smoke") ||
    name.includes("alarm") ||
    name.includes("safety")
  )
    return ShieldCheck;
  if (name.includes("refrigerator") || name.includes("fridge"))
    return Refrigerator;
  if (name.includes("microwave")) return Check;
  if (name.includes("coffee")) return Check;
  if (
    name.includes("dishes") ||
    name.includes("utensils") ||
    name.includes("silverware")
  )
    return Utensils;
  if (
    name.includes("cooking") ||
    name.includes("pots") ||
    name.includes("pans")
  )
    return Utensils;
  if (name.includes("hot water") || name.includes("shower"))
    return ShowerHeadIcon;
  if (name.includes("bidet") || name.includes("toilet")) return Check;
  if (name.includes("hair dryer") || name.includes("dryer")) return Check;
  if (name.includes("towel")) return Shirt;
  if (name.includes("wifi") || name.includes("internet")) return Check;
  if (name.includes("workspace") || name.includes("desk")) return Check;
  if (name.includes("washing machine") || name.includes("laundry"))
    return WashingMachine;
  if (
    name.includes("charging") ||
    name.includes("socket") ||
    name.includes("power")
  )
    return BatteryCharging;
  if (name.includes("iron") || name.includes("hangers")) return Check;
  if (name.includes("parking")) return Check;
  if (name.includes("elevator")) return Check;

  // Default icon for unmatched amenities
  return Check;
};

// Function to convert string amenities to Amenity objects
const mapStringAmenitiesToAmenities = (
  stringAmenities: string[]
): Amenity[] => {
  return stringAmenities
    .filter((amenity) => amenity.trim() !== "")
    .map((amenity) => ({
      name: amenity.trim().replace(/^[•\-\s]+/, ""), // Remove bullet points and leading spaces/dashes
      icon: getAmenityIcon(amenity),
    }));
};

interface CardContent {
  location: string;
  guests: string;
  bedrooms: string;
  beds: string;
  bathrooms: string;
  basePriceSGD: number;
  reviews: string;
  stars: number;
}

interface GalleryContent {
  teaserDescription1: string;
  teaserDescription2: string;
  propertyDetailsTitle: string;
  propertyDescription: string;
  spaceDescription: string;
  guestsPreferenceList: string[];
  guestsPreferenceFooterNote: string;
  guestsAmenities: string[];
  guestsAccessSubtitle: string;
  guestsAccessList: string[];
  importantNotesList: string[];
  otherNotesDescription: string;
  amenityFeesDescription: string;
  amenityFeeItems: string[];
}

interface PropertyDetailsSectionProps {
  name: string;
  unitType: string;
  cardContent: CardContent;
  galleryContent: GalleryContent;
  activeMapUrl: string;
  onShowMoreClick: () => void;
  onShowAmenitiesClick?: () => void;
}

export function PropertyDetailsSection({
  name,
  unitType,
  cardContent,
  galleryContent,
  activeMapUrl,
  onShowMoreClick,
  onShowAmenitiesClick,
}: PropertyDetailsSectionProps) {
  const [isMobileView, setIsMobileView] = useState(false);
  const isMobileHookResult = useIsMobile();

  useEffect(() => {
    setIsMobileView(isMobileHookResult);
  }, [isMobileHookResult]);

  // Convert string amenities to Amenity objects with icons
  const amenitiesWithIcons = mapStringAmenitiesToAmenities(
    galleryContent.guestsAmenities
  );
  const previewAmenities = amenitiesWithIcons.slice(0, 5);

  return (
    <div className="id property-details-section space-y-8">
      <div className="id property-details-info">
        <CardDescription className="text-sm text-muted-foreground">
          <h3 className="text-xl md:text-2xl font-normal mb-4">{name}</h3>
          <div className="text-sm font-medium text-muted-foreground">
            {cardContent.location}
          </div>
        </CardDescription>

        <div className="text-sm font-medium text-muted-foreground">
          {cardContent.guests} • {cardContent.bedrooms} • {cardContent.beds} •{" "}
          {cardContent.bathrooms}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6" />

        {/* Property Description - Truncated */}
        <div className="space-y-4 text-sm pb-4 text-muted-foreground">
          <p className="section: teaser-description1 leading-relaxed">
            {galleryContent.teaserDescription1}
          </p>

          <p className="section: teaser-description2 leading-relaxed">
            {galleryContent.teaserDescription2}
          </p>

          <Button
            variant="outline"
            size="sm"
            onClick={onShowMoreClick}
            className="mt-4"
          >
            Show more
          </Button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6" />

      {/* Amenities Teaser */}
      {amenitiesWithIcons.length > 0 && (
        <div className="id amenities-teaser-section">
          <h4 className="text-lg font-medium mb-4">
            IN-UNIT FEATURES & AMENITIES
          </h4>

          {/* Amenities Preview Box */}
          <Card className=" border border-gray-200 mb-6 md:mb-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 gap-2">
                {previewAmenities.map((amenity, index) => {
                  const AmenityIconComponent = amenity.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center text-xs md:text-sm lg:text-sm tracking-tight text-gray-600 font-normal"
                    >
                      <AmenityIconComponent className="mr-3 h-4 w-4 text-accent flex-shrink-0" />
                      <span>{amenity.name}</span>
                    </div>
                  );
                })}
              </div>

              {/* Show More Sheet */}
              {amenitiesWithIcons.length > 5 && (
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="mt-4 text-sm font-medium text-foreground underline hover:no-underline cursor-pointer">
                      Show all {amenitiesWithIcons.length} amenities
                    </button>
                  </SheetTrigger>
                  <SheetContent
                    side="bottom"
                    className="h-[85vh] overflow-y-auto md:mx-64 rounded-t-lg"
                  >
                    <div className="p-6">
                      <SheetHeader>
                        <SheetTitle className="sm:text-lg md:text-lg lg:text-lg font-medium mb-6">
                          What this place offers
                        </SheetTitle>
                      </SheetHeader>

                      <ScrollArea className="max-h-[500vh] pr-4">
                        <div className="space-y-6">
                          {amenityCategories.map((category) => (
                            <div key={category.title} className="space-y-3">
                              <h4 className="text-base font-semibold text-foreground border-b border-gray-200 pb-2">
                                {category.title}
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                                {category.amenities.map((amenity) => {
                                  const AmenityIconComponent = amenity.icon;
                                  return (
                                    <div
                                      key={amenity.name}
                                      className="flex items-center text-sm text-gray-600 font-normal min-h-[24px]"
                                    >
                                      <AmenityIconComponent className="mr-3 h-4 w-4 text-accent flex-shrink-0" />
                                      <span className="leading-tight">
                                        {amenity.name}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </SheetContent>
                </Sheet>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Maps section */}
      {/* <div className="id gallery-map-section">
        <h2 className="text-sm md:text-md flex font-normal md:font-normal justify-left font-headline mb-4">
          LOCATION
        </h2>
        <div className="id gallery-map ">
          <MapSection mapEmbedUrl={activeMapUrl} />
        </div>
      </div> */}
    </div>
  );
}
