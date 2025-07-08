"use client";

import type { LucideIcon } from "lucide-react";
import { useId } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Card, CardContent, CardHeader } from "@/app/ui/card";
import { Button } from "@/app/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/app/ui/dialog";
import { ScrollArea } from "@/app/ui/scroll-area";

interface Amenity {
  name: string;
  icon: LucideIcon;
}

interface AmenitiesCardProps {
  amenities: Amenity[];
  isMobileView: boolean;
  previewCount?: number;
}

export function AmenitiesCard({
  amenities,
  isMobileView,
  previewCount = 5,
}: AmenitiesCardProps) {
  const generatedDialogTitleId = useId();

  const amenitiesToDisplayOnPage =
    isMobileView && amenities.length > previewCount
      ? amenities.slice(0, previewCount)
      : amenities;

  return (
    <Card className="id amenities-card shadow-lg">
      <CardHeader className="pb-0"></CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-1 gap-y-0">
          {amenitiesToDisplayOnPage.map((amenity) => {
            const AmenityIconComponent = amenity.icon;
            return (
              <div
                key={amenity.name}
                className="flex items-center text-sm md:text-sm lg:text-sm text-center text-gray-600 font-normal tracking-tight leading-relaxed m-2 rounded-lg hover:bg-muted/50 transition-colors duration-200 ease-in-out"
              >
                <AmenityIconComponent className="mr-3 h-5 w-5 text-accent flex-shrink-0" />
                <span>{amenity.name}</span>
              </div>
            );
          })}
        </div>

        {isMobileView && amenities.length > previewCount && (
          <div className="mt-6 flex justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto text-xs md:text-sm lg:text-sm text-center text-gray-600 font-normal tracking-tight leading-relaxed m-2"
                >
                  Show all {amenities.length} amenities
                </Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-md md:max-w-lg lg:max-w-xl"
                aria-labelledby={generatedDialogTitleId}
              >
                <VisuallyHidden>
                  <DialogTitle>All Available Amenities</DialogTitle>
                </VisuallyHidden>

                <ScrollArea className="max-h-[60vh] pr-3 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-1 gap-y-2">
                    {amenities.map((amenity) => {
                      const AmenityIconComponent = amenity.icon;
                      return (
                        <div
                          key={amenity.name + "-dialog"}
                          className="flex items-center text-sm md:text-sm lg:text-sm text-center text-gray-600 font-normal tracking-tight leading-relaxed m-1 rounded-lg hover:bg-muted/50 transition-colors duration-200 ease-in-out"
                        >
                          <AmenityIconComponent className="mr-3 h-5 w-5 text-accent flex-shrink-0" />
                          <span>{amenity.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
