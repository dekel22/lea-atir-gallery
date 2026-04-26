import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          לאה עתיר
        </Link>
        
        <button className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>

        <nav className={`navbar-links ${isOpen ? 'open' : ''}`}>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>עמוד הבית</Link>
          <a href="mailto:contact@example.com">צור קשר</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
