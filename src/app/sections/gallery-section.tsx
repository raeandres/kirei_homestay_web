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
import { PropertyDescriptionSheet } from "@/app/sections/components/property-description-sheet";
import { FullScreenImageSheet } from "@/app/sections/components/full-screen-image-sheet";
import { GridViewSheet } from "@/app/sections/components/grid-view-sheet";
import { ContactHostModal } from "@/app/sections/components/contact-host-modal";
import { MapSection } from "@/app/sections/components/property-location/map-section";
import { AvailabilityBookingSection } from "@/app/sections/components/availability-booking-section";
import { PropertyDetailsSection } from "@/app/sections/components/property-details-section";
import { AddressSection } from "@/app/sections/components/property-location/address-section";
import { NearbyPlacesSection } from "@/app/sections/components/property-location/nearby-places-section";

const nearbyPlaces = [
  { name: "Eastwood City", distance: "0.1 km" },
  { name: "Bonifacio Global City", distance: "6 km" },
  { name: "Ortigas Center", distance: "3.8 km" },
  { name: "Makati", distance: "7 km" },
  { name: "Airport", distance: "12 km" },
];

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
  icsUrl: string;
  activeMapUrl: string;
}

const galleryItems: GalleryCategory[] = [
  {
    name: "Kirei",
    unitType: "Studio",
    coverImage: {
      src: "/gallery/kirei_1/converted_0007.webp",
      alt: "Kirei",
      hint: "Minimalist studio bedroom suite",
    },
    cardContent: {
      location: "Eastwood LeGrand 3, Quezon City",
      guests: "4 guests",
      bedrooms: "1 bedroom",
      beds: "2 beds",
      bathrooms: "1 bathroom",
      basePriceSGD: 122,
      reviews: "5 reviews",
      stars: 5,
    },
    galleryContent: {
      teaserDescription1:
        "Designed for clarity and comfort, Kirei House offers a true home away from home. This minimalist studio is designed to give you a peaceful space where you can rest, work, or relax without any distractions.\n\n Whether you’re traveling for business, a quick getaway, or just need a quiet spot to recharge, this space offers everything you need for a hassle-free stay. Kirei House is not just another Airbnb. It’s your space elevated.",
      teaserDescription2: "",
      propertyDetailsTitle: "Kirei",
      propertyDescription:
        "Designed for clarity and comfort, Kirei House offers a true home away from home. This minimalist studio is designed to give you a peaceful space where you can rest, work, or relax without any distractions.\n\nWhether you’re traveling for business, a quick getaway, or just need a quiet spot to recharge, this space offers everything you need for a hassle-free stay. Kirei House is not just another Airbnb. It’s your space elevated.",
      spaceDescription: "",
      guestsAmenities: [
        " • A comfortable queen bed with fresh linens for a good night’s sleep. We also have full-size futon bed available upon request.",
        " • Simple, clutter-free furnishings to help you unwind.",
        " • A dedicated work desk with fast, reliable WiFi for productivity.",
        " •  Netflix and other streaming platforms so you can kick back after a busy day.",
        " • Fully functional kitchen with Nespresso and Smartoven.",
        " •  Clean, well-maintained bathroom with essential toiletries provided.",
      ],
      guestsPreferenceList: [
        "✔️ Clean, quiet, and well-maintained",
        "✔️ Seamless check-in with responsive host",
        "✔️ Ideal for solo travelers, couples, and WFH stays,",
        "✔️ Tastefully designed.",
      ],
      guestsPreferenceFooterNote:
        "We got everything you need and nothing you don’t.",
      guestsAccessSubtitle: "",
      guestsAccessList: [
        " • Parking Basement 3",
        " • Pay parking inside the condominium",
        " • P350/night 1 slot only (kindly confirm in advance)",
        " • Pool Access 6th Floor",
        " • Free for 4 guests, additional fee of P200 for succeeding guests. Pay at Admin Office or at the guard on duty",
        " • Gym 6th Floor",
        " • Day Care Center and Outdoor Playground 6th Floor",
        " • Garden 6th Floor",
      ],
      amenityFeesDescription: "",
      amenityFeeItems: [],
      importantNotesList: [
        " • Strictly imposing CLAY GO policy.",
        " • Check in 2PM - 10PM",
        " • Check out 11AM",
        " • Quiet time 11PM - 8AM",
        " • NO SMOKING AND ILLEGAL DRUGS AT ALL TIMES",
        " • NO ADDITIONAL GUESTS",
        " • NO UNRULY HOUSE PARTIES",
      ],
      otherNotesDescription:
        "Eastwood City is within walking distance to shopping malls, convenience stores, groceries, restaurants, and entertainment such as bowling alley, billiards, dog parks, fitness gyms, food bazaars, movie theater, nightlife, and many more.",
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
    activeMapUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d438.8887546439741!2d121.08111150085881!3d14.608037443965378!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b81d13b04c0d%3A0x7bb0ce56deb5b6fe!2sEastwood%20LeGrand%203!5e0!3m2!1sen!2ssg!4v1751795054321!5m2!1sen!2ssg",
    bookingLinks: {
      airbnb: "https://www.airbnb.com/rooms/1030897971821606234",
      booking:
        "https://www.booking.com/hotel/ph/cozy-home-in-eastwood-pet-friendly-fast-wifi.html",
    },
    icsUrl:
      "https://www.airbnb.com.sg/calendar/ical/1030897971821606234.ics?s=1b728ed92d212d0e42783ed473c0bb0f",
  },
  {
    name: "Kirei-ito",
    unitType: "1 bedroom",
    coverImage: {
      src: "/gallery/kirei_2/converted_0002.webp",
      alt: "Kirei-ito",
      hint: "Minimalist 1 bedroom suite",
    },
    cardContent: {
      location: "Eastwood Global Plaza Luxury Residences, Quezon City",
      guests: "5 guests",
      bedrooms: "1 bedroom",
      beds: "2 beds",
      bathrooms: "1 bathroom",
      basePriceSGD: 228,
      reviews: "5 reviews",
      stars: 5,
    },
    galleryContent: {
      teaserDescription1:
        "Right in the heart of Eastwood City is Kirei House - Ito, a serene Muji-inspired space high above the city. Relax in the elevated lounge, work by the window, or unwind in the cozy bedroom with sweeping skyline views. Every detail is curated for calm and comfort. A perfect retreat for mindful travelers seeking beauty in simplicity.",
      teaserDescription2:
        "Our Muji-inspired home in Eastwood Global Plaza Luxury Residence is thoughtfully designed for comfort, calm, and quiet luxury. Guests enjoy full access to premium building amenities like the infinity pool (best enjoyed from 7PM - 10PM for city lights), fitness pool and jacuzzi, gym, sauna and spa, day care center and outdoor playground for kids, sun deck lounge, and hammock garden.",
      propertyDetailsTitle: "Kirei-ito",
      propertyDescription:
        "Right in the heart of Eastwood City is Kirei House - Ito, a serene Muji-inspired space high above the city. Relax in the elevated lounge, work by the window, or unwind in the cozy bedroom with sweeping skyline views. Every detail is curated for calm and comfort. A perfect retreat for mindful travelers seeking beauty in simplicity.",
      spaceDescription:
        "Our Muji-inspired home in Eastwood Global Plaza Luxury Residence is thoughtfully designed for comfort, calm, and quiet luxury. Guests enjoy full access to premium building amenities like the infinity pool (best enjoyed from 7PM - 10PM for city lights), fitness pool and jacuzzi, gym, sauna and spa, day care center and outdoor playground for kids, sun deck lounge, and hammock garden.",
      guestsAmenities: [
        " • Smart Entry: MGS ELITE PRO Smart Lock for seamless check-in.",
        ' • Entertainment: 55" TCL Google TV with Netflix, HBO Max, Disney+, Amazon Prime, and cable.',
        " • Internet: 300 Mbps Fiber WiFi, ideal for remote work and streaming.",
        " • Comfort: Centralized AC with ceiling fan, spacious king bed, full-size futon bed, ultra-comfy sofa, and a daybed for reading or relaxing.",
        " • Workspace: Dedicated desk for working.",
        " • Fun & Cozy Touches: Board games, card games, and plushies for pets.",
        " • Kitchen: Fully equipped with cookware, tableware, teaware, Condura Inverter Fridge, SAMSUNG 4-in-1 Smart Oven (air fryer, microwave, oven, toaster), B Coffee Neo machine (with 4 complimentary pods), KYOWA rice cooker, and electric kettle.",
        " • Bathroom Essentials: Shower heater, hairdryer, towels, dental kit, and complete toiletries.",
        " • Laundry: TCL front-load washer and dryer with complimentary laundry capsules.",
        " • Closet: Includes hangers, steamer/iron and ironing bed.",
      ],
      guestsPreferenceList: [
        "✔️ Clean, quiet, and well-maintained",
        "✔️ Seamless check-in with responsive host",
        "✔️ Ideal for travelers, families, couples, business trips and WFH stays",
        "✔️ Tastefully designed. We got everything you need and nothing you don’t.",
      ],
      guestsPreferenceFooterNote:
        "Book your stay and see why Kirei House - Ito is one of Eastwood’s most-loved homes.",
      guestsAccessSubtitle:
        "Kirei House - Ito offers access to premium amenities designed for relaxation, wellness, and leisure:",
      guestsAccessList: [
        " • Infinity Pool",
        " • Fitness Pool & Jacuzzi",
        " • Fully Equipped Gym",
        " • Indoor Sauna & Spa",
        " • Day Care Center & Outdoor Playground",
        " • Hammock Garden & Sun Deck Lounge.",
      ],
      amenityFeesDescription:
        "Eastwood Global Plaza facilities require a usage fee per person, per day to be paid at the Admin Office.",
      amenityFeeItems: [
        " • Swimming Pools & Gym P500",
        " • Swimming Pools & Day Care Center P500",
        " • Sauna P500",
      ],
      importantNotesList: [
        " • Registered guests need to pay P250 registration fee as mandated by PMO.",
        " • Unregistered guests are not allowed.",
        " • CLAYGO (Clean As You Go) is strictly observed.",
        " • Check-in is from 3PM to 10PM; check-out is at 12:00 PM.",
        " • Quiet hours are from 10:00 PM to 8:00 AM.",
        " • Smoking and illegal substances are strictly prohibited.",
        " • No additional guests beyond your booking are allowed.",
        " • No loud or unruly parties. This is a peaceful space meant for rest and relaxation.,",
        "Please refer to the House Rules for the complete guidelines.",
      ],
      otherNotesDescription:
        "Eastwood City is within walking distance to shopping malls, convenience stores, groceries, restaurants, and entertainment such as bowling alley, billiards, dog parks, fitness gyms, food bazaars, movie theater, nightlife, and many more.",
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
    activeMapUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d816.8502546510437!2d121.0808228177933!3d14.608080028428878!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b94bae284457%3A0x556240a3da88002a!2sEastwood%20Global%20Plaza%20Luxury%20Residence%2C%20Palm%20Tree%20Avenue%2C%20Bagumbayan%20Quezon%20City%201800!5e0!3m2!1sen!2ssg!4v1751794979901!5m2!1sen!2ssg",
    bookingLinks: {
      airbnb: "https://www.airbnb.com/rooms/1364997919482714933",
      booking:
        "https://www.booking.com/hotel/ph/king-suite-eastwood-global-plaza-high-floor-quezon-city.html",
    },
    icsUrl:
      "https://www.airbnb.com.sg/calendar/ical/1364997919482714933.ics?s=663892ccaa5dabea43e13966feabc6e1",
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
              ? "text-lg md:text-xl text-left  font-headline mb-8 tracking-wide"
              : "text-lg md:text-xl text-center text-justify-center  font-headline mb-8 tracking-wide"
          }
        >
          ROOMS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {galleryItems.map((item, index) => (
            <Card
              key={item.name}
              className="group overflow-hidden duration-300 rounded-none"
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
                      {item.unitType}
                    </h3>
                  </div>
                </div>
              </button>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <CardDescription className="text-sm text-stormy-blue">
                    {item.cardContent.location}
                  </CardDescription>

                  <div className="text-sm  text-black">
                    {item.cardContent.guests} • {item.cardContent.bedrooms} •{" "}
                    {item.cardContent.beds} • {item.cardContent.bathrooms}{" "}
                  </div>

                  <div className="text-lg font-semibold text-stormy-blue"></div>
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
            "overflow-y-auto p-0 mx-0 md:mx-64 rounded-t-lg ",
            isMobile ? "h-[95dvh] pb-safe pt-safe-top" : "h-[95vh]",
            // Style the default close button
            "[&>button]:absolute [&>button]:z-[60]  [&>button]:bg-transparent [&>button]:border [&>button]:border-transparent [&>button]:shadow-lg",
            isMobile
              ? "[&>button]:top-4 [&>button]:right-4 [&>button]:mt-safe-top [&>button]:h-5 [&>button]:w-5"
              : "[&>button]:top-6 [&>button]:right-6 [&>button]:h-5 [&>button]:w-5"
          )}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
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
                            <h2 className="text-sm md:text-md flex font-normal md:font-normal justify-left font-headline mb-4">
                              LOCATION
                            </h2>
                            <div className="id gallery-map ">
                              <MapSection
                                mapEmbedUrl={activeItem.activeMapUrl}
                              />
                            </div>
                            <div className="space-y-6 pt-4">
                              {/* Address Section */}
                              <AddressSection
                                address={activeItem.cardContent.location}
                              />

                              {/* Nearby Places Section */}
                              <NearbyPlacesSection
                                nearbyPlaces={nearbyPlaces}
                              />
                            </div>
                          </div>
                        ) : null;
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            )}
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
