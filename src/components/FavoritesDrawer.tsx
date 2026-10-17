import React, { useState } from 'react';
import { X, Heart, Copy, Check, Trash2 } from 'lucide-react';
import type { PhotoItem } from '../types/gallery';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  allPhotos: PhotoItem[];
  onRemoveFavorite: (id: string) => void;
  onClearAll: () => void;
  onOpenPhoto: (photoId: string) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  allPhotos,
  onRemoveFavorite,
  onClearAll,
  onOpenPhoto,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const favoritePhotos = allPhotos.filter((p) => favorites.includes(p.id));

  const handleCopyFilenames = () => {
    const filenames = favoritePhotos.map((p) => p.title).join(', ');
    navigator.clipboard.writeText(filenames);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 90,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          backgroundColor: '#ffffff',
          boxShadow: 'var(--shadow-overlay)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--color-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={20} fill="var(--color-heart)" color="var(--color-heart)" />
            <h2
              style={{
                fontFamily: 'var(--heading-font-family)',
                fontSize: '1.4rem',
                fontWeight: 600,
                color: 'var(--color-text-main)',
              }}
            >
              Selected Favorites ({favoritePhotos.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '50%',
              color: 'var(--color-text-muted)',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.25rem 1.5rem',
          }}
        >
          {favoritePhotos.length === 0 ? (
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'var(--color-text-muted)',
                gap: '12px',
              }}
            >
              <Heart size={44} strokeWidth={1} style={{ opacity: 0.35 }} />
              <p style={{ fontSize: '0.95rem' }}>No photos added to your favorites yet.</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-subtle)' }}>
                Click the heart icon on any photo in the gallery to mark it for your album selection.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {favoritePhotos.map((photo) => (
                <div
                  key={photo.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border-light)',
                    backgroundColor: 'var(--color-bg-card)',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease',
                  }}
                  onClick={() => {
                    onOpenPhoto(photo.id);
                    onClose();
                  }}
                >
                  <img
                    src={photo.webpSrc || photo.src}
                    alt={photo.alt || photo.title}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '6px',
                      objectFit: 'cover',
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: 'var(--color-text-main)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {photo.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle)', marginTop: '2px' }}>
                      Click to inspect
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFavorite(photo.id);
                    }}
                    title="Remove from favorites"
                    style={{
                      padding: '8px',
                      color: 'var(--color-text-muted)',
                      borderRadius: '50%',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-heart)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {favoritePhotos.length > 0 && (
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderTop: '1px solid var(--color-border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <button
              onClick={handleCopyFilenames}
              style={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-text-main)',
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Filenames Copied to Clipboard!' : 'Copy Filename List for Studio'}</span>
            </button>

            <button
              onClick={onClearAll}
              style={{
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)',
                textAlign: 'center',
                padding: '6px',
              }}
            >
              Clear all favorites
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
