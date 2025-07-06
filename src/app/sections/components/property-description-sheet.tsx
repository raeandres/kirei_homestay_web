"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/app/ui/sheet";
import { X } from "lucide-react";

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

interface PropertyDescriptionSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  propertyName: string;
  galleryContent: GalleryContent;
}

export function PropertyDescriptionSheet({
  isOpen,
  onOpenChange,
  propertyName,
  galleryContent,
}: PropertyDescriptionSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
        {/* Sticky Close Button */}
        {/* <button
          onClick={() => onOpenChange(false)}
          className="fixed top-4 right-4 z-50 bg-white border border-gray-300 rounded-full p-2 shadow-lg hover:bg-gray-50"
          aria-label="Close"
        >
          <X className="h-4 w-4 text-gray-600" />
        </button> */}

        <div className="p-6">
          <SheetHeader>
            <SheetTitle className="text-lg font-medium">
              {propertyName}
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-6 text-sm text-muted-foreground">
            <p className="id bottomsheet-property-description leading-relaxed ">
              {galleryContent.propertyDescription}
            </p>

            <div>
              {galleryContent.spaceDescription.length > 0 && (
                <h5 className="font-medium text-foreground mb-2">The Space</h5>
              )}
              <p className="id bottomsheet-space-description leading-relaxed mb-4">
                {galleryContent.spaceDescription}
              </p>
              <div className="id bottomsheet-amenities my-8">
                <h5 className="font-medium text-foreground mb-2">
                  IN-UNIT FEATURES & AMENITIES
                </h5>

                <div className="id bottomsheet-amenities-description leading-relaxed mb-4">
                  {galleryContent.guestsAmenities
                    .filter((item) => item.trim() !== "")
                    .map((item, index) => (
                      <p key={index} className="mb-1">
                        {item.trim()}
                      </p>
                    ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6" />

            <div className="id bottomsheet-guests-preference my-8">
              <h5 className="font-medium text-foreground mb-2">
                WHY GUESTS LOVE KIREI
              </h5>
              <div className="id bottomsheet-guests-preference-list leading-relaxed mb-4">
                {galleryContent.guestsPreferenceList
                  .filter((item) => item.trim() !== "")
                  .map((item, index) => (
                    <p key={index} className="mb-1">
                      {item.trim()}
                    </p>
                  ))}
              </div>
              <div className="id bottomsheet-guests-preference-footer-note leading-relaxed mb-4">
                {galleryContent.guestsPreferenceFooterNote}
              </div>
            </div>

            <div className="id bottomsheet-guest-access my-8">
              <h4 className="font-medium text-foreground mb-2">GUEST ACCESS</h4>
              <p className="leading-relaxed mb-2">
                {galleryContent.guestsAccessSubtitle}
              </p>
              <div className="id bottomsheet-guest-access-description leading-relaxed mb-4">
                {galleryContent.guestsAccessList
                  .filter((item) => item.trim() !== "")
                  .map((item, index) => (
                    <p key={index} className="mb-0">
                      {item.trim()}
                    </p>
                  ))}
              </div>
            </div>

            <div className="id bottomsheet-other-notes my-8">
              <h5 className="font-medium text-foreground mb-2">
                Things to note
              </h5>
              <p className="id bottomsheet-other-notes-description leading-relaxed">
                {galleryContent.otherNotesDescription}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-black my-6" />

            {/* Amenity Fees conditional rendering */}
            {galleryContent.amenityFeesDescription &&
              galleryContent.amenityFeeItems.length > 0 && (
                <div className="id bottomsheet-amenity-fees my-8">
                  <h5 className="id bottomsheet-amenity-fees-title font-medium text-foreground mb-2">
                    AMENITY FEES
                  </h5>
                  <p className="id bottomsheet-amenity-fees-description font-medium leading-relaxed mb-2">
                    {galleryContent.amenityFeesDescription}
                  </p>

                  <div className="id bottomsheet-amenity-fees-description px-8 leading-relaxed mb-4">
                    {galleryContent.amenityFeeItems
                      .filter((item) => item.trim() !== "")
                      .map((item, index) => (
                        <p key={index} className="mb-1">
                          {item.trim()}
                        </p>
                      ))}
                  </div>
                </div>
              )}
            <div id="bottomsheet-important-notes my-8">
              <h5 className="font-medium text-foreground mb-2">
                IMPORTANT NOTES
              </h5>
              <div className="id bottomsheet-important-notes-description px-8 leading-relaxed mb-2">
                {galleryContent.importantNotesList
                  .filter((item) => item.trim() !== "")
                  .map((item, index) => (
                    <p key={index} className="mb-1">
                      {item.trim()}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
