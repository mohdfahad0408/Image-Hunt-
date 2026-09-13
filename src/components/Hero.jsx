export default function Hero() {
  return (
    <header className="relative z-10 pt-28 pb-12 sm:pt-36 sm:pb-16 px-4 text-center">
      {/* Decorative line */}
      <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent-purple/50" />
        <span className="text-[10px] font-mono tracking-[0.4em] text-text-muted uppercase">
          Classification Level: Open
        </span>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent-purple/50" />
      </div>

      {/* Logo */}
      <img 
        src="/krypt-crew-logo.png" 
        alt="Krypt.Crew Logo" 
        className="w-24 h-auto mx-auto mb-6 animate-slide-up"
        style={{ animationDelay: '0.05s', animationFillMode: 'backwards' }}
      />

      {/* Main Title */}
      <h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[0.08em] text-text-primary mb-4 animate-slide-up"
        style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}
      >
        KRYPT.CREW
      </h1>

      {/* Subtitle */}
      <h2
        className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.2em] mb-6 animate-slide-up"
        style={{
          animationDelay: '0.2s',
          animationFillMode: 'backwards',
          background: 'linear-gradient(135deg, #6C63FF, #00D9FF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        THE IMAGE HUNT
      </h2>

      {/* Tagline */}
      <p
        className="text-xs sm:text-sm font-mono tracking-[0.3em] text-text-muted uppercase animate-slide-up"
        style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}
      >
        Observe • Discover
      </p>

      {/* Decorative bottom line */}
      <div
        className="mt-8 mx-auto w-32 h-px animate-fade-in"
        style={{
          animationDelay: '0.5s',
          animationFillMode: 'backwards',
          background: 'linear-gradient(90deg, transparent, rgba(108, 99, 255, 0.5), transparent)',
        }}
      />
    </header>
  );
}
