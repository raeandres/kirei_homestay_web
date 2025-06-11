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
import { cn } from "../../lib/utils";

const images = [
  {
    src: "/images/hero/living_1.jpg",
    alt: "Zen living room",
    hint: "modern interior",
  },
  {
    src: "/images/showcase/ceiling.jpg",
    alt: "Striking details",
    hint: "bedroom aesthetic",
  },
  {
    src: "/images/showcase/living_angle_1.jpg",
    alt: "Zen inspired living",
    hint: "Living space",
  },
  {
    src: "/images/gallery/bedroom_front_1.jpg",
    alt: "Comfortable bedroom with stunning city view",
    hint: "living room city",
  },
  {
    src: "/images/showcase/oven_angle.jpg",
    alt: "Modern kitchen with coffee machine and oven",
    hint: "modern kitchen",
  },
  {
    src: "/images/hero/bedroom_right_1.jpg",
    alt: "Bright modern bedroom with city view and desk",
    hint: "bedroom city view",
  },
  {
    src: "/images/gallery/dining_angle_1.jpg",
    alt: "Bright dining area with wooden furniture and cherry blossom centerpiece",
    hint: "dining area",
  },
];

const platformLinks = [
  {
    name: "Airbnb",
    href: "https://www.airbnb.com.sg/rooms/1364997919482714933?guests=1&adults=4&pets=2&s=67&unique_share_id=0d245e15-131c-48e4-bd7a-200c585b4fcc",
    icon: Home,
  },
  {
    name: "Booking.com",
    href: "https://www.booking.com/Share-7GiBEL",
    icon: Briefcase,
  },
  {
    name: "Agoda",
    href: "https://www.agoda.com/king-suite-eastwood-global-plaza-high-floor/hotel/all/santolan-ph.html?countryId=70&finalPriceView=2&isShowMobileAppPrice=false&cid=1922894&numberOfBedrooms=&familyMode=false&adults=2&children=1&rooms=1&maxRooms=0&checkIn=2025-06-24&isCalendarCallout=false&childAges=11&numberOfGuest=0&missingChildAges=false&travellerType=2&showReviewSubmissionEntry=false&currencyCode=PHP&isFreeOccSearch=false&tag=9865a9f0-a530-470a-95d4-d1e55cbec036&los=2&searchrequestid=12e24a4f-9739-4ef1-8335-258fe2fae56d&ds=c9pjFkO4TJQb2I9Q",
    icon: HotelIcon,
  },
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={image.src}
          className={cn(
            "absolute inset-0 w-full h-full", // Removed: transition-opacity duration-1000 ease-in-out
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
            priority={index === 0}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/30 z-[2]" />{" "}
      {/* Overlay on top of images */}
      <div className="relative z-[3] flex flex-col items-center justify-center h-full text-center text-white p-4">
        {" "}
        {/* Content on top of overlay */}
        <h1 className="text-6xl font-thin tracking-widest mb-6 font-headline animate-fade-in">
          SLOW INTENTIONAL LIVING
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 mb-8 text-xl text-white animate-fade-in animation-delay-[300ms]">
          <span className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Up to 9 guests
          </span>
          <span className="flex items-center">
            <Star className="mr-2 h-5 w-5 fill-yellow-400 text-yellow-400" />
            4.96 (53 reviews)
          </span>
        </div>
        <div className="mb-8 flex justify-center space-x-4 animate-fade-in animation-delay-[600ms]">
          {platformLinks.map((platform) => (
            <Link
              key={platform.name}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Visit Kirei Homestay on ${platform.name}`}
                className="text-white hover:bg-white/20 transition-colors duration-300 p-3 rounded-lg w-14 h-14"
              >
                <platform.icon className="h-7 w-7" />
              </Button>
            </Link>
          ))}
        </div>
        <Link href="#about">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary animate-fade-in animation-delay-[900ms]"
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
