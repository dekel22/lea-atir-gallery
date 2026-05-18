import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { galleries } from '../data/galleries';
import './Gallery.css';

const Gallery = () => {
  const { id } = useParams();
  const gallery = galleries.find(g => g.id === id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  // Scroll to top and set page title when gallery opens
  useEffect(() => {
    window.scrollTo(0, 0);
    if (gallery) {
      document.title = `${gallery.title} | לאה עתיר`;
    }
    
    // Reset title on unmount
    return () => {
      document.title = 'לאה עתיר - גלריה לאומנות';
    };
  }, [id, gallery]);

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === gallery.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === 0 ? gallery.images.length - 1 : prev - 1));
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swiping left brings content from the right (prevImage in RTL)
      prevImage();
    } else if (isRightSwipe) {
      // Swiping right brings content from the left (nextImage in RTL)
      nextImage();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      
      if (e.key === 'ArrowRight') {
        prevImage();
      } else if (e.key === 'ArrowLeft') {
        nextImage();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImageIndex, gallery]);

  // Handle body scroll locking
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImageIndex]);

  if (!gallery) {
    return (
      <div className="container section text-center animate-fade-in">
        <h2>הגלריה לא נמצאה</h2>
        <Link to="/" className="back-link">חזרה לעמוד הבית</Link>
      </div>
    );
  }



  return (
    <div className="gallery-page animate-fade-in">
      <div className="gallery-header">
        <div className="container">
          <Link to="/galleries" className="back-link"><ArrowRight size={18} /> חזרה לגלריות</Link>
          <h1 className="animate-delay-1">{gallery.title}</h1>
          <p className="gallery-description animate-delay-2">{gallery.description}</p>
          {gallery.longDescription && (
            <div className="gallery-long-description animate-delay-2">
              {gallery.longDescription.split('\n').map((line, i) => {
                const isSubtitle = line.trim().startsWith('#');
                const isRight = line.trim().startsWith('*');
                let cleanLine = isSubtitle ? line.trim().substring(1).trim() : line;
                if (isRight) {
                  cleanLine = cleanLine.trim().substring(1).trim();
                }
                
                return (
                  <p 
                    key={i} 
                    className={`${isSubtitle ? 'gallery-subtitle' : ''} ${isRight ? 'text-right' : ''}`}
                  >
                    {cleanLine}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="container section">
        <div className="masonry-grid">
          {[0, 1, 2].map((colIndex) => (
            <div key={colIndex} className="masonry-column">
              {gallery.images
                .filter((_, index) => {
                  return index % 3 === colIndex;
                })
                .map((img) => {
                  const originalIndex = gallery.images.findIndex(i => i.id === img.id);
                  return (
                    <div 
                      key={img.id} 
                      className={`masonry-item ${img.orientation || 'portrait'}`} 
                      onClick={() => openLightbox(originalIndex)}
                    >
                      <img src={img.url} alt={img.alt} loading="lazy" />

                    </div>
                  );
                })}
            </div>
          ))}
        </div>
        <div className="gallery-footer-nav">
          <Link to="/galleries" className="back-link"><ArrowRight size={18} /> חזרה לגלריות</Link>
        </div>
      </div>

      {/* Lightbox Modal via Portal */}
      {selectedImageIndex !== null && createPortal(
        <div 
          className="lightbox-overlay" 
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <button className="lightbox-close" onClick={closeLightbox}>
            <X size={40} strokeWidth={1.5} />
          </button>
          
          <button className="lightbox-nav lightbox-prev" onClick={prevImage}>
            <ChevronRight size={48} strokeWidth={1.5} />
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <TransformWrapper
              initialScale={1}
              initialPositionX={0}
              initialPositionY={0}
              wheel={{ step: 0.1 }}
              doubleClick={{ step: 0.5 }}
              pinch={{ step: 5 }}
              panning={{ velocityDisabled: true }}
            >
              <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }} contentStyle={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img 
                  src={gallery.images[selectedImageIndex].url} 
                  alt={gallery.images[selectedImageIndex].alt} 
                />
              </TransformComponent>
            </TransformWrapper>
          </div>

          <button className="lightbox-nav lightbox-next" onClick={nextImage}>
            <ChevronLeft size={48} strokeWidth={1.5} />
          </button>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Gallery;
