/** Confetti / sparkle helpers (client-only, dynamically imported). */
export async function burstConfetti(intensity: "small" | "big" | "soft" = "small") {
  if (typeof window === "undefined") return;
  const confetti = (await import("canvas-confetti")).default;
  const colors = ["#f7b6c2", "#e6c17a", "#f5e3c3", "#d9b8e8", "#ffffff"];

  if (intensity === "big") {
    const end = Date.now() + 1800;
    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, colors });
      confetti({ particleCount: 5, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
    confetti({ particleCount: 120, spread: 100, origin: { y: 0.6 }, colors });
    return;
  }

  if (intensity === "soft") {
    confetti({
      particleCount: 45,
      spread: 120,
      startVelocity: 18,
      gravity: 0.5,
      scalar: 0.8,
      ticks: 220,
      origin: { y: 0.5 },
      colors,
    });
    return;
  }

  confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 }, colors });
}
