"use client";

import { MapPin } from "lucide-react";

interface AddressSectionProps {
  address: string;
}

export function AddressSection({ address }: AddressSectionProps) {
  return (
    <div className="flex">
      <div>
        <h2 className="text-left text-justify-left font-medium tracking-tighter text-sm md:text-base lg:text-base xl:text-base 2k:text-base 4k:text-xl text-stormy-blue">
          Address
        </h2>
        <p className="flex justify-between text-stormy-blue text-left text-justify-left mb-8 tracking-tighter text-sm md:text-sm lg:text-sm xl:text-sm 2k:text-sm 4k:text-xl font-normal">
          {address}
        </p>
      </div>
    </div>
  );
}
