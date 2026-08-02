import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StepShell } from "../StepShell";

import p1 from "@/assets/sidra-1.jpeg.asset.json";
import p2 from "@/assets/sidra-2.jpeg.asset.json";
import p3 from "@/assets/sidra-3.jpeg.asset.json";
import p4 from "@/assets/sidra-4.jpeg.asset.json";
import p5 from "@/assets/sidra-5.jpeg.asset.json";
import p6 from "@/assets/sidra-6.jpeg.asset.json";
import p7 from "@/assets/sidra-7.jpeg.asset.json";
import p8 from "@/assets/sidra-8.jpeg.asset.json";

/* ▶ SPOTLIGHT PHOTOS + CAPTIONS — edit freely (separate from the Memories slider) */
const SPOTLIGHT = [
  { src: p1.url, caption: "This one's my favorite 🥹" },
  { src: p2.url, caption: "Pure sunshine 🌞" },
  { src: p3.url, caption: "You have no idea how often I look at this photo" },
  { src: p4.url, caption: "This smile lives in my head rent free 😌" },
  { src: p5.url, caption: "Effortlessly you, always 💫" },
  { src: p6.url, caption: "That quiet confidence of yours ✨" },
  { src: p7.url, caption: "Somehow always the best part of the frame 🌸" },
  { src: p8.url, caption: "Just… you being you 💗" },
];

/* ▶ INTRO HEADING */
const HEADING = "Just some of my favorite views 🌸";

const AUTO_MS = 3600;

export function Step5Spotlight({ onDone }: { onDone: () => void }) {
  const [showIntro, setShowIntro] = useState(true);
  const [i, setI] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowIntro(false), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (showIntro || finished) return;
    const t = setTimeout(() => {
      if (i >= SPOTLIGHT.length - 1) setFinished(true);
      else setI((v) => v + 1);
    }, AUTO_MS);
    return () => clearTimeout(t);
  }, [i, showIntro, finished]);

  const go = (d: number) => {
    setFinished(false);
    setI((v) => (v + d + SPOTLIGHT.length) % SPOTLIGHT.length);
  };

  const photo = SPOTLIGHT[i]!;

  return (
    <StepShell>
      {/* softer, dimmed backdrop so the photos are the focus */}
      <div className="pointer-events-none fixed inset-0 bg-background/70 backdrop-blur-[2px]" aria-hidden />

      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.h2
            key="intro"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 font-script text-4xl text-rose"
          >
            {HEADING}
          </motion.h2>
        ) : (
          <motion.div
            key="show"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 flex w-full flex-col items-center gap-4"
          >
            <div className="relative h-[58dvh] w-full overflow-hidden rounded-3xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] ring-1 ring-gold/25">
              <AnimatePresence mode="sync">
                <motion.img
                  key={i}
                  src={photo.src}
                  alt={photo.caption}
                  draggable={false}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1.14 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 0.9 },
                    scale: { duration: AUTO_MS / 1000 + 2, ease: "linear" },
                  }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              <button
                onClick={() => go(-1)}
                aria-label="Previous photo"
                className="glass absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-rose"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next photo"
                className="glass absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-rose"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="font-display text-lg text-rose"
              >
                {photo.caption}
              </motion.p>
            </AnimatePresence>

            <div className="flex w-full max-w-[240px] gap-1.5">
              {SPOTLIGHT.map((_, d) => (
                <div key={d} className="h-1 flex-1 overflow-hidden rounded-full bg-rose/20">
                  <motion.div
                    className="h-full bg-rose"
                    initial={{ width: d < i ? "100%" : "0%" }}
                    animate={{ width: d < i || (d === i && finished) ? "100%" : d === i ? "100%" : "0%" }}
                    transition={{ duration: d === i && !finished ? AUTO_MS / 1000 : 0.2, ease: "linear" }}
                  />
                </div>
              ))}
            </div>

            {finished && (
              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={onDone}
                className="animate-soft-pulse glass glow-gold rounded-full px-7 py-3 font-display text-lg text-rose"
              >
                Continue 💫
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </StepShell>
  );
}
