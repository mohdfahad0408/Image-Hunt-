import { useEffect, useCallback, useRef } from 'react';
import { X } from 'lucide-react';

export default function ImageModal({ item, onClose }) {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Focus trap + Escape handling
  useEffect(() => {
    previousFocusRef.current = document.activeElement;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
      // Trap focus within modal
      if (e.key === 'Tab') {
        const focusable = modalRef.current?.querySelectorAll('button, [tabindex]');
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    // Focus the close button
    setTimeout(() => {
      modalRef.current?.querySelector('button')?.focus();
    }, 100);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    };
  }, [onClose]);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Archive entry preview"
      ref={modalRef}
      data-image-id={item.id}
      data-secret-key={item.code}
    >
      <div className="modal-content">
        {/* Close Button */}
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close preview"
        >
          <X size={18} />
        </button>

        {/* HUD decorations */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <div className="w-4 h-4 border-l border-t border-accent-cyan/30" />
        </div>
        <div className="absolute bottom-3 right-14 z-10 pointer-events-none">
          <div className="w-4 h-4 border-r border-b border-accent-cyan/30" />
        </div>

        {/* Image - no name, no key, no status */}
        <img
          src={item.image}
          alt="Archive visual"
          className="block"
          style={{ maxWidth: '80vw', maxHeight: '80vh', objectFit: 'contain' }}
        />

        {/* Bottom bar decoration */}
        <div className="px-4 py-3 border-t border-accent-purple/10 flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-[0.2em] text-text-muted uppercase">
            Archive Entry — {item.id}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green/50" />
        </div>
      </div>
    </div>
  );
}
