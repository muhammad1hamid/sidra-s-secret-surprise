import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { StepShell } from "../StepShell";
import { Panda, CatSticker, CakeSticker } from "../Stickers";
import { burstConfetti } from "../confetti";

const PETALS = ["🌸", "🌷", "🌹", "🏵️", "💮"];

function PetalRain() {
  const petals = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 18,
        duration: 6 + Math.random() * 7,
        delay: -Math.random() * 8,
        char: PETALS[Math.floor(Math.random() * PETALS.length)],
      })),
    [],
  );
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
}

export function Step6Celebration({ onDone }: { onDone: () => void }) {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    void burstConfetti("big");
    const t = setTimeout(() => setShowBtn(true), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <StepShell>
      <PetalRain />

      <div className="relative flex w-full items-center justify-center">
        <Panda className="absolute -left-2 -top-10 h-16 w-16" accessory="balloon" />
        <CatSticker className="absolute -right-2 -top-8 h-16 w-16" />
        <motion.h1
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 160, damping: 12, delay: 0.2 }}
          className="gold-text font-script text-5xl leading-tight"
        >
          Happy Birthday 🎂
          <br />I love you endlessly 💗
        </motion.h1>
      </div>

      <CakeSticker className="mt-2" />

      {showBtn && (
        <motion.button
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onDone}
          className="animate-soft-pulse glass rounded-full px-7 py-3 font-display text-lg text-rose"
        >
          One last thing 🥹
        </motion.button>
      )}
    </StepShell>
  );
}
