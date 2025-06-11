"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

const galleryItems = [
  {
    src: "/images/gallery/living_2.webp",
    alt: "Living Room",
    name: "Living Room",
    hint: "cozy living room",
  },
  {
    src: "/images/gallery/bedroom_front_1.webp",
    alt: "Bedroom",
    name: "Bedroom",
    hint: "minimalist bedroom",
  },
  {
    src: "/images/hero/dining_1.webp",
    alt: "Dining Area",
    name: "Dining Area",
    hint: "dining area",
  },
  {
    src: "/images/hero/kitchen_left_1.webp",
    alt: "Kitchen",
    name: "Kitchen",
    hint: "sleek kitchen",
  },
  {
    src: "/images/gallery/toilet_and_bath_cp.webp",
    alt: "Toilet and Bathroom",
    name: "Toilet & Bathroom",
    hint: "modern bathroom",
  },
  {
    src: "/images/gallery/laundry_1.webp",
    alt: "Laundry Area",
    name: "Laundry Area",
    hint: "laundry space",
  },
];

export function GallerySection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndexInModal, setCurrentImageIndexInModal] =
    useState<number>(0);

  const handleOpenModal = (index: number) => {
    setCurrentImageIndexInModal(index);
    setIsModalOpen(true);
  };

  const showNextImage = () => {
    setCurrentImageIndexInModal(
      (prevIndex) => (prevIndex + 1) % galleryItems.length
    );
  };

  const showPrevImage = () => {
    setCurrentImageIndexInModal(
      (prevIndex) => (prevIndex - 1 + galleryItems.length) % galleryItems.length
    );
  };

  const currentImage = galleryItems[currentImageIndexInModal];

  return (
    <section id="gallery" className="py-16 md:py-24 bg-secondary/30">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">
          Explore Kirei
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {galleryItems.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => handleOpenModal(index)}
              className="group block w-full p-0 border-0 rounded-lg shadow-lg aspect-[3/2] overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label={`View image of ${item.name}`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  data-ai-hint={item.hint}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 md:p-6">
                  <h3 className="text-xl font-semibold text-white font-headline">
                    {item.name}
                  </h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {isModalOpen && currentImage && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-3xl md:max-w-4xl lg:max-w-5xl w-[90vw] p-4 md:p-6">
            <DialogHeader>
              <DialogTitle className="sr-only">
                {currentImage.name} - Image {currentImageIndexInModal + 1} of{" "}
                {galleryItems.length}
              </DialogTitle>
            </DialogHeader>
            <div className="relative w-full aspect-[3/2] max-h-[75vh] bg-muted rounded-md overflow-hidden mx-auto">
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                data-ai-hint={currentImage.hint}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 80vw, 1280px"
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={showPrevImage}
                aria-label="Previous image"
                className="shrink-0"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <div className="text-center overflow-hidden">
                <h3
                  className="text-base md:text-lg font-semibold font-headline truncate"
                  title={currentImage.name}
                >
                  {currentImage.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  ({currentImageIndexInModal + 1} / {galleryItems.length})
                </p>
              </div>
              <Button
                variant="outline"
                onClick={showNextImage}
                aria-label="Next image"
                className="shrink-0"
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
