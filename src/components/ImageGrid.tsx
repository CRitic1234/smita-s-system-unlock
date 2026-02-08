import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface ImageGridProps {
  images: Array<{
    src: string;
    alt: string;
  }>;
}

const ImageGrid = ({ images }: ImageGridProps) => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  const rotations = [-2, 1, -1];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {images.map((image, index) => (
        <div
          key={index}
          className="animate-stagger bg-white p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          style={{
            transform: `rotate(${rotations[index]}deg)`,
            animationDelay: `${index * 150}ms`,
          }}
        >
          <div className="relative aspect-square overflow-hidden">
            {!loadedImages.has(index) && (
              <Skeleton className="absolute inset-0 bg-love-cream" />
            )}
            <img
              src={image.src}
              alt={image.alt}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                loadedImages.has(index) ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => handleLoad(index)}
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
