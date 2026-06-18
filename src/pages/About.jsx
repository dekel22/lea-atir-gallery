import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import portraitImg from '../assets/about-portrait.jpg';

const About = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('about.title');
  }, [t, i18n.language]);

  // Fallbacks in case translation arrays are not resolved as arrays
  const areasOfActivity = t('about.areasOfActivity', { returnObjects: true }) || [];
  const whyWebsiteParagraphs = t('about.whyWebsiteParagraphs', { returnObjects: true }) || [];

  return (
    <main className="pt-24 pb-20 max-w-container-max mx-auto px-margin-edge animate-fade-in">
      <header className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-label-sm text-on-surface-variant uppercase tracking-widest">{t('about.sectionNumber')}</span>
          <div className="w-12 h-px bg-outline-variant"></div>
          <span className="font-label-sm text-primary uppercase tracking-widest">{t('about.sectionTitle')}</span>
        </div>
        <h1 className="font-h1 text-5xl lg:text-6xl text-primary mb-6">{t('about.artistName')}</h1>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="w-full lg:col-span-4">
          <div className="relative overflow-hidden bg-surface-container-low artist-portrait-container">
            <img 
              src={portraitImg} 
              alt={t('about.artistName')} 
              className="w-full h-full object-cover grayscale-0"
            />
          </div>
          <div className="mt-4 text-center lg:text-start">
            <p className="font-label-sm text-on-surface-variant/60 uppercase italic">{t('about.selfPortraitCaption')}</p>
          </div>
        </div>
        
        <div className="lg:col-span-8 space-y-8 text-on-surface">
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
    </main>
  );
};

export default About;
