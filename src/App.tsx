import React, { useState, useEffect, useMemo } from 'react';
import './styles/globals.css';
import { HeroCover } from './components/HeroCover';
import { Navigation } from './components/Navigation';
import { GalleryGrid } from './components/GalleryGrid';
import { LightboxModal } from './components/LightboxModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { ShareModal } from './components/ShareModal';
import { ReviewModal } from './components/ReviewModal';
import { Footer } from './components/Footer';
import { ALL_PHOTOS } from './data/photos';
import type { PhotoItem } from './types/gallery';

const CATEGORY_INFO: Record<string, { title: string; description: string }> = {
  'best-photos': {
    title: 'BEST PHOTOS — CURATED HIGHLIGHTS',
    description: 'An exclusive collection of signature wedding portraits, sacred promises, and joyous celebrations for Aarav & Anjali.',
  },
  'wedding-cam2': {
    title: 'WEDDING CAM2 — SACRED CEREMONY & VOWS',
    description: 'The auspicious mandap rituals, sacred pheras around the holy fire, and intimate promises to have and to hold forever.',
  },
  'wedding-cam1': {
    title: 'WEDDING CAM1 — RITUALS, RINGS & BLESSINGS',
    description: 'Artistic details, bridal elegance, ring ceremonies, and heartfelt blessings shared with cherished family and friends.',
  },
  'pre-wedding': {
    title: 'PRE WEDDING — SUNSET & ENGAGEMENT',
    description: 'Golden hour romance, candid laughter, and the unforgettable beginning of Aarav & Anjali’s eternal journey together.',
  },
  'sangeeth-best': {
    title: 'SANGEETH & CELEBRATIONS',
    description: 'Vibrant Haldi colors, high-energy musical dance beats, glowing fireworks, and grand banquet festivities.',
  },
  'all': {
    title: 'COMPLETE WEDDING DISK ARCHIVE',
    description: 'All 22 high-resolution captured photographs preserving every precious moment of Aarav & Anjali’s celebration.',
  },
};

export const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('best-photos');
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('wedding_gallery_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [favoritesDrawerOpen, setFavoritesDrawerOpen] = useState<boolean>(false);
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [selectedPhotoForShare, setSelectedPhotoForShare] = useState<string | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Sync favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wedding_gallery_favorites', JSON.stringify(favorites));
    } catch {
      // Ignore if localStorage unavailable
    }
  }, [favorites]);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Filtered photos based on active category
  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'all') {
      return ALL_PHOTOS;
    }
    if (activeCategory === 'best-photos') {
      return ALL_PHOTOS.filter(
        (p) => p.categories?.includes('best-photos') || p.category === 'best-photos' || p.isUserUploaded
      );
    }
    return ALL_PHOTOS.filter(
      (p) => p.category === activeCategory || p.categories?.includes(activeCategory)
    );
  }, [activeCategory]);

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(exists ? 'Removed from Favorites' : 'Added to Favorites');
      return next;
    });
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleOpenPhotoFromDrawer = (photoId: string) => {
    const idx = filteredPhotos.findIndex((p) => p.id === photoId);
    if (idx !== -1) {
      setLightboxIndex(idx);
    } else {
      setLightboxIndex(0);
    }
    setLightboxOpen(true);
  };

  const handleSharePhoto = (photo: PhotoItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPhotoForShare(photo.title);
    setShareModalOpen(true);
  };

  const handleDownloadPhoto = (photo: PhotoItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = photo.src;
    link.download = photo.title || 'wedding-photo.jpg';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Downloading ${photo.title}...`);
  };

  const handleDownloadAll = () => {
    showToast('Preparing complete wedding gallery archive...');
    // Trigger download of visible items
    filteredPhotos.slice(0, 3).forEach((p, idx) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = p.src;
        link.download = p.title;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, idx * 400);
    });
  };

  const handleDownloadFolder = () => {
    showToast(`Downloading photos in ${activeCategory.toUpperCase()}...`);
    if (filteredPhotos.length > 0) {
      const link = document.createElement('a');
      link.href = filteredPhotos[0].src;
      link.download = filteredPhotos[0].title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const scrollToGallery = () => {
    const navEl = document.getElementById('gallery-nav');
    if (navEl) {
      navEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="wedding-website">
      {/* 1. Hero Cover Section */}
      <HeroCover onScrollToGallery={scrollToGallery} />

      {/* 2. Sticky Navigation Bar */}
      <Navigation
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setFavoritesDrawerOpen(true)}
        onOpenShare={() => {
          setSelectedPhotoForShare(null);
          setShareModalOpen(true);
        }}
        onOpenReview={() => setReviewModalOpen(true)}
        onDownloadAll={handleDownloadAll}
        onDownloadFolder={handleDownloadFolder}
      />

      {/* 3. Storyboard Photo Grid */}
      <main>
        <GalleryGrid
          photos={filteredPhotos}
          categoryTitle={CATEGORY_INFO[activeCategory]?.title || activeCategory.toUpperCase()}
          categoryDescription={CATEGORY_INFO[activeCategory]?.description}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onOpenLightbox={handleOpenLightbox}
          onSharePhoto={handleSharePhoto}
          onDownloadPhoto={handleDownloadPhoto}
        />
      </main>

      {/* 4. Footer */}
      <Footer onScrollToTop={scrollToTop} showBackToTop={showBackToTop} />

      {/* 5. Fullscreen Lightbox Modal */}
      <LightboxModal
        photos={filteredPhotos}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onSharePhoto={handleSharePhoto}
        onDownloadPhoto={handleDownloadPhoto}
      />

      {/* 6. Favorites Drawer */}
      <FavoritesDrawer
        isOpen={favoritesDrawerOpen}
        onClose={() => setFavoritesDrawerOpen(false)}
        favorites={favorites}
        allPhotos={ALL_PHOTOS}
        onRemoveFavorite={(id) => {
          setFavorites((prev) => prev.filter((item) => item !== id));
          showToast('Removed from Favorites');
        }}
        onClearAll={() => {
          setFavorites([]);
          showToast('All favorites cleared');
        }}
        onOpenPhoto={handleOpenPhotoFromDrawer}
      />

      {/* 7. Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        specificPhotoTitle={selectedPhotoForShare}
      />

      {/* 8. Review Modal */}
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSubmitSuccess={() => showToast('Thank you for your review!')}
      />

      {/* 9. Snackbar Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'var(--color-text-main)',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '24px',
            fontSize: '0.85rem',
            fontWeight: 500,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
            zIndex: 120,
            animation: 'toastPop 0.25s ease-out',
          }}
        >
          {toastMessage}
        </div>
      )}

      <style>{`
        @keyframes toastPop {
          from { opacity: 0; transform: translate(-50%, 12px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
};

export default App;
