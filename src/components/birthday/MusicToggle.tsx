import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const VIDEO_ID = "jKN8jZoJcvA";
const TRACK_NAME = "River Dream";

declare global {
  interface Window {
    YT?: {
      Player: new (
        id: string | HTMLElement,
        opts: Record<string, unknown>,
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  unMute: () => void;
  setVolume: (vol: number) => void;
  destroy: () => void;
}

export function MusicToggle() {
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);
  const playerRef = useRef<YTPlayer | null>(null);

  useEffect(() => {
    const initPlayer = () => {
      if (playerRef.current || !window.YT?.Player) return;
      const host = document.createElement("div");
      host.id = "yt-music-host";
      host.style.cssText =
        "position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;pointer-events:none;opacity:0;";
      document.body.appendChild(host);

      playerRef.current = new window.YT.Player("yt-music-host", {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          loop: 1,
          playlist: VIDEO_ID,
        },
        events: {
          onReady: () => setReady(true),
        },
      });
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      if (
        !document.querySelector('script[src*="youtube.com/iframe_api"]')
      ) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const player = playerRef.current;
    if (!player || !ready) return;
    if (on) {
      player.playVideo();
      player.unMute();
      player.setVolume(45);
    } else {
      player.pauseVideo();
    }
  }, [on, ready]);

  return (
    <button
      aria-label={on ? "Mute music" : "Play music"}
      onClick={() => setOn((v) => !v)}
      className="glass group fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full text-rose transition-transform active:scale-90"
    >
      {on ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      <span className="pointer-events-none absolute right-12 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-black/60 px-3 py-1 text-xs text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
        ♪ {TRACK_NAME}
      </span>
    </button>
  );
}
