import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { galleries } from '../data/galleries';
import './Home.css';
import portraitImg from '../assets/about-portrait.jpg';

const GALLERY_YEARS = {
  'transparent': 2020,
  'silver': 2026,
  'gallery_1': 2003,
  'brosh': 2020,
  'gallery_6': 2020,
  'gallery_0': 1998,
  'gallery_3': 2026,
  'war-diary': 2025,
  'scenery-pieces': 2004,
  'gallery_5': 1986,
  'miki': 1982,
  'almost-black-and-white': 1992,
  'chemnitz': 2016,
  'between-between': 2013,
  'gallery_7': 1995,
  'nude': 2015,
  'gallery_2': 2016,
  'nude-museum': 2010,
  'scenery': 1975
};

const Home = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = i18n.language === 'he' ? 'לאה עתיר - גלריה לאומנות' : 'Lea Atir - Art Gallery';
  }, [i18n.language]);

  const cronGalleries = galleries
    .filter(g => g.id !== 'gallery_4' && g.id !== 'scenery')
    .map(g => ({
      ...g,
      year: GALLERY_YEARS[g.id] || 2000
    }))
    .sort((a, b) => a.year - b.year);

  return (
    <main className="w-full pt-24 pb-12 max-w-container-max mx-auto px-margin-edge">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:items-start">
        {/* Spacer to preserve top padding */}
        <div className="lg:col-span-12 mb-8"></div>

        {/* Profile Illustration (Desktop) */}
        <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-32 pr-0 lg:pr-12 mb-8 lg:mb-0">
          <div className="artist-portrait-container">
            <img 
              alt={t('home.artistName')} 
              src={portraitImg}
            />
          </div>
          <div className="mt-8 text-center lg:text-start">
            <p className="font-label-sm text-on-surface-variant/60 uppercase italic">{t('home.selfPortraitCaption')}</p>
          </div>
        </div>

        {/* Narrative Content */}
        <div className="lg:col-span-7 mt-4 lg:mt-0 pl-0 lg:pl-12">
          {/* Profile Illustration (Mobile) */}
          <div className="block lg:hidden mb-8 w-full">
            <div className="artist-portrait-container">
              <img 
                alt={t('home.artistName')} 
                src={portraitImg}
              />
            </div>
            <div className="mt-4 text-center">
              <p className="font-label-sm text-on-surface-variant/60 uppercase italic">{t('home.selfPortraitCaption')}</p>
            </div>
          </div>
          <h2 className="font-h1 text-[26px] sm:text-[32px] lg:text-[42px] font-normal text-primary mb-8 leading-[1.05]">
            {t('home.artistName')} | {t('home.yearsOfCreation')}
          </h2>
          <div className="space-y-6 text-on-surface">
            <p className="font-body-lg text-body-lg leading-relaxed">
              {t('home.introParagraph')}
            </p>
            {/* Large Quote / Artist Statement */}
            <div className="py-8 border-y border-surface-variant/50 relative">
              <span className={`material-symbols-outlined text-6xl text-secondary-container/40 absolute -top-8 ${i18n.language === 'he' ? 'right-0' : 'left-0'}`} data-icon="format_quote" style={{fontVariationSettings: "'FILL' 1"}}>format_quote</span>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                  <h3 className="font-label-sm uppercase tracking-widest text-primary">{t('home.artistStatementHeader')}</h3>
                </div>
                <div className="lg:col-span-3">
                  <p className="font-h3 text-xl lg:text-2xl italic leading-snug text-secondary mb-2">
                    {t('home.artistStatementQuote')}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Hand-drawn graphite pencil stroke divider echoing the artist's signature */}
      <div className="w-full max-w-[1100px] mx-auto mt-24 px-margin-edge">
        <svg viewBox="0 0 1000 10" preserveAspectRatio="none" className="w-full h-[3px] text-[#7A7571] opacity-40">
          <path d="M 0 5 C 150 4.2, 300 5.8, 500 5 C 700 4.2, 850 5.8, 1000 5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Interactive Chronological Accordion Section */}
      <section className="mt-section-gap">

        <div className="mb-8 text-start">
          <h2 className="font-h2 text-3xl lg:text-4xl text-primary mb-4">{t('home.timelineHeader')}</h2>
          <p className="font-body-md text-on-surface-variant max-w-2xl">
            {t('home.timelineSubtitle')}
          </p>
        </div>
        
        <div className="timeline-accordion-container">
          {cronGalleries.map((g) => {
            const displayTitle = i18n.language === 'en' && g.titleEn ? g.titleEn : g.title;
            return (
              <Link 
                key={g.id}
                to={`/gallery/${g.id}`} 
                className="timeline-slice"
              >
                <img src={g.coverImage} alt={displayTitle} className="slice-image" loading="lazy" />
                <div className="slice-overlay">
                  <div className="slice-content">
                    <span className="slice-overlay-year">{g.year}</span>
                    <h3 className="slice-overlay-title">{displayTitle}</h3>
                    <span className="slice-overlay-link-text">{t('home.viewExhibition')}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

    </main>
  );
};

export default Home;
