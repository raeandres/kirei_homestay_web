"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { type DayPickerProps } from "react-day-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RatingStars } from "@/components/ui/rating-stars";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Home,
  Briefcase,
  Grid3X3,
  MessageSquare,
} from "lucide-react";
import { getBookedDates } from "@/app/actions/get-booked-dates";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCurrency } from "@/lib/currency";
import {
  contactFormSchema,
  ContactFormData,
  handleContactFormSubmit,
} from "@/lib/contact-form";
import { useToast } from "@/hooks/use-toast";

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

interface GalleryCategory {
  name: string;
  coverImage: GalleryImage;
  images: GalleryImage[];
  bookingLinks: {
    airbnb: string;
    booking: string;
  };
  icsUrl: string;
}
interface GalleryCategory {
  name: string;
  coverImage: GalleryImage;
  cardContent: CardContent;
  images: GalleryImage[];
  bookingLinks: {
    airbnb: string;
    booking: string;
  };
  icsUrl: string;
}

const galleryItems: GalleryCategory[] = [
  {
    name: "Kirei-ito",
    coverImage: {
      src: "/gallery/kirei_2/converted_0002.webp",
      alt: "Kirei-ito",
      hint: "Minimalist 1 bedroom suite",
    },
    cardContent: {
      location: "Eastwood Global Plaza, Quezon City",
      guests: "5 guests",
      bedrooms: "1 bedroom",
      beds: "2 beds",
      bathrooms: "1 bathroom",
      basePriceSGD: 228,
      reviews: "5 reviews",
      stars: 5,
    },
    images: [
      // Living Room
      {
        src: "/gallery/kirei_2/converted_0000.webp",
        alt: "Living Room - Kirei 2",
        hint: "Kirei 2 - living 1",
      },
      {
        src: "/gallery/kirei_2/converted_0001.webp",
        alt: "Bedroom",
        hint: "minimalist bedroom",
      },
      {
        src: "/gallery/kirei_2/converted_0002.webp",
        alt: "Living Room - View 2",
        hint: "Kirei 2 - living 2",
      },
      {
        src: "/gallery/kirei_2/converted_0003.webp",
        alt: "Living Room - View 3",
        hint: "Kirei 2 - living 3",
      },
      {
        src: "/gallery/kirei_2/converted_0004.webp",
        alt: "Living Room - View 3",
        hint: "Kirei 2 - living 4",
      },
      // Bedroom
      {
        src: "/gallery/kirei_2/converted_0005.webp",
        alt: "Bed Room - View 1",
        hint: "Kirei 2 - Bed 1",
      },
      {
        src: "/gallery/kirei_2/converted_0006.webp",
        alt: "Bed Room - View 2",
        hint: "Kirei 2 - Bed 2",
      },
      {
        src: "/gallery/kirei_2/converted_0007.webp",
        alt: "Bed Room - View 3",
        hint: "Kirei 2 - Bed 3",
      },
      {
        src: "/gallery/kirei_2/converted_0008.webp",
        alt: "Bed Room - View 4",
        hint: "Kirei 2 - Bed 4",
      },
      {
        src: "/gallery/kirei_2/converted_0009.webp",
        alt: "Bed Room - View 5",
        hint: "Kirei 2 - Bed 5",
      },
      {
        src: "/gallery/kirei_2/converted_0010.webp",
        alt: "Bed Room - View 6",
        hint: "Kirei 2 - Bed 6",
      },
      {
        src: "/gallery/kirei_2/converted_0011.webp",
        alt: "Bed Room - View 7",
        hint: "Kirei 2 - Bed 7",
      },
    ],
    bookingLinks: {
      airbnb: "https://www.airbnb.com/rooms/1364997919482714933",
      booking:
        "https://www.booking.com/hotel/ph/king-suite-eastwood-global-plaza-high-floor-quezon-city.html",
    },
    icsUrl:
      "https://www.airbnb.com.sg/calendar/ical/1364997919482714933.ics?s=663892ccaa5dabea43e13966feabc6e1",
  },
  {
    name: "Kirei",
    coverImage: {
      src: "/gallery/kirei_1/converted_0007.webp",
      alt: "Kirei",
      hint: "Minimalist studio bedroom suite",
    },
    cardContent: {
      location: "Eastwood LeGrand 3, Quezon City",
      guests: "5 guests",
      bedrooms: "1 bedroom",
      beds: "2 beds",
      bathrooms: "1 bathroom",
      basePriceSGD: 122,
      reviews: "5 reviews",
      stars: 5,
    },
    images: [
      {
        src: "/gallery/kirei_1/converted_0000.webp",
        alt: "Living Room - View 1",
        hint: "Kirei 1 - living 1",
      },
      {
        src: "/gallery/kirei_1/converted_0001.webp",
        alt: "Living Room - View 1",
        hint: "Kirei 1 - living 1",
      },

      {
        src: "/gallery/kirei_1/converted_0002.webp",
        alt: "Living Room - View 2",
        hint: "Kirei 1 - living 2",
      },
      {
        src: "/gallery/kirei_1/converted_0003.webp",
        alt: "Living Room - View 2",
        hint: "Kirei 1 - living 2",
      },
      {
        src: "/gallery/kirei_1/converted_0004.webp",
        alt: "Living Room - View 6",
        hint: "Kirei 1 - living 6",
      },
      {
        src: "/gallery/kirei_1/converted_0005.webp",
        alt: "Kitchen 1 - View 1",
        hint: "Kirei 1 - kitchen 5",
      },
      {
        src: "/gallery/kirei_1/converted_0006.webp",
        alt: "Kitchen Room - View 4",
        hint: "Kirei 1 - Kitchen view 4",
      },
      {
        src: "/gallery/kirei_1/converted_0007.webp",
        alt: "Kitchen Room - View 4",
        hint: "Kirei 1 - Kitchen view 4",
      },
      {
        src: "/gallery/kirei_1/converted_0008.webp",
        alt: "Kitchen Room - View 1",
        hint: "Kirei 1 - Food view 1",
      },
      {
        src: "/gallery/kirei_1/converted_0009.webp",
        alt: "Kitchen Room - View 2",
        hint: "Kirei 1 - Food view 1",
      },
      {
        src: "/gallery/kirei_1/converted_0010.webp",
        alt: "Kitchen Room - View 3",
        hint: "Kirei 1 - Food view 1",
      },
      {
        src: "/gallery/kirei_1/converted_0011.webp",
        alt: "Kitchen Room - View 3",
        hint: "Kirei 1 - Food view 1",
      },
      {
        src: "/gallery/kirei_1/converted_amenities_0000.webp",
        alt: "Kitchen Room - View 4",
        hint: "Kirei 1 - Food view 1",
      },
      {
        src: "/gallery/kirei_1/converted_amenities_0001.webp",
        alt: "Kitchen Room - View 5",
        hint: "Kirei 1 - Food view 1",
      },
      {
        src: "/gallery/kirei_1/converted_amenities_0002.webp",
        alt: "Gym Room 2 - View 2",
        hint: "Kirei 1 - Amenities 2",
      },
    ],
    bookingLinks: {
      airbnb: "https://www.airbnb.com/rooms/1030897971821606234",
      booking:
        "https://www.booking.com/hotel/ph/cozy-home-in-eastwood-pet-friendly-fast-wifi.html",
    },
    icsUrl:
      "https://www.airbnb.com.sg/calendar/ical/1030897971821606234.ics?s=1b728ed92d212d0e42783ed473c0bb0f",
  },
];

