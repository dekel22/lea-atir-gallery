import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-neutral-100/50">
        <nav className="flex justify-between items-center px-12 py-4 max-w-full mx-auto rtl">
          {/* Right side placeholder to keep links centered */}
          <div className="w-48 hidden lg:block"></div>
          
          {/* Middle Links */}
          <div className="flex items-center gap-12 lg:gap-16">
            <Link to="/galleries" className="font-label-sm uppercase tracking-widest text-primary hover:text-secondary transition-colors">גלריות</Link>
            <Link to="/about" className="font-label-sm uppercase tracking-widest text-primary hover:text-secondary transition-colors">אודות</Link>
            <Link to="/" className="font-label-sm uppercase tracking-widest text-primary hover:text-secondary transition-colors">דף הבית</Link>
          </div>

          {/* Left side Signature */}
          <div className="w-48 flex justify-end">
            <img src="/sig.png" alt="לאה עתיר" className="h-12 lg:h-16 object-contain" />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
