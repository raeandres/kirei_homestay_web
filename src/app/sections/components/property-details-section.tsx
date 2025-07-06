"use client";

import { Button } from "@/app/ui/button";
import { CardDescription } from "@/app/ui/card";
import { MapSection } from "./property-location/map-section";

interface CardContent {
  location: string;
  guests: string;
  bedrooms: string;
  beds: string;
  bathrooms: string;
  basePriceSGD: number;
  reviews: string;
  stars: number;
}

interface GalleryContent {
  teaserDescription1: string;
  teaserDescription2: string;
  propertyDetailsTitle: string;
  propertyDescription: string;
  spaceDescription: string;
  guestsPreferenceList: string[];
  guestsPreferenceFooterNote: string;
  guestsAmenities: string[];
  guestsAccessSubtitle: string;
  guestsAccessList: string[];
  importantNotesList: string[];
  otherNotesDescription: string;
  amenityFeesDescription: string;
  amenityFeeItems: string[];
}

interface PropertyDetailsSectionProps {
  name: string;
  unitType: string;
  cardContent: CardContent;
  galleryContent: GalleryContent;
  activeMapUrl: string;
  onShowMoreClick: () => void;
}

export function PropertyDetailsSection({
  name,
  unitType,
  cardContent,
  galleryContent,
  activeMapUrl,
  onShowMoreClick,
}: PropertyDetailsSectionProps) {
  return (
    <div className="id property-details-section space-y-8">
      <div className="id property-details-info">
        <CardDescription className="text-sm text-muted-foreground">
          <h3 className="text-xl md:text-2xl font-normal mb-4">{name}</h3>
          <div className="text-sm font-medium text-muted-foreground">
            {cardContent.location}
          </div>
        </CardDescription>

        <div className="text-sm font-medium text-muted-foreground">
          {cardContent.guests} • {cardContent.bedrooms} • {cardContent.beds} •{" "}
          {cardContent.bathrooms}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6" />

        {/* Property Description - Truncated */}
        <div className="space-y-4 text-sm pb-4 text-muted-foreground">
          <p className="section: teaser-description1 leading-relaxed">
            {galleryContent.teaserDescription1}
          </p>

          <p className="section: teaser-description2 leading-relaxed">
            {galleryContent.teaserDescription2}
          </p>

          <Button
            variant="outline"
            size="sm"
            onClick={onShowMoreClick}
            className="mt-4"
          >
            Show more
          </Button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6" />
      {/* Maps section */}
      <div className="id gallery-map-section">
        <h2 className="text-sm md:text-md flex font-normal md:font-normal justify-left font-headline mb-4">
          LOCATION
        </h2>
        <div className="id gallery-map ">
          <MapSection mapEmbedUrl={activeMapUrl} />
        </div>
      </div>
    </div>
  );
}
