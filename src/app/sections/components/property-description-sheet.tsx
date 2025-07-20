"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/app/ui/sheet";
import { useDevice } from "@/hooks/use-device";
import { X } from "lucide-react";

import { Footer } from "../../layout/footer";

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
  const { isMobile } = useDevice();
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[80vh] overflow-y-auto md:mx-64 rounded-t-lg"
      >
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
            <SheetTitle className="text-3xl md:text-2xl xl:text-3xl 2k:text-4xl 4k:text-7xl font-playfair-display mb-4 font-light">
              {propertyName}
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-6 text-sm text-muted-foreground">
            <p
              className="text-sm md:text-xs lg:text-sm xl:text-base 2k:text-base 4k:text-xl text-left text-stormy-blue/80 font-body font-normal leading-relaxed"
              style={
                isMobile
                  ? {
                      lineHeight: "1.5",
                      letterSpacing: "0.03em",
                      textIndent: "2rem",
                    }
                  : {
                      lineHeight: "1.3",
                      letterSpacing: "0.01em",
                      textIndent: "2rem",
                      fontSize: "0.9rem",
                    }
              }
            >
              {galleryContent.propertyDescription}
            </p>

            <div>
              {galleryContent.spaceDescription.length > 0 && (
                <h5 className="font-medium text-foreground mb-2">The Space</h5>
              )}
              <p
                className="text-sm md:text-xs lg:text-sm xl:text-base 2k:text-base 4k:text-xl text-left text-stormy-blue/80 font-body font-normal leading-relaxed"
                style={
                  isMobile
                    ? {
                        lineHeight: "1.5",
                        letterSpacing: "0.03em",
                        textIndent: "2rem",
                      }
                    : {
                        lineHeight: "1.3",
                        letterSpacing: "0.01em",
                        textIndent: "2rem",
                        fontSize: "0.9rem",
                      }
                }
              >
                {galleryContent.spaceDescription}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6" />

            <div className="id bottomsheet-guests-preference my-8">
              <h5 className="font-medium text-foreground mb-2">
                Why guests love {propertyName}
              </h5>
              <div className="id bottomsheet-guests-preference-list leading-relaxed mb-4">
                {galleryContent.guestsPreferenceList
                  .filter((item) => item.trim() !== "")
                  .map((item, index) => (
                    <p
                      key={index}
                      className="flex items-center mb-1 text-sm 2k:text-base 4k:text-xl text-left text-stormy-blue/80 font-body font-normal leading-relaxed"
                      style={
                        isMobile
                          ? {
                              lineHeight: "1.5",
                              letterSpacing: "0.01em",
                            }
                          : {
                              lineHeight: "1.3",
                              letterSpacing: "0.01em",
                              fontSize: "0.9rem",
                            }
                      }
                    >
                      {item.trim()}
                    </p>
                  ))}
              </div>
              <div className="id bottomsheet-guests-preference-footer-note leading-relaxed mb-4">
                <p
                  className="flex items-center text-sm 2k:text-base 4k:text-xl text-left text-stormy-blue/80 font-body font-normal leading-relaxed"
                  style={
                    isMobile
                      ? {
                          lineHeight: "1.5",
                          letterSpacing: "0.01em",
                        }
                      : {
                          lineHeight: "1.3",
                          letterSpacing: "0.01em",
                          fontSize: "0.9rem",
                        }
                  }
                >
                  {galleryContent.guestsPreferenceFooterNote}
                </p>
              </div>
            </div>

            <div className="id bottomsheet-guest-access my-8">
              <h4 className="font-medium text-foreground mb-2">Guest Access</h4>
              <p
                className="flex items-center mb-2 text-sm 2k:text-base 4k:text-xl text-left text-stormy-blue/80 font-body font-normal leading-relaxed"
                style={
                  isMobile
                    ? {
                        lineHeight: "1.5",
                        letterSpacing: "0.01em",
                      }
                    : {
                        lineHeight: "1.3",
                        letterSpacing: "0.01em",
                        fontSize: "0.9rem",
                      }
                }
              >
                {galleryContent.guestsAccessSubtitle}
              </p>
              <div className="id bottomsheet-guest-access-description leading-relaxed mb-4">
                {galleryContent.guestsAccessList
                  .filter((item) => item.trim() !== "")
                  .map((item, index) => (
                    <p
                      key={index}
                      className="flex items-center mb-1 text-sm 2k:text-base 4k:text-xl text-left text-stormy-blue/80 font-body font-normal leading-relaxed"
                      style={
                        isMobile
                          ? {
                              lineHeight: "1.5",
                              letterSpacing: "0.01em",
                            }
                          : {
                              lineHeight: "1.3",
                              letterSpacing: "0.01em",
                              fontSize: "0.9rem",
                            }
                      }
                    >
                      {item.trim()}
                    </p>
                  ))}
              </div>
            </div>

            <div className="id bottomsheet-other-notes my-8">
              <h5 className="font-medium text-foreground mb-2">
                Things to note
              </h5>
              <p
                className="flex items-center mb-2 text-sm 2k:text-base 4k:text-xl text-left text-stormy-blue/80 font-body font-normal leading-relaxed"
                style={
                  isMobile
                    ? {
                        lineHeight: "1.5",
                        letterSpacing: "0.01em",
                      }
                    : {
                        lineHeight: "1.3",
                        letterSpacing: "0.01em",
                        fontSize: "0.9rem",
                      }
                }
              >
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
                    Amenity Fees
                  </h5>
                  <p
                    className="flex items-center mb-2 text-sm 2k:text-base 4k:text-xl text-left text-stormy-blue/80 font-body font-normal leading-relaxed"
                    style={
                      isMobile
                        ? {
                            lineHeight: "1.5",
                            letterSpacing: "0.01em",
                          }
                        : {
                            lineHeight: "1.3",
                            letterSpacing: "0.01em",
                            fontSize: "0.9rem",
                          }
                    }
                  >
                    {galleryContent.amenityFeesDescription}
                  </p>

                  <div className="id bottomsheet-amenity-fees-description px-8 leading-relaxed mb-4">
                    {galleryContent.amenityFeeItems
                      .filter((item) => item.trim() !== "")
                      .map((item, index) => (
                        <p
                          key={index}
                          className="flex items-center mb-1 text-sm 2k:text-base 4k:text-xl text-left text-stormy-blue/80 font-body font-normal leading-relaxed"
                          style={
                            isMobile
                              ? {
                                  lineHeight: "1.5",
                                  letterSpacing: "0.01em",
                                }
                              : {
                                  lineHeight: "1.3",
                                  letterSpacing: "0.01em",
                                  fontSize: "0.9rem",
                                }
                          }
                        >
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
                    <p
                      key={index}
                      className="flex items-center mb-1 text-sm 2k:text-base 4k:text-xl text-left text-stormy-blue/80 font-body font-normal leading-relaxed"
                      style={
                        isMobile
                          ? {
                              lineHeight: "1.5",
                              letterSpacing: "0.01em",
                            }
                          : {
                              lineHeight: "1.3",
                              letterSpacing: "0.01em",
                              fontSize: "0.9rem",
                            }
                      }
                    >
                      {item.trim()}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
      <Footer />;
    </Sheet>
  );
}
