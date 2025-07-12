"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/app/ui/button";
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
import { useDevice } from "@/hooks/use-device";

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

  const { isMobile } = useDevice();

  useEffect(() => {
    // Update images based on device type
    if (isMobile) {
      setImagesToDisplay(portraitImages);
    } else {
      setImagesToDisplay(landscapeImages);
    }
  }, [isMobile]);

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
      {/* Luxury gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50 z-[2]" />

      {/* Hero content */}
      <div className="relative z-[3] flex flex-col items-center justify-center h-full text-center text-white px-4 py-8">
        {/* Main heading with luxury typography */}
        <div className="space-y-4 mb-12">
          <h1 className="text-luxury-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.15em] font-headline">
            <span className="block animate-fade-in-up stagger-1 [animation-fill-mode:both]">
              SLOW
            </span>
            <span className="block animate-fade-in-up stagger-2 [animation-fill-mode:both]">
              INTENTIONAL
            </span>
            <span className="block animate-fade-in-up stagger-3 [animation-fill-mode:both]">
              LIVING
            </span>
          </h1>

          {/* Elegant subtitle */}
          <p className="text-luxury-light text-lg sm:text-xl md:text-2xl tracking-[0.08em] max-w-2xl mx-auto animate-fade-in-up stagger-4 [animation-fill-mode:both]">
            Experience mindful hospitality in the heart of Quezon City
          </p>
        </div>

        {/* Luxury CTA button */}
        <div className="animate-fade-in-up stagger-5 [animation-fill-mode:both]">
          <Link href="#gallery">
            <Button
              size="lg"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-luxury px-8 py-4 text-base tracking-[0.05em] font-light rounded-full shadow-luxury"
            >
              <span>Discover Our Spaces</span>
              <ChevronDown className="ml-3 h-5 w-5 animate-luxury-float" />
            </Button>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in-up [animation-delay:1.5s] [animation-fill-mode:both]">
          <div className="flex flex-col items-center space-y-2 text-white/70">
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/50"></div>
            <ChevronDown className="h-4 w-4 animate-luxury-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
