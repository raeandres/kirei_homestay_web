"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ChevronDown,
  Users,
  Star,
  Home,
  Briefcase,
  Hotel as HotelIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const landscapeImages = [
  // Kirei 1
  {
    src: "/hero/kirei_1/landscape/converted_0000.webp",
    alt: "Modern living room",
    hint: "modern interior",
  },
  {
    src: "/hero/kirei_1/landscape/converted_0001.webp",
    alt: "Cozy bedroom",
    hint: "bedroom aesthetic",
  },
  {
    src: "/hero/kirei_1/landscape/converted_0002.webp",
    alt: "Bright dining area",
    hint: "dining space",
  },
  {
    src: "/hero/kirei_1/landscape/converted_0003.webp",
    alt: "Bright dining area",
    hint: "dining space",
  },
  {
    src: "/hero/kirei_1/landscape/converted_0004.webp",
    alt: "Comfortable modern living area with city view",
    hint: "living room city",
  },

  // Kirei 2
  {
    src: "/hero/kirei_2/landscape/converted_0000.webp",
    alt: "Modern kitchen with coffee machine and oven",
    hint: "modern kitchen",
  },
  {
    src: "/hero/kirei_2/landscape/converted_0001.webp",
    alt: "Bright modern bedroom with city view and desk",
    hint: "bedroom city view",
  },
  {
    src: "/hero/kirei_2/landscape/converted_0002.webp",
    alt: "Bright dining area with wooden furniture and cherry blossom centerpiece",
    hint: "dining area",
  },
  {
    src: "/hero/kirei_2/landscape/converted_0003.webp",
    alt: "Bright dining area with wooden furniture and cherry blossom centerpiece",
    hint: "dining area",
  },
  {
    src: "/hero/kirei_2/landscape/converted_0004.webp",
    alt: "Bright dining area with wooden furniture and cherry blossom centerpiece",
    hint: "dining area",
  },
];

const portraitImages = [
  // Kirei 1
  {
    src: "/hero/kirei_1/portrait/converted_0000.webp",
    alt: "Kirei Homestay entryway (portrait)",
    hint: "entryway portrait",
  },
  {
    src: "/hero/kirei_1/portrait/converted_0001.webp",
    alt: "Bedroom detail (portrait)",
    hint: "bedroom detail portrait",
  },
  {
    src: "/hero/kirei_1/portrait/converted_0002.webp",
    alt: "Living area accent (portrait)",
    hint: "living accent portrait",
  },
  {
    src: "/hero/kirei_1/portrait/converted_0003.webp",
    alt: "Kitchenette view (portrait)",
    hint: "kitchenette portrait",
  },
  {
    src: "/hero/kirei_1/portrait/converted_0004.webp",
    alt: "Kitchenette view (portrait)",
    hint: "kitchenette portrait",
  },
  // Kirei 2
  {
    src: "/hero/kirei_2/portrait/converted_0000.webp",
    alt: "Kitchenette view (portrait)",
    hint: "kitchenette portrait",
  },
  {
    src: "/hero/kirei_2/portrait/converted_0001.webp",
    alt: "Kitchenette view (portrait)",
    hint: "kitchenette portrait",
  },
  {
    src: "/hero/kirei_2/portrait/converted_0002.webp",
    alt: "Kitchenette view (portrait)",
    hint: "kitchenette portrait",
  },
  {
    src: "/hero/kirei_2/portrait/converted_0003.webp",
    alt: "Kitchenette view (portrait)",
    hint: "kitchenette portrait",
  },
  {
    src: "/hero/kirei_2/portrait/converted_0004.webp",
    alt: "Kitchenette view (portrait)",
    hint: "kitchenette portrait",
  },
];

const platformLinks = [
  { name: "Airbnb", href: "https://www.airbnb.com", icon: Home },
  { name: "Booking.com", href: "https://www.booking.com", icon: Briefcase },
  { name: "Agoda", href: "https://www.agoda.com", icon: HotelIcon },
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesToDisplay, setImagesToDisplay] = useState(landscapeImages); // Default to landscape

  const isMobileResult = useIsMobile(); // This is the raw result from the hook

  useEffect(() => {
    // This effect runs after mount and when isMobileResult changes.
    // isMobileResult will be undefined on server and then boolean on client.
    if (typeof isMobileResult === "boolean") {
      if (isMobileResult) {
        setImagesToDisplay(portraitImages);
      } else {
        setImagesToDisplay(landscapeImages);
      }
    }
  }, [isMobileResult]);

  useEffect(() => {
    if (imagesToDisplay.length === 0) return; // Prevent errors if imagesToDisplay is empty

    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesToDisplay.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex, imagesToDisplay]); // Re-run if currentIndex or imagesToDisplay changes

  // Fallback for initial render or if images are not ready
  if (imagesToDisplay.length === 0) {
    return (
      <section
        id="hero"
        className="relative h-screen w-full overflow-hidden bg-muted"
      >
        {/* Optional: Add a loading spinner or placeholder content here */}
      </section>
    );
  }

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {imagesToDisplay.map((image, index) => (
        <div
          key={image.src} // Use image.src as key since it should be unique
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out",
            index === currentIndex
              ? "opacity-100 z-[1]"
              : "opacity-0 z-0 pointer-events-none"
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            data-ai-hint={image.hint}
            fill
            sizes="100vw"
            className="object-cover"
            priority={index === 0} // Prioritize the first image of the current list
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/30 z-[2]" />{" "}
      {/* Overlay on top of images */}
      <div className="relative z-[3] flex flex-col items-center justify-center h-full text-center text-white p-4">
        {" "}
        {/* Content on top of overlay */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-thin tracking-widest mb-6 font-headline animate-fade-in">
          SLOW
          <br />
          INTENTIONAL
          <br />
          LIVING
        </h1>
        <Link href="#about">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent border-transparent text-white hover:bg-transparent hover:text-white animate-fade-in animation-delay-[1800ms]"
          >
            <span>
              Explore More <ChevronDown className="ml-2 h-5 w-5" />
            </span>
          </Button>
        </Link>
      </div>
    </section>
  );
}
