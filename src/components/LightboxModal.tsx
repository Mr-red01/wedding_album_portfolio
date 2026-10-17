import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Download,
  Share2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import type { PhotoItem } from '../types/gallery';

interface LightboxModalProps {
  photos: PhotoItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSharePhoto: (photo: PhotoItem, e: React.MouseEvent) => void;
  onDownloadPhoto: (photo: PhotoItem, e: React.MouseEvent) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  favorites,
  onToggleFavorite,
  onSharePhoto,
  onDownloadPhoto,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const currentPhoto = photos[currentIndex];

  const handlePrev = useCallback(() => {
    setZoomLevel(1);
    onNavigate((currentIndex - 1 + photos.length) % photos.length);
  }, [currentIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    setZoomLevel(1);
    onNavigate((currentIndex + 1) % photos.length);
  }, [currentIndex, photos.length, onNavigate]);

  // Keyboard navigation & Shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, handlePrev, handleNext, onClose]);

  // Reset zoom on index change
  useEffect(() => {
    setZoomLevel(1);
  }, [currentIndex]);

  if (!isOpen || !currentPhoto) return null;

  const isFav = favorites.includes(currentPhoto.id);

  const toggleZoom = () => {
    setZoomLevel((prev) => (prev === 1 ? 1.8 : 1));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: 'var(--lightbox-bg)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        animation: 'lightboxFade 0.25s ease-out',
      }}
    >
      {/* Top Controls Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 2rem',
          color: '#ffffff',
          zIndex: 10,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)',
        }}
      >
        {/* Index counter & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span
            style={{
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            {currentIndex + 1} / {photos.length}
          </span>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em' }}>
            {currentPhoto.captionTitle || currentPhoto.title}
          </span>
          {currentPhoto.isUserUploaded && (
            <span
              style={{
                backgroundColor: 'rgba(197, 160, 89, 0.25)',
                color: 'var(--color-accent-gold)',
                fontSize: '0.675rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '12px',
                border: '1px solid rgba(197, 160, 89, 0.5)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Featured Capture
            </span>
          )}
        </div>

        {/* Right Action Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Zoom Toggle */}
          <button
            onClick={toggleZoom}
            title={zoomLevel > 1 ? 'Zoom Out' : 'Zoom In'}
            className="lightbox-ctrl-btn"
            style={{
              padding: '8px',
              borderRadius: '50%',
              color: '#ffffff',
              backgroundColor: 'var(--lightbox-control-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s',
            }}
          >
            {zoomLevel > 1 ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen"
            className="lightbox-ctrl-btn"
            style={{
              padding: '8px',
              borderRadius: '50%',
              color: '#ffffff',
              backgroundColor: 'var(--lightbox-control-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s',
            }}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>

          {/* Favorite Toggle */}
          <button
            onClick={(e) => onToggleFavorite(currentPhoto.id, e)}
            title={isFav ? 'Remove from favorites' : 'Add to favorites'}
            className="lightbox-ctrl-btn"
            style={{
              padding: '8px',
              borderRadius: '50%',
              color: isFav ? 'var(--color-heart)' : '#ffffff',
              backgroundColor: isFav ? 'rgba(239, 68, 68, 0.2)' : 'var(--lightbox-control-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >
            <Heart size={18} fill={isFav ? 'currentColor' : 'none'} strokeWidth={2} />
          </button>

          {/* Share */}
          <button
            onClick={(e) => onSharePhoto(currentPhoto, e)}
            title="Share Photo"
            className="lightbox-ctrl-btn"
            style={{
              padding: '8px',
              borderRadius: '50%',
              color: '#ffffff',
              backgroundColor: 'var(--lightbox-control-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s',
            }}
          >
            <Share2 size={18} />
          </button>

          {/* Download */}
          <button
            onClick={(e) => onDownloadPhoto(currentPhoto, e)}
            title="Download Original"
            className="lightbox-ctrl-btn"
            style={{
              padding: '8px',
              borderRadius: '50%',
              color: '#ffffff',
              backgroundColor: 'var(--lightbox-control-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s',
            }}
          >
            <Download size={18} />
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            title="Close (Esc)"
            className="lightbox-ctrl-btn"
            style={{
              padding: '8px',
              borderRadius: '50%',
              color: '#ffffff',
              backgroundColor: 'var(--lightbox-control-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '8px',
              transition: 'background-color 0.2s',
            }}
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div
        style={{
          position: 'relative',
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '1rem',
        }}
      >
        {/* Navigation Arrow Previous */}
        <button
          onClick={handlePrev}
          aria-label="Previous photograph"
          style={{
            position: 'absolute',
            left: '2rem',
            zIndex: 10,
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)')}
        >
          <ChevronLeft size={28} />
        </button>

        {/* Central Photograph with Zoom Transition */}
        <div
          style={{
            maxWidth: '92vw',
            maxHeight: '82vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: zoomLevel > 1 ? 'zoom-out' : 'zoom-in',
          }}
          onClick={toggleZoom}
        >
          <picture style={{ maxWidth: '100%', maxHeight: '82vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {currentPhoto.webpSrc && <source srcSet={currentPhoto.webpSrc} type="image/webp" />}
            <img
              src={currentPhoto.src}
              alt={currentPhoto.alt || currentPhoto.title}
              style={{
                maxWidth: '100%',
                maxHeight: '82vh',
                objectFit: 'contain',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
                borderRadius: '4px',
                transform: `scale(${zoomLevel})`,
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </picture>
        </div>

        {/* Navigation Arrow Next */}
        <button
          onClick={handleNext}
          aria-label="Next photograph"
          style={{
            position: 'absolute',
            right: '2rem',
            zIndex: 10,
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)')}
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Bottom Information Bar */}
      <div
        style={{
          padding: '1rem 2rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.65)',
          fontSize: '0.8rem',
          letterSpacing: '0.08em',
        }}
      >
        <span>Use arrow keys to navigate • Esc to exit</span>
      </div>

      <style>{`
        @keyframes lightboxFade {
          from { opacity: 0; transform: scale(0.99); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};
