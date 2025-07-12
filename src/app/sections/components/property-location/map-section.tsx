"use client";

import { useState, useEffect } from "react";

interface MapSectionProps {
  mapEmbedUrl: string;
}

export function MapSection({ mapEmbedUrl }: MapSectionProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Don't render iframe until hydrated to prevent Chrome token hydration issues
  if (!isHydrated) {
    return (
      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden shadow-md">
        <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse mx-auto"></div>
            <div className="text-sm text-gray-500">Loading map...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden shadow-md">
      <iframe
        src={mapEmbedUrl}
        loading="lazy"
        className="absolute inset-0 w-full h-full border-0"
        aria-label="Property Location Map"
        referrerPolicy="no-referrer-when-downgrade"
        sandbox="allow-scripts allow-same-origin"
      ></iframe>
    </div>
  );
}
