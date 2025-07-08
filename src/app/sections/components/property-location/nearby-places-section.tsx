"use client";

import { Clock } from "lucide-react";

interface NearbyPlace {
  name: string;
  distance: string;
}

interface NearbyPlacesSectionProps {
  nearbyPlaces: NearbyPlace[];
}

export function NearbyPlacesSection({
  nearbyPlaces,
}: NearbyPlacesSectionProps) {
  return (
    <div>
      <h2 className="font-semibold text-sm flex items-center">Nearby Places</h2>
      <ul className="space-y-1 text-sm my-1">
        {nearbyPlaces.map((place) => (
          <li
            key={place.name}
            className="flex justify-between text-xs text-gray-600 text-muted-foreground font-normal"
          >
            <span>{place.name}</span>
            <span className="text-xs text-gray-600 text-muted-foreground font-normal">
              {place.distance}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
