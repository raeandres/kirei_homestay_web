"use client";

import { MapPin } from "lucide-react";

interface AddressSectionProps {
  address: string;
}

export function AddressSection({ address }: AddressSectionProps) {
  return (
    <div className="flex">
      <div>
        <h2 className="font-semibold text-sm">Address</h2>
        <p className="flex justify-between text-sm text-gray-600 text-muted-foreground font-normal">
          {address}
        </p>
      </div>
    </div>
  );
}
