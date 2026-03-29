"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { type DayPickerProps } from "react-day-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/app/ui/button";
import { Card, CardContent, CardDescription } from "@/app/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/app/ui/sheet";

import { RatingStars } from "@/app/ui/rating-stars";
import { ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
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
import { getBookedDates } from "@/app/actions/get-booked-dates";
import { cn } from "@/lib/utils";
import { useDevice } from "@/hooks/use-device";
import { useCurrency } from "@/lib/currency";
import {
  contactFormSchema,
  ContactFormData,
  handleContactFormSubmit,
} from "@/lib/contact-form";
import { useToast } from "@/hooks/use-toast";
import { PropertyDescriptionSheet } from "@/app/components/property-description-component";
import { FullScreenImageSheet } from "@/app/components/full-screen-image-sheet-component";
import { GridViewSheet } from "@/app/components/grid-view-sheet-component";
import { ContactHostModal } from "@/app/components/contact-host-modal-component";
import { MapSection } from "@/app/components/property-location/property-location-map-component";
import { AvailabilityBookingSection } from "@/app/sections/availability-booking-section";
import { PropertyDetailsSection } from "@/app/components/property-details-component";
import { AmenitiesCard } from "@/app/components/amenities-card-component";
import { Footer } from "@/app/layout/footer";
import { GalleryCollection } from "../data/local/gallery-collection";

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
    return PawPrintIcon;
  if (name.includes("gym") || name.includes("fitness")) return Dumbbell;
  if (name.includes("pool") || name.includes("swimming")) return WavesLadder;
  if (name.includes("playground") || name.includes("kids")) return Blocks;
  if (name.includes("sauna") || name.includes("spa")) return BathIcon;
  if (name.includes("view") || name.includes("city")) return Building2;
  if (name.includes("bed") && name.includes("king")) return BedDoubleIcon;
  if (name.includes("bed") || name.includes("futon")) return BedDouble;
  if (
    name.includes("air conditioning") ||
    name.includes("ac") ||
    name.includes("cooling")
  )
    return Thermometer;
  if (name.includes("game") || name.includes("board")) return Users;
  if (name.includes("tv") || name.includes("television")) return Tv;
  if (name.includes("book") || name.includes("reading")) return BookOpen;
  if (
    name.includes("smoke") ||
    name.includes("alarm") ||
    name.includes("safety")
  )
    return ShieldCheck;
  if (name.includes("refrigerator") || name.includes("fridge"))
    return Refrigerator;
  if (name.includes("microwave")) return Microwave;
  if (name.includes("coffee")) return Coffee;
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
  if (name.includes("bidet") || name.includes("toilet")) return Toilet;
  if (name.includes("hair dryer") || name.includes("dryer")) return Wind;
  if (name.includes("towel")) return Shirt;
  if (name.includes("wifi") || name.includes("internet")) return Wifi;
  if (name.includes("workspace") || name.includes("desk")) return BookOpen;
  if (name.includes("washing machine") || name.includes("laundry"))
    return WashingMachine;
  if (
    name.includes("charging") ||
    name.includes("socket") ||
    name.includes("power")
  )
    return BatteryCharging;
  if (name.includes("iron") || name.includes("hangers")) return Shirt;
  if (name.includes("parking")) return ParkingCircle;
  if (name.includes("elevator")) return Users;

  // Default icon for unmatched amenities
  return ShieldCheck;
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

interface CardContent {
  location: string;
  guests: string;
  bedrooms: string;
  beds: string;
  bathrooms: string;
  basePriceSGD: number; // Base price in SGD for conversion
  reviews: string;
  stars: number;
}

interface GalleryImage {
  src: string;
  alt: string;
  hint: string;
}

interface CalendarSource {
  platform: string;
  url: string;
}

interface GalleryCategory {
  name: string;
  unitType: string;
  coverImage: GalleryImage;
  galleryContent: GalleryContent;
  cardContent: CardContent;
  images: GalleryImage[];
  bookingLinks: {
    airbnb: string;
    booking: string;
  };
  icsUrls: CalendarSource[];
  activeMapUrl: string;
}


interface GallerySectionProps {
  availableRooms?: string[] | undefined;
}

export function GallerySection({ availableRooms }: GallerySectionProps) {
  const galleryItems = GalleryCollection.galleryItems;

  const [isFullScreenViewOpen, setIsFullScreenViewOpen] = useState(false);
  const [isGridViewOpen, setIsGridViewOpen] = useState(false);
  const [isFullScreenImageOpen, setIsFullScreenImageOpen] = useState(false);
  const [activeGalleryImages, setActiveGalleryImages] = useState<
    GalleryImage[] | null
  >(null);
  const [activeGalleryCategoryName, setActiveGalleryCategoryName] = useState<
    string | null
  >(null);
  const [activeBookingLinks, setActiveBookingLinks] = useState<{
    airbnb: string;
    booking: string;
  } | null>(null);
  const [activeIcsUrls, setActiveIcsUrls] = useState<CalendarSource[] | null>(
    null
  );
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Property description state
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Amenities sheet state
  const [isAmenitiesExpanded, setIsAmenitiesExpanded] = useState(false);

  // Contact modal state
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Currency hook
  const {
    userCurrency,
    isLoadingCurrency,
    initializeCurrency,
    formatPriceWithCurrency,
  } = useCurrency();

  // Contact form setup
  const { toast } = useToast();
  const contactForm = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // Contact form submit handler using the externalized function
  const onContactSubmit = async (data: ContactFormData) => {
    await handleContactFormSubmit(data, toast, () => {
      contactForm.reset();
      setIsContactModalOpen(false);
    });
  };

  // State for swipe gestures (touch)
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // State for drag gestures (mouse)
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef<number | null>(null);

  // State for the calendar
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [disabledDates, setDisabledDates] = useState<
    DayPickerProps["disabled"]
  >([]);
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(true);

  const { isMobile } = useDevice();

  // Filter gallery items based on available rooms
  // availableRooms is undefined initially, then becomes an array after search
  const hasSearchBeenPerformed = availableRooms !== undefined;
  const filteredGalleryItems = hasSearchBeenPerformed
    ? availableRooms.length > 0
      ? galleryItems.filter((item) => availableRooms.includes(item.unitType))
      : [] // Show no rooms if search was performed but no rooms available
    : galleryItems; // Show all rooms if no search has been performed

  // Effect to initialize currency on component mount
  useEffect(() => {
    initializeCurrency();
  }, [initializeCurrency]);

  const openFullScreenView = (categoryIndex: number) => {
    const category = filteredGalleryItems[categoryIndex];
    setActiveGalleryImages(category.images);
    setActiveGalleryCategoryName(category.name);
    setActiveBookingLinks(category.bookingLinks);
    setActiveIcsUrls(category.icsUrls);
    setCurrentImageIndex(0);
    setIsFullScreenViewOpen(true);
  };

  const closeFullScreenView = () => {
    setIsFullScreenViewOpen(false);
    setIsGridViewOpen(false);
    setActiveGalleryImages(null);
    setActiveGalleryCategoryName(null);
    setActiveBookingLinks(null);
    setActiveIcsUrls(null);
  };

  const openGridView = () => {
    setIsGridViewOpen(true);
  };

  const selectImageFromGrid = (imageIndex: number) => {
    setCurrentImageIndex(imageIndex);
    setIsGridViewOpen(false);
    setIsFullScreenImageOpen(true);
  };

  const showNextImage = useCallback(() => {
    if (activeGalleryImages) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % activeGalleryImages.length
      );
    }
  }, [activeGalleryImages]);

  const showPrevImage = useCallback(() => {
    if (activeGalleryImages) {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + activeGalleryImages.length) %
          activeGalleryImages.length
      );
    }
  }, [activeGalleryImages]);

  // Handlers for swipe gestures (touch)
  const minSwipeDistance = 50;
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null); // Reset end coordinate on new touch
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;

    if (distance > minSwipeDistance) {
      showNextImage();
    } else if (distance < -minSwipeDistance) {
      showPrevImage();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Handlers for drag gestures (mouse)
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || dragStartXRef.current === null) return;

    const dragEnd = e.clientX;
    const distance = dragStartXRef.current - dragEnd;

    if (distance > minSwipeDistance) {
      showNextImage();
    } else if (distance < -minSwipeDistance) {
      showPrevImage();
    }

    setIsDragging(false);
    dragStartXRef.current = null;
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMouseUp(e);
    }
  };

  // Effect to fetch and process ICS data from multiple calendar sources when the modal is opened
  useEffect(() => {
    if (!activeIcsUrls || activeIcsUrls.length === 0) {
      return;
    }

    const fetchBookedDatesFromAllSources = async () => {
      setIsLoadingCalendar(true);

      try {
        // Fetch booked dates from all calendar sources in parallel
        const allBookedDatesPromises = activeIcsUrls.map(async (source) => {
          try {
            console.log(`Fetching calendar data from ${source.platform}...`);
            const bookedDateStrings = await getBookedDates(source.url);
            return bookedDateStrings;
          } catch (error) {
            console.error(
              `Failed to fetch calendar from ${source.platform}:`,
              error
            );
            return []; // Return empty array if this source fails
          }
        });

        // Wait for all calendar sources to complete
        const allBookedDatesArrays = await Promise.all(allBookedDatesPromises);

        // Combine all booked dates from all sources
        const combinedBookedDates = allBookedDatesArrays.flat();

        // Convert to date ranges
        const dateRanges = combinedBookedDates.map((range) => ({
          from: new Date(range.from),
          to: new Date(range.to),
        }));

        // Also disable past dates for a better user experience
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        setDisabledDates([{ before: today }, ...dateRanges]);

        console.log(
          `Combined ${combinedBookedDates.length} booked date ranges from ${activeIcsUrls.length} calendar sources`
        );
      } catch (error) {
        console.error("Error fetching calendar data:", error);
        // Fallback: just disable past dates
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        setDisabledDates([{ before: today }]);
      } finally {
        setIsLoadingCalendar(false);
      }
    };

    fetchBookedDatesFromAllSources();
  }, [activeIcsUrls]);

  // Effect for slide show timer
  useEffect(() => {
    if (
      !isFullScreenViewOpen ||
      !activeGalleryImages ||
      activeGalleryImages.length <= 1
    ) {
      return;
    }

    const timer = setTimeout(() => {
      showNextImage();
    }, 5000); // 5-second delay

    return () => clearTimeout(timer);
  }, [
    isFullScreenViewOpen,
    currentImageIndex,
    activeGalleryImages,
    showNextImage,
  ]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isFullScreenViewOpen) return;
      if (event.key === "Escape") {
        closeFullScreenView();
      }
      if (event.key === "ArrowRight") {
        showNextImage();
      }
      if (event.key === "ArrowLeft") {
        showPrevImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullScreenViewOpen, showNextImage, showPrevImage]);

  const currentImageInFullScreen = activeGalleryImages
    ? activeGalleryImages[currentImageIndex]
    : null;

  return (
    <section
      id="gallery"
      className="py-0 md:py-0 pb-8 md:pb-8 mt-8 bg-background"
    >
      <div className="container max-w-6xl 2k:max-w-full 4k:max-w-full mx-auto px-4 2k:px-16 4k:px-24">
        {/* <h2
          className="text-2xl md:text-lg lg:text-xl 2k:text-4xl 4k:text-7xl text-stormy-blue/80 font-playfair-display"
          style={{
            letterSpacing: "0.01em",
            fontWeight: "500",
          }}
        >
          Rooms
        </h2>
        <div className="border-t border-gray-200 my-6" /> */}

        {/* Show availability filter message - when search found rooms */}
        {hasSearchBeenPerformed &&
          availableRooms &&
          availableRooms.length > 0 && (
            <div className="text-center mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-playfair-display font-medium">
                Found {filteredGalleryItems.length} available room
                {filteredGalleryItems.length !== 1 ? "s" : ""} for your selected
                dates
              </p>
              {/* <p className="text-green-600 text-sm mt-1">
                Available: {availableRooms.join(", ")}
              </p> */}
            </div>
          )}

        {/* Show no rooms available message - when search was performed but no rooms found */}
        {hasSearchBeenPerformed &&
          availableRooms &&
          availableRooms.length === 0 && (
            <div className="text-center mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-playfair-display font-medium">
                No rooms available for your selected dates
              </p>
              <p className="text-red-600 font-playfair-display text-sm mt-1">
                Please try different dates using the search form above
              </p>
            </div>
          )}

        <div className="grid grid-cols-1 md:grid-cols-2 2k:grid-cols-2 4k:grid-cols-2 gap-6 md:gap-8 2k:gap-12 4k:gap-16">
          {filteredGalleryItems.map((item, index) => (
            <Card
              key={item.unitType}
              className="group overflow-hidden duration-300 rounded-none"
            >
              <button
                type="button"
                onClick={() => openFullScreenView(index)}
                className="block w-full p-0 border-0 text-left focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label={`View images of ${item.name}`}
              >
                <div
                  className={cn(
                    "relative w-full overflow-hidden",
                    isMobile
                      ? "aspect-[3/2]"
                      : "aspect-[3/3] 2k:aspect-[4/3] 4k:aspect-[5/3]"
                  )}
                >
                  <Image
                    src={item.coverImage.src}
                    alt={item.coverImage.alt}
                    data-ai-hint={item.coverImage.hint}
                    fill
                    sizes="(max-width: 908px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-3 md:p-4">
                    <h3 className="text-lg md:text-xl font-playfair-display text-white">
                      {item.unitType}
                    </h3>
                  </div>
                </div>
              </button>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <CardDescription
                    className="text-sm md:text-sm lg:text-md xl:text-md 2k:text-lg 4k:text-xl text-left text-justify-left tracking-normal font-playfair-display text-stormy-blue/60"
                    style={{
                      lineHeight: "1.5",
                      letterSpacing: "0.01em",
                      fontWeight: "300",
                      // fontSize: "0.9rem",
                    }}
                  >
                    {item.cardContent.location}
                  </CardDescription>

                  <div
                    className="text-sm md:text-sm lg:text-md xl:text-lg 2k:text-lg 4k:text-xl text-left text-justify-left font-playfair-display text-stormy-blue/60"
                    style={{
                      lineHeight: "1.5",
                      letterSpacing: "0.01em",
                      fontSize: "0.8rem",
                    }}
                  >
                    {item.cardContent.guests} • {item.cardContent.bedrooms} •{" "}
                    {item.cardContent.beds} • {item.cardContent.bathrooms}{" "}
                  </div>

                  <div className="text-lg font-semibold text-foreground"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Gallery Sheet */}
      <Sheet
        open={isFullScreenViewOpen}
        onOpenChange={(open) => {
          if (!open) {
            closeFullScreenView();
          }
        }}
      >
        <SheetContent
          side="bottom"
          className={cn(
            "overflow-y-auto p-0 mx-0 md:mx-4 lg:mx-24 xl:mx-32 rounded-t-lg ",
            isMobile ? "h-[95dvh] pb-safe pt-safe-top" : "h-[95vh]",
            // Style the default close button
            "[&>button]:absolute [&>button]:z-[60]  [&>button]:bg-transparent [&>button]:border [&>button]:border-transparent [&>button]:shadow-lg",
            isMobile
              ? "[&>button]:top-4 [&>button]:right-4 [&>button]:mt-safe-top [&>button]:h-5 [&>button]:w-5"
              : "[&>button]:top-6 [&>button]:right-6 [&>button]:h-5 [&>button]:w-5"
          )}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="relative">
            <SheetHeader className="sr-only md:mx-20">
              <SheetTitle>
                {activeGalleryCategoryName
                  ? `${activeGalleryCategoryName} Gallery`
                  : "Gallery"}
              </SheetTitle>
            </SheetHeader>
            {activeGalleryCategoryName &&
              activeGalleryImages &&
              currentImageInFullScreen &&
              activeBookingLinks && (
                <div className="relative w-full h-full bg-background">
                  <div
                    className={cn(
                      "relative w-full cursor-grab active:cursor-grabbing overflow-hidden object-cover",
                      isMobile ? "h-[50vh]" : "h-[65vh]"
                    )}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                  >
                    <h2 className="sr-only" id="fullscreen-gallery-title">
                      Image gallery: {activeGalleryCategoryName} - Image{" "}
                      {currentImageIndex + 1} of {activeGalleryImages.length} -{" "}
                      {currentImageInFullScreen.alt}
                    </h2>

                    {activeGalleryImages.map((image, index) => (
                      <div
                        key={image.src}
                        className={cn(
                          "absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out",
                          index === currentImageIndex
                            ? "opacity-100 z-[1]"
                            : "opacity-0 z-0 pointer-events-none"
                        )}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          data-ai-hint={image.hint}
                          fill
                          className={
                            isMobile
                              ? "absolute h-96 object-cover max-h-96 "
                              : "object-cover"
                          } // object-cover = fit the image to screen; object-contain = preservers the image ratio
                          sizes="100vw"
                          priority={index === 0}
                        />
                      </div>
                    ))}

                    <Button
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        showPrevImage();
                      }}
                      aria-label="Previous image"
                      className="absolute left-1 top-1/2 -translate-y-1/2 sm:left-2 md:left-4 z-[1] p-1.5 sm:p-2 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0"
                    >
                      <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        showNextImage();
                      }}
                      aria-label="Next image"
                      className="absolute right-1 top-1/2 -translate-y-1/2 sm:right-2 md:right-4 z-[1] p-1.5 sm:p-2 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0"
                    >
                      <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        openGridView();
                      }}
                      aria-label="View all images in grid"
                      className="absolute bottom-3 right-3 z-[1] px-3 py-2 rounded-full bg-white/30 text-black hover:bg-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 flex items-center gap-2"
                    >
                      <Grid3X3 className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="text-xs sm:text-sm font-medium">
                        View all photos
                      </span>
                    </Button>
                  </div>

                  {/* Two Section Layout */}
                  <div className="id gallery-details" />
                  <div className="mt-6 md:mt-28">
                    <div className="grid md:grid-cols-2 gap-1 items-baseline">
                      {/* Property Details Section - Right on desktop, Left on mobile */}
                      <div className="order-1 md:order-2 px-4 md:px-10">
                        {(() => {
                          const activeItem = galleryItems.find(
                            (item) => item.name === activeGalleryCategoryName
                          );
                          return activeItem ? (
                            <PropertyDetailsSection
                              name={activeItem.name}
                              unitType={activeItem.unitType}
                              cardContent={activeItem.cardContent}
                              galleryContent={activeItem.galleryContent}
                              activeMapUrl={activeItem.activeMapUrl}
                              onShowMoreClick={() =>
                                setIsDescriptionExpanded(true)
                              }
                              onShowAmenitiesClick={() =>
                                setIsAmenitiesExpanded(true)
                              }
                            />
                          ) : null;
                        })()}
                      </div>

                      {/* Availability & Booking Section - Left on desktop, Right on mobile */}
                      <div className="order-1 md:order-2 sticky top-4 z-10 px-4 md:px-10">
                        <AvailabilityBookingSection
                          isMobile={isMobile}
                          date={date}
                          isLoadingCalendar={isLoadingCalendar}
                          disabledDates={disabledDates}
                          activeBookingLinks={activeBookingLinks}
                          onContactHostClick={() => setIsContactModalOpen(true)}
                        />

                        <div className="border-t border-gray-200 my-6" />
                        {(() => {
                          const activeItem = galleryItems.find(
                            (item) => item.name === activeGalleryCategoryName
                          );
                          return activeItem ? (
                            <div className="id gallery-map-section mb-20 md:mb-16">
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
                                Find us
                              </h4>
                              <div className="id gallery-map ">
                                <MapSection
                                  mapEmbedUrl={activeItem.activeMapUrl}
                                />
                              </div>
                              <div className="space-y-6 pt-4">
                                {/* Address Section */}
                                {/* <AddressSection
                                address={activeItem.cardContent.location}
                              /> */}

                                {/* Nearby Places Section */}
                                {/* <NearbyPlacesSection
                                nearbyPlaces={nearbyPlaces}
                              /> */}
                              </div>
                            </div>
                          ) : null;
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
          <Footer />
        </SheetContent>
      </Sheet>

      {/* Grid View Sheet */}
      {activeGalleryImages && activeGalleryCategoryName && (
        <GridViewSheet
          isOpen={isGridViewOpen}
          onOpenChange={setIsGridViewOpen}
          images={activeGalleryImages}
          currentImageIndex={currentImageIndex}
          categoryName={activeGalleryCategoryName}
          onImageSelect={selectImageFromGrid}
        />
      )}

      {/* Full Screen Image Sheet */}
      {activeGalleryImages && activeGalleryCategoryName && (
        <FullScreenImageSheet
          isOpen={isFullScreenImageOpen}
          onOpenChange={setIsFullScreenImageOpen}
          images={activeGalleryImages}
          currentImageIndex={currentImageIndex}
          categoryName={activeGalleryCategoryName}
          onPrevImage={showPrevImage}
          onNextImage={showNextImage}
        />
      )}

      {/* Property Description Sheet */}
      {activeGalleryCategoryName && (
        <PropertyDescriptionSheet
          isOpen={isDescriptionExpanded}
          onOpenChange={setIsDescriptionExpanded}
          propertyName={activeGalleryCategoryName}
          galleryContent={
            galleryItems.find((item) => item.name === activeGalleryCategoryName)
              ?.galleryContent!
          }
        />
      )}

      {/* Amenities Card Sheet */}
      {activeGalleryCategoryName && (
        <Sheet open={isAmenitiesExpanded} onOpenChange={setIsAmenitiesExpanded}>
          <SheetContent
            side="bottom"
            className="h-[80vh] overflow-y-auto md:mx-64 rounded-t-lg"
          >
            <div className="p-6">
              <SheetHeader>
                <SheetTitle className="text-lg font-medium mb-4 ">
                  What this place offers
                </SheetTitle>
              </SheetHeader>

              <AmenitiesCard
                amenities={mapStringAmenitiesToAmenities(
                  galleryItems.find(
                    (item) => item.name === activeGalleryCategoryName
                  )?.galleryContent.guestsAmenities || []
                )}
                isMobileView={isMobile}
                previewCount={50} // Show all amenities in the sheet
              />
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Contact Host Modal */}
      <ContactHostModal
        isOpen={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
        form={contactForm}
        onSubmit={onContactSubmit}
      />
    </section>
  );
}
