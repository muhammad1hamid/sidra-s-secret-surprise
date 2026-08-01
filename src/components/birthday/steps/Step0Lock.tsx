import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock } from "lucide-react";
import { StepShell } from "../StepShell";
import { burstConfetti } from "../confetti";

/* ▶ CHANGE THE PIN HERE */
const CORRECT_PIN = "2005";

/* ▶ EDIT THE HIDDEN HINT TEXT HERE */
const HINT_TEXT = "Hint: think back to the year everything began... the year you were born 👶✨";

export function Step0Lock({ onDone }: { onDone: () => void }) {
  const [revealed, setRevealed] = useState(false);
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (revealed) setTimeout(() => inputs.current[0]?.focus(), 350);
  }, [revealed]);

  const setDigit = (i: number, v: string) => {
    const clean = v.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = clean;
    setDigits(next);
    setError(false);
    if (clean && i < 3) inputs.current[i + 1]?.focus();

    const code = next.join("");
    if (code.length === 4 && !next.includes("")) {
      if (code === CORRECT_PIN) {
        setSuccess(true);
        void burstConfetti("small");
        setTimeout(onDone, 900);
      } else {
        setError(true);
        setTimeout(() => {
          setDigits(["", "", "", ""]);
          inputs.current[0]?.focus();
        }, 600);
      }
    }
  };

  return (
    <StepShell>
      <motion.button
        onClick={() => setRevealed(true)}
        whileTap={{ scale: 0.92 }}
        className="glass glow-rose flex h-24 w-24 items-center justify-center rounded-full"
        aria-label="Unlock"
      >
        <motion.span
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="text-rose"
        >
          <Lock className="h-9 w-9" />
        </motion.span>
      </motion.button>

      <h1 className="font-script text-4xl text-rose">This is just for you 💕</h1>
      <p className="max-w-xs text-sm text-muted-foreground">{HINT_TEXT}</p>

      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.button
            key="ghost"
            exit={{ opacity: 0, y: -8 }}
            onClick={() => setRevealed(true)}
            className="rounded-full border border-rose/30 px-5 py-2 text-sm text-rose/80 transition-colors hover:bg-rose/15"
          >
            I know it
          </motion.button>
        ) : (
          <motion.div
            key="pin"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col items-center gap-3"
          >
            <div className={`flex gap-3 ${error ? "animate-shake" : ""}`}>
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputs.current[i] = el;
                  }}
                  value={d}
                  onChange={(e) => setDigit(i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !digits[i] && i > 0) inputs.current[i - 1]?.focus();
                  }}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  aria-label={`PIN digit ${i + 1}`}
                  className={`glass h-14 w-12 rounded-2xl text-center font-display text-2xl text-rose outline-none transition-all focus:scale-105 ${
                    error ? "ring-2 ring-destructive shadow-[0_0_22px_rgba(220,80,90,0.45)]" : ""
                  } ${success ? "glow-gold ring-2 ring-gold" : ""}`}
                />
              ))}
            </div>
            {error && <p className="text-sm text-destructive">Not quite... try again 🥺</p>}
            {success && <p className="text-sm text-rose">Unlocking your heart... 💛</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </StepShell>
  );
}
