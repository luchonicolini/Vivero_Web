"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";

interface PlantImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
}

export default function PlantImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  priority = false,
}: PlantImageProps) {
  const [failedSrc, setFailedSrc] = useState("");

  if (failedSrc === src) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-sage/40 p-4 text-center text-muted ${className}`}
        role="img"
        aria-label={`${alt}. Foto ilustrativa no disponible.`}
      >
        <ImageOff className="h-7 w-7 text-primary/70" aria-hidden="true" />
        <span className="text-xs font-medium">Foto ilustrativa no disponible</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      width={1200}
      height={900}
      onError={() => setFailedSrc(src)}
      className={className}
    />
  );
}
