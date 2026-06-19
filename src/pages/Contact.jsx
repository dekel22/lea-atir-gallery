import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('contact.title');
    window.scrollTo(0, 0);
  }, [t, i18n.language]);

  return (
    <main className="w-full pt-24 md:pt-32 pb-20 max-w-container-max mx-auto px-margin-edge animate-fade-in">
      <header className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-label-sm text-on-surface-variant uppercase tracking-widest">{t('contact.sectionNumber')}</span>
          <div className="w-12 h-px bg-outline-variant"></div>
          <span className="font-label-sm text-primary uppercase tracking-widest">{t('contact.sectionTitle')}</span>
        </div>
        <h1 className="font-h1 text-5xl lg:text-6xl text-primary mb-6">{t('contact.header')}</h1>
      </header>

      <div className="max-w-4xl">
        <div className="flex flex-col space-y-16">
          <div className="space-y-6 max-w-2xl">
            <h3 className="font-h3 text-2xl text-secondary">{t('contact.detailsHeader')}</h3>
            <p className="font-body-lg text-lg text-on-surface-variant leading-relaxed">
              {t('contact.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex items-center gap-4 sm:gap-8 group">
              <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-surface-container rounded-full text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-500">
                <span className="material-symbols-outlined text-2xl" data-icon="mail">mail</span>
              </div>
              <div>
                <p className="font-label-sm uppercase tracking-widest text-primary/40 mb-1">{t('contact.emailLabel')}</p>
                <a href="mailto:leaatir@walla.com" className="font-h3 text-[18px] sm:text-2xl hover:text-secondary transition-colors break-all">leaatir@walla.com</a>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-8 group">
              <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-surface-container rounded-full text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-500">
                <span className="material-symbols-outlined text-2xl" data-icon="call">call</span>
              </div>
              <div>
                <p className="font-label-sm uppercase tracking-widest text-primary/40 mb-1">{t('contact.phoneLabel')}</p>
                <a href="tel:0544911985" className="font-h3 text-[18px] sm:text-2xl hover:text-secondary transition-colors" dir="ltr">054-4911985</a>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-surface-variant/30">
            <p className="font-h3 italic text-secondary/40 text-3xl">
              {t('contact.quote')}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
