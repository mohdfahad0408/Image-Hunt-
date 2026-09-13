import { Database } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 animate-slide-down">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <div className="glass rounded-2xl px-6 py-3 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent-purple/20 flex items-center justify-center border border-accent-purple/30">
              <span className="text-accent-purple text-sm font-bold">K</span>
            </div>
            <div>
              <div className="text-sm font-semibold tracking-[0.15em] text-text-primary uppercase">
                KRYPT.CREW
              </div>
              <div className="text-[10px] font-mono tracking-[0.2em] text-text-muted uppercase">
                Image Hunt
              </div>
            </div>
          </div>

          {/* Center */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono tracking-[0.15em] text-text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
            <span>ARCHIVE ONLINE</span>
          </div>

          {/* Right */}
          <a
            href="#archive"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium tracking-[0.1em] text-text-muted hover:text-text-primary hover:bg-accent-purple/10 transition-all duration-200 uppercase"
          >
            <Database size={14} />
            <span>Archive</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
