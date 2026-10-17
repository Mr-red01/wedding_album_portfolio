import React, { useState } from 'react';
import { X, Star, CheckCircle } from 'lucide-react';
import { GALLERY_META } from '../data/photos';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSubmitSuccess }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    // Simulate saving review
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setMessage('');
      onSubmitSuccess();
      onClose();
    }, 1800);
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
          maxWidth: '500px',
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
          <h3 style={{ fontFamily: 'var(--heading-font-family)', fontSize: '1.35rem', fontWeight: 600 }}>
            Leave a Note & Review
          </h3>
          <button onClick={onClose} style={{ padding: '6px', color: 'var(--color-text-muted)' }}>
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div
            style={{
              padding: '3rem 2rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <CheckCircle size={48} color="#10b981" />
            <h4 style={{ fontFamily: 'var(--heading-font-family)', fontSize: '1.4rem' }}>
              Thank you so much!
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              Your heartfelt review has been shared with {GALLERY_META.clientNames} and {GALLERY_META.photographerName}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
            {/* Rating Stars */}
            <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                How did you like the photos?
              </div>
              <div style={{ display: 'inline-flex', gap: '6px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    style={{ color: star <= rating ? '#fbbf24' : '#d1d5db', transition: 'transform 0.15s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <Star size={24} fill={star <= rating ? '#fbbf24' : 'none'} strokeWidth={1.5} />
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh or Ananya"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--color-border-subtle)',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
            </div>

            {/* Message */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>
                Your Review / Wishes for the Couple
              </label>
              <textarea
                required
                rows={4}
                placeholder="Write your wishes or feedback on the wedding album..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--color-border-subtle)',
                  fontSize: '0.875rem',
                  outline: 'none',
                  resize: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-text-main)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
