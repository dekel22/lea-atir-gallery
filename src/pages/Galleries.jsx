import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { galleries } from '../data/galleries';

const Galleries = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('galleries.title');
  }, [t, i18n.language]);

  return (
    <main className="pt-24 pb-20 max-w-container-max mx-auto px-margin-edge animate-fade-in">
      <header className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-label-sm text-on-surface-variant uppercase tracking-widest">{t('galleries.sectionNumber')}</span>
          <div className="w-12 h-px bg-outline-variant"></div>
          <span className="font-label-sm text-primary uppercase tracking-widest">{t('galleries.sectionTitle')}</span>
        </div>
        <h1 className="font-h1 text-5xl lg:text-6xl text-primary mb-6">{t('galleries.header')}</h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
          {t('galleries.description')}
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {(() => {
          const visibleGalleries = galleries.filter(g => g.title !== 'אדם וריבוע');
          
          return visibleGalleries.map((gallery, index) => {
            const displayTitle = i18n.language === 'en' && gallery.titleEn ? gallery.titleEn : gallery.title;
            const displayDescription = i18n.language === 'en' && gallery.descriptionEn ? gallery.descriptionEn : gallery.description;

            return (
              <Link 
                key={gallery.id} 
                to={`/gallery/${gallery.id}`}
                className="group block"
              >
                <div 
                  className="relative overflow-hidden bg-surface-container-low mb-6 reveal-image gallery-card-image-container" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img 
                    src={gallery.coverImage} 
                    alt={displayTitle}
                    className="object-cover w-full h-full transition-all duration-[1500ms] ease-out scale-105 group-hover:scale-100"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-h3 text-2xl text-primary group-hover:text-secondary transition-colors">{displayTitle}</h3>
                  <p className="font-body-md text-on-surface-variant line-clamp-2 opacity-70 group-hover:opacity-100 transition-opacity">
                    {displayDescription}
                  </p>
                  <div className="pt-4 flex items-center gap-2 text-primary">
                    <span className="font-label-sm uppercase tracking-widest text-[11px]">{t('galleries.viewGallery')}</span>
                    <span className={`material-symbols-outlined text-sm transition-transform ${i18n.language === 'he' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1 rotate-180'}`} style={{fontVariationSettings: "'wght' 300"}}>arrow_back</span>
                  </div>
                </div>
              </Link>
            );
          });
        })()}
      </section>
    </main>
  );
};

export default Galleries;
