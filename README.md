# Sidra's Secret Surprise

Build a stunning, single-page romantic birthday surprise web app (React + Tailwind + Framer Motion). This is a personal gift from Inshal Ahmed to his girlfriend Sidra for her birthday, so it must feel magical, premium, cinematic, and deeply personal — not a generic template.

## CRITICAL STRUCTURAL RULE

This is a ONE-SCREEN EXPERIENCE, not a scrolling website. Only ONE section is ever visible/mounted on screen at a time, centered and fitted to the viewport (100vh/100dvh, no page scroll at all, strict mobile-first — must fit perfectly on a phone screen with no scrollbars).

Implement this as a step-based state machine (currentStep state: 0 to 7). Each section is its own component. When the user completes the action required in the current section, trigger this exact sequence:

1. Current section plays an "exit" animation (fade out + slight scale down or slide, ~0.5s, Framer Motion AnimatePresence).

2. Once fully exited (use AnimatePresence `mode="wait"` so there's no overlap), the next section mounts and plays an "enter" animation (fade in + slight scale up or slide, ~0.5-0.7s).

3. Never show two sections at once. Never allow going back. Transitions should feel cinematic, not abrupt.

Every section shares a consistent full-screen romantic background (soft gradient blush pink/cream/lavender/gold, floating hearts/sparkle particles drifting continuously across ALL sections, not just intro) so transitions feel seamless.

## STEP-BY-STEP FLOW

### STEP 0 — HIDDEN PIN LOCK SCREEN

- Full-screen romantic entry screen. At first glance there is NO visible PIN input — just a beautifully designed screen with a soft glowing lock icon, floating particles, and a warm message: "This is just for you 💕"

- Below that, a teasing HINT instead of an obvious input box: "Hint: think back to the year everything began... the year you were born 👶✨" (make this hint text easily editable via a comment — currently hints toward "2005").

- Only on tapping/clicking the lock icon (or a small "I know it" ghost button) does a hidden 4-digit PIN input elegantly reveal itself (slide down/fade in) — styled as 4 separate glowing boxes, autofocus, numeric keyboard on mobile.

- Correct PIN = "2005". Wrong PIN: input shakes + soft red glow + cute retry message like "Not quite... try again 🥺"

- Correct PIN: boxes glow gold, small confetti burst, brief pause (~600ms), then transition into Step 1.

### STEP 1 — LOADING ANIMATION

- Full-screen elegant animated heart-shaped or circular progress loader (gradient fill, pulsing glow).

- Rotating cute romantic loading messages every ~800ms: "Unlocking your surprise...", "Adding extra love...", "Almost there, hang tight 💫", "Getting the cake ready 🎂"

- A small cute animated panda sticker (simple animated SVG/CSS character — bounce, wiggle, blink loop) peeking/waving in a corner during load.

- After ~2.5-3s, automatically transition into Step 2 (this is the one step that auto-advances, no user action needed).

### STEP 2 — TEXT INTRO ANIMATION

- Sequential text reveal, each line appearing after the previous, with soft twinkling stars/floating hearts in background:

  - Line 1: "Shhh... come closer" (fade in, hold, fade out)

  - Line 2: "It's your special day 🎉" (typewriter/letter-by-letter reveal, hold, fade out)

  - Line 3 (bigger, dramatic, gold shimmer text effect, stays on screen): "Happy Birthday, My Girl 💗"

- A cute animated panda sticker holding a small balloon or cake, gently swaying near the text.

- Once Line 3 has held for ~2s, show a small "Continue 💫" button (soft pulsing glow) — tapping advances to Step 3.

### STEP 3 — COUNTDOWN

- "Counting down to YOUR day 🎂" heading.

- Elegant countdown timer to August 2 (current year), Days:Hours:Minutes:Seconds in glassmorphic cards with flip/slide digit animation.

- If countdown has reached zero (on/after Aug 2), instead show animated "IT'S TODAY! 🎉🎂" banner with confetti.

- Below: glowing pulsing button "See Memories 💌" — tap triggers transition to Step 4.

### STEP 4 — MEMORIES PHOTO SLIDER

- Swipeable (mobile) / arrow-navigable (desktop) photo carousel, smooth crossfade/slide, slightly tilted polaroid-style frames that straighten when active.

- Placeholder images in a clearly commented array — easy to swap with real photos, with placeholder captions like "Our first date 🥰".

- Dot indicators under slider.

- A "From Me 💝" button appears below the slider — tapping it triggers transition to Step 5.

### STEP 5 — CARD REVEAL

- Animated card unfolds/flips open (envelope-opening or 3D card-flip animation).

- Inside, heartfelt message with TYPEWRITER EFFECT (letter-by-letter, blinking cursor):

"To Sidra, the girl who makes my world softer, brighter, and so much more beautiful... Happy Birthday. I hope this year gives you everything your heart is quietly hoping for. I love you more than these words can hold. 💗"

(Clearly commented so this message is easy to replace.)

- Floating hearts + pulsing glow border around card.

- Button at bottom: "Celebrate 🎉" — tapping triggers transition to Step 6.

### STEP 6 — CELEBRATION FINALE

- Flowers/rose petals falling from top (natural varied rotation/fall speed, CSS/canvas particle animation) + confetti + floating hearts.

- Large centered final message with bounce/scale entrance: "Happy Birthday 🎂 I love you endlessly 💗"

- 2-3 cute animated stickers (panda with balloons, cat with party horn, floating cake with sparkles) gently bobbing/wiggling around the message.

- A subtle "One last thing 🥹" button appears after a couple seconds, tapping it transitions to Step 7.

### STEP 7 — THE FINAL QUESTION

- Full-screen romantic layout, floating hearts continuing in background.

- Big playful heading: "Do you love me? 🥺💗"

- Two buttons below: "Yes 💛" and "No"

- The "Yes" button stays completely fixed in place, always clickable, normal styling (soft glow, gentle pulse to draw attention).

- The "No" button is mischievous:

  - On desktop, when the cursor hovers near/over it (use mouse position + proximity detection, not just exact hover), it smoothly darts away to a new random position within the screen bounds (Framer Motion spring transition, quick but smooth, not jarring/teleport-y).

  - On mobile, trigger the same dodge behavior on touchstart / when a finger gets close, so it's effectively impossible to press, but still fun and visibly "trying" to be pressed.

  - Cap its movement within the visible viewport (no overflow off-screen). Add a cute rotating set of taunting labels that cycle each time it dodges: "No" → "Nope 😅" → "Try again 😏" → "Nice try 😂" → "Not happening 🥰"

  - Add a subtle small caption under the buttons after a couple failed attempts: "Yeah... that button doesn't work 😌"

- When "Yes 💛" is clicked: transition (fade/scale) into a final reveal — buttons disappear and a beautifully animated message appears with gentle entrance animation, staggered line by line:

"I knew it 😌💗

Because from the day I found you, every ordinary moment turned into something worth remembering.

You're not just my favorite person, Sidra — you're my favorite feeling.

Happy Birthday, my love. Here's to loving you louder, every single year. 💍✨

— Inshal Ahmed"

(Make this final message clearly commented/editable in the code.)

- Add soft confetti or a gentle final sparkle animation triggered the moment "Yes" is clicked, slightly more subdued/elegant than Step 6's big celebration (this is the quiet emotional final note, not big fireworks).

- This is the last screen — no further steps, no navigation, just this final loving message as the ending.

## GENERAL REQUIREMENTS

- Strict mobile-first, single-viewport design (100vh/100dvh, no scrolling anywhere, everything fits and centers perfectly on a phone screen).

- Only one section mounted/visible at a time, always — enforced via step-based state machine with AnimatePresence (mode="wait") for exit-before-enter transitions.

- Consistent glassmorphism + gold/pink glow aesthetic and continuous floating particle/heart background across every single step.

- Elegant script font for headings (e.g. "Great Vibes"/"Dancing Script"), clean readable font for body text.

- Small floating background-music toggle icon (muted by default, placeholder/commented spot for audio file) present from Step 1 onward.

- Cute animated stickers (panda, cat, etc.) as lightweight looping SVG/CSS animations — used at Step 1, Step 2, and Step 6 for charm without clutter.

- Clean, well-commented code marking exactly where to: (1) change the PIN, (2) edit the hidden hint text, (3) swap placeholder photos, (4) edit the Step 5 card message, (5) edit the Step 7 final message, (6) adjust the countdown target date.

- Overall vibe: unpredictable, delightful, cinematic, deeply personal — like unwrapping a gift one sealed layer at a time, never revealing the next surprise until the current one is complete.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8e89a6b2-e43a-4c78-93f9-b431a025703c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
