"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { type DayPickerProps } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight, X, Home, Briefcase } from "lucide-react";
import { getBookedDates } from "@/app/actions/get-booked-dates";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

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
  images: GalleryImage[];
  bookingLinks: {
    airbnb: string;
    booking: string;
  };
  icsUrl: string;
}

const galleryItems: GalleryCategory[] = [
  {
    name: "1 Bedroom",
    coverImage: {
      src: "/gallery/kirei_2/converted_0002.webp",
      alt: "Kirei-ito",
      hint: "Minimalist 1 bedroom suite",
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
    name: "Studio",
    coverImage: {
      src: "/gallery/kirei_1/converted_0007.webp",
      alt: "Kirei",
      hint: "Minimalist studio bedroom suite",
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
    setActiveGalleryImages(null);
    setActiveGalleryCategoryName(null);
    setActiveBookingLinks(null);
    setActiveIcsUrl(null);
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
    <section id="gallery" className="py-16 md:py-24 bg-secondary/30">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl text-center font-headline mb-8">
          Explore
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {galleryItems.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => openFullScreenView(index)}
              // className="group block w-full rounded-lg shadow-lg custom-aspect-3-2 overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 p-0" // p-2 removed, image will fill
              className="group block w-full p-0 border-0 shadow-lg aspect-[3/2] overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label={`View images of ${item.name}`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={item.coverImage.src}
                  alt={item.coverImage.alt}
                  data-ai-hint={item.coverImage.hint}
                  fill
                  sizes="(max-width: 908px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-200 rounded-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-sm" />
                <div className="absolute bottom-0 left-0 p-3 md:p-4">
                  <h3 className="text-lg md:text-xl font-normal text-white">
                    {item.name}
                  </h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {isFullScreenViewOpen &&
        activeGalleryCategoryName &&
        activeGalleryImages &&
        currentImageInFullScreen &&
        activeBookingLinks && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto bg-black/90 p-2 sm:p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="fullscreen-gallery-title"
            onClick={closeFullScreenView}
          >
            <div
              className="relative mx-auto mt-12 mb-8 max-w-4xl w-full bg-background rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative h-[65vh] w-full cursor-grab active:cursor-grabbing overflow-hidden rounded-t-lg"
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

                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1] px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-center">
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
              </div>

              <div className="p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl text-center font-headline">
                  Availability & Booking
                </h3>
                <div className="grid md:grid-cols-2 gap-8 items-start md:p-10">
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
                  <div className="flex flex-col justify-center space-y-4 pt-4 md:pt-0">
                    <p className="text-muted-foreground text-center md:text-left pb-2 font-headline">
                      Check our availability and book your stay on your favorite
                      platform.
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
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              onClick={closeFullScreenView}
              aria-label="Close fullscreen view"
              className="absolute top-3 right-3 z-[52] p-1.5 sm:p-2 rounded-full bg-white/30 text-black hover:bg-white/50 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </div>
        )}
    </section>
  );
}
