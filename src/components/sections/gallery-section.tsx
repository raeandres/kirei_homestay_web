"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryImage {
  src: string;
  alt: string;
  hint: string;
}

interface GalleryCategory {
  name: string;
  coverImage: GalleryImage;
  images: GalleryImage[];
}

const galleryItems: GalleryCategory[] = [
  {
    name: "Living Room",
    coverImage: {
      src: "/images/gallery/living_2.webp",
      alt: "Living Room",
      hint: "cozy living room",
    },
    images: [
      {
        src: "/images/gallery/living_2.webp",
        alt: "Living Room",
        hint: "cozy living room",
      },
      {
        src: "https://placehold.co/800x602.png",
        alt: "Living Room - View 2",
        hint: "modern decor",
      },
      {
        src: "https://placehold.co/800x603.png",
        alt: "Living Room - View 3",
        hint: "comfortable furniture",
      },
    ],
  },
  {
    name: "Bedroom",
    coverImage: {
      src: "/images/gallery/bedroom_front_1.webp",
      alt: "Bedroom",
      hint: "minimalist bedroom",
    },
    images: [
      {
        src: "/images/gallery/bedroom_front_1.webp",
        alt: "Bedroom",
        hint: "minimalist bedroom",
      },
      {
        src: "https://placehold.co/800x605.png",
        alt: "Bedroom - Details",
        hint: "bedroom design",
      },
    ],
  },
  {
    name: "Dining Area",
    coverImage: {
      src: "/images/hero/dining_1.webp",
      alt: "Dining Area",
      hint: "dining area",
    },
    images: [
      {
        src: "/images/hero/dining_1.webp",
        alt: "Dining Area",
        hint: "dining area",
      },
      {
        src: "https://placehold.co/800x607.png",
        alt: "Dining Ambiance",
        hint: "cozy meals",
      },
    ],
  },
  {
    name: "Kitchen",
    coverImage: {
      src: "/images/hero/kitchen_left_1.webp",
      alt: "Kitchen",
      hint: "sleek kitchen",
    },
    images: [
      {
        src: "/images/hero/kitchen_left_1.webp",
        alt: "Kitchen",
        hint: "Modern kitchen",
      },
      {
        src: "https://placehold.co/800x609.png",
        alt: "Kitchen Counter",
        hint: "kitchen setup",
      },
    ],
  },
  {
    name: "Toilet & Bathroom",
    coverImage: {
      src: "/images/gallery/toilet_and_bath_cp.webp",
      alt: "Toilet and Bathroom",
      hint: "modern bathroom",
    },
    images: [
      {
        src: "/images/gallery/toilet_and_bath_cp.webp",
        alt: "Toilet and Bathroom",
        hint: "modern bathroom",
      },
      {
        src: "https://placehold.co/800x611.png",
        alt: "Shower Area",
        hint: "bathroom features",
      },
    ],
  },
  {
    name: "Laundry Area",
    coverImage: {
      src: "/images/gallery/laundry_1.webp",
      alt: "Laundry Area",
      hint: "laundry space",
    },
    images: [
      {
        src: "/images/gallery/laundry_1.webp",
        alt: "Laundry Area",
        hint: "laundry space",
      },
    ],
  },
];

export function GallerySection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryImages, setSelectedCategoryImages] = useState<
    GalleryImage[] | null
  >(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<
    string | null
  >(null);
  const [currentImageIndexInModal, setCurrentImageIndexInModal] =
    useState<number>(0);

  const handleOpenModal = (categoryIndex: number) => {
    const category = galleryItems[categoryIndex];
    setSelectedCategoryImages(category.images);
    setSelectedCategoryName(category.name);
    setCurrentImageIndexInModal(0);
    setIsModalOpen(true);
  };

  const showNextImage = () => {
    if (selectedCategoryImages) {
      setCurrentImageIndexInModal(
        (prevIndex) => (prevIndex + 1) % selectedCategoryImages.length
      );
    }
  };

  const showPrevImage = () => {
    if (selectedCategoryImages) {
      setCurrentImageIndexInModal(
        (prevIndex) =>
          (prevIndex - 1 + selectedCategoryImages.length) %
          selectedCategoryImages.length
      );
    }
  };

  const currentImageInCollection = selectedCategoryImages
    ? selectedCategoryImages[currentImageIndexInModal]
    : null;

  return (
    <section id="gallery" className="py-16 md:py-24 bg-secondary/30">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">
          Explore Kirei
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {galleryItems.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => handleOpenModal(index)}
              className="group block w-full p-0 border-0 shadow-lg aspect-[3/2] overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label={`View images of ${item.name}`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={item.coverImage.src}
                  alt={item.coverImage.alt}
                  data-ai-hint={item.coverImage.hint}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 rounded-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-sm" />
                <div className="absolute bottom-0 left-0 p-3 md:p-4">
                  <h3 className="text-lg md:text-xl font-semibold text-white font-headline">
                    {item.name}
                  </h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {isModalOpen &&
        currentImageInCollection &&
        selectedCategoryName &&
        selectedCategoryImages && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="flex flex-col w-[95vw] max-w-[95vw] h-[90vh] max-h-[90vh] p-3">
              <DialogHeader>
                <DialogTitle className="sr-only">
                  {selectedCategoryName} - Image {currentImageIndexInModal + 1}{" "}
                  of {selectedCategoryImages.length}
                </DialogTitle>
              </DialogHeader>
              <div className="relative w-full flex-1 min-h-0 bg-muted rounded-md overflow-hidden">
                <Image
                  src={currentImageInCollection.src}
                  alt={currentImageInCollection.alt}
                  data-ai-hint={currentImageInCollection.hint}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 90vw, 95vw"
                />
              </div>
              <div className="mt-4 flex items-center justify-between gap-4 flex-shrink-0">
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
                    title={selectedCategoryName}
                  >
                    {selectedCategoryName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    ({currentImageIndexInModal + 1} /{" "}
                    {selectedCategoryImages.length})
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
