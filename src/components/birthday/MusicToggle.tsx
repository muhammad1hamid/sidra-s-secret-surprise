import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Floating background-music toggle. Muted by default.
 * ▶ TO ADD MUSIC: drop an mp3 in /public (e.g. /public/music.mp3)
 *   and uncomment the <audio> element below + set AUDIO_SRC.
 */
const AUDIO_SRC = "/music.mp3"; // placeholder path

export function MusicToggle() {
  const [on, setOn] = useState(false);

  return (
    <>
      {/* <audio src={AUDIO_SRC} loop autoPlay={on} muted={!on} /> */}
      <button
        aria-label={on ? "Mute music" : "Play music"}
        onClick={() => {
          setOn((v) => !v);
          void AUDIO_SRC;
        }}
        className="glass fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full text-rose transition-transform active:scale-90"
      >
        {on ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </button>
    </>
  );
}
