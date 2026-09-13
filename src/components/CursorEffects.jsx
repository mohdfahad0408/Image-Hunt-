import { useEffect, useRef, useCallback } from 'react';

export default function CursorEffects() {
  const auraRef = useRef(null);
  const cursorOuterRef = useRef(null);
  const cursorInnerRef = useRef(null);
  const trailPoolRef = useRef([]);
  const trailIndexRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const handleMouseMove = useCallback((e) => {
    // Move custom cursor
    if (cursorOuterRef.current) {
      cursorOuterRef.current.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
    }
    if (cursorInnerRef.current) {
      cursorInnerRef.current.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
    }

    // Move aura
    if (auraRef.current) {
      auraRef.current.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
      auraRef.current.style.opacity = '1';
    }

    // Trail particles
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);

    if (speed > 5 && trailPoolRef.current.length > 0) {
      const particle = trailPoolRef.current[trailIndexRef.current % trailPoolRef.current.length];
      if (particle) {
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        particle.style.opacity = '0.6';
        particle.style.color = Math.random() > 0.5 ? 'var(--color-cyan)' : 'var(--color-purple)';
        particle.style.transform = `translate3d(-50%, -50%, 0) scale(1) rotate(${Math.random() * 360}deg)`;

        setTimeout(() => {
          particle.style.opacity = '0';
          particle.style.transform = `translate3d(-50%, calc(-50% + 10px), 0) scale(0.2) rotate(${Math.random() * 360}deg)`;
        }, 150);
      }
      trailIndexRef.current++;
    }

    lastPosRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    // Check for prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    window.addEventListener('mousemove', handleMouseMove);

    // Add logic to make cursor ring expand on clickable elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.image-card') ||
        target.closest('.category-btn') ||
        getComputedStyle(target).cursor === 'pointer'
      ) {
        if (cursorOuterRef.current) cursorOuterRef.current.classList.add('hovering');
      } else {
        if (cursorOuterRef.current) cursorOuterRef.current.classList.remove('hovering');
      }
    };
    
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [handleMouseMove, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Custom Cursor */}
      <div ref={cursorOuterRef} className="cursor-hex-outer">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50 3, 93 28, 93 72, 50 97, 7 72, 7 28" fill="none" stroke="currentColor" strokeWidth="4" />
        </svg>
      </div>
      <div ref={cursorInnerRef} className="cursor-hex-inner">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50 3, 93 28, 93 72, 50 97, 7 72, 7 28" fill="currentColor" />
        </svg>
      </div>

      {/* Cursor Aura */}
      <div ref={auraRef} className="cursor-aura" style={{ opacity: 0 }} />

      {/* Trail Particles Pool */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailPoolRef.current[i] = el;
          }}
          className="cursor-trail-hex"
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50 3, 93 28, 93 72, 50 97, 7 72, 7 28" fill="none" stroke="currentColor" strokeWidth="8" />
          </svg>
        </div>
      ))}
    </>
  );
}
