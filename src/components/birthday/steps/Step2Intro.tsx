import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { StepShell } from "../StepShell";
import { Panda } from "../Stickers";

const LINE2 = "It's your special day 🎉";

export function Step2Intro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0); // 0: line1, 1: line2, 2: line3
  const [typed, setTyped] = useState("");
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== 1) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(LINE2.slice(0, i));
      if (i >= LINE2.length) {
        clearInterval(id);
        setTimeout(() => setPhase(2), 1400);
      }
    }, 55);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== 2) return;
    const t = setTimeout(() => setShowBtn(true), 2000);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <StepShell>
      <div className="flex min-h-[180px] items-center justify-center">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.p
              key="l1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="font-display text-3xl text-rose/80"
            >
              Shhh... come closer
            </motion.p>
          )}
          {phase === 1 && (
            <motion.p
              key="l2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display text-3xl text-rose"
            >
              {typed}
              <span className="ml-0.5 animate-pulse">|</span>
            </motion.p>
          )}
          {phase === 2 && (
            <motion.h1
              key="l3"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="gold-text font-script text-5xl leading-tight"
            >
              Happy Birthday,
              <br /> Sidra 💗
            </motion.h1>
          )}
        </AnimatePresence>
      </div>

      <Panda className="h-24 w-24" accessory="balloon" />

      <AnimatePresence>
        {showBtn && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onDone}
            className="animate-soft-pulse glass rounded-full px-7 py-3 font-display text-lg text-rose"
          >
            Continue 💫
          </motion.button>
        )}
      </AnimatePresence>
    </StepShell>
  );
}
