import React, { useState } from 'react';
import { Heart, Download, Share2, ZoomIn, Sparkles, Image as ImageIcon } from 'lucide-react';
import type { PhotoItem } from '../types/gallery';

interface GalleryGridProps {
  photos: PhotoItem[];
  categoryTitle: string;
  categoryDescription?: string;
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onOpenLightbox: (index: number) => void;
  onSharePhoto: (photo: PhotoItem, e: React.MouseEvent) => void;
  onDownloadPhoto: (photo: PhotoItem, e: React.MouseEvent) => void;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  photos,
  categoryTitle,
  categoryDescription,
  favorites,
  onToggleFavorite,
  onOpenLightbox,
  onSharePhoto,
  onDownloadPhoto,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  if (photos.length === 0) {
    return (
      <div
        style={{
          padding: '6rem 1rem',
          textAlign: 'center',
          color: 'var(--color-text-muted)',
        }}
      >
        <ImageIcon size={44} strokeWidth={1} style={{ opacity: 0.35, margin: '0 auto 1rem' }} />
        <p style={{ fontSize: '1.2rem', fontFamily: 'var(--heading-font-family)' }}>
          No photographs in this section yet.
        </p>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-subtle)', marginTop: '0.5rem' }}>
          Please select another album tab from the navigation above.
        </p>
      </div>
    );
  }

  return (
    <section className="container" style={{ padding: '2.5rem 1.5rem 6rem' }}>
      {/* Editorial Section Header */}
      <div
        style={{
          marginBottom: '2.5rem',
          textAlign: 'center',
          borderBottom: '1px solid var(--color-border-subtle)',
          paddingBottom: '1.75rem',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-accent-gold)',
            fontWeight: 700,
            marginBottom: '0.5rem',
          }}
        >
          <span>Curated Album</span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--heading-font-family)',
            fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
            fontWeight: 400,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-text-main)',
            margin: '0.25rem 0',
          }}
        >
          {categoryTitle}
        </h2>

        {categoryDescription && (
          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--color-text-muted)',
              maxWidth: '600px',
              margin: '0.5rem auto 0',
              lineHeight: 1.6,
            }}
          >
            {categoryDescription}
          </p>
        )}
      </div>

      {/* Dynamic Storyboard Columns Masonry Layout */}
      <div
        className="storyboard-grid"
        style={{
          columnCount: 3,
          columnGap: '20px',
        }}
      >
        {photos.map((photo, index) => {
          const isFav = favorites.includes(photo.id);
          const isHovered = hoveredId === photo.id;
          const isLoaded = loadedImages[photo.id];

          return (
            <div
              key={photo.id}
              className="piece-card"
              onClick={() => onOpenLightbox(index)}
              onMouseEnter={() => setHoveredId(photo.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                breakInside: 'avoid',
                marginBottom: '20px',
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#ede9e3',
                cursor: 'pointer',
                boxShadow: isHovered
                  ? '0 14px 32px rgba(0, 0, 0, 0.12)'
                  : '0 2px 10px rgba(0, 0, 0, 0.04)',
                transform: isHovered ? 'translateY(-3px)' : 'none',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Image Container with Natural Aspect Ratio & Skeleton Placeholder */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: photo.aspectRatio ? photo.aspectRatio.toString() : 'auto',
                  overflow: 'hidden',
                  backgroundColor: '#f5f2ec',
                }}
              >
                {/* Skeleton Shimmer while image loads */}
                {!isLoaded && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(90deg, #ede9e3 0%, #f6f3ee 50%, #ede9e3 100%)',
                      backgroundSize: '200% 100%',
                      animation: 'skeletonShimmer 1.8s infinite',
                    }}
                  />
                )}

                <picture style={{ width: '100%', height: '100%', display: 'block' }}>
                  {photo.webpSrc && <source srcSet={photo.webpSrc} type="image/webp" />}
                  <img
                    src={photo.src}
                    alt={photo.alt || photo.title}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => handleImageLoad(photo.id)}
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'block',
                      objectFit: 'cover',
                      objectPosition: 'center 20%', // Keeps faces well-framed without awkward cropping
                      opacity: isLoaded ? 1 : 0,
                      transition: 'opacity 0.4s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                    }}
                  />
                </picture>

                {/* Featured Client Capture Badge */}
                {photo.isUserUploaded && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: isHovered ? '48px' : '12px',
                      left: '12px',
                      zIndex: 3,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '4px 10px',
                      borderRadius: '16px',
                      backgroundColor: 'rgba(25, 23, 20, 0.78)',
                      backdropFilter: 'blur(6px)',
                      color: 'var(--color-accent-gold)',
                      fontSize: '0.675rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      border: '1px solid rgba(197, 160, 89, 0.45)',
                      transition: 'bottom 0.25s ease',
                    }}
                  >
                    <Sparkles size={11} />
                    <span>Featured Capture</span>
                  </div>
                )}

                {/* Top Overlay Bar: Filename & Favorite Heart Button */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background:
                      'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)',
                    color: '#ffffff',
                    opacity: isHovered || isFav ? 1 : 0,
                    transition: 'opacity 0.25s ease',
                    zIndex: 4,
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      letterSpacing: '0.06em',
                      fontWeight: 600,
                      textShadow: '0 1px 3px rgba(0,0,0,0.7)',
                    }}
                  >
                    {photo.captionTitle || photo.title}
                  </span>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => onToggleFavorite(photo.id, e)}
                    title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: isFav
                        ? 'rgba(239, 68, 68, 0.95)'
                        : 'rgba(0, 0, 0, 0.4)',
                      backdropFilter: 'blur(4px)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      border: 'none',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <Heart size={15} fill={isFav ? '#ffffff' : 'none'} strokeWidth={2} />
                  </button>
                </div>

                {/* Bottom Overlay Action Bar on Hover */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '8px',
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%)',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateY(0)' : 'translateY(6px)',
                    transition: 'all 0.25s ease',
                    zIndex: 4,
                  }}
                >
                  {/* View indicator */}
                  <div
                    style={{
                      marginRight: 'auto',
                      color: 'rgba(255, 255, 255, 0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.725rem',
                      fontWeight: 500,
                    }}
                  >
                    <ZoomIn size={14} />
                    <span>Enlarge</span>
                  </div>

                  {/* Share button */}
                  <button
                    onClick={(e) => onSharePhoto(photo, e)}
                    title="Share this photo"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.22)',
                      backdropFilter: 'blur(4px)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.45)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)')}
                  >
                    <Share2 size={14} />
                  </button>

                  {/* Download button */}
                  <button
                    onClick={(e) => onDownloadPhoto(photo, e)}
                    title="Download this photo"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.22)',
                      backdropFilter: 'blur(4px)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.45)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)')}
                  >
                    <Download size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes skeletonShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @media (max-width: 1200px) {
          .storyboard-grid { column-count: 3 !important; }
        }
        @media (max-width: 860px) {
          .storyboard-grid { column-count: 2 !important; column-gap: 14px !important; }
          .piece-card { margin-bottom: 14px !important; }
        }
        @media (max-width: 540px) {
          .storyboard-grid { column-count: 1 !important; }
        }
      `}</style>
    </section>
  );
};
