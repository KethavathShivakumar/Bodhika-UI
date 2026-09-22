import React from 'react';

export default function DashboardHeroIllustration() {
  return (
    <div className="relative w-full max-w-[340px] aspect-[4/3] flex items-center justify-center select-none">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl transform scale-90" />

      {/* SVG Graduation / Learning Characters Illustration */}
      <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="gownRed" x1="280" y1="80" x2="340" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff6551" />
            <stop offset="100%" stopColor="#e04e3b" />
          </linearGradient>
          <linearGradient id="gradWhite" x1="160" y1="100" x2="220" y2="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
        </defs>

        {/* Floating Sparkles & Leaves Accent */}
        <path d="M50 250 Q60 220 80 230 Q70 260 50 250 Z" fill="#ffffff" opacity="0.3" />
        <path d="M340 260 Q350 230 370 240 Q360 270 340 260 Z" fill="#ffb74d" opacity="0.4" />
        <circle cx="120" cy="50" r="4" fill="#ffeb3b" className="animate-ping" style={{ animationDuration: '3s' }} />
        <circle cx="310" cy="40" r="6" fill="#ffffff" opacity="0.8" />
        
        {/* Confetti ribbons floating */}
        <path d="M280 20 C290 30 270 40 300 50" stroke="#ffeb3b" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M140 30 C150 40 130 50 160 60" stroke="#ff6551" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* LEFT CHARACTER: Student jumping with diploma ribbon */}
        <g className="animate-float-slow">
          {/* Head & Hair */}
          <path d="M195 80 C195 65 215 65 215 80 C215 92 205 98 195 92 Z" fill="#ffcc80" />
          <path d="M190 75 C190 60 220 60 215 75 Q205 70 190 75 Z" fill="#004d40" />

          {/* Body / Shirt */}
          <path d="M180 100 Q205 95 230 100 L245 190 Q205 200 165 190 Z" fill="url(#gradWhite)" />
          
          {/* Purple sash */}
          <path d="M185 102 L230 185 L215 190 L175 108 Z" fill="#7e57c2" />

          {/* Legs / White Trousers */}
          <path d="M185 190 L175 250 L195 252 L200 195 Z" fill="#ffffff" />
          <path d="M210 190 L225 250 L245 248 L225 195 Z" fill="#ffffff" />

          {/* Red Shoes */}
          <ellipse cx="180" cy="254" rx="14" ry="6" fill="#ff6551" />
          <ellipse cx="238" cy="252" rx="14" ry="6" fill="#ff6551" />

          {/* Left Arm holding diploma ribbon */}
          <path d="M175 105 Q145 70 135 60" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" fill="none" />
          <circle cx="130" cy="55" r="7" fill="#ffcc80" />
          {/* Ribbon */}
          <path d="M125 50 Q110 30 120 20 Q130 10 120 5" stroke="#ff6551" strokeWidth="4" strokeLinecap="round" fill="none" />
        </g>

        {/* RIGHT CHARACTER: Female student in Red Graduation Gown */}
        <g className="animate-float-slow" style={{ animationDelay: '1s' }}>
          {/* Head & Hair */}
          <path d="M300 70 C300 55 320 55 320 70 C320 82 310 88 300 82 Z" fill="#ffcc80" />
          <path d="M290 65 Q310 50 330 70 Q320 90 290 65 Z" fill="#5d4037" />

          {/* Graduation Cap */}
          <path d="M290 52 L320 42 L340 52 L310 62 Z" fill="#37474f" />
          <rect x="312" y="55" width="6" height="8" fill="#ffeb3b" />
          <path d="M315 63 Q325 75 328 85" stroke="#ffeb3b" strokeWidth="2" fill="none" />

          {/* Red Gown */}
          <path d="M285 90 Q310 85 335 90 L355 210 Q310 220 265 210 Z" fill="url(#gownRed)" />

          {/* Yellow sash collar */}
          <path d="M290 92 L310 130 L330 92 Z" fill="#ffb74d" />

          {/* Legs */}
          <path d="M295 210 L300 255 L315 255 L310 210 Z" fill="#ffcc80" />
          <path d="M320 210 L335 250 L350 248 L335 210 Z" fill="#ffcc80" />

          {/* Yellow Heels */}
          <path d="M295 255 L315 255 L310 262 Z" fill="#fbb03b" />
          <path d="M330 250 L352 248 L348 257 Z" fill="#fbb03b" />

          {/* Raised Arm holding degree scroll */}
          <path d="M330 95 Q360 60 365 30" stroke="#ff6551" strokeWidth="12" strokeLinecap="round" fill="none" />
          <circle cx="367" cy="26" r="7" fill="#ffcc80" />
          {/* Scroll */}
          <rect x="355" y="10" width="25" height="10" rx="3" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" transform="rotate(-30 355 10)" />
          <rect x="362" y="8" width="4" height="12" fill="#ff6551" transform="rotate(-30 362 8)" />
        </g>
      </svg>
    </div>
  );
}
