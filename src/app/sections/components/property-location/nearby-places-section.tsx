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
      <h2 className="text-left text-justify-left font-medium tracking-tighter text-sm md:text-base lg:text-base xl:text-base 2k:text-base 4k:text-xl text-stormy-blue">
        Nearby Places
      </h2>
      <ul className="space-y-1 text-sm my-1">
        {nearbyPlaces.map((place) => (
          <li
            key={place.name}
            className="flex justify-between text-stormy-blue text-left text-justify-left tracking-tighter text-sm md:text-sm lg:text-sm xl:text-sm 2k:text-sm 4k:text-xl font-normal"
          >
            <span>{place.name}</span>
            <span className="flex justify-between text-stormy-blue text-left text-justify-lefttracking-tighter text-sm md:text-sm lg:text-sm xl:text-sm 2k:text-sm 4k:text-xl font-normal">
              {place.distance}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
