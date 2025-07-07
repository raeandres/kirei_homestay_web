"use client";

import { MapPin } from "lucide-react";

interface AddressSectionProps {
  address: string;
}

export function AddressSection({ address }: AddressSectionProps) {
  return (
    <div className="flex">
      <MapPin className="mr-4 h-5 w-5 text-accent mt-1 shrink-0" />
      <div>
        <h2 className="font-semibold text-sm">Address</h2>
        <p className="text-xs text-gray-600 text-muted-foreground tracking-tighter leading-relaxed">
          {address}
        </p>
      </div>
    </div>
  );
}
