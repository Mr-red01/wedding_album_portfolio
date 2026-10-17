import React, { useState, useRef, useEffect } from 'react';
import { Heart, Share2, MessageSquare, Download, ChevronDown, Folder, HardDrive } from 'lucide-react';
import { ALBUM_CATEGORIES, GALLERY_META } from '../data/photos';

interface NavigationProps {
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenShare: () => void;
  onOpenReview: () => void;
  onDownloadAll: () => void;
  onDownloadFolder: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeCategory,
  onSelectCategory,
  favoritesCount,
  onOpenFavorites,
  onOpenShare,
  onOpenReview,
  onDownloadAll,
  onDownloadFolder,
}) => {
  const [downloadOpen, setDownloadOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDownloadOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      id="gallery-nav"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--color-border-subtle)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 'var(--nav-height)',
          flexWrap: 'wrap',
          gap: '1rem',
          paddingTop: '0.6rem',
          paddingBottom: '0.6rem',
        }}
      >
        {/* Left: Category Navigation Tabs */}
        <div
          className="nav-tabs"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.75rem',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            paddingBottom: '4px',
            scrollbarWidth: 'none',
          }}
        >
          {ALBUM_CATEGORIES.map((category) => {
            const isActive = activeCategory === category.slug;
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.slug)}
                style={{
                  fontFamily: 'var(--font-family)',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: '0.08em',
                  color: isActive ? 'var(--color-text-main)' : 'var(--color-text-muted)',
                  position: 'relative',
                  padding: '8px 0',
                  transition: 'color 0.2s ease',
                  borderBottom: isActive ? '2px solid var(--color-text-main)' : '2px solid transparent',
                }}
              >
                <span>{category.name}</span>
                {category.photoCount !== undefined && (
                  <span
                    style={{
                      marginLeft: '6px',
                      fontSize: '0.7rem',
                      opacity: isActive ? 0.9 : 0.6,
                      fontWeight: 600,
                    }}
                  >
                    ({category.photoCount})
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Actions, Counter, Share, Download */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="nav-btn tooltip-btn"
            title="View saved favorites"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              fontSize: '0.825rem',
              fontWeight: 600,
              padding: '7px 14px',
              borderRadius: '24px',
              border: '1px solid var(--color-border-subtle)',
              backgroundColor: favoritesCount > 0 ? '#fff1f2' : 'transparent',
              color: favoritesCount > 0 ? 'var(--color-heart)' : 'var(--color-text-main)',
              transition: 'all 0.2s ease',
            }}
          >
            <Heart size={15} fill={favoritesCount > 0 ? 'currentColor' : 'none'} strokeWidth={2} />
            <span>Favorites</span>
            {favoritesCount > 0 && (
              <span
                style={{
                  backgroundColor: 'var(--color-heart)',
                  color: '#fff',
                  fontSize: '0.7rem',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  fontWeight: 700,
                }}
              >
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Share Button */}
          <button
            onClick={onOpenShare}
            className="nav-btn"
            title="Share gallery"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.825rem',
              fontWeight: 500,
              padding: '7px 13px',
              borderRadius: '24px',
              border: '1px solid var(--color-border-subtle)',
              color: 'var(--color-text-main)',
              transition: 'all 0.2s ease',
            }}
          >
            <Share2 size={15} strokeWidth={1.8} />
            <span className="nav-btn-text">Share</span>
          </button>

          {/* Review Button */}
          <button
            onClick={onOpenReview}
            className="nav-btn"
            title="Leave a review"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.825rem',
              fontWeight: 500,
              padding: '7px 13px',
              borderRadius: '24px',
              border: '1px solid var(--color-border-subtle)',
              color: 'var(--color-text-main)',
              transition: 'all 0.2s ease',
            }}
          >
            <MessageSquare size={15} strokeWidth={1.8} />
            <span className="nav-btn-text">Review</span>
          </button>

          {/* Expiration Note */}
          <div
            className="nav-expiry"
            style={{
              fontSize: '0.775rem',
              color: 'var(--color-text-subtle)',
              padding: '0 4px',
            }}
          >
            Expires on {GALLERY_META.expiresOn}
          </div>

          {/* Download Dropdown */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setDownloadOpen((prev) => !prev)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.825rem',
                fontWeight: 600,
                padding: '7px 16px',
                borderRadius: '24px',
                backgroundColor: 'var(--color-text-main)',
                color: '#ffffff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease',
              }}
            >
              <Download size={14} strokeWidth={2} />
              <span>Download files</span>
              <ChevronDown
                size={14}
                style={{
                  transform: downloadOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                }}
              />
            </button>

            {downloadOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: '240px',
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: 'var(--shadow-overlay)',
                  border: '1px solid var(--color-border-subtle)',
                  padding: '8px',
                  zIndex: 60,
                  animation: 'dropdownFadeIn 0.2s ease-out',
                }}
              >
                <button
                  onClick={() => {
                    onDownloadAll();
                    setDownloadOpen(false);
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    textAlign: 'left',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-bg-card)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-bg-card)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-text-main)',
                    }}
                  >
                    <HardDrive size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.825rem', fontWeight: 600 }}>Entire gallery</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--color-text-muted)' }}>
                      All files & high-res albums
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onDownloadFolder();
                    setDownloadOpen(false);
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    textAlign: 'left',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-bg-card)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-bg-card)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-text-main)',
                    }}
                  >
                    <Folder size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.825rem', fontWeight: 600 }}>Current folder</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--color-text-muted)' }}>
                      {ALBUM_CATEGORIES.find((c) => c.slug === activeCategory)?.name || 'Current Album'}
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dropdownFadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 860px) {
          .nav-expiry { display: none !important; }
        }
      `}</style>
    </nav>
  );
};