export function GallerySection() {
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
  const [activeIcsUrl, setActiveIcsUrl] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Property description state
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

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

  const isMobile = useIsMobile();

  // Effect to initialize currency on component mount
  useEffect(() => {
    initializeCurrency();
  }, [initializeCurrency]);

  const openFullScreenView = (categoryIndex: number) => {
    const category = galleryItems[categoryIndex];
    setActiveGalleryImages(category.images);
    setActiveGalleryCategoryName(category.name);
    setActiveBookingLinks(category.bookingLinks);
    setActiveIcsUrl(category.icsUrl);
    setCurrentImageIndex(0);
    setIsFullScreenViewOpen(true);
  };

  const closeFullScreenView = () => {
    setIsFullScreenViewOpen(false);
    setIsGridViewOpen(false);
    setActiveGalleryImages(null);
    setActiveGalleryCategoryName(null);
    setActiveBookingLinks(null);
    setActiveIcsUrl(null);
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

  // Effect to fetch and process ICS data when the modal is opened
  useEffect(() => {
    if (!activeIcsUrl) {
      return;
    }

    const fetchBookedDates = async () => {
      setIsLoadingCalendar(true);

      const bookedDateStrings = await getBookedDates(activeIcsUrl);

      const dateRanges = bookedDateStrings.map((range) => ({
        from: new Date(range.from),
        to: new Date(range.to),
      }));

      // Also disable past dates for a better user experience
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      setDisabledDates([{ before: today }, ...dateRanges]);
      setIsLoadingCalendar(false);
    };

    fetchBookedDates();
  }, [activeIcsUrl]);

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
    <section id="gallery" className="py-0 md:py-24 bg-secondary/30">
      <div className="container max-w-6xl mx-auto px-4">
        <h2
          className={
            isMobile
              ? "text-lg md:text-xl text-left  font-headline mb-8"
              : "text-lg md:text-xl text-center text-justify-center  font-headline mb-8"
          }
        >
          EXPLORE
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {galleryItems.map((item, index) => (
            <Card
              key={item.name}
              className="group overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <button
                type="button"
                onClick={() => openFullScreenView(index)}
                className="block w-full p-0 border-0 text-left focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label={`View images of ${item.name}`}
              >
                <div className="relative w-full aspect-[3/2] overflow-hidden">
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
                    <h3 className="text-lg md:text-xl font-normal text-white">
                      {item.name}
                    </h3>
                  </div>
                </div>
              </button>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <CardDescription className="text-sm text-muted-foreground">
                    {item.cardContent.location}
                  </CardDescription>

                  <div className="text-sm text-muted-foreground">
                    {item.cardContent.guests} • {item.cardContent.bedrooms} •{" "}
                    {item.cardContent.beds} • {item.cardContent.bathrooms}{" "}
                  </div>

                  <div className="flex items-center gap-2">
                    <RatingStars
                      rating={item.cardContent.stars}
                      className="scale-75"
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.cardContent.reviews}
                    </span>
                  </div>

                  <div className="text-lg font-semibold text-foreground">
                    {isLoadingCurrency ? (
                      <span className="animate-pulse">Loading...</span>
                    ) : (
                      <>
                        {formatPriceWithCurrency(item.cardContent.basePriceSGD)}{" "}
                        {userCurrency.code}{" "}
                        <span className="text-sm font-normal text-muted-foreground">
                          for 1 night
                        </span>
                      </>
                    )}
                  </div>
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
            "overflow-y-auto p-0",
            isMobile ? "h-[95dvh] pb-safe pt-safe-top" : "h-[95vh]",
            // Style the default close button
            "[&>button]:absolute [&>button]:z-[60]  [&>button]:bg-transparent [&>button]:border [&>button]:border-transparent [&>button]:shadow-lg",
            isMobile
              ? "[&>button]:top-4 [&>button]:right-4 [&>button]:mt-safe-top [&>button]:h-5 [&>button]:w-5"
              : "[&>button]:top-6 [&>button]:right-6 [&>button]:h-5 [&>button]:w-5"
          )}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <SheetHeader className="sr-only">
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
                    "relative w-full cursor-grab active:cursor-grabbing overflow-hidden rounded-t-lg",
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
                        className={isMobile ? "object-contain" : "object-cover"} // object-cover = fit the image to screen; object-contain = preservers the image ratio
                        sizes="100vw"
                        priority={index === 0}
                      />
                    </div>
                  ))}

                  <div
                    className={cn(
                      "absolute left-1/2 -translate-x-1/2 z-[1] px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-center",
                      isMobile ? "top-3 mt-safe-top" : "top-3"
                    )}
                  >
                    <h3
                      className="text-lg md:text-xl font-normal"
                      title={activeGalleryCategoryName}
                    >
                      {activeGalleryCategoryName}
                    </h3>
                    <p className="text-xs sm:text-sm">
                      ({currentImageIndex + 1} / {activeGalleryImages.length})
                    </p>
                  </div>

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
                <div className="gallery-details" />
                <div className="p-6 md:p-28">
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Left Section - Property Details */}
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <CardDescription className="text-sm text-muted-foreground">
                          <h3 className="text-xl md:text-2xl font-semibold mb-4">
                            {
                              galleryItems.find(
                                (item) =>
                                  item.name === activeGalleryCategoryName
                              )?.name
                            }
                          </h3>
                          {
                            galleryItems.find(
                              (item) => item.name === activeGalleryCategoryName
                            )?.cardContent.location
                          }
                        </CardDescription>

                        <div className="text-sm text-muted-foreground">
                          {
                            galleryItems.find(
                              (item) => item.name === activeGalleryCategoryName
                            )?.cardContent.guests
                          }{" "}
                          •{" "}
                          {
                            galleryItems.find(
                              (item) => item.name === activeGalleryCategoryName
                            )?.cardContent.bedrooms
                          }{" "}
                          •{" "}
                          {
                            galleryItems.find(
                              (item) => item.name === activeGalleryCategoryName
                            )?.cardContent.beds
                          }{" "}
                          •{" "}
                          {
                            galleryItems.find(
                              (item) => item.name === activeGalleryCategoryName
                            )?.cardContent.bathrooms
                          }
                        </div>

                        <div className="flex items-center gap-2">
                          <RatingStars
                            rating={
                              galleryItems.find(
                                (item) =>
                                  item.name === activeGalleryCategoryName
                              )?.cardContent.stars || 5
                            }
                            className="scale-75"
                          />
                          <span className="text-sm text-muted-foreground">
                            {
                              galleryItems.find(
                                (item) =>
                                  item.name === activeGalleryCategoryName
                              )?.cardContent.reviews
                            }
                          </span>
                        </div>

                        {/* {  TODO: fix the price
                        <div className="text-lg font-semibold text-foreground">
                            {isLoadingCurrency ? (
                              <span className="animate-pulse">Loading...</span>
                            ) : (
                              <>
                                {formatPriceWithCurrency(
                                  galleryItems.find(
                                    (item) =>
                                      item.name === activeGalleryCategoryName
                                  )?.cardContent.basePriceSGD || 228
                                )}{" "}
                                {userCurrency.code}{" "}
                                <span className="text-sm font-normal text-muted-foreground">
                                  for 1 night
                                </span>
                              </>
                            )}
                          </div>
                         */}

                        {/* Divider */}
                        <div className="border-t border-gray-200 my-6"></div>

                        {/* Property Description - Truncated */}
                        <div className="space-y-4 text-sm text-muted-foreground">
                          <p className="leading-relaxed">
                            Right in the heart of Eastwood City is Kirei House -
                            Ito, a serene Muji-inspired space high above the
                            city. Relax in the elevated lounge, work by the
                            window, or unwind in the cozy bedroom with sweeping
                            skyline views. Every detail is curated for calm and
                            comfort. A perfect retreat for mindful travelers
                            seeking beauty in simplicity.
                          </p>

                          <p className="leading-relaxed">
                            Our Muji-inspired home in Eastwood Global Plaza
                            Luxury Residence is thoughtfully designed for
                            comfort, calm, and quiet luxury. Guests enjoy full
                            access to premium building amenities like the
                            infinity pool, fitness pool and jacuzzi, gym, sauna
                            and spa.
                          </p>
                          <p className="leading-relaxed">
                            Features include smart entry system, 55" TCL Google
                            TV with streaming services, 300 Mbps WiFi, and
                            centralized AC. Fully equipped kitchen with modern
                            appliances, comfortable workspace, and complete
                            bathroom essentials.
                          </p>
                          <p className="leading-relaxed">
                            Clean, quiet, and well-maintained space ideal for
                            travelers, families, couples, and business trips.
                          </p>

                          {/* Show More Button */}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsDescriptionExpanded(true)}
                            className="mt-4"
                          >
                            Show more
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Availability & Booking */}
                    <div className="space-y-4">
                      <h3 className="text-xl md:text-2xl flex justify-center font-headline mb-4">
                        Availability
                      </h3>

                      <div className="space-y-6">
                        <div className="flex justify-center">
                          <Calendar
                            mode="single"
                            selected={date}
                            // onSelect={setDate}
                            className="rounded-md border"
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
                        <div className="flex flex-col justify-center space-y-4 pt-0 md:pt-0">
                          <p className="text-sm text-left px-10 md:text-left pb-2 font-normal">
                            Check our availability and book your stay on your
                            favorite platform.
                          </p>
                          <Button asChild className="w-full" size="lg">
                            <Link
                              href={activeBookingLinks.airbnb}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Home className="mr-2 h-5 w-5" />
                              Book on Airbnb
                            </Link>
                          </Button>
                          <Button
                            asChild
                            className="w-full"
                            size="lg"
                            variant="secondary"
                          >
                            <Link
                              href={activeBookingLinks.booking}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Briefcase className="mr-2 h-5 w-5" />
                              Book on Booking.com
                            </Link>
                          </Button>

                          {/* Contact Host Button */}
                          <Button
                            onClick={() => setIsContactModalOpen(true)}
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
                </div>
              </div>
            )}
        </SheetContent>
      </Sheet>

      {/* Grid View Sheet */}
      <Sheet open={isGridViewOpen} onOpenChange={setIsGridViewOpen}>
        <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-sm md:text-sm">
              {activeGalleryCategoryName} - All Images
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            {activeGalleryImages && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {activeGalleryImages.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => selectImageFromGrid(index)}
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                      index === currentImageIndex
                        ? "border-primary ring-2 ring-primary ring-offset-2"
                        : "border-transparent hover:border-primary/50"
                    )}
                    aria-label={`View image ${index + 1}: ${image.alt}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      data-ai-hint={image.hint}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    />
                    {index === currentImageIndex && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Full Screen Image Sheet */}
      <Sheet
        open={isFullScreenImageOpen}
        onOpenChange={setIsFullScreenImageOpen}
      >
        <SheetContent
          side="bottom"
          className={cn(
            "overflow-hidden p-0 [&>button]:hidden",
            isMobile ? "h-[100dvh] pb-safe pt-safe-top" : "h-[100vh]"
          )}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>
              {activeGalleryCategoryName &&
              activeGalleryImages &&
              activeGalleryImages[currentImageIndex]
                ? `${activeGalleryCategoryName} - ${activeGalleryImages[currentImageIndex].alt}`
                : "Full Screen Image"}
            </SheetTitle>
          </SheetHeader>
          {activeGalleryImages && activeGalleryImages[currentImageIndex] && (
            <div className="relative w-full h-full bg-black">
              <Image
                src={activeGalleryImages[currentImageIndex].src}
                alt={activeGalleryImages[currentImageIndex].alt}
                data-ai-hint={activeGalleryImages[currentImageIndex].hint}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />

              {/* Custom Close Button */}
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "absolute z-20 rounded-full bg-black/60 text-white hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-0 border border-white/20",
                    isMobile
                      ? "top-4 right-4 h-12 w-12 mt-safe-top"
                      : "top-6 right-6 h-10 w-10"
                  )}
                  aria-label="Close full screen view"
                >
                  <X className={isMobile ? "h-6 w-6" : "h-5 w-5"} />
                </Button>
              </SheetClose>

              {/* Image info overlay */}
              <div
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-lg bg-black/50 text-white text-center",
                  isMobile ? "top-20 mt-safe-top" : "top-4"
                )}
              >
                <h3 className="text-lg font-medium">
                  {activeGalleryCategoryName}
                </h3>
                <p className="text-sm opacity-90">
                  {currentImageIndex + 1} of {activeGalleryImages.length}
                </p>
              </div>

              {/* Navigation buttons */}
              {activeGalleryImages.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      showPrevImage();
                    }}
                    aria-label="Previous image"
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      showNextImage();
                    }}
                    aria-label="Next image"
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Property Description Sheet */}
      <Sheet
        open={isDescriptionExpanded}
        onOpenChange={setIsDescriptionExpanded}
      >
        <SheetContent
          side="bottom"
          className="h-[80vh] overflow-y-auto p-6 md:p-20"
        >
          <SheetHeader>
            <SheetTitle className="text-lg md:text-xl">
              Property Details - {activeGalleryCategoryName}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-6 text-sm text-muted-foreground">
            <p className="leading-relaxed">
              Right in the heart of Eastwood City is Kirei House - Ito, a serene
              Muji-inspired space high above the city. Relax in the elevated
              lounge, work by the window, or unwind in the cozy bedroom with
              sweeping skyline views. Every detail is curated for calm and
              comfort. A perfect retreat for mindful travelers seeking beauty in
              simplicity.
            </p>

            <div>
              <h4 className="font-semibold text-foreground mb-3">The space</h4>
              <p className="leading-relaxed mb-4">
                Our Muji-inspired home in Eastwood Global Plaza Luxury Residence
                is thoughtfully designed for comfort, calm, and quiet luxury.
                Guests enjoy full access to premium building amenities like the
                infinity pool (best enjoyed from 7PM - 10PM for city lights),
                fitness pool and jacuzzi, gym, sauna and spa, day care center
                and outdoor playground for kids, sun deck lounge, and hammock
                garden.
              </p>

              <h5 className="font-medium text-foreground mb-2">
                In-Unit Features & Amenities
              </h5>
              <div className="space-y-2 leading-relaxed">
                <p>
                  <strong>Smart Entry:</strong> MGS ELITE PRO Smart Lock for
                  seamless check-in
                </p>
                <p>
                  <strong>Entertainment:</strong> 55" TCL Google TV with
                  Netflix, HBO Max, Disney+, Amazon Prime, and cable
                </p>
                <p>
                  <strong>Internet:</strong> 300 Mbps Fiber WiFi, ideal for
                  remote work and streaming
                </p>
                <p>
                  <strong>Comfort:</strong> Centralized AC with ceiling fan,
                  spacious king bed, full-size futon bed, ultra-comfy sofa, and
                  a daybed for reading or relaxing
                </p>
                <p>
                  <strong>Workspace:</strong> Dedicated desk for working
                </p>
                <p>
                  <strong>Fun & Cozy Touches:</strong> Board games, card games,
                  and plushies for pets
                </p>
                <p>
                  <strong>Kitchen:</strong> Fully equipped with cookware,
                  tableware, teaware, Condura Inverter Fridge, SAMSUNG 4-in-1
                  Smart Oven (air fryer, microwave, oven, toaster), B Coffee Neo
                  machine (with 4 complimentary pods), KYOWA rice cooker, and
                  electric kettle
                </p>
                <p>
                  <strong>Bathroom Essentials:</strong> Shower heater,
                  hairdryer, towels, dental kit, and complete toiletries
                </p>
                <p>
                  <strong>Laundry:</strong> TCL front-load washer and dryer with
                  complimentary laundry capsules
                </p>
                <p>
                  <strong>Closet:</strong> Includes hangers, steamer/iron and
                  ironing bed.
                </p>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-foreground mb-2">
                Why Guests Love Kirei House
              </h5>
              <div className="space-y-1">
                <p>✔️ Clean, quiet, and well-maintained</p>
                <p>✔️ Seamless check-in with responsive host</p>
                <p>
                  ✔️ Ideal for travelers, families, couples, business trips and
                  WFH stays
                </p>
                <p>
                  ✔️ Tastefully designed. We got everything you need and nothing
                  you don't.
                </p>
              </div>
              <p className="mt-3 leading-relaxed">
                Book your stay and see why Kirei House - Ito is one of
                Eastwood's most-loved homes.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Guest access
              </h4>
              <p className="leading-relaxed mb-3">
                Kirei House - Ito offers access to premium amenities designed
                for relaxation, wellness, and leisure:
              </p>
              <ul className="space-y-1 mb-4">
                <li>- Infinity Pool</li>
                <li>- Fitness Pool & Jacuzzi</li>
                <li>- Fully Equipped Gym</li>
                <li>- Indoor Sauna & Spa</li>
                <li>- Day Care Center & Outdoor Playground</li>
                <li>- Hammock Garden & Sun Deck Lounge</li>
              </ul>

              <h5 className="font-medium text-foreground mb-2">AMENITY FEES</h5>
              <p className="leading-relaxed mb-2">
                Please note that some facilities require a usage fee per person,
                per day to be paid at the Admin Office.
              </p>
              <ul className="space-y-1 mb-4">
                <li>- Swimming Pools & Gym P500</li>
                <li>- Swimming Pools & Day Care Center P500</li>
                <li>- Sauna P500</li>
              </ul>

              <h5 className="font-medium text-foreground mb-2">
                IMPORTANT NOTES
              </h5>
              <ul className="space-y-1 leading-relaxed">
                <li>
                  - Registered guests need to pay P250 registration fee as
                  mandated by PMO.
                </li>
                <li>- Unregistered guests are not allowed.</li>
                <li>- CLAYGO (Clean As You Go) is strictly observed.</li>
                <li>
                  - Check-in is from 3PM to 10PM; check-out is at 12:00 PM.
                </li>
                <li>- Quiet hours are from 10:00 PM to 8:00 AM.</li>
                <li>
                  - Smoking and illegal substances are strictly prohibited.
                </li>
                <li>- No additional guests beyond your booking are allowed.</li>
                <li>
                  - No loud or unruly parties. This is a peaceful space meant
                  for rest and relaxation.
                </li>
              </ul>
              <p className="mt-3 leading-relaxed">
                Please refer to the House Rules for the complete guidelines.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Other things to note
              </h4>
              <p className="leading-relaxed">
                Eastwood City is within walking distance to shopping malls,
                convenience stores, groceries, restaurants, and entertainment
                such as bowling alley, billiards, dog parks, fitness gyms, food
                bazaars, movie theater, nightlife, and many more.
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Contact Host Modal */}
      <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto safe-area-modal">
          <div className="p-6 pt-8 pb-8">
            <DialogHeader>
              <DialogTitle>Contact the Host</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Interested to know more? Let us know what you think.
              </p>
              <Form {...contactForm}>
                <form
                  onSubmit={contactForm.handleSubmit(onContactSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={contactForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={contactForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={contactForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Phone Number{" "}
                          <span className="text-xs text-muted-foreground">
                            (Optional)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="(555) 123-4567"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={contactForm.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="I'm interested in booking your property and have a few questions..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={contactForm.formState.isSubmitting}
                  >
                    {contactForm.formState.isSubmitting
                      ? "Sending..."
                      : "Send Inquiry"}
                  </Button>
                </form>
              </Form>
              <p className="text-xs text-muted-foreground text-center">
                We typically respond to inquiries within an hour.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
