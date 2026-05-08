import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-neutral-100 bg-white/60 backdrop-blur-xl flex flex-col md:flex-row-reverse justify-between items-center px-12 py-20 gap-8 rtl mt-auto">
      <div className="flex gap-12">
        <a className="font-label-sm uppercase tracking-widest text-neutral-400 hover:text-primary transition-all border-b border-transparent hover:border-primary" href="#">אינסטגרם</a>
        <a className="font-label-sm uppercase tracking-widest text-neutral-400 hover:text-primary transition-all border-b border-transparent hover:border-primary" href="#">פייסבוק</a>
        <a className="font-label-sm uppercase tracking-widest text-neutral-400 hover:text-primary transition-all border-b border-transparent hover:border-primary" href="#">פינטרסט</a>
      </div>
      <div className="flex flex-col items-center md:items-start gap-2">
        <p className="font-label-sm uppercase tracking-widest text-primary">
          © 2024 לאה עתיר. כל הזכויות שמורות.
        </p>
        <p className="font-label-sm text-on-surface-variant/40 text-[10px]">DESIGNED FOR THE QUIET OBSERVER</p>
      </div>
    </footer>
  );
};

export default Footer;
