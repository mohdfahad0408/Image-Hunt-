import { memo, useState, useCallback, useRef } from 'react';

const ImageCard = memo(function ImageCard({ item, onClick }) {
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef(null);
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const handleMouseMove = useCallback((e) => {
    if (isTouchDevice) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Clamp tilt to ±4 degrees
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.02)`;
  }, [isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = '';
    }
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(item);
    }
  }, [item, onClick]);

  return (
    <article
      ref={cardRef}
      className="image-card"
      data-image-id={item.id}
      data-secret-key={item.code}
      role="button"
      tabIndex={0}
      aria-label="Archive entry"
      onClick={() => onClick(item)}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Wrapper */}
      <div className="card-image-wrapper">
        {imageError ? (
          <div className="image-fallback">
            <span>Archive Data</span>
            <span>Unavailable</span>
          </div>
        ) : (
          <img
            src={item.image}
            alt="Archive visual"
            loading="lazy"
            onError={() => setImageError(true)}
            draggable={false}
          />
        )}

        {/* Vignette Overlay */}
        <div className="card-vignette" />

        {/* Scan Line */}
        <div className="card-scan-line" />
      </div>

      {/* HUD Corners */}
      <div className="hud-corners" />
      <div className="hud-corners-alt" />
    </article>
  );
});

export default ImageCard;
