import React from "react";
import { TONE_COLORS, TONE_PATHS } from "../data.js";

export default function ToneGlyph({ tone, size = 40, active = false, dim = false }) {
  const color = TONE_COLORS[tone];
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ display: "block", opacity: dim ? 0.35 : 1 }}>
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="10"
        fill={active ? color : "transparent"}
        stroke={color}
        strokeWidth="1.5"
        opacity={active ? 0.18 : 0.5}
      />
      <path d={TONE_PATHS[tone]} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ToneGlyphRow({ tones, size = 26, active = false }) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {tones.map((tone, i) => (
        <ToneGlyph key={i} tone={tone} size={size} active={active} />
      ))}
    </div>
  );
}
