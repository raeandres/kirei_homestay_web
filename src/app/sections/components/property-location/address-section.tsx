"use client";

import { MapPin } from "lucide-react";

interface AddressSectionProps {
  address: string;
}

export function AddressSection({ address }: AddressSectionProps) {
  return (
    <div className="flex">
      <div>
        <h2 className="text-left text-justify-left font-semibold tracking-tighter text-sm md:text-lg lg:text-lg xl:text-lg 2k:text-xl 4k:text-xl text-stormy-blue">
          Address
        </h2>
        <p className="flex justify-between text-stormy-blue text-muted-foreground text-left text-justify-left mb-8 tracking-tighter text-sm md:text-sm lg:text-sm xl:text-lg 2k:text-xl 4k:text-xl">
          {address}
        </p>
      </div>
    </div>
  );
}
