import { useState, useEffect, RefObject } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface MusicToggleProps {
  audioRef: RefObject<HTMLAudioElement>;
}

const MusicToggle = ({ audioRef }: MusicToggleProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [audioRef]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  return (
    <button
      onClick={toggleMusic}
      className="fixed top-4 right-4 z-50 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
      aria-label={isPlaying ? "Mute music" : "Play music"}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-love-charcoal" />
      ) : (
        <VolumeX className="w-5 h-5 text-love-charcoal" />
      )}
    </button>
  );
};

export default MusicToggle;
