import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { StepShell } from "../StepShell";
import { burstConfetti } from "../confetti";

/* ▶ ADJUST THE COUNTDOWN TARGET DATE HERE (month is 0-indexed: 7 = August) */
const getTarget = () => new Date(new Date().getFullYear(), 7, 2, 0, 0, 0);

function diff() {
  const ms = getTarget().getTime() - Date.now();
  if (ms <= 0) return null;
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

function Cell({ value, label }: { value: number; label: string }) {
  const v = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="glass flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={v}
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -22, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="font-display text-2xl text-rose"
          >
            {v}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</span>
    </div>
  );
}

export function Step3Countdown({ onDone }: { onDone: () => void }) {
  const [time, setTime] = useState(diff());

  useEffect(() => {
    const id = setInterval(() => setTime(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!time) void burstConfetti("small");
  }, [time]);

  return (
    <StepShell>
      <h2 className="font-script text-4xl text-rose">Counting down to YOUR day 🎂</h2>

      {time ? (
        <div className="flex gap-3">
          <Cell value={time.days} label="Days" />
          <Cell value={time.hours} label="Hrs" />
          <Cell value={time.minutes} label="Min" />
          <Cell value={time.seconds} label="Sec" />
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: [1, 1.05, 1], opacity: 1 }}
          transition={{ scale: { duration: 1.6, repeat: Infinity } }}
          className="glass glow-gold rounded-3xl px-6 py-5"
        >
          <p className="gold-text font-display text-3xl">IT'S TODAY! 🎉🎂</p>
        </motion.div>
      )}

      <button
        onClick={onDone}
        className="animate-soft-pulse glass mt-2 rounded-full px-7 py-3 font-display text-lg text-rose"
      >
        See Memories 💌
      </button>
    </StepShell>
  );
}
