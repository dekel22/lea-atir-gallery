import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { galleries } from '../data/galleries';
import './Gallery.css';

const Gallery = () => {
  const { id } = useParams();
  const gallery = galleries.find(g => g.id === id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  if (!gallery) {
    return (
      <div className="container section text-center animate-fade-in">
        <h2>הגלריה לא נמצאה</h2>
        <Link to="/" className="back-link">חזרה לעמוד הבית</Link>
      </div>
    );
  }

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === gallery.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === 0 ? gallery.images.length - 1 : prev - 1));
  };

  return (
    <div className="gallery-page animate-fade-in">
      <div className="gallery-header">
        <div className="container">
          <Link to="/" className="back-link"><ArrowRight size={18} /> חזרה לגלריות</Link>
          <h1 className="animate-delay-1">{gallery.title}</h1>
          <p className="gallery-description animate-delay-2">{gallery.description}</p>
          {gallery.longDescription && (
            <div className="gallery-long-description animate-delay-2">
              {gallery.longDescription.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container section">
        <div className="masonry-grid animate-fade-in animate-delay-3">
          {gallery.images.map((img, index) => (
            <div 
              key={img.id} 
              className="masonry-item" 
              onClick={() => openLightbox(index)}
            >
              <img src={img.url} alt={img.alt} loading="lazy" />
              <div className="masonry-item-overlay">
                <span>הגדל</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal via Portal */}
      {selectedImageIndex !== null && createPortal(
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <X size={40} strokeWidth={1.5} />
          </button>
          
          <button className="lightbox-nav lightbox-prev" onClick={prevImage}>
            <ChevronRight size={48} strokeWidth={1.5} />
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={gallery.images[selectedImageIndex].url} 
              alt={gallery.images[selectedImageIndex].alt} 
            />
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
