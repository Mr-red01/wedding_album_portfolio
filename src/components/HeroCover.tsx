import React from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import { GALLERY_META, HERO_IMAGE_SRC, HERO_IMAGE_WEBP } from '../data/photos';

interface HeroCoverProps {
  onScrollToGallery: () => void;
}

export const HeroCover: React.FC<HeroCoverProps> = ({ onScrollToGallery }) => {
  return (
    <section
      className="hero-cover"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        color: '#ffffff',
        textAlign: 'center',
      }}
    >
      {/* Background Image with Dark Vignette (WebP with JPG fallback) */}
      <div
        className="hero-bg"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(to bottom, rgba(20, 18, 16, 0.35) 0%, rgba(20, 18, 16, 0.45) 50%, rgba(15, 12, 10, 0.75) 100%), image-set(url("${HERO_IMAGE_WEBP}") type("image/webp"), url("${HERO_IMAGE_SRC}") type("image/jpeg"))`,
          backgroundPosition: 'center 25%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          transform: 'scale(1.02)',
          transition: 'transform 10s ease-out',
          zIndex: 1,
        }}
      />

      {/* Floating Header Branding */}
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2.5rem',
          right: '2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-family)',
            fontSize: '0.85rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontWeight: 600,
            opacity: 0.9,
          }}
        >
          {GALLERY_META.photographerName}
        </div>
        <div
          style={{
            fontSize: '0.8rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            opacity: 0.75,
            padding: '4px 12px',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: '20px',
            backdropFilter: 'blur(4px)',
          }}
        >
          Exclusive Disk
        </div>
      </div>

      {/* Hero Central Typography */}
      <div
        className="hero-content"
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '2rem',
          maxWidth: '900px',
        }}
      >
        {/* Date */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-family)',
            fontSize: '0.9rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontWeight: 400,
            opacity: 0.95,
            marginBottom: '1rem',
          }}
        >
          <Calendar size={15} strokeWidth={1.8} />
          <span>{GALLERY_META.weddingDate}</span>
        </div>

        {/* Grand Couple Name Heading */}
        <h1
          style={{
            fontFamily: 'var(--heading-font-family)',
            fontSize: 'clamp(2.75rem, 7vw, 5.5rem)',
            fontWeight: 400,
            letterSpacing: '0.12em',
            lineHeight: 1.1,
            margin: '0.5rem 0 1.25rem',
            textTransform: 'uppercase',
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.45)',
          }}
        >
          {GALLERY_META.clientNames}
        </h1>

        {/* Subheader Studio Tag */}
        <div
          style={{
            fontSize: '1rem',
            letterSpacing: '0.1em',
            fontWeight: 300,
            opacity: 0.9,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
          }}
        >
          <span>Wedding Photographer</span>
          <span style={{ fontWeight: 600, color: 'var(--color-accent-gold)' }}>
            {GALLERY_META.photographerName}
          </span>
          <span style={{ opacity: 0.5 }}>•</span>
          <a
            href="https://velocitiagency.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              opacity: 0.85,
              transition: 'opacity 0.2s',
            }}
          >
            velocitiagency.com
          </a>
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <button
        onClick={onScrollToGallery}
        aria-label="Scroll to wedding gallery"
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          zIndex: 10,
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          opacity: 0.85,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
      >
        <span
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          Explore Gallery
        </span>
        <div style={{ animation: 'heroArrowBounce 2s infinite ease-in-out' }}>
          <ChevronDown size={28} strokeWidth={1.5} />
        </div>
      </button>

      <style>{`
        @keyframes heroArrowBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>
    </section>
  );
};
