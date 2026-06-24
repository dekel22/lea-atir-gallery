import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top of the page on route transition
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Scroll instantly to top before rendering new page content
    });
  }, [pathname]);

  return null;
}
