import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { galleries } from '../data/galleries';

const Galleries = () => {
  useEffect(() => {
    document.title = 'כל הגלריות | לאה עתיר';
  }, []);

  return (
    <main className="pt-24 pb-20 max-w-container-max mx-auto px-margin-edge animate-fade-in">
      <header className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-label-sm text-on-surface-variant uppercase tracking-widest">02</span>
          <div className="w-12 h-px bg-outline-variant"></div>
          <span className="font-label-sm text-primary uppercase tracking-widest">אוספים וגלריות</span>
        </div>
        <h1 className="font-h1 text-5xl lg:text-6xl text-primary mb-6">גלריות</h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
          מבחר מתוך עשרות שנות יצירה, החל מרישומי פחם ועד לתפאורות במה. כל גלריה מייצגת פרק אחר במסע האמנותי.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {galleries.map((gallery, index) => (
          <Link 
            key={gallery.id} 
            to={`/gallery/${gallery.id}`}
            className="group block"
          >
            <div className="relative overflow-hidden aspect-[4/5] bg-surface-container-low mb-6 reveal-image" style={{ animationDelay: `${index * 0.1}s` }}>
              <img 
                src={gallery.coverImage} 
                alt={gallery.title}
                className="object-cover w-full h-full transition-all duration-[1500ms] ease-out scale-105 group-hover:scale-100"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-h3 text-2xl text-primary group-hover:text-secondary transition-colors">{gallery.title}</h3>
              <p className="font-body-md text-on-surface-variant line-clamp-2 opacity-70 group-hover:opacity-100 transition-opacity">
                {gallery.description}
              </p>
              <div className="pt-4 flex items-center gap-2 text-primary">
                <span className="font-label-sm uppercase tracking-widest text-[11px]">לצפייה בגלריה</span>
                <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform" style={{fontVariationSettings: "'wght' 300"}}>arrow_back</span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
};

export default Galleries;
