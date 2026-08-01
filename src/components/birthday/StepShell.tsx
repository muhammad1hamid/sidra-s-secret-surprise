import type { ReactNode } from "react";
import { motion } from "motion/react";

/** Shared full-viewport step wrapper with cinematic enter/exit. */
export function StepShell({ children }: { children: ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.94, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -14 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 flex h-[100dvh] w-full flex-col items-center justify-center px-5 py-6"
    >
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-5 text-center">
        {children}
      </div>
    </motion.section>
  );
}
