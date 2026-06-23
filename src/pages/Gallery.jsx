import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { galleries } from '../data/galleries';
import './Gallery.css';

const Gallery = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const gallery = galleries.find(g => g.id === id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  // Scroll to top and set page title when gallery opens
  useEffect(() => {
    window.scrollTo(0, 0);
    if (gallery) {
      const displayTitle = i18n.language === 'en' && gallery.titleEn ? gallery.titleEn : gallery.title;
      document.title = `${displayTitle} | ${i18n.language === 'he' ? 'לאה עתיר' : 'Lea Atir'}`;
    }
    
    // Reset title on unmount
    return () => {
      document.title = i18n.language === 'he' ? 'לאה עתיר - גלריה לאומנות' : 'Lea Atir - Art Gallery';
    };
  }, [id, gallery, i18n.language]);

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
      // Swiping left brings content from the right
      if (i18n.language === 'he') {
        prevImage();
      } else {
        nextImage();
      }
    } else if (isRightSwipe) {
      // Swiping right brings content from the left
      if (i18n.language === 'he') {
        nextImage();
      } else {
        prevImage();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      
      if (e.key === 'ArrowRight') {
        if (i18n.language === 'he') {
          prevImage();
        } else {
          nextImage();
        }
      } else if (e.key === 'ArrowLeft') {
        if (i18n.language === 'he') {
          nextImage();
        } else {
          prevImage();
        }
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImageIndex, gallery, i18n.language]);

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
        <h2>{t('gallery.notFound')}</h2>
        <Link to="/" className="back-link">{t('gallery.backHome')}</Link>
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

  const getIndividualAspectRatio = (img) => {
    // If it's a mixed row, we want the image's own aspect ratio to prevent shrinking.
    // For normal rows, all images have the same size/orientation anyway.
    const size = parseDimensions(img.caption);
    if (size !== 'unknown') {
      const dimensions = size.split('x');
      const d1 = parseInt(dimensions[0]);
      const d2 = parseInt(dimensions[1]);
      const min = Math.min(d1, d2);
      const max = Math.max(d1, d2);
      const isLandscape = img.orientation === 'landscape';
      const width = isLandscape ? max : min;
      const height = isLandscape ? min : max;
      return width / height;
    }
    return img.orientation === 'landscape' ? 1.43 : 0.714;
  };

  const getCardWidthClass = (img, row) => {
    // For mixed rows (leftovers), display landscape images at 2/3 width
    // and portrait images at 1/3 width to maintain correct visual scale.
    if (row.layout === 'two-landscapes') {
      return 'col-half';
    }
    if (row.orientation === 'mixed' || row.size === 'mixed' || row.size === 'single-mixed') {
      if (img.orientation === 'landscape') {
        return 'col-span-2';
      }
    }
    return 'col-span-1';
  };

  const processImages = () => {
    if (!gallery || !gallery.images) return { rows: [] };

    // For 'gallery_5': keep original grouping logic
    if (gallery.id === 'gallery_5') {
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
      const pairs = [];
      const singles = [];

      Object.keys(groups).forEach((key) => {
        if (key === 'unknown') return;

        const imgs = groups[key];
        const parts = key.split('_');
        const size = parts[0];
        const orientation = parts[1];

        const dimensions = size.split('x');
        const d1 = parseInt(dimensions[0]);
        const d2 = parseInt(dimensions[1]);
        const min = Math.min(d1, d2);
        const max = Math.max(d1, d2);
        const isLandscape = orientation === 'landscape';
        const width = isLandscape ? max : min;
        const height = isLandscape ? min : max;
        const aspectRatio = width / height;

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

        const remainder = imgs.slice(fullRowsCount * chunkSize);
        if (remainder.length === 2) {
          pairs.push(remainder);
        } else if (remainder.length === 1) {
          singles.push(remainder[0]);
        }
      });

      if (groups['unknown'] && groups['unknown'].length > 0) {
        singles.push(...groups['unknown']);
      }

      const leftoverRows = [];
      let pairIndex = 0;
      let singleIndex = 0;

      while (pairIndex < pairs.length && singleIndex < singles.length) {
        const pair = pairs[pairIndex++];
        const single = singles[singleIndex++];
        leftoverRows.push({
          id: `row_leftover_pair_${pairIndex}`,
          size: 'mixed',
          orientation: 'mixed',
          aspectRatio: 1,
          images: [single, ...pair]
        });
      }

      const remainingLeftovers = [];
      while (pairIndex < pairs.length) {
        remainingLeftovers.push(...pairs[pairIndex++]);
      }
      while (singleIndex < singles.length) {
        remainingLeftovers.push(singles[singleIndex++]);
      }

      const chunkSize = 3;
      for (let i = 0; i < remainingLeftovers.length; i += chunkSize) {
        const chunk = remainingLeftovers.slice(i, i + chunkSize);
        leftoverRows.push({
          id: `row_leftover_rem_${i}`,
          size: 'mixed',
          orientation: 'mixed',
          aspectRatio: 1,
          images: chunk
        });
      }

      return {
        rows: [...rows3, ...leftoverRows]
      };
    }

    // Custom row layout for S.B.R (gallery_3) to place specific drawings next to each other
    if (gallery.id === 'gallery_3') {
      const getImg = (id) => gallery.images.find(img => img.id === id);
      
      const r1 = [getImg('gallery_3_2'), getImg('gallery_3_3'), getImg('gallery_3_4')].filter(Boolean);
      const r2 = [getImg('gallery_3_5'), getImg('gallery_3_6'), getImg('gallery_3_7')].filter(Boolean);
      const r3 = [getImg('gallery_3_8'), getImg('gallery_3_9')].filter(Boolean);
      const r4 = [getImg('gallery_3_10'), getImg('gallery_3_11')].filter(Boolean);
      const r5 = [getImg('gallery_3_12'), getImg('gallery_3_15'), getImg('gallery_3_14')].filter(Boolean);
      
      const placedIds = new Set([...r1, ...r2, ...r3, ...r4, ...r5].map(img => img.id));
      const remaining = gallery.images.filter(img => !placedIds.has(img.id));
      
      const rows = [
        { id: 'row_sbr_1', size: '100x70', orientation: 'portrait', aspectRatio: 0.7, images: r1 },
        { id: 'row_sbr_2', size: '100x70', orientation: 'portrait', aspectRatio: 0.7, images: r2 },
        { id: 'row_sbr_3', size: 'mixed', orientation: 'mixed', aspectRatio: null, images: r3 },
        { id: 'row_sbr_4', size: 'mixed-half', orientation: 'landscape', layout: 'two-landscapes', aspectRatio: null, images: r4 },
        { id: 'row_sbr_5', size: 'mixed', orientation: 'mixed', aspectRatio: null, images: r5 }
      ].filter(row => row.images.length > 0);
      
      if (remaining.length > 0) {
        const chunkSize = 3;
        for (let i = 0; i < remaining.length; i += chunkSize) {
          rows.push({
            id: `row_sbr_extra_${i}`,
            size: 'mixed',
            orientation: 'mixed',
            aspectRatio: null,
            images: remaining.slice(i, i + chunkSize)
          });
        }
      }
      
      return { rows };
    }

    // For all other galleries (transparent, silver, gallery_1, gallery_6, gallery_0, war-diary, etc.)
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
    const leftoverGroups = [];

    // Sort keys to have a consistent order (largest first)
    const sortedKeys = Object.keys(groups).sort((a, b) => {
      if (a === 'unknown') return 1;
      if (b === 'unknown') return -1;
      return b.localeCompare(a);
    });

    sortedKeys.forEach((key) => {
      const imgs = groups[key];
      if (key === 'unknown') {
        leftoverGroups.push({
          id: 'leftover_unknown',
          size: 'unknown',
          orientation: 'unknown',
          aspectRatio: null,
          images: imgs
        });
        return;
      }

      const parts = key.split('_');
      const size = parts[0];
      const orientation = parts[1];

      const dimensions = size.split('x');
      const d1 = parseInt(dimensions[0]);
      const d2 = parseInt(dimensions[1]);
      const min = Math.min(d1, d2);
      const max = Math.max(d1, d2);
      const isLandscape = orientation === 'landscape';
      const width = isLandscape ? max : min;
      const height = isLandscape ? min : max;
      const aspectRatio = width / height;

      const chunkSize = 3;
      const fullRowsCount = Math.floor(imgs.length / chunkSize);
      
      for (let i = 0; i < fullRowsCount; i++) {
        rows3.push({
          id: `row_${key}_${i}`,
          size,
          orientation,
          aspectRatio,
          images: imgs.slice(i * chunkSize, (i + 1) * chunkSize)
        });
      }

      const remainder = imgs.slice(fullRowsCount * chunkSize);
      if (remainder.length > 0) {
        leftoverGroups.push({
          id: `leftover_${key}`,
          size,
          orientation,
          aspectRatio,
          images: remainder
        });
      }
    });

    const singleImages = [];

    leftoverGroups.forEach((group) => {
      group.images.forEach((img) => {
        singleImages.push({
          ...img,
          groupSize: group.size,
          groupOrientation: group.orientation,
          groupAspectRatio: group.aspectRatio
        });
      });
    });

    const singleRows = [];
    const chunkSize = 3;
    for (let i = 0; i < singleImages.length; i += chunkSize) {
      const chunk = singleImages.slice(i, i + chunkSize);
      singleRows.push({
        id: `row_leftover_singles_${i}`,
        size: 'single-mixed',
        orientation: 'mixed',
        aspectRatio: chunk.length === 1 ? chunk[0].groupAspectRatio : 1,
        images: chunk
      });
    }

    return {
      rows: [...rows3, ...singleRows]
    };
  };

  const useAlignedGrid = true;
  const { rows } = processImages();

  const displayTitle = i18n.language === 'en' && gallery.titleEn ? gallery.titleEn : gallery.title;
  const displayDescription = i18n.language === 'en' && gallery.descriptionEn ? gallery.descriptionEn : gallery.description;
  const displayLongDescription = i18n.language === 'en' && gallery.longDescriptionEn ? gallery.longDescriptionEn : gallery.longDescription;

  return (
    <div className="gallery-page animate-fade-in">
      <div className="gallery-header">
        <div className="container">
          <Link to="/galleries" className="back-link"><ArrowRight size={18} className={i18n.language === 'en' ? 'rotate-180' : ''} /> {t('gallery.backToGalleries')}</Link>
          <h1 className="animate-delay-1">{displayTitle}</h1>
          <p className="gallery-description animate-delay-2">{displayDescription}</p>
          {displayLongDescription && (
            <div className="gallery-long-description animate-delay-2">
              {displayLongDescription.split('\n').map((line, i) => {
                const isSubtitle = line.trim().startsWith('#');
                const isRight = line.trim().startsWith('*');
                let cleanLine = isSubtitle ? line.trim().substring(1).trim() : line;
                if (isRight) {
                  cleanLine = cleanLine.trim().substring(1).trim();
                }
                
                return (
                  <p 
                    key={i} 
                    className={`${isSubtitle ? 'gallery-subtitle' : ''} ${isRight ? (i18n.language === 'he' ? 'text-right' : 'text-left') : ''}`}
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
        {useAlignedGrid ? (
          <div className="gallery-watercolor-container">
            {rows.map((row) => (
              <div 
                key={row.id} 
                className="gallery-grid-row"
              >
                {row.images.map((img) => {
                  const originalIndex = gallery.images.findIndex(i => i.id === img.id);
                  const displayCaption = i18n.language === 'en' && img.captionEn ? img.captionEn : img.caption;
                  return (
                    <div 
                      key={img.id} 
                      className={`gallery-card ${img.orientation || 'portrait'} ${getCardWidthClass(img, row)}`} 
                      onClick={() => openLightbox(originalIndex)}
                    >
                      <div 
                        className="gallery-card-image-wrapper"
                        style={{ aspectRatio: getIndividualAspectRatio(img) }}
                      >
                        <img src={img.url} alt={img.alt} loading="lazy" />
                      </div>
                      {displayCaption && (
                        <div className="image-caption">
                          {displayCaption}
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
          <>
            {/* Mobile View: Flat Sequential List */}
            <div className="masonry-grid-flat md:hidden">
              {gallery.images.map((img) => {
                const originalIndex = gallery.images.findIndex(i => i.id === img.id);
                const displayCaption = i18n.language === 'en' && img.captionEn ? img.captionEn : img.caption;
                return (
                  <div 
                    key={img.id} 
                    className={`masonry-item ${img.orientation || 'portrait'}`} 
                    onClick={() => openLightbox(originalIndex)}
                  >
                    <img src={img.url} alt={img.alt} loading="lazy" />
                    {displayCaption && (
                      <div className="image-caption">
                        {displayCaption}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Desktop View: Multi-column Masonry Layout */}
            <div className="masonry-grid hidden md:flex">
              {[0, 1, 2].map((colIndex) => (
                <div key={colIndex} className="masonry-column">
                  {gallery.images
                    .filter((_, index) => {
                      return index % 3 === colIndex;
                    })
                    .map((img) => {
                      const originalIndex = gallery.images.findIndex(i => i.id === img.id);
                      const displayCaption = i18n.language === 'en' && img.captionEn ? img.captionEn : img.caption;
                      return (
                        <div 
                          key={img.id} 
                          className={`masonry-item ${img.orientation || 'portrait'}`} 
                          onClick={() => openLightbox(originalIndex)}
                        >
                          <img src={img.url} alt={img.alt} loading="lazy" />
                          {displayCaption && (
                            <div className="image-caption">
                              {displayCaption}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </>
        )}
        <div className="gallery-footer-nav">
          <Link to="/galleries" className="back-link"><ArrowRight size={18} className={i18n.language === 'en' ? 'rotate-180' : ''} /> {t('gallery.backToGalleries')}</Link>
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
          
          <button className="lightbox-nav lightbox-prev" onClick={i18n.language === 'he' ? prevImage : nextImage}>
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

          {(() => {
            const activeImg = gallery.images[selectedImageIndex];
            const activeCaption = i18n.language === 'en' && activeImg.captionEn ? activeImg.captionEn : activeImg.caption;
            return activeCaption && (
              <div className="lightbox-caption">
                {activeCaption}
              </div>
            );
          })()}

          <button className="lightbox-nav lightbox-next" onClick={i18n.language === 'he' ? nextImage : prevImage}>
            <ChevronLeft className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.5} />
          </button>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Gallery;
