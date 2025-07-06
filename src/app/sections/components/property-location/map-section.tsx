"use client";

interface MapSectionProps {
  mapEmbedUrl: string;
}

export function MapSection({ mapEmbedUrl }: MapSectionProps) {
  return (
    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden shadow-md">
      <iframe
        src={mapEmbedUrl}
        loading="lazy"
        className="absolute inset-0 w-full h-full border-0"
        aria-label="Property Location Map"
      ></iframe>
    </div>
  );
}
