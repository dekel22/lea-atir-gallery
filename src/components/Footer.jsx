import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant full-width py-12 mt-32 relative z-10">
      <div className="flex flex-col md:flex-row-reverse justify-between items-center px-12 w-full gap-8 max-w-screen-2xl mx-auto">
        <div className="text-lg font-serif italic text-on-surface">לאה עתיר</div>
        <div className="flex flex-row-reverse gap-12 font-sans text-xs uppercase tracking-widest text-on-surface-variant">
          <a className="hover:text-primary transition-colors duration-300" href="#">אינסטגרם</a>
          <a className="hover:text-primary transition-colors duration-300" href="#">פייסבוק</a>
          <a className="hover:text-primary transition-colors duration-300" href="#">דוא"ל</a>
        </div>
        <div className="font-sans text-xs uppercase tracking-widest text-on-surface-variant">
          © כל הזכויות שמורות ללאה עטיר
        </div>
      </div>
    </footer>
  );
};

export default Footer;
