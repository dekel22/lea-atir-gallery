import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Success = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('success.title');
  }, [t, i18n.language]);

  return (
    <main className="w-full pt-24 md:pt-32 pb-20 max-w-container-max mx-auto px-margin-edge animate-fade-in text-center">
      <div className="bg-surface-container p-8 sm:p-16 max-w-2xl mx-auto space-y-8 border border-primary/10">
        <span className="material-symbols-outlined text-7xl text-primary" data-icon="check_circle">check_circle</span>
        <h1 className="font-h1 text-4xl lg:text-5xl text-primary">{t('success.header')}</h1>
        <p className="font-body-lg text-lg text-on-surface-variant leading-relaxed">
          {t('success.message')}
        </p>
        <div className="pt-8">
          <a href="/" className="inline-flex items-center gap-4 bg-primary text-on-primary px-12 py-5 font-label-sm uppercase tracking-[0.2em] hover:bg-secondary transition-all">
            {t('success.backHome')}
          </a>
        </div>
      </div>
    </main>
  );
};

export default Success;
