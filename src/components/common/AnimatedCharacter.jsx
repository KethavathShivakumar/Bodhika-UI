import React from 'react';

export default function AnimatedCharacter({ 
  isUsernameFocused = false, 
  isPasswordFocused = false, 
  showPassword = false,
  isSuccess = false,
  usernameValue = '' 
}) {
  // Should eyes close/cover? Character closes eyes when showing the password (showPassword === true)
  const isEyeCovered = showPassword;

  // Eye tracking offset calculation based on username text length
  const eyeShiftX = isUsernameFocused ? Math.min(Math.max(-8, -6 + usernameValue.length * 0.4), 4) : 0;
  const eyeShiftY = isUsernameFocused ? 3 : 0;

  return (
    <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center select-none">
      {/* Soft Ambient Radial Background Glow */}
      <div className="absolute inset-0 rounded-full bg-emerald-200/40 blur-3xl transform scale-90 animate-pulse-subtle" />

      {/* Outer SVG Container with Floating Animation */}
      <div className={`relative z-10 w-full h-full transition-transform duration-700 ease-out ${
        isSuccess ? 'scale-105 animate-bounce-soft' : 'animate-float-slow'
      }`}>
        <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="sweaterGrad" x1="150" y1="220" x2="350" y2="380" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#81c784" />
              <stop offset="100%" stopColor="#4caf50" />
            </linearGradient>
            <linearGradient id="skinGrad" x1="200" y1="120" x2="300" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffeedd" />
              <stop offset="100%" stopColor="#f5d6ba" />
            </linearGradient>
            <linearGradient id="hairGrad" x1="200" y1="80" x2="300" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2c3e50" />
              <stop offset="100%" stopColor="#1a252f" />
            </linearGradient>
            <linearGradient id="cloudGrad" x1="180" y1="50" x2="320" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#a5d6a7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#81c784" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Meditating / Focus Cloud Outline Loops above head */}
          <path 
            d="M170 120 C140 100 130 60 170 40 C200 20 250 20 280 35 C320 20 370 40 360 80 C380 110 350 140 320 130" 
            stroke="#81c784" 
            strokeWidth="3" 
            strokeDasharray="6 6" 
            fill="none" 
            className="animate-spin-slow opacity-80 origin-center"
            style={{ transformOrigin: '250px 100px' }}
          />

          {/* Floating Avatar Circles (Boy & Girl) matching Reference 2 */}
          {/* Top Left Boy Avatar */}
          <g className="animate-float-medium" style={{ animationDelay: '0s' }}>
            <circle cx="100" cy="110" r="28" fill="#e8f5e9" stroke="#81c784" strokeWidth="2" />
            <circle cx="100" cy="104" r="14" fill="#81c784" />
            <path d="M85 128 C85 118 115 118 115 128" fill="#4caf50" />
            {/* Smile on boy avatar */}
            <path d="M95 106 Q100 110 105 106" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </g>

          {/* Bottom Right Girl Avatar */}
          <g className="animate-float-medium" style={{ animationDelay: '1.5s' }}>
            <circle cx="410" cy="270" r="26" fill="#e8f5e9" stroke="#81c784" strokeWidth="2" />
            <circle cx="410" cy="264" r="13" fill="#333333" />
            <path d="M397 286 C397 276 423 276 423 286" fill="#e57373" />
          </g>

          {/* Cross-legged Legs Base */}
          <path d="M160 360 C160 330 200 320 250 320 C300 320 340 330 340 360 C340 390 300 400 250 400 C200 400 160 390 160 360 Z" fill="#e0e0e0" />
          <path d="M175 350 Q250 380 325 350 Q250 410 175 350 Z" fill="#ffffff" stroke="#e0e0e0" strokeWidth="2" />
          
          {/* Main Torso / Green Sweater with Heart */}
          <path d="M185 240 Q250 220 315 240 L335 340 Q250 360 165 340 Z" fill="url(#sweaterGrad)" />

          {/* Heart Emblem on Sweater */}
          <path 
            d="M240 265 C240 255 248 250 250 255 C252 250 260 255 260 265 C260 273 250 280 250 282 C250 280 240 273 240 265 Z" 
            fill="#ffffff" 
            className="animate-pulse-subtle"
          />

          {/* Neck */}
          <rect x="238" y="200" width="24" height="28" rx="8" fill="url(#skinGrad)" />

          {/* Head Base */}
          <path d="M200 150 C200 110 300 110 300 150 C300 195 280 215 250 215 C220 215 200 195 200 150 Z" fill="url(#skinGrad)" />

          {/* Hair Front & Back */}
          <path d="M190 140 C190 90 310 90 310 140 C310 155 300 170 295 150 C280 120 220 120 205 150 C200 170 190 155 190 140 Z" fill="url(#hairGrad)" />
          {/* Hair Side Bobs */}
          <path d="M192 140 Q180 180 200 200 Q205 160 202 140 Z" fill="url(#hairGrad)" />
          <path d="M308 140 Q320 180 300 200 Q295 160 298 140 Z" fill="url(#hairGrad)" />

          {/* EYES & EXPRESSION */}
          {!isEyeCovered ? (
            /* Open Eyes with tracking */
            <g transform={`translate(${eyeShiftX}, ${eyeShiftY})`} className="transition-transform duration-200">
              {/* Left Eye */}
              <circle cx="230" cy="162" r="7" fill="#ffffff" />
              <circle cx={230 + (isUsernameFocused ? -2 : 0)} cy={162 + (isUsernameFocused ? 1 : 0)} r="3.5" fill="#1a252f" />
              <circle cx={231 + (isUsernameFocused ? -2 : 0)} cy={160 + (isUsernameFocused ? 1 : 0)} r="1.2" fill="#ffffff" />
              {/* Right Eye */}
              <circle cx="270" cy="162" r="7" fill="#ffffff" />
              <circle cx={270 + (isUsernameFocused ? -2 : 0)} cy={162 + (isUsernameFocused ? 1 : 0)} r="3.5" fill="#1a252f" />
              <circle cx={271 + (isUsernameFocused ? -2 : 0)} cy={160 + (isUsernameFocused ? 1 : 0)} r="1.2" fill="#ffffff" />
              
              {/* Cheeks blush */}
              <circle cx="220" cy="172" r="6" fill="#ff8a80" opacity="0.4" />
              <circle cx="280" cy="172" r="6" fill="#ff8a80" opacity="0.4" />
            </g>
          ) : (
            /* Password Peek / Covered Eyes Expression when password is hidden */
            <g className="animate-in fade-in duration-200">
              {/* Playful Closed Peek Eyes */}
              <path d="M224 164 Q230 158 236 164" stroke="#1a252f" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M264 164 Q270 158 276 164" stroke="#1a252f" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Blush cheeks */}
              <circle cx="220" cy="172" r="7" fill="#ff5252" opacity="0.5" />
              <circle cx="280" cy="172" r="7" fill="#ff5252" opacity="0.5" />
            </g>
          )}

          {/* Mouth (Smile / O-Shape / Success) */}
          {isSuccess ? (
            <path d="M236 182 Q250 198 264 182 Z" fill="#ff5252" stroke="#d32f2f" strokeWidth="1" />
          ) : isUsernameFocused ? (
            <circle cx="250" cy="184" r="4" fill="#1a252f" />
          ) : isEyeCovered ? (
            <path d="M242 186 Q250 180 258 186" stroke="#1a252f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          ) : (
            <path d="M238 182 Q250 192 262 182" stroke="#1a252f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          )}

          {/* ARMS & HANDS */}
          {isEyeCovered ? (
            /* Hands covering cheeks/eyes (Peek Animation) */
            <g className="transition-all duration-300 transform">
              {/* Left Arm covering left cheek */}
              <path d="M175 250 C160 210 200 170 222 175" stroke="url(#sweaterGrad)" strokeWidth="22" strokeLinecap="round" fill="none" />
              <circle cx="222" cy="175" r="10" fill="url(#skinGrad)" />
              {/* Right Arm covering right cheek */}
              <path d="M325 250 C340 210 300 170 278 175" stroke="url(#sweaterGrad)" strokeWidth="22" strokeLinecap="round" fill="none" />
              <circle cx="278" cy="175" r="10" fill="url(#skinGrad)" />
            </g>
          ) : isSuccess ? (
            /* Raised Hands Celebration */
            <g className="transition-all duration-300">
              <path d="M175 250 C140 180 150 140 160 110" stroke="url(#sweaterGrad)" strokeWidth="20" strokeLinecap="round" fill="none" />
              <circle cx="160" cy="105" r="10" fill="url(#skinGrad)" />
              <path d="M325 250 C360 180 350 140 340 110" stroke="url(#sweaterGrad)" strokeWidth="20" strokeLinecap="round" fill="none" />
              <circle cx="340" cy="105" r="10" fill="url(#skinGrad)" />
            </g>
          ) : (
            /* Yoga / Meditating Hands Resting on Knees */
            <g className="transition-all duration-300">
              {/* Left Arm */}
              <path d="M175 250 Q130 280 150 320" stroke="url(#sweaterGrad)" strokeWidth="20" strokeLinecap="round" fill="none" />
              <circle cx="150" cy="320" r="11" fill="url(#skinGrad)" />
              {/* Mudra Hand gesture left */}
              <circle cx="150" cy="316" r="3" fill="#e0a880" />
              
              {/* Right Arm */}
              <path d="M325 250 Q370 280 350 320" stroke="url(#sweaterGrad)" strokeWidth="20" strokeLinecap="round" fill="none" />
              <circle cx="350" cy="320" r="11" fill="url(#skinGrad)" />
              {/* Mudra Hand gesture right */}
              <circle cx="350" cy="316" r="3" fill="#e0a880" />
            </g>
          )}

          {/* Celebration Confetti Sparkles when Success */}
          {isSuccess && (
            <g className="animate-in fade-in duration-300">
              <circle cx="150" cy="80" r="5" fill="#ffeb3b" />
              <circle cx="350" cy="80" r="6" fill="#ff4081" />
              <rect x="200" y="60" width="8" height="8" fill="#00e676" rx="2" transform="rotate(45 200 60)" />
              <rect x="290" y="50" width="10" height="6" fill="#29b6f6" rx="1" transform="rotate(25 290 50)" />
            </g>
          )}
        </svg>
      </div>

      {/* Floating Canva / Exam Progress Card (Matching Reference 2 Image) */}
      <div className="absolute left-3 bottom-12 z-20 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-float border border-emerald-100 flex items-center gap-3 animate-float-medium max-w-[210px]">
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold text-slate-800 tracking-tight leading-none truncate">Bodhika Exam</div>
          <div className="text-[10px] text-slate-400 mt-1 font-medium">10 Tasks Active</div>
          <div className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-bold">
            Analytics
          </div>
        </div>

        {/* Circular Progress Gauge 84% */}
        <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
          <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="3.5"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#109c90"
              strokeWidth="3.5"
              strokeDasharray="84, 100"
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <span className="absolute text-[10px] font-bold text-slate-700">84%</span>
        </div>
      </div>
    </div>
  );
}
