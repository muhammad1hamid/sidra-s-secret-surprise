import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";

import { ParticleField } from "@/components/birthday/ParticleField";
import { MusicToggle } from "@/components/birthday/MusicToggle";
import { HeartEasterEgg } from "@/components/birthday/HeartEasterEgg";
import { Step0Lock } from "@/components/birthday/steps/Step0Lock";
import { Step1Loading } from "@/components/birthday/steps/Step1Loading";
import { Step2Intro } from "@/components/birthday/steps/Step2Intro";
import { Step3Countdown } from "@/components/birthday/steps/Step3Countdown";
import { Step4Memories } from "@/components/birthday/steps/Step4Memories";
import { Step5Spotlight } from "@/components/birthday/steps/Step5Spotlight";
import { Step5Card } from "@/components/birthday/steps/Step5Card";
import { Step6Celebration } from "@/components/birthday/steps/Step6Celebration";
import { Step7Question } from "@/components/birthday/steps/Step7Question";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "For Sidra — A Birthday Surprise 💗" },
      {
        name: "description",
        content:
          "A hidden, one-of-a-kind birthday surprise made with love — unlock it, one sealed layer at a time.",
      },
      { property: "og:title", content: "For Sidra — A Birthday Surprise 💗" },
      {
        property: "og:description",
        content: "A cinematic, personal birthday surprise made just for you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/**
 * Step-based state machine — only ONE section is mounted at a time.
 * Order: Lock → Loading → Intro → Countdown → Memories → Spotlight → Card → Celebration → Question
 */
function Index() {
  const [step, setStep] = useState(0);
  const next = () => setStep((s) => s + 1);

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden">
      <ParticleField />
      {step >= 1 && <MusicToggle />}
      {/* Easter egg: a lone glowing heart drifts by during the middle of the flow */}
      <HeartEasterEgg active={step >= 2 && step <= 7} />

      <AnimatePresence mode="wait">
        {step === 0 && <Step0Lock key="s0" onDone={next} />}
        {step === 1 && <Step1Loading key="s1" onDone={next} />}
        {step === 2 && <Step2Intro key="s2" onDone={next} />}
        {step === 3 && <Step3Countdown key="s3" onDone={next} />}
        {step === 4 && <Step4Memories key="s4" onDone={next} />}
        {step === 5 && <Step5Spotlight key="s5" onDone={next} />}
        {step === 6 && <Step5Card key="s6" onDone={next} />}
        {step === 7 && <Step6Celebration key="s7" onDone={next} />}
        {step === 8 && <Step7Question key="s8" />}
      </AnimatePresence>
    </main>
  );
}
