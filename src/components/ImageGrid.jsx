import { useMemo } from 'react';
import { shuffle } from '../utils/shuffle';
import ImageCard from './ImageCard';

export default function ImageGrid({ images, onCardClick }) {
  // Shuffle once per mount — order changes but image↔key mapping never changes
  const shuffledImages = useMemo(() => shuffle(images), [images]);

  return (
    <section
      id="archive"
      className="relative z-10 px-4 pb-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Archive header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-accent-purple/20 to-transparent" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-text-muted uppercase">
            {shuffledImages.length} Entries Found
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-accent-purple/20 to-transparent" />
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {shuffledImages.map((item, index) => (
            <div
              key={item.id}
              className="animate-slide-up"
              style={{
                animationDelay: `${Math.min(index * 50, 2000)}ms`,
                animationFillMode: 'backwards',
              }}
            >
              <ImageCard item={item} onClick={onCardClick} />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {shuffledImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-sm font-mono tracking-[0.2em] text-text-muted uppercase">
              Archive unavailable
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
