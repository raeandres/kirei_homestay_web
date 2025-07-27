"use client";

import { MapPin } from "lucide-react";
import { useDevice } from "@/hooks/use-device";

interface AddressSectionProps {
  address: string;
}

export function AddressSection({ address }: AddressSectionProps) {
  const { isMobile } = useDevice();
  return (
    <div className="flex">
      <div>
        <h2 className="text-left text-justify-left tracking-tighter text-lg md:text-xl lg:text-xl xl:text-base 2k:text-xl 4k:text-xl text-stormy-blue font-playfair-display">
          Address
        </h2>
        <p
          className="text-sm md:text-sm lg:text-base xl:text-base 2k:text-base 4k:text-xl text-left text-justify-left tracking-normal font-playfair-display text-stormy-blue/60"
          style={
            isMobile
              ? {
                  lineHeight: "1.5",
                  letterSpacing: "0.01em",
                  fontWeight: "300",
                  fontSize: "0.8rem",
                }
              : {
                  lineHeight: "1.5",
                  letterSpacing: "0.01em",
                  fontWeight: "300",
                  // fontSize: "0.9rem",
                }
          }
        >
          {address}
        </p>
      </div>
    </div>
  );
}
