"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react"; // Added X icon

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
    name: "1 B e d r o o m",
    coverImage: {
      src: "/kirei_2/gallery/livingroom/living_kitchen_1.webp",
      alt: "Kirei-ito",
      hint: "Minimalist 1 bedroom suite",
    },
    images: [
      // Living Room
      {
        src: "/kirei_2/gallery/livingroom/living_sofa_cp.webp",
        alt: "Living Room - Kirei 2",
        hint: "Kirei 2 - living 1",
      },
      {
        src: "/kirei_2/gallery/bedroom/bedroom_front_1.webp",
        alt: "Bedroom",
        hint: "minimalist bedroom",
      },
      {
        src: "/kirei_2/gallery/livingroom/living_angle_1.webp",
        alt: "Living Room - View 2",
        hint: "Kirei 2 - living 2",
      },
      {
        src: "/kirei_2/gallery/livingroom/living_dining_cp.webp",
        alt: "Living Room - View 3",
        hint: "Kirei 2 - living 3",
      },
      {
        src: "/kirei_2/gallery/livingroom/living_kitchen_1.webp",
        alt: "Living Room - View 3",
        hint: "Kirei 2 - living 4",
      },
      // Bedroom
      {
        src: "/kirei_2/gallery/bedroom/bed_window_angle_2_cp.webp",
        alt: "Bed Room - View 1",
        hint: "Kirei 2 - Bed 1",
      },
      {
        src: "/kirei_2/gallery/bedroom/bed_window_cp.webp",
        alt: "Bed Room - View 2",
        hint: "Kirei 2 - Bed 2",
      },
      {
        src: "/kirei_2/gallery/bedroom/bed_window_left_cp.webp",
        alt: "Bed Room - View 3",
        hint: "Kirei 2 - Bed 3",
      },
      {
        src: "/kirei_2/gallery/bedroom/bed_window_right_cp.webp",
        alt: "Bed Room - View 4",
        hint: "Kirei 2 - Bed 4",
      },
      {
        src: "/kirei_2/gallery/bedroom/bedroom_front_1.webp",
        alt: "Bed Room - View 5",
        hint: "Kirei 2 - Bed 5",
      },
      {
        src: "/kirei_2/gallery/bedroom/bedroom_front_2.webp",
        alt: "Bed Room - View 6",
        hint: "Kirei 2 - Bed 6",
      },
      {
        src: "/kirei_2/gallery/bedroom/bedroom_right_angle_1.webp",
        alt: "Bed Room - View 7",
        hint: "Kirei 2 - Bed 7",
      },
      // Kitchen
      {
        src: "/kirei_2/gallery/kitchen/dining_angle_1.webp",
        alt: "Kitchen  - View 1",
        hint: "Kirei 2 - Kitchen 1",
      },
      {
        src: "/kirei_2/gallery/kitchen/dining_plates_chair_cp.webp",
        alt: "Kitchen  - View 2",
        hint: "Kirei 2 - Kitchen 2",
      },
      {
        src: "/kirei_2/gallery/kitchen/dining_plates_cp.webp",
        alt: "Kitchen  - View 3",
        hint: "Kirei 2 - Kitchen 3",
      },
      {
        src: "/kirei_2/gallery/kitchen/kitchen_1.webp",
        alt: "Kitchen  - View 4",
        hint: "Kirei 2 - Kitchen 4",
      },
      {
        src: "/kirei_2/gallery/kitchen/kitchen_plates.webp",
        alt: "Kitchen  - View 6",
        hint: "Kirei 2 - Kitchen 6",
      },
      {
        src: "/kirei_2/gallery/kitchen/oven_angle.webp",
        alt: "Kitchen  - View 7",
        hint: "Kirei 2 - Kitchen 7",
      },
      {
        src: "/kirei_2/gallery/kitchen/rice_cooker.webp",
        alt: "Kitchen  - View 8",
        hint: "Kirei 2 - Kitchen 8",
      },
      {
        src: "/kirei_2/gallery/kitchen/stove_angle.webp",
        alt: "Kitchen  - View 9",
        hint: "Kirei 2 - Kitchen 9",
      },
      // Bathroom
      {
        src: "/kirei_2/gallery/bathroom/toilet_and_bath_cp.webp",
        alt: "Bath  - View 1",
        hint: "Kirei 2 - Laundry 1",
      },
      // Laundry
      {
        src: "/kirei_2/gallery/laundry/laundry_1.webp",
        alt: "Laundry  - View 1",
        hint: "Kirei 2 - Laundry 1",
      },
      {
        src: "/kirei_2/gallery/laundry/laundry_2jpg.webp",
        alt: "Laundry  - View 2",
        hint: "Kirei 2 - Laundry 2",
      },
      {
        src: "/kirei_2/gallery/laundry/laundry_angle_cp.webp",
        alt: "Laundry  - View 3",
        hint: "Kirei 2 - Laundry 3",
      },
      {
        src: "/kirei_2/gallery/laundry/laundry_front.webp",
        alt: "Laundry  - View 4",
        hint: "Kirei 2 - Laundry 4",
      },
      // Amenities
      {
        src: "/kirei_2/amenities/converted_0005.webp",
        alt: "Amenities  - View 1",
        hint: "Kirei 2 - Amenities 1",
      },
      {
        src: "/kirei_2/amenities/converted_0003.webp",
        alt: "Amenities  - View 2",
        hint: "Kirei 2 - Amenities 2",
      },
      {
        src: "/kirei_2/amenities/converted_0002.webp",
        alt: "Amenities  - View 3",
        hint: "Kirei 2 - Amenities 3",
      },
    ],
  },
  {
    name: "S t u d i o",
    coverImage: {
      src: "/kirei_1/gallery/livingroom/converted_0013.webp",
      alt: "Kirei",
      hint: "Minimalist studio bedroom suite",
    },
    images: [
      {
        src: "/kirei_1/hero/converted_0002.webp",
        alt: "Living Room - View 1",
        hint: "Kirei 1 - living 1",
      },
      {
        src: "/kirei_1/gallery/livingroom/converted_0002.webp",
        alt: "Living Room - View 1",
        hint: "Kirei 1 - living 1",
      },

      {
        src: "/kirei_1/gallery/livingroom/converted_0022.webp",
        alt: "Living Room - View 2",
        hint: "Kirei 1 - living 2",
      },
      {
        src: "/kirei_1/gallery/bedroom/converted_0002.webp",
        alt: "Living Room - View 2",
        hint: "Kirei 1 - living 2",
      },
      {
        src: "/kirei_1/gallery/workstation/converted_0000.webp",
        alt: "Living Room - View 6",
        hint: "Kirei 1 - living 6",
      },

      // Kitchen
      {
        src: "/kirei_1/gallery/kitchen/converted_0002.webp",
        alt: "Kitchen 1 - View 1",
        hint: "Kirei 1 - kitchen 5",
      },
      {
        src: "/kirei_1/gallery/kitchen/converted_0014.webp",
        alt: "Kitchen Room - View 4",
        hint: "Kirei 1 - Kitchen view 4",
      },
      {
        src: "/kirei_1/gallery/kitchen/converted_0004.webp",
        alt: "Kitchen Room - View 4",
        hint: "Kirei 1 - Kitchen view 4",
      },
      {
        src: "/kirei_1/gallery/kitchen/food/converted_0000.webp",
        alt: "Kitchen Room - View 1",
        hint: "Kirei 1 - Food view 1",
      },
      {
        src: "/kirei_1/gallery/kitchen/food/converted_0001.webp",
        alt: "Kitchen Room - View 2",
        hint: "Kirei 1 - Food view 1",
      },
      {
        src: "/kirei_1/gallery/kitchen/food/converted_0002.webp",
        alt: "Kitchen Room - View 3",
        hint: "Kirei 1 - Food view 1",
      },
      {
        src: "/kirei_1/gallery/kitchen/food/converted_0003.webp",
        alt: "Kitchen Room - View 4",
        hint: "Kirei 1 - Food view 1",
      },
      {
        src: "/kirei_1/gallery/kitchen/food/converted_0005.webp",
        alt: "Kitchen Room - View 5",
        hint: "Kirei 1 - Food view 1",
      },

      // Bathroom
      {
        src: "/kirei_1/gallery/bathroom/converted_0001.webp",
        alt: "Gym Room 2 - View 2",
        hint: "Kirei 1 - Amenities 2",
      },
      {
        src: "/kirei_1/gallery/bathroom/converted_0002.webp",
        alt: "Gym Room 3 - View 3",
        hint: "Kirei 1 - Amenities 3",
      },

      // Amenities
      {
        src: "/kirei_1/amenities/converted_0007.webp",
        alt: "ELG3 View - View 1",
        hint: "Kirei 1 - Amenities 1",
      },
      {
        src: "/kirei_1/amenities/converted_0000.webp",
        alt: "Gym Room - View 1",
        hint: "Kirei 1 - Amenities 1",
      },
      {
        src: "/kirei_1/amenities/converted_0001.webp",
        alt: "Gym Room 3 - View 3",
        hint: "Kirei 1 - Amenities 3",
      },
      {
        src: "/kirei_1/amenities/converted_0002.webp",
        alt: "Kids Room 1 - View 1",
        hint: "Kirei 1 - Amenities 3",
      },
      {
        src: "/kirei_1/amenities/converted_0003.webp",
        alt: "Kids Room 1 - View 1",
        hint: "Kirei 1 - Amenities 3",
      },
      {
        src: "/kirei_1/amenities/converted_0004.webp",
        alt: "Kids Room 1 - View 1",
        hint: "Kirei 1 - Amenities 3",
      },
      {
        src: "/kirei_1/amenities/converted_0005.webp",
        alt: "Kids Room 1 - View 1",
        hint: "Kirei 1 - Amenities 3",
      },
      {
        src: "/kirei_1/amenities/converted_0006.webp",
        alt: "Kids Room 1 - View 1",
        hint: "Kirei 1 - Amenities 3",
      },
    ],
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
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const openFullScreenView = (categoryIndex: number) => {
    const category = galleryItems[categoryIndex];
    setActiveGalleryImages(category.images);
    setActiveGalleryCategoryName(category.name);
    setCurrentImageIndex(0);
    setIsFullScreenViewOpen(true);
  };

  const closeFullScreenView = () => {
    setIsFullScreenViewOpen(false);
    // Optionally reset images and name after a delay to allow fade-out if implemented
    setActiveGalleryImages(null);
    setActiveGalleryCategoryName(null);
  };

  const showNextImage = () => {
    if (activeGalleryImages) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % activeGalleryImages.length
      );
    }
  };

  const showPrevImage = () => {
    if (activeGalleryImages) {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + activeGalleryImages.length) %
          activeGalleryImages.length
      );
    }
  };

  // Effect to handle Escape key for closing fullscreen
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullScreenViewOpen) {
        closeFullScreenView();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullScreenViewOpen]);

  const currentImageInFullScreen = activeGalleryImages
    ? activeGalleryImages[currentImageIndex]
    : null;

  return (
    <section id="gallery" className="py-16 md:py-24 bg-secondary/30">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl text-center font-light mb-8 font-zen-old-mincho">
          e x p l o r e
        </h2>
        <div className="grid grid-cols-2 gap-6 md:gap-8">
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
                  sizes="(max-width: 768px) 50vw, 33vw" // Should be 50vw for 2 columns
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 rounded-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-sm" />
                <div className="absolute bottom-0 left-0 p-3 md:p-4">
                  <h3 className="text-lg md:text-xl font-normal text-white font-zen-old-mincho">
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
        currentImageInFullScreen && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-2 sm:p-4 backdrop-blur-sm">
            {/* Screen reader accessible title (visually hidden) */}
            <h2 className="sr-only">
              Fullscreen image viewer: {activeGalleryCategoryName} - Image{" "}
              {currentImageIndex + 1} of {activeGalleryImages.length} -{" "}
              {currentImageInFullScreen.alt}
            </h2>

            {/* Close Button */}
            <Button
              variant="ghost"
              onClick={closeFullScreenView}
              aria-label="Close fullscreen view"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[52] p-1.5 sm:p-2 rounded-full bg-black/50 text-white hover:bg-black/75 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>

            {/* Image Container */}
            <div className="relative flex-grow w-full h-full flex items-center justify-center max-w-full max-h-full">
              <Image
                key={currentImageInFullScreen.src} // Key for re-rendering if src changes
                src={currentImageInFullScreen.src}
                alt={currentImageInFullScreen.alt}
                data-ai-hint={currentImageInFullScreen.hint}
                fill
                className="object-contain" // Use 'contain' to see the whole image
                sizes="100vw"
                priority // Prioritize loading the visible image
              />
            </div>

            {/* Info Overlay (Category Name and Count) */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 sm:top-4 z-[51] bg-black/70 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-center">
              <h3
                className="text-sm sm:text-base font-semibold font-headline"
                title={activeGalleryCategoryName}
              >
                {activeGalleryCategoryName}
              </h3>
              <p className="text-xs sm:text-sm">
                ({currentImageIndex + 1} / {activeGalleryImages.length})
              </p>
            </div>

            {/* Previous Button */}
            <Button
              variant="ghost"
              onClick={showPrevImage}
              aria-label="Previous image"
              className="absolute left-1 top-1/2 -translate-y-1/2 sm:left-2 md:left-4 z-[51] p-1.5 sm:p-2 rounded-full bg-black/50 text-white hover:bg-black/75 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
            </Button>

            {/* Next Button */}
            <Button
              variant="ghost"
              onClick={showNextImage}
              aria-label="Next image"
              className="absolute right-1 top-1/2 -translate-y-1/2 sm:right-2 md:right-4 z-[51] p-1.5 sm:p-2 rounded-full bg-black/50 text-white hover:bg-black/75 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
            </Button>
          </div>
        )}
    </section>
  );
}
