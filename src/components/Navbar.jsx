import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-neutral-100/50">
        <nav className={`flex justify-center lg:justify-between items-center px-4 md:px-8 lg:px-12 py-4 max-w-full mx-auto relative ${i18n.language === 'he' ? 'rtl' : 'ltr'}`}>
          {/* Right side placeholder to keep links centered */}
          <div className="w-48 hidden lg:block"></div>
          
          {/* Middle Links */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 md:gap-12 lg:gap-16 w-full lg:w-auto">
            <Link to="/" className="font-label-sm uppercase tracking-widest text-primary hover:text-secondary transition-colors whitespace-nowrap">{t('nav.home')}</Link>
            <Link to="/galleries" className="font-label-sm uppercase tracking-widest text-primary hover:text-secondary transition-colors whitespace-nowrap">{t('nav.galleries')}</Link>
            <Link to="/about" className="font-label-sm uppercase tracking-widest text-primary hover:text-secondary transition-colors whitespace-nowrap">{t('nav.about')}</Link>
            <Link to="/contact" className="font-label-sm uppercase tracking-widest text-primary hover:text-secondary transition-colors whitespace-nowrap">{t('nav.contact')}</Link>
            
            {/* Language Switcher Button */}
            <button 
              onClick={() => i18n.changeLanguage(i18n.language === 'he' ? 'en' : 'he')}
              className="font-label-sm uppercase tracking-[0.1em] text-[0.7rem] sm:text-xs text-primary hover:text-secondary transition-all cursor-pointer select-none border border-outline-variant/40 hover:border-primary/60 px-3 py-1 rounded-[20px] bg-white/40 backdrop-blur-sm focus:outline-none mx-1 sm:mx-2"
            >
              {i18n.language === 'he' ? 'English' : 'עברית'}
            </button>
          </div>

          {/* Signature in the corner (outside normal flow) */}
          <div className="hidden md:block absolute top-0 left-0 z-50 pointer-events-none p-4">
            <img 
              src="/sig.png" 
              alt="לאה עתיר" 
              className="h-[120px] lg:h-[200px] xl:h-[270px] object-contain" 
            />
          </div>

          {/* Placeholder to maintain spacing where the signature used to be */}
          <div className="w-48 hidden lg:block"></div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
