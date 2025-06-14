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

const images = [
  {
    src: "/kirei_2/hero/living_1.webp",
    alt: "Zen living room",
    hint: "modern interior",
  },
  {
    src: "/kirei_2/hero/converted_0008.webp",
    alt: "Minimalist daybed 1 bedroom",
    hint: "Efficient minimalist daybed",
  },
  {
    src: "/kirei_1/hero/converted_0000.webp",
    alt: "Focus dining lamp for intimate conversations",
    hint: "center lamp dining",
  },
  {
    src: "/kirei_2/hero/converted_0003.webp",
    alt: "Minimalist workstation 1 bedroom",
    hint: "Efficient minimalist workstation",
  },
  {
    src: "/kirei_2/hero/ceiling.webp",
    alt: "Striking details",
    hint: "ceiling aesthetic",
  },
  {
    src: "/kirei_2/hero/ramen_2.webp",
    alt: "Pet friendly",
    hint: "Pet friendly",
  },
  {
    src: "/kirei_2/hero/dining_1.webp",
    alt: "Modern kitchen",
    hint: "modern kitchen",
  },
  {
    src: "/kirei_1/gallery/bedroom/bed_right_angle.webp",
    alt: "Plates set",
    hint: "Complete dining materials",
  },
  {
    src: "/kirei_2/hero/bedroom_right_1.webp",
    alt: "Bright modern bedroom with city view and desk",
    hint: "bedroom city view",
  },
  {
    src: "/kirei_2/hero/converted_0007.webp",
    alt: "Bright modern bedroom with city view and desk",
    hint: "bedroom city view",
  },
  {
    src: "/kirei_1/hero/converted_0001.webp",
    alt: "Minimalist bedroom studio",
    hint: "Japanese inspired bedroom 2",
  },
  {
    src: "/kirei_1/gallery/bedroom/converted_0006.webp",
    alt: "Minimalist bedroom studio",
    hint: "Japanese inspired bedroom 3",
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
            priority={index === 0}
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
