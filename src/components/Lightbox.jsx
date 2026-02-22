import { useState, useEffect, useCallback } from 'react'
import { isVideo } from '../utils/projectLoader'

export default function Lightbox({ project, initialIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isClosing, setIsClosing] = useState(false);
  const media = project.resolvedMedia || [];

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(onClose, 200);
  }, [onClose]);

  const goNext = useCallback(() => {
    if (media.length <= 1) return;
    setCurrentIndex(i => (i + 1) % media.length);
  }, [media.length]);

  const goPrev = useCallback(() => {
    if (media.length <= 1) return;
    setCurrentIndex(i => (i - 1 + media.length) % media.length);
  }, [media.length]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleClose, goNext, goPrev]);

  if (media.length === 0) return null;

  const current = media[currentIndex];
  const isVid = isVideo(current.name);

  return (
    <div
      className={`lightbox-overlay ${isClosing ? 'closing' : ''}`}
      onClick={handleClose}
    >
      <button className="lightbox-close" onClick={handleClose} aria-label="Close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        <div className="lightbox-media">
          {isVid ? (
            <video key={current.url} src={current.url} controls autoPlay playsInline />
          ) : (
            <img src={current.url} alt={current.name} draggable={false} />
          )}
        </div>

        <div className="lightbox-info">
          <h3>{project.title}</h3>
          {project.description && <p>{project.description}</p>}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="lightbox-link"
            >
              Visit Project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {media.length > 1 && (
        <>
          <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); goPrev(); }} aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); goNext(); }} aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div className="lightbox-dots" onClick={e => e.stopPropagation()}>
            {media.map((_, i) => (
              <button
                key={i}
                className={`lightbox-dot ${i === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
