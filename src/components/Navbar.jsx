import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-surface/80 backdrop-blur-md border-b border-outline-variant docked full-width top-0 sticky z-50">
      <div className="flex flex-row-reverse justify-between items-center w-full px-8 py-6 max-w-screen-2xl mx-auto">
        <Link to="/" className="text-2xl font-serif tracking-tighter text-on-surface uppercase hover:opacity-80 transition-opacity">
          לאה עתיר
        </Link>
        <div className="hidden md:flex flex-row-reverse gap-8 items-center">
          <Link to="/" className="font-serif tracking-tight text-sm text-on-surface border-b border-on-surface pb-1">דף הבית</Link>
          <a href="#" className="font-serif tracking-tight text-sm text-on-surface-variant hover:text-on-surface transition-colors">אודות</a>
          <a href="#galleries" className="font-serif tracking-tight text-sm text-on-surface-variant hover:text-on-surface transition-colors">גלריות</a>
          <a href="mailto:contact@example.com" className="font-serif tracking-tight text-sm text-on-surface-variant hover:text-on-surface transition-colors">צור קשר</a>
        </div>
        <div className="text-sm font-serif tracking-tight text-on-surface uppercase hover:opacity-70 transition-opacity duration-300 cursor-pointer">
          HE/EN
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
