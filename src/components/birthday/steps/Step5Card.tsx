import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { StepShell } from "../StepShell";

/* ▶ EDIT THE CARD MESSAGE HERE */
const CARD_MESSAGE =
  "To Sidra — one of the most incredible people I know. Whatever we are or become, I just wanted today to be about celebrating you. You deserve every good thing coming your way this year. Happy Birthday. 💗";


export function Step5Card({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(CARD_MESSAGE.slice(0, i));
      if (i >= CARD_MESSAGE.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [open]);

  const done = typed.length >= CARD_MESSAGE.length;

  return (
    <StepShell>
      <div style={{ perspective: 1200 }} className="w-full">
        <motion.div
          initial={{ rotateX: -95, opacity: 0, y: 30 }}
          animate={open ? { rotateX: 0, opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "top center" }}
          className="glass glow-rose relative rounded-3xl border-2 border-gold/40 px-6 py-8"
        >
          <span className="pointer-events-none absolute -left-3 -top-3 text-2xl">💗</span>
          <span className="pointer-events-none absolute -right-3 -bottom-3 text-2xl">💗</span>
          <h3 className="font-script text-3xl text-rose">A letter for you</h3>
          <p className="mt-4 min-h-[150px] text-left text-[15px] leading-relaxed text-foreground/85">
            {typed}
            {!done && <span className="animate-pulse">|</span>}
          </p>
        </motion.div>
      </div>

      {done && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onDone}
          className="animate-soft-pulse glass rounded-full px-7 py-3 font-display text-lg text-rose"
        >
          Celebrate 🎉
        </motion.button>
      )}
    </StepShell>
  );
}
