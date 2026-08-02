import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ▶ EASTER-EGG NOTES — edit these little surprises */
const NOTES = [
  "Fun fact: this website took way too many hours to make, but every one of them was worth it 😄💗",
  "Secret: I re-read our conversations way more often than I'd ever admit 😌",
  "Tiny truth: you're a lot easier to talk to than the whole rest of the world 🌸",
];

/** Appears at most twice per session, drifting across the screen. */
const MAX_APPEARANCES = 2;

export function HeartEasterEgg({ active }: { active: boolean }) {
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [note, setNote] = useState<string | null>(null);
  const [top, setTop] = useState(40);

  useEffect(() => {
    if (!active || count >= MAX_APPEARANCES || visible || note) return;
    const delay = 9000 + Math.random() * 12000;
    const t = setTimeout(() => {
      setTop(20 + Math.random() * 55);
      setVisible(true);
    }, delay);
    return () => clearTimeout(t);
  }, [active, count, visible, note]);

  const catchIt = () => {
    setVisible(false);
    setCount((c) => c + 1);
    setNote(NOTES[Math.floor(Math.random() * NOTES.length)]!);
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.button
            key="heart"
            aria-label="A little surprise"
            onClick={catchIt}
            initial={{ x: "-12vw", opacity: 0 }}
            animate={{ x: "104vw", opacity: 1 }}
            exit={{ opacity: 0, scale: 1.6 }}
            transition={{ duration: 16, ease: "linear" }}
            onAnimationComplete={() => {
              setVisible(false);
              setCount((c) => c + 1);
            }}
            style={{ top: `${top}%` }}
            className="fixed left-0 z-40 text-2xl drop-shadow-[0_0_14px_rgba(247,182,194,0.9)]"
          >
            💖
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {note && (
          <motion.div
            key="note"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 px-6 backdrop-blur-sm"
            onClick={() => setNote(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 14 }}
              animate={{ scale: 1, y: 0 }}
              className="glass glow-rose max-w-xs rounded-3xl px-6 py-6 text-center"
            >
              <p className="font-script text-3xl text-rose">A tiny secret 💌</p>
              <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">{note}</p>
              <button className="mt-5 rounded-full border border-rose/30 px-5 py-2 text-sm text-rose">
                Aww, okay 💗
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
