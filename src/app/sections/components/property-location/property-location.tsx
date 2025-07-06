"use client";

import { MapSection } from "./map-section";
import { AddressSection } from "./address-section";
import { NearbyPlacesSection } from "./nearby-places-section";
import { SocialMediaLinksSection } from "./social-media-links-section";

interface NearbyPlace {
  name: string;
  distance: string;
}

interface SocialMediaLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface PropertyLocationProps {
  mapEmbedUrl: string;
  address: string;
  nearbyPlaces: NearbyPlace[];
  socialMediaLinks: SocialMediaLink[];
}

export function PropertyLocation({
  mapEmbedUrl,
  address,
  nearbyPlaces,
  socialMediaLinks,
}: PropertyLocationProps) {
  return (
    <div className="space-y-0">
      {/* Map Section */}
      <MapSection mapEmbedUrl={mapEmbedUrl} />

      <div className="space-y-6 pt-4">
        {/* Address Section */}
        <AddressSection address={address} />

        {/* Nearby Places Section */}
        <NearbyPlacesSection nearbyPlaces={nearbyPlaces} />

        {/* Social Media Links Section */}
        <SocialMediaLinksSection socialMediaLinks={socialMediaLinks} />
      </div>
    </div>
  );
}
