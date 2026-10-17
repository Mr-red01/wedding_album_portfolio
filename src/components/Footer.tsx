import React from 'react';
import { ArrowUp, Camera } from 'lucide-react';
import { GALLERY_META } from '../data/photos';

interface FooterProps {
  onScrollToTop: () => void;
  showBackToTop: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, showBackToTop }) => {
  return (
    <>
      <footer
        style={{
          borderTop: '1px solid var(--color-border-subtle)',
          backgroundColor: 'var(--color-bg-subtle)',
          padding: '3.5rem 1.5rem 4rem',
          textAlign: 'center',
          color: 'var(--color-text-muted)',
          fontSize: '0.85rem',
        }}
      >
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-family)',
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-text-main)',
              fontWeight: 600,
            }}
          >
            <Camera size={18} strokeWidth={1.8} />
            <span>{GALLERY_META.photographerName}</span>
          </div>

          <p style={{ maxWidth: '480px', lineHeight: 1.6, color: 'var(--color-text-muted)' }}>
            Preserving precious moments with love and artistry for {GALLERY_META.clientNames}. All photographs are copyrighted and provided in full resolution.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '0.75rem',
              color: 'var(--color-text-subtle)',
              marginTop: '0.5rem',
            }}
          >
            <span>Gallery expires on {GALLERY_META.expiresOn}</span>
            <span>•</span>
            <a
              href="https://velocitiagency.com"
              target="_blank"
              rel="noreferrer"
              style={{
                color: 'var(--color-text-main)',
                fontWeight: 600,
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              VELOCITI AGENCY Portfolio
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={onScrollToTop}
          aria-label="Back to top"
          style={{
            position: 'fixed',
            bottom: '2.5rem',
            right: '2.5rem',
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-text-main)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
            zIndex: 40,
            cursor: 'pointer',
            border: 'none',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            animation: 'fadeInUp 0.3s ease-out',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 10px 24px rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.25)';
          }}
        >
          <ArrowUp size={20} strokeWidth={2} />
        </button>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};
