import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StepShell } from "../StepShell";

/* ▶ SWAP PLACEHOLDER PHOTOS + CAPTIONS HERE
   Replace `src` with your own image (put files in /public/photos/… or import from src/assets)
   and edit the captions — they're meant to be warm, genuine compliments. */
const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80", caption: "That smile that makes everyone's day better ☺️" },
  { src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80", caption: "The kind of energy people just gravitate towards ✨" },
  { src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80", caption: "Effortlessly herself, always 💫" },
  { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80", caption: "The person who makes ordinary days feel special 🌸" },
];


export function Step4Memories({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const photo = PHOTOS[i]!;
  const go = (d: number) => setI((v) => (v + d + PHOTOS.length) % PHOTOS.length);

  return (
    <StepShell>
      <h2 className="font-script text-4xl text-rose">Our little moments 💌</h2>

      <div className="relative flex h-[300px] w-full items-center justify-center">
        <button
          onClick={() => go(-1)}
          aria-label="Previous"
          className="glass absolute left-0 z-20 flex h-9 w-9 items-center justify-center rounded-full text-rose"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
            initial={{ opacity: 0, x: 40, rotate: -6, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, rotate: 6, scale: 0.92 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="glass w-[230px] cursor-grab rounded-xl p-3 pb-4 active:cursor-grabbing"
          >
            <img
              src={photo.src}
              alt={photo.caption}
              draggable={false}
              className="h-[210px] w-full rounded-lg object-cover"
            />
            <p className="mt-3 font-display text-lg text-rose">{photo.caption}</p>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => go(1)}
          aria-label="Next"
          className="glass absolute right-0 z-20 flex h-9 w-9 items-center justify-center rounded-full text-rose"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-2">
        {PHOTOS.map((_, d) => (
          <button
            key={d}
            aria-label={`Photo ${d + 1}`}
            onClick={() => setI(d)}
            className={`h-2 rounded-full transition-all ${d === i ? "w-6 bg-rose" : "w-2 bg-rose/30"}`}
          />
        ))}
      </div>

      <button
        onClick={onDone}
        className="animate-soft-pulse glass rounded-full px-7 py-3 font-display text-lg text-rose"
      >
        From Me 💝
      </button>
    </StepShell>
  );
}
