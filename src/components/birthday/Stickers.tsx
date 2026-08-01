/**
 * Lightweight looping CSS/SVG stickers — panda, cat, cake.
 * Used on steps 1, 2 and 6.
 */

export function Panda({
  className = "",
  accessory,
}: {
  className?: string;
  accessory?: "balloon" | "cake" | "wave";
}) {
  return (
    <div className={`animate-bob relative ${className}`}>
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-md">
        {/* ears */}
        <circle cx="26" cy="26" r="13" fill="#2b2b34" />
        <circle cx="74" cy="26" r="13" fill="#2b2b34" />
        {/* head */}
        <circle cx="50" cy="52" r="32" fill="#fdfbf7" />
        {/* eye patches */}
        <ellipse cx="37" cy="48" rx="10" ry="12" fill="#2b2b34" transform="rotate(-12 37 48)" />
        <ellipse cx="63" cy="48" rx="10" ry="12" fill="#2b2b34" transform="rotate(12 63 48)" />
        {/* eyes (blink) */}
        <g style={{ animation: "blink 4s infinite", transformOrigin: "50px 49px" }}>
          <circle cx="37" cy="49" r="3.6" fill="#fff" />
          <circle cx="63" cy="49" r="3.6" fill="#fff" />
        </g>
        {/* nose + smile */}
        <ellipse cx="50" cy="62" rx="4.5" ry="3.2" fill="#2b2b34" />
        <path
          d="M43 69 Q50 75 57 69"
          stroke="#2b2b34"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />
        {/* blush */}
        <circle cx="27" cy="62" r="5" fill="#f7b6c2" opacity="0.75" />
        <circle cx="73" cy="62" r="5" fill="#f7b6c2" opacity="0.75" />
      </svg>
      {accessory === "balloon" && (
        <span className="absolute -right-3 -top-6 text-2xl" style={{ animation: "bob 2.4s ease-in-out infinite" }}>
          🎈
        </span>
      )}
      {accessory === "cake" && (
        <span className="absolute -bottom-2 -right-3 text-2xl">🎂</span>
      )}
      {accessory === "wave" && (
        <span className="absolute -right-2 top-1/2 text-xl" style={{ animation: "bob 1.2s ease-in-out infinite" }}>
          👋
        </span>
      )}
    </div>
  );
}

export function CatSticker({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-bob ${className}`} style={{ animationDuration: "2.4s" }}>
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-md">
        <path d="M22 34 L26 12 L44 26 Z" fill="#f3c48b" />
        <path d="M78 34 L74 12 L56 26 Z" fill="#f3c48b" />
        <circle cx="50" cy="55" r="30" fill="#f8d7ad" />
        <g style={{ animation: "blink 3.4s infinite", transformOrigin: "50px 52px" }}>
          <circle cx="39" cy="52" r="4" fill="#3a2b25" />
          <circle cx="61" cy="52" r="4" fill="#3a2b25" />
        </g>
        <path d="M46 63 L50 67 L54 63 Z" fill="#e08497" />
        <path d="M50 67 Q44 73 39 68 M50 67 Q56 73 61 68" stroke="#3a2b25" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="30" cy="63" r="5" fill="#f2a0b0" opacity="0.7" />
        <circle cx="70" cy="63" r="5" fill="#f2a0b0" opacity="0.7" />
      </svg>
    </div>
  );
}

export function CakeSticker({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-bob relative ${className}`} style={{ animationDuration: "3.4s" }}>
      <span className="text-4xl drop-shadow-md">🎂</span>
      <span className="absolute -right-2 -top-2 animate-pulse text-lg">✨</span>
    </div>
  );
}
