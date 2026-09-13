import { useState, useMemo, useCallback } from 'react';
import imageDatabase from './data/imageDatabase';
import AnimatedBackground from './components/AnimatedBackground';
import CursorEffects from './components/CursorEffects';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ImageGrid from './components/ImageGrid';
import ImageModal from './components/ImageModal';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState(null);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const handleCardClick = useCallback((item) => {
    setModalItem(item);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalItem(null);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Skip Link */}
      <a href="#archive" className="skip-link">
        Skip to archive
      </a>

      {/* Loading Screen */}
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Animated Background */}
      <AnimatedBackground />

      {/* Cursor Effects (desktop only) */}
      <CursorEffects />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero */}
        <Hero />

        {/* Image Archive Grid */}
        <ImageGrid
          images={imageDatabase}
          onCardClick={handleCardClick}
        />
      </main>

      {/* Modal */}
      {modalItem && (
        <ImageModal item={modalItem} onClose={handleCloseModal} />
      )}

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center border-t border-accent-purple/10">
        <p className="text-[10px] font-mono tracking-[0.3em] text-text-muted uppercase">
          KRYPT.CREW — Digital Archive System
        </p>
      </footer>
    </div>
  );
}
