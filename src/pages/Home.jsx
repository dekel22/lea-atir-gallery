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
    <main className="pt-24 pb-12 max-w-container-max mx-auto px-margin-edge">
      {/* Hero Gallery Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:items-start">
        {/* Navigation Context */}
        <div className="lg:col-span-12 mb-8 flex justify-start">
          <div className="flex items-center gap-4">
            <span className="font-label-sm text-on-surface-variant uppercase tracking-widest">01</span>
            <div className="w-12 h-px bg-outline-variant"></div>
            <span className="font-label-sm text-primary uppercase tracking-widest">{t('nav.home')}</span>
          </div>
        </div>
        {/* Profile Illustration (Desktop) */}
        <div className="hidden lg:block lg:col-span-4 lg:sticky lg:top-32 pr-0 lg:pr-12 mb-8 lg:mb-0">
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
        <div className="lg:col-span-8 mt-4 lg:mt-0 pl-0 lg:pl-12">
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
          <h2 className="font-h1 text-4xl lg:text-5xl text-primary mb-8 leading-[1.05]">
            {t('home.artistName')} <br/>{t('home.yearsOfCreation')}
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
            {/* Details Section */}
            <div className="pt-8 max-w-4xl">
              <div className="space-y-6">
                <h4 className="font-label-sm text-on-surface-variant border-b border-outline-variant/30 pb-2">{t('home.selectedExhibitions')}</h4>
                <ul className="font-body-md grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-3">
                  <li className="flex justify-between items-baseline gap-4 border-b border-outline-variant/10 pb-1">
                    <Link to="/gallery/gallery_3" className="text-primary font-medium hover:text-secondary transition-colors">{t('home.exhibitions.gallery_3')}</Link>
                    <span className="text-on-surface-variant text-sm tabular-nums">2026</span>
                  </li>
                  <li className="flex justify-between items-baseline gap-4 border-b border-outline-variant/10 pb-1">
                    <Link to="/gallery/silver" className="text-primary font-medium hover:text-secondary transition-colors">{t('home.exhibitions.silver')}</Link>
                    <span className="text-on-surface-variant text-sm tabular-nums">2026</span>
                  </li>
                  <li className="flex justify-between items-baseline gap-4 border-b border-outline-variant/10 pb-1">
                    <Link to="/gallery/transparent" className="text-primary font-medium hover:text-secondary transition-colors">{t('home.exhibitions.transparent')}</Link>
                    <span className="text-on-surface-variant text-sm tabular-nums">2020</span>
                  </li>
                  <li className="flex justify-between items-baseline gap-4 border-b border-outline-variant/10 pb-1">
                    <Link to="/gallery/gallery_0" className="text-primary font-medium hover:text-secondary transition-colors">{t('home.exhibitions.gallery_0')}</Link>
                    <span className="text-on-surface-variant text-sm tabular-nums">1998</span>
                  </li>
                  <li className="flex justify-between items-baseline gap-4 border-b border-outline-variant/10 pb-1">
                    <Link to="/gallery/gallery_1" className="text-primary font-medium hover:text-secondary transition-colors">{t('home.exhibitions.gallery_1')}</Link>
                    <span className="text-sm tabular-nums">2003</span>
                  </li>
                  <li className="flex justify-between items-baseline gap-4 border-b border-outline-variant/10 pb-1">
                    <Link to="/gallery/gallery_7" className="text-primary font-medium hover:text-secondary transition-colors">{t('home.exhibitions.gallery_7')}</Link>
                    <span className="text-on-surface-variant text-sm tabular-nums">1995</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Visual: Process/Behind the Scenes */}
      <section className="mt-section-gap">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch overflow-hidden border border-surface-variant/30">
          <div className="lg:col-span-8 bg-white flex items-center justify-center creative-process-image-container">
            <img 
              alt={t('home.catalogCaption')} 
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-[3000ms]" 
              src="/galleries/catalog.png"
            />
          </div>
          <div className="lg:col-span-4 flex flex-col justify-center p-8 lg:p-12 bg-black text-white">

            <h3 className="font-h2 text-3xl lg:text-h2 text-white mb-6">{t('home.creativeProcessHeader')}</h3>
            <p className="text-lg lg:text-xl text-white mb-8 leading-relaxed">{t('home.creativeProcessText')}</p>
            <Link to="/galleries" className="inline-flex items-center gap-4 font-label-sm uppercase tracking-[0.2em] group border-b border-white/20 pb-2 w-fit hover:border-white transition-all text-white">
              {t('home.viewGalleriesButton')}
              <span className={`material-symbols-outlined text-lg transition-transform ${i18n.language === 'he' ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2 rotate-180'}`} data-icon="arrow_back">arrow_back</span>
            </Link>
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
        <div className="flex items-center gap-4 mb-8">
          <span className="font-label-sm text-on-surface-variant uppercase tracking-widest">02</span>
          <div className="w-12 h-px bg-outline-variant"></div>
          <span className="font-label-sm text-primary uppercase tracking-widest">{t('home.timelineTitle')}</span>
        </div>
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
