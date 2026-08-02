import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { StepShell } from "../StepShell";
import { burstConfetti } from "../confetti";

/* ▶ EDIT THE FINAL MESSAGE HERE (each string is one animated line) */
const FINAL_MESSAGE = [
  "That's what I hoped you'd say 😌",
  "No matter what we are or become, I just want you to know — you make everything better just by being you.",
  "Happy Birthday, Sidra. I'm always in your corner. 💗",
  "— Inshal Ahmed",
];

/* ▶ EDIT THE QUESTION + BUTTON LABELS HERE */
const QUESTION = "Will you always be my favorite person to talk to? 🥹💛";
const YES_LABEL = "Always 💛";
const TAUNTS = ["Maybe", "Nice try 😏", "Not an option 😂", "Nope 😅", "Try again 🥰"];

export function Step7Question() {
  const [said, setSaid] = useState(false);
  const [dodges, setDodges] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const noRef = useRef<HTMLButtonElement | null>(null);

  const dodge = () => {
    const btn = noRef.current;
    const w = btn?.offsetWidth ?? 90;
    const h = btn?.offsetHeight ?? 48;
    const maxX = Math.max(40, window.innerWidth / 2 - w);
    const maxY = Math.max(40, window.innerHeight / 2 - h);
    setPos({
      x: (Math.random() * 2 - 1) * maxX,
      y: (Math.random() * 2 - 1) * maxY,
    });
    setDodges((d) => d + 1);
  };

  // Desktop proximity detection — it runs before the cursor can land on it.
  useEffect(() => {
    if (said) return;
    const onMove = (e: MouseEvent) => {
      const btn = noRef.current;
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      if (dist < 110) dodge();
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [said]);

  const sayYes = () => {
    setSaid(true);
    void burstConfetti("soft");
  };

  return (
    <StepShell>
      <AnimatePresence mode="wait">
        {!said ? (
          <motion.div
            key="ask"
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.5 }}
            className="flex w-full flex-col items-center gap-8"
          >
            <h1 className="font-script text-4xl leading-snug text-rose">{QUESTION}</h1>

            <div className="relative flex w-full items-center justify-center gap-5">
              <button
                onClick={sayYes}
                className="animate-soft-pulse glass glow-gold rounded-full px-8 py-3 font-display text-xl text-rose"
              >
                {YES_LABEL}
              </button>

              <motion.button
                ref={noRef}
                animate={pos}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                onMouseEnter={dodge}
                onTouchStart={(e) => {
                  e.preventDefault();
                  dodge();
                }}
                onPointerDown={(e) => {
                  e.preventDefault();
                  dodge();
                }}
                className="glass rounded-full px-6 py-3 font-display text-lg text-muted-foreground"
              >
                {TAUNTS[Math.min(dodges, TAUNTS.length - 1)]}
              </motion.button>
            </div>

            {dodges >= 2 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-muted-foreground"
              >
                Yeah... that button doesn't work 😌
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="final"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="glass rounded-3xl px-6 py-8"
          >
            {FINAL_MESSAGE.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.9, duration: 0.8 }}
                className={
                  i === 0
                    ? "gold-text font-script text-4xl"
                    : i === FINAL_MESSAGE.length - 1
                      ? "mt-5 font-display text-xl text-rose"
                      : "mt-4 text-[15px] leading-relaxed text-foreground/85"
                }
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </StepShell>
  );
}
