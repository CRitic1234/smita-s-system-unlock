import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface PolaroidFrameProps {
  src: string;
  alt: string;
  rotation?: number;
}

const PolaroidFrame = ({ src, alt, rotation = 0 }: PolaroidFrameProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="inline-block bg-white p-3 md:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="relative w-64 md:w-80 aspect-square overflow-hidden">
        {!loaded && (
          <Skeleton className="absolute inset-0 bg-love-cream" />
        )}
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />
      </div>
      <div className="h-8 md:h-10" />
    </div>
  );
};

export default PolaroidFrame;
