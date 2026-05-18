import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-neutral-100/50">
        <nav className="flex justify-center lg:justify-between items-center px-4 md:px-8 lg:px-12 py-4 max-w-full mx-auto rtl relative">
          {/* Right side placeholder to keep links centered */}
          <div className="w-48 hidden lg:block"></div>
          
          {/* Middle Links */}
          <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-8 md:gap-12 lg:gap-16 w-full lg:w-auto">
            <Link to="/galleries" className="font-label-sm uppercase tracking-widest text-primary hover:text-secondary transition-colors whitespace-nowrap">גלריות</Link>
            <Link to="/about" className="font-label-sm uppercase tracking-widest text-primary hover:text-secondary transition-colors whitespace-nowrap">אודות</Link>
            <Link to="/contact" className="font-label-sm uppercase tracking-widest text-primary hover:text-secondary transition-colors whitespace-nowrap">צור קשר</Link>
            <Link to="/" className="font-label-sm uppercase tracking-widest text-primary hover:text-secondary transition-colors whitespace-nowrap">דף הבית</Link>
          </div>

          {/* Signature in the corner (outside normal flow) */}
          <div className="fixed top-0 left-0 z-50 pointer-events-none p-4">
            <img 
              src="/sig.png" 
              alt="לאה עתיר" 
              className="h-[216px] lg:h-[270px] object-contain" 
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
