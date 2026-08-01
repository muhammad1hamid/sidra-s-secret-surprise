import { useMemo } from "react";

/**
 * Continuous floating hearts + sparkle particles.
 * Rendered ONCE behind every step so transitions feel seamless.
 */
const HEARTS = ["💗", "💖", "🤍", "✨", "💕", "⭐", "🌸"];

export function ParticleField() {
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 20,
        duration: 12 + Math.random() * 14,
        delay: -Math.random() * 20,
        char: HEARTS[Math.floor(Math.random() * HEARTS.length)],
        opacity: 0.35 + Math.random() * 0.5,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {/* soft radial glows */}
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-blush/40 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-lavender/40 blur-3xl" />
      <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/25 blur-3xl" />

      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-[-10vh] select-none"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
}
