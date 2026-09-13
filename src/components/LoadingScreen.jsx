import { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1000),
      setTimeout(() => {
        setPhase(4);
        setTimeout(() => onComplete(), 400);
      }, 1600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (phase >= 4) return null;

  return (
    <div
      className="loading-screen"
      style={{ opacity: phase >= 4 ? 0 : 1 }}
    >
      {/* Logo / Title */}
      <div
        className="text-center transition-all duration-500"
        style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? 'translateY(0)' : 'translateY(10px)',
        }}
      >
        <img 
          src="/krypt-crew-logo.png" 
          alt="Krypt.Crew Logo" 
          className="w-24 h-auto mx-auto mb-6" 
        />
        <div className="text-xs font-mono tracking-[0.3em] text-text-muted mb-3 uppercase">
          Initializing Archive
        </div>
        <h1 className="text-2xl font-bold tracking-[0.15em] text-text-primary uppercase">
          KRYPT.CREW
        </h1>
      </div>

      {/* Loading Bar */}
      <div
        className="loading-bar mt-8 transition-opacity duration-300"
        style={{ opacity: phase >= 2 ? 1 : 0 }}
      >
        <div className="loading-bar-fill" />
      </div>

      {/* Status Text */}
      <div
        className="mt-4 text-xs font-mono tracking-[0.2em] text-text-muted transition-opacity duration-300"
        style={{ opacity: phase >= 3 ? 1 : 0 }}
      >
        ARCHIVE READY
      </div>
    </div>
  );
}
