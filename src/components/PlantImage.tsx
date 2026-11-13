"use client";

import { useState } from "react";

const PALETTES: Record<string, { bg: string; accent: string; leaf: string; flower: string }> = {
  "hero-home": { bg: "#E5ECE0", accent: "#183D23", leaf: "#2A5B37", flower: "#C4687F" },
  interior: { bg: "#E8EDDF", accent: "#183D23", leaf: "#3B6E47", flower: "#86A873" },
  monstera: { bg: "#E2EAD9", accent: "#183D23", leaf: "#265934", flower: "#78A663" },
  potus: { bg: "#E5EEDB", accent: "#234F2D", leaf: "#3C784A", flower: "#A3C47C" },
  sansevieria: { bg: "#E4ECE0", accent: "#1D4528", leaf: "#45754E", flower: "#D1C36E" },
  exterior: { bg: "#ECE6DF", accent: "#25442A", leaf: "#3B6944", flower: "#9E648F" },
  petunias: { bg: "#EFE5E9", accent: "#2A472E", leaf: "#3D6F46", flower: "#C84377" },
  citricos: { bg: "#ECEAD5", accent: "#224A29", leaf: "#386F3F", flower: "#E5B82A" },
  huerta: { bg: "#E4EDE0", accent: "#1E4726", leaf: "#387042", flower: "#6CA848" },
  macetas: { bg: "#EBE3D7", accent: "#3B523E", leaf: "#4F6852", flower: "#BA6F48" },
  about: { bg: "#E8EDDF", accent: "#183D23", leaf: "#2A5B37", flower: "#8EA87D" },
  wholesale: { bg: "#E5ECE1", accent: "#183D23", leaf: "#2A5B37", flower: "#C47287" },
  contact: { bg: "#E7EDE2", accent: "#183D23", leaf: "#30603D", flower: "#7AA26F" },
  "catalog-hero": { bg: "#2B4731", accent: "#4E7B55", leaf: "#75A67C", flower: "#D98AA2" },
};

function createBotanicalSvg(label: string, fallbackKey: string) {
  const pal = PALETTES[fallbackKey] || PALETTES.interior;
  const safe = (label || "Vivero Siempre Verde").replace(/[<>&"]/g, "");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stop-color="${pal.bg}"/>
        <stop offset="100%" stop-color="#F7F5EF"/>
      </linearGradient>
    </defs>
    <rect width="600" height="450" fill="url(#bg)"/>
    <g opacity="0.12" fill="${pal.accent}">
      <circle cx="100" cy="380" r="120"/>
      <circle cx="520" cy="80" r="100"/>
    </g>
    <!-- Planta decorativa -->
    <path d="M300 370 C300 280, 295 190, 305 130" stroke="${pal.accent}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <!-- Hojas izquierda -->
    <path d="M300 290 C220 270, 180 200, 200 160 C250 170, 290 230, 300 290 Z" fill="${pal.leaf}" opacity="0.9"/>
    <path d="M300 230 C240 200, 220 150, 235 120 C270 130, 295 180, 300 230 Z" fill="${pal.leaf}" opacity="0.8"/>
    <!-- Hojas derecha -->
    <path d="M302 260 C380 240, 420 170, 400 130 C350 140, 312 200, 302 260 Z" fill="${pal.leaf}" opacity="0.9"/>
    <path d="M304 200 C370 170, 390 120, 375 90 C340 100, 315 150, 304 200 Z" fill="${pal.leaf}" opacity="0.75"/>
    <!-- Flor o brote -->
    <circle cx="305" cy="125" r="22" fill="${pal.flower}" opacity="0.9"/>
    <!-- Maceta -->
    <polygon points="250,350 350,350 335,420 265,420" fill="#9C6444" opacity="0.9"/>
    <rect x="240" y="340" width="120" height="15" rx="3" fill="#B37854"/>
    <!-- Texto ilustrativo -->
    <text x="300" y="440" text-anchor="middle" font-family="Georgia, serif" font-size="14" font-weight="bold" fill="${pal.accent}" opacity="0.75" letter-spacing="1">
      ${safe}
    </text>
  </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.trim())}`;
}

interface PlantImageProps {
  src: string;
  alt: string;
  fallbackKey: string;
  className?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
}

export default function PlantImage({
  src,
  alt,
  fallbackKey,
  className = "",
  loading = "lazy",
}: PlantImageProps) {
  const [error, setError] = useState(false);

  return (
    <img
      src={error ? createBotanicalSvg(alt, fallbackKey) : src}
      alt={alt}
      loading={loading}
      onError={() => setError(true)}
      className={className}
    />
  );
}
