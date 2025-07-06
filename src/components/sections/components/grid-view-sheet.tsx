"use client";

import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface GalleryImage {
  src: string;
  alt: string;
  hint: string;
}

interface GridViewSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  images: GalleryImage[];
  currentImageIndex: number;
  categoryName: string;
  onImageSelect: (imageIndex: number) => void;
}

export function GridViewSheet({
  isOpen,
  onOpenChange,
  images,
  currentImageIndex,
  categoryName,
  onImageSelect,
}: GridViewSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-sm md:text-sm">
            {categoryName} - All Images
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => onImageSelect(index)}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  index === currentImageIndex
                    ? "border-primary ring-2 ring-primary ring-offset-2"
                    : "border-transparent hover:border-primary/50"
                )}
                aria-label={`View image ${index + 1}: ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  data-ai-hint={image.hint}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
                {index === currentImageIndex && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
