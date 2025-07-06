"use client";

import { Clock } from "lucide-react";

interface NearbyPlace {
  name: string;
  distance: string;
}

interface NearbyPlacesSectionProps {
  nearbyPlaces: NearbyPlace[];
}

export function NearbyPlacesSection({ nearbyPlaces }: NearbyPlacesSectionProps) {
  return (
    <div>
      <h2 className="font-semibold text-sm flex items-center">
        <Clock className="mr-4 h-5 w-5 text-accent mt-1 shrink-0" />
        Nearby Places
      </h2>
      <ul className="space-y-1 text-sm px-9">
        {nearbyPlaces.map((place) => (
          <li
            key={place.name}
            className="flex justify-between text-muted-foreground"
          >
            <span>{place.name}</span>
            <span className="font-medium text-foreground/90">
              {place.distance}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
