export default function Cart3DIllustration() {
  return (
    <div className="illustration-svg-wrap" aria-hidden="true">
      <svg viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#4338ca" />
          </linearGradient>
          <linearGradient id="boxGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a5b4fc" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="boxGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#7e22ce" />
          </linearGradient>
          <linearGradient id="cartMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <filter id="shadow3D" x="-10%" y="-10%" width="130%" height="140%">
            <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#4338ca" floodOpacity="0.28" />
          </filter>
        </defs>

        {/* Ambient Floor Shadow */}
        <ellipse cx="210" cy="285" rx="140" ry="20" fill="rgba(67, 56, 202, 0.14)" />

        {/* --- PURPLE SHOPPING BAGS & BOXES INSIDE CART --- */}
        <g filter="url(#shadow3D)">
          {/* Shopping Bag 1 (Right) */}
          <path d="M225 105 L265 95 L275 175 L230 185 Z" fill="url(#boxGrad2)" rx="8" />
          <path d="M240 100 Q250 75 260 97" stroke="#e9d5ff" strokeWidth="4" fill="none" strokeLinecap="round" />

          {/* Gift Box 1 (Center) */}
          <rect x="175" y="115" width="60" height="70" rx="8" fill="url(#boxGrad1)" transform="rotate(-6 175 115)" />
          {/* Box Ribbon */}
          <rect x="200" y="113" width="10" height="70" fill="#ede9fe" transform="rotate(-6 200 113)" />

          {/* Gift Box 2 (Left back) */}
          <rect x="145" y="130" width="45" height="55" rx="6" fill="#818cf8" transform="rotate(8 145 130)" opacity="0.9" />
        </g>

        {/* --- 3D CART BODY (WHITE / CHROME WIREFRAME BASKET) --- */}
        <g filter="url(#shadow3D)">
          {/* Basket Base */}
          <path d="M125 185 L285 185 L275 140 L135 140 Z" fill="rgba(255, 255, 255, 0.85)" stroke="#cbd5e1" strokeWidth="3" />
          
          {/* Basket Main Walls */}
          <path d="M110 135 L300 135 L280 215 L130 215 Z" fill="rgba(255, 255, 255, 0.6)" stroke="#cbd5e1" strokeWidth="4" />
          
          {/* Front Grid Lines */}
          <line x1="135" y1="135" x2="150" y2="215" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="165" y1="135" x2="175" y2="215" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="195" y1="135" x2="200" y2="215" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="225" y1="135" x2="225" y2="215" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="255" y1="135" x2="250" y2="215" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="280" y1="135" x2="270" y2="215" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />

          {/* Horizontal Grid Bars */}
          <line x1="118" y1="160" x2="292" y2="160" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="124" y1="188" x2="285" y2="188" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />

          {/* Upper Basket Lip */}
          <rect x="105" y="130" width="200" height="9" rx="4.5" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2.5" />

          {/* Handle Bars (Right) */}
          <path d="M295 133 L325 110 L335 116" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Handle Grip (Purple) */}
          <rect x="320" y="105" width="22" height="10" rx="5" fill="url(#purpleGrad)" transform="rotate(25 320 105)" />

          {/* Lower Chassis Base */}
          <path d="M140 215 L145 255 L265 255 L270 215" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <line x1="145" y1="255" x2="265" y2="255" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />

          {/* Wheels (Chunky 3D purple wheels) */}
          {/* Front Wheel */}
          <circle cx="152" cy="272" r="14" fill="#4338ca" stroke="#cbd5e1" strokeWidth="3" />
          <circle cx="152" cy="272" r="6" fill="#a5b4fc" />

          {/* Back Wheel */}
          <circle cx="258" cy="272" r="14" fill="#4338ca" stroke="#cbd5e1" strokeWidth="3" />
          <circle cx="258" cy="272" r="6" fill="#a5b4fc" />
        </g>
      </svg>
    </div>
  )
}
