"use client";

import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface GalleryImage {
  src: string;
  alt: string;
  hint: string;
}

interface FullScreenImageSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  images: GalleryImage[];
  currentImageIndex: number;
  categoryName: string;
  onPrevImage: () => void;
  onNextImage: () => void;
}

export function FullScreenImageSheet({
  isOpen,
  onOpenChange,
  images,
  currentImageIndex,
  categoryName,
  onPrevImage,
  onNextImage,
}: FullScreenImageSheetProps) {
  const isMobile = useIsMobile();
  const currentImage = images[currentImageIndex];

  if (!currentImage) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
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
            {categoryName && currentImage
              ? `${categoryName} - ${currentImage.alt}`
              : "Full Screen Image"}
          </SheetTitle>
        </SheetHeader>
        <div className="relative w-full h-full bg-black">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            data-ai-hint={currentImage.hint}
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
            <h3 className="text-lg font-medium">{categoryName}</h3>
            <p className="text-sm opacity-90">
              {currentImageIndex + 1} of {images.length}
            </p>
          </div>

          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onPrevImage();
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
                  onNextImage();
                }}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
