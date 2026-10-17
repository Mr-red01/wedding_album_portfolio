import React, { useState } from 'react';
import { X, Copy, Check, MessageCircle, Send, Globe } from 'lucide-react';
import { GALLERY_META } from '../data/photos';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  specificPhotoTitle?: string | null;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, specificPhotoTitle }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = specificPhotoTitle
    ? `Take a look at ${specificPhotoTitle} from ${GALLERY_META.clientNames}'s Wedding Gallery!`
    : `Explore the exclusive wedding photography disk for ${GALLERY_META.clientNames} by ${GALLERY_META.photographerName}`;

  const shareOnWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`, '_blank');
  };

  const shareOnTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-overlay)',
          overflow: 'hidden',
          animation: 'modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
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
            <Globe size={18} color="var(--color-accent-gold)" />
            <h3 style={{ fontFamily: 'var(--heading-font-family)', fontSize: '1.35rem', fontWeight: 600 }}>
              {specificPhotoTitle ? `Share ${specificPhotoTitle}` : 'Share Wedding Gallery'}
            </h3>
          </div>
          <button onClick={onClose} style={{ padding: '6px', color: 'var(--color-text-muted)' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '1.5rem' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
            Copy the direct link below or share directly via messaging apps:
          </p>

          {/* Copy Input Box */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: '8px',
              padding: '6px 8px',
              backgroundColor: 'var(--color-bg-subtle)',
              marginBottom: '1.5rem',
            }}
          >
            <input
              type="text"
              readOnly
              value={currentUrl}
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                fontSize: '0.825rem',
                color: 'var(--color-text-main)',
                outline: 'none',
                padding: '4px 6px',
              }}
            />
            <button
              onClick={handleCopy}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '6px',
                backgroundColor: 'var(--color-text-main)',
                color: '#ffffff',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          {/* Social Share Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button
              onClick={shareOnWhatsApp}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #25d366',
                color: '#128c7e',
                fontWeight: 600,
                fontSize: '0.85rem',
                backgroundColor: 'rgba(37, 211, 102, 0.08)',
              }}
            >
              <MessageCircle size={16} />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={shareOnTelegram}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #0088cc',
                color: '#0088cc',
                fontWeight: 600,
                fontSize: '0.85rem',
                backgroundColor: 'rgba(0, 136, 204, 0.08)',
              }}
            >
              <Send size={16} />
              <span>Telegram</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};
