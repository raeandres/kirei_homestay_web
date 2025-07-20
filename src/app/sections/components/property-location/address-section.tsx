"use client";

import { MapPin } from "lucide-react";

interface AddressSectionProps {
  address: string;
}

export function AddressSection({ address }: AddressSectionProps) {
  return (
    <div className="flex">
      <div>
        <h2 className="text-left text-justify-left tracking-tighter text-xl md:text-xl lg:text-xl xl:text-base 2k:text-xl 4k:text-xl text-stormy-blue font-playfair-display">
          Address
        </h2>
        <p className="flex justify-between text-stormy-blue/60 text-left text-justify-left tracking-tighter text-base md:text-sm lg:text-sm xl:text-base 2k:text-base 4k:text-xl font-playfair-display">
          {address}
        </p>
      </div>
    </div>
  );
}
