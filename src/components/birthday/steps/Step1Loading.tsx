import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { StepShell } from "../StepShell";
import { Panda } from "../Stickers";

const MESSAGES = [
  "Unlocking your surprise...",
  "Adding extra love...",
  "Almost there, hang tight 💫",
  "Getting the cake ready 🎂",
];

export function Step1Loading({ onDone }: { onDone: () => void }) {
  const [msg, setMsg] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const m = setInterval(() => setMsg((i) => (i + 1) % MESSAGES.length), 800);
    const p = setInterval(() => setProgress((v) => Math.min(100, v + 3)), 85);
    const done = setTimeout(onDone, 2900);
    return () => {
      clearInterval(m);
      clearInterval(p);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <StepShell>
      <div className="relative h-40 w-40">
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="absolute inset-0"
        >
          <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_0_18px_rgba(230,140,160,0.6)]">
            <defs>
              <linearGradient id="heartFill" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#e6c17a" />
                <stop offset="100%" stopColor="#ef8ba6" />
              </linearGradient>
              <clipPath id="heartClip">
                <path d="M50 88 C12 62 6 38 22 24 C34 13 47 20 50 30 C53 20 66 13 78 24 C94 38 88 62 50 88 Z" />
              </clipPath>
            </defs>
            <path
              d="M50 88 C12 62 6 38 22 24 C34 13 47 20 50 30 C53 20 66 13 78 24 C94 38 88 62 50 88 Z"
              fill="rgba(255,255,255,0.5)"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="2"
            />
            <g clipPath="url(#heartClip)">
              <rect x="0" y={100 - progress} width="100" height="100" fill="url(#heartFill)" />
            </g>
          </svg>
        </motion.div>
      </div>

      <motion.p
        key={msg}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-2xl text-rose"
      >
        {MESSAGES[msg]}
      </motion.p>

      <Panda className="absolute bottom-6 left-4 h-20 w-20" accessory="wave" />
    </StepShell>
  );
}
