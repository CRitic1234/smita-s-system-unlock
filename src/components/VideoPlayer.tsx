import { useState, useRef } from "react";
import { Skeleton } from "./ui/skeleton";

interface VideoPlayerProps {
  src: string;
  cinematic?: boolean;
}

const VideoPlayer = ({ src, cinematic = false }: VideoPlayerProps) => {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-xl ${
        cinematic ? "aspect-video" : "aspect-video max-w-2xl mx-auto"
      }`}
    >
      {!loaded && (
        <Skeleton className="absolute inset-0 bg-love-cream" />
      )}
      <video
        ref={videoRef}
        src={src}
        className={`w-full h-full object-cover cursor-pointer transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setLoaded(true)}
        onClick={handleClick}
      />
    </div>
  );
};

export default VideoPlayer;
