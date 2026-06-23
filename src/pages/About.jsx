import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import portraitImg from '../assets/about-portrait-bw.jpg';

const About = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('about.title');
  }, [t, i18n.language]);

  // Fallbacks in case translation arrays are not resolved as arrays
  const areasOfActivity = t('about.areasOfActivity', { returnObjects: true }) || [];
  const whyWebsiteParagraphs = t('about.whyWebsiteParagraphs', { returnObjects: true }) || [];

  return (
    <main className="w-full pt-24 pb-20 max-w-container-max mx-auto px-margin-edge animate-fade-in">
      <header className="mb-16">

        <h1 className="font-h1 text-5xl lg:text-6xl font-normal text-primary mb-6">{t('about.artistName')}</h1>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Profile Illustration (Desktop) */}
        <div className="hidden lg:block lg:col-span-4">
          <div className="artist-portrait-container">
            <img 
              src={portraitImg} 
              alt={t('about.artistName')} 
            />
          </div>
          <div className="mt-4 text-center lg:text-start">
            <p className="font-label-sm text-on-surface-variant/60 uppercase italic">{t('about.selfPortraitCaption')}</p>
          </div>
        </div>
        
        <div className="lg:col-span-8 space-y-8 text-on-surface">
          {/* Profile Illustration (Mobile) */}
          <div className="block lg:hidden mb-8 w-full">
            <div className="artist-portrait-container">
              <img 
                src={portraitImg} 
                alt={t('about.artistName')} 
              />
            </div>
            <div className="mt-4 text-center">
              <p className="font-label-sm text-on-surface-variant/60 uppercase italic">{t('about.selfPortraitCaption')}</p>
            </div>
          </div>
          <div className="space-y-6">
            <p className="font-body-lg text-body-lg leading-relaxed">
              {t('about.introParagraph')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-surface-variant/30">
            <div>
              <h3 className="font-label-sm uppercase tracking-widest text-primary mb-4">{t('about.areasOfActivityHeader')}</h3>
              <ul className="space-y-2 font-body-md text-on-surface-variant">
                {Array.isArray(areasOfActivity) && areasOfActivity.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-label-sm uppercase tracking-widest text-primary mb-4">{t('about.educationHeader')}</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                {t('about.educationText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 pt-10 border-t border-surface-variant/30">
        <h2 className="font-h2 text-3xl text-secondary mb-6">{t('about.whyWebsiteHeader')}</h2>
        <div className="max-w-4xl space-y-4 text-on-surface-variant font-body-lg text-lg leading-relaxed">
          {Array.isArray(whyWebsiteParagraphs) && whyWebsiteParagraphs.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
          <blockquote className={`border-primary/30 py-2 my-8 italic text-2xl text-secondary ${i18n.language === 'he' ? 'border-r-4 pr-6' : 'border-l-4 pl-6'}`}>
            {t('about.whyWebsiteQuote')}
          </blockquote>
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
    </main>
  );
};

export default About;
