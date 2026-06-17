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



  // Group images by size & orientation for Watercolor page
  const parseDimensions = (caption) => {
    if (!caption) return 'unknown';
    const match = caption.match(/(\d+)\s*[xX\*×]\s*(\d+)/);
    if (match) {
      const num1 = parseInt(match[1]);
      const num2 = parseInt(match[2]);
      const min = Math.min(num1, num2);
      const max = Math.max(num1, num2);
      return `${min}x${max}`;
    }
    return 'unknown';
  };

  const processImages = () => {
    if (!gallery || !gallery.images) return { rows: [] };

    const groups = {};
    gallery.images.forEach((img) => {
      const size = parseDimensions(img.caption);
      const key = size === 'unknown' ? 'unknown' : `${size}_${img.orientation || 'portrait'}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(img);
    });

    const rows3 = [];
    const leftovers = [];

    // Process groups with known sizes
    Object.keys(groups).forEach((key) => {
      if (key === 'unknown') return;

      const imgs = groups[key];
      const parts = key.split('_');
      const size = parts[0];
      const orientation = parts[1];

      // Calculate aspect ratio from caption dimensions
      const dimensions = size.split('x');
      const d1 = parseInt(dimensions[0]);
      const d2 = parseInt(dimensions[1]);
      const min = Math.min(d1, d2);
      const max = Math.max(d1, d2);
      const isLandscape = orientation === 'landscape';
      const width = isLandscape ? max : min;
      const height = isLandscape ? min : max;
      const aspectRatio = width / height;

      // Extract full rows of 3 first
      const chunkSize = 3;
      const fullRowsCount = Math.floor(imgs.length / chunkSize);
      for (let i = 0; i < fullRowsCount; i++) {
        const chunk = imgs.slice(i * chunkSize, (i + 1) * chunkSize);
        rows3.push({
          id: `row_${key}_${i}`,
          size,
          orientation,
          aspectRatio,
          images: chunk
        });
      }

      // Add remainders of 1 or 2 to leftovers pool
      const remainder = imgs.slice(fullRowsCount * chunkSize);
      leftovers.push(...remainder);
    });

    // Process unknown sizes at the end
    if (groups['unknown'] && groups['unknown'].length > 0) {
      leftovers.push(...groups['unknown']);
    }

    // Chunk all leftovers/mixed images into rows of 3
    const leftoverRows = [];
    const chunkSize = 3;
    for (let i = 0; i < leftovers.length; i += chunkSize) {
      const chunk = leftovers.slice(i, i + chunkSize);
      leftoverRows.push({
        id: `row_leftover_${i}`,
        size: 'mixed',
        orientation: 'mixed',
        aspectRatio: 1, // square cards to align mixed ratios beautifully
        images: chunk
      });
    }

    return {
      rows: [...rows3, ...leftoverRows]
    };
  };

  const isWatercolor = gallery.id === 'gallery_5';
  const { rows } = isWatercolor ? processImages() : { rows: [] };

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
        {isWatercolor ? (
          <div className="gallery-watercolor-container">
            {rows.map((row) => (
              <div 
                key={row.id} 
                className="gallery-grid-row"
              >
                {row.images.map((img) => {
                  const originalIndex = gallery.images.findIndex(i => i.id === img.id);
                  return (
                    <div 
                      key={img.id} 
                      className={`gallery-card ${img.orientation || 'portrait'}`} 
                      onClick={() => openLightbox(originalIndex)}
                    >
                      <div 
                        className="gallery-card-image-wrapper"
                        style={row.aspectRatio ? { aspectRatio: row.aspectRatio } : null}
                      >
                        <img src={img.url} alt={img.alt} loading="lazy" />
                      </div>
                      {img.caption && (
                        <div className="image-caption">
                          {img.caption}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          /* Original Masonry Layout for other galleries */
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
                        {img.caption && (
                          <div className="image-caption">
                            {img.caption}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        )}
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
            <X className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />
          </button>
          
          <button className="lightbox-nav lightbox-prev" onClick={prevImage}>
            <ChevronRight className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.5} />
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

          {gallery.images[selectedImageIndex].caption && (
            <div className="lightbox-caption">
              {gallery.images[selectedImageIndex].caption}
            </div>
          )}

          <button className="lightbox-nav lightbox-next" onClick={nextImage}>
            <ChevronLeft className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.5} />
          </button>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Gallery;
