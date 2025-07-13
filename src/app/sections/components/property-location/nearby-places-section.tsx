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
      <h2 className="text-left text-justify-left font-semibold tracking-tighter text-sm md:text-lg lg:text-lg xl:text-lg 2k:text-xl 4k:text-xl text-stormy-blue">
        Nearby Places
      </h2>
      <ul className="space-y-1 text-sm my-1">
        {nearbyPlaces.map((place) => (
          <li
            key={place.name}
            className="flex justify-between text-muted-foreground font-headline text-stormy-blue text-sm md:text-sm lg:text-lg xl:text-lg 2k:text-xl 4k:text-xl"
          >
            <span>{place.name}</span>
            <span className=" text-stormy-blue text-muted-foreground font-headline text-sm md:text-sm lg:text-lg xl:text-lg 2k:text-xl 4k:text-xl">
              {place.distance}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
