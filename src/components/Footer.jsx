import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-neutral-100 bg-white/60 backdrop-blur-xl flex flex-col md:flex-row justify-start items-start px-12 py-12 gap-8 rtl mt-auto">
      <div className="flex flex-col items-start gap-2">
        <p className="font-label-sm uppercase tracking-widest text-primary text-right">
          © 2024 לאה עתיר. כל הזכויות שמורות.
        </p>
        <p className="font-label-sm text-on-surface-variant/40 text-[10px]">DESIGNED FOR THE QUIET OBSERVER</p>
      </div>
    </footer>
  );
};

export default Footer;
