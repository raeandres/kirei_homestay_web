"use client";

import { MapSection } from "./property-location-map-component";
import { AddressSection } from "./property-location-address-component";
import { NearbyPlacesSection } from "./property-location-nearby-places-component";
import { SocialMediaLinksSection } from "./property-location-social-media-links-component";

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

      <div className="space-y-6 pt-6">
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
