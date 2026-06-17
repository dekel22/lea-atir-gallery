
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <footer className={`w-full border-t border-neutral-100 bg-white/60 backdrop-blur-xl flex flex-col md:flex-row justify-start items-start px-12 py-12 gap-8 mt-auto ${i18n.language === 'he' ? 'rtl' : 'ltr'}`}>
      <div className="flex flex-col items-start gap-2">
        <p className="font-label-sm uppercase tracking-widest text-primary text-right">
          {t('footer.copyright')}
        </p>
        <p className="font-label-sm text-on-surface-variant/40 text-[10px]">DESIGNED FOR THE QUIET OBSERVER</p>
      </div>
    </footer>
  );
};

export default Footer;
