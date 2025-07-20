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
      <h2 className="text-left text-justify-left tracking-tighter text-xl md:text-xl lg:text-xl xl:text-base 2k:text-xl 4k:text-xl text-stormy-blue font-playfair-display">
        Nearby Places
      </h2>
      <ul>
        {nearbyPlaces.map((place) => (
          <li
            key={place.name}
            className="flex justify-between text-stormy-blue/60 text-left text-justify-left tracking-tighter text-base md:text-sm lg:text-sm xl:text-base 2k:text-base 4k:text-xl font-playfair-display"
          >
            <span>{place.name}</span>
            <span className="flex justify-between text-stormy-blue/60 text-left text-justify-lefttracking-tighter text-base md:text-sm lg:text-sm xl:text-sm 2k:text-base 4k:text-xl font-normal">
              {place.distance}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
