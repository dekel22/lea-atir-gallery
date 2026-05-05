import React from 'react';
import { Link } from 'react-router-dom';
import { galleries } from '../data/galleries';
// Removed ./Home.css as we are using Tailwind classes now

const getFilterStyle = (index) => {
  if (index % 3 === 0) return 'brightness(0.9) contrast(1.1)';
  if (index % 3 === 1) return 'grayscale(1)';
  return 'sepia(0.2)';
};

const Home = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-margin-page relative z-10 animate-fade-in">
      {/* Hero/About Section */}
      <section className="mt-section-gap mb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-5 order-1 md:order-1 flex justify-center">
            <div className="relative w-full max-w-[240px] aspect-[0.67] bg-surface-container shadow-sm overflow-hidden group">
              <img 
                alt="Lea Atir Portrait" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out" 
                src="/about-portrait.jpg"
              />
              <div className="absolute inset-0 border-[16px] border-surface-bright/20 pointer-events-none"></div>
            </div>
          </div>
          <div className="md:col-start-7 md:col-span-5 order-2 md:order-2">
            <h1 className="font-headline-xl text-headline-xl text-on-surface mb-8 leading-tight">השראה נובעת מהשקט שבין המשיכות.</h1>
            <p className="font-body-lg text-body-lg text-secondary mb-12 max-w-lg">
              לאה עתיר יוצרת עולמות של צבע ורגש דרך התבוננות מעמיקה בפרטים הקטנים של החיים. עבודותיה משלבות טכניקות קלאסיות עם גישה מודרנית ומינימליסטית, המזמינה את המתבונן למסע אינטימי של שקט פנימי וגילוי.
            </p>
            <div className="flex gap-8 border-t border-outline-variant pt-8">
              <div>
                <span className="block font-label-sm text-label-sm text-on-surface-variant mb-2">תערוכות</span>
                <span className="block font-headline-md text-headline-md text-on-surface">15+</span>
              </div>
              <div>
                <span className="block font-label-sm text-label-sm text-on-surface-variant mb-2">שנות יצירה</span>
                <span className="block font-headline-md text-headline-md text-on-surface">25</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery List Section */}
      <section className="mb-section-gap" id="galleries">
        <div className="flex flex-row-reverse justify-between items-baseline mb-16 border-b border-primary pb-4">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">גלריות</h2>
          <a className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#galleries">צפה בכל העבודות</a>
        </div>
        
        <div className="flex flex-col gap-24">
          {galleries.map((gallery, index) => (
            <div key={gallery.id} className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
              {/* Description on the right (appears first in RTL grid) */}
              <div className="md:col-span-7 md:pl-12">
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4">{gallery.title}</h3>
                <p className="font-body-md text-secondary leading-relaxed">
                  {gallery.description}
                </p>
              </div>
              {/* Image and link on the left (appears second in RTL grid, size halved via col-span-5 instead of 7) */}
              <div className="md:col-span-5 flex flex-col gap-6">
                <Link to={`/gallery/${gallery.id}`} className="group overflow-hidden bg-surface-container block w-full rounded shadow-sm">
                  <div 
                    className="aspect-[16/9] w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-1000" 
                    style={{ 
                      backgroundImage: `url('${gallery.coverImage}')`, 
                      filter: getFilterStyle(index)
                    }}
                  ></div>
                </Link>
                <Link to={`/gallery/${gallery.id}`} className="font-label-sm text-primary border-b border-primary pb-1 self-start hover:opacity-70 transition-opacity">
                  גלו את האוסף
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter / Contact Teaser */}
      <section className="py-section-gap border-t border-outline-variant text-center">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">הצטרפו לעדכונים על תערוכות חדשות</h2>
        <div className="max-w-md mx-auto">
          <form className="relative group" onSubmit={(e) => e.preventDefault()}>
            <input 
              className="w-full bg-transparent border-0 border-b border-primary py-4 px-2 focus:ring-0 focus:border-outline transition-colors font-body-md text-center rtl text-on-surface placeholder:text-on-surface-variant/50" 
              placeholder="כתובת דוא״ל" 
              type="email"
            />
            <button 
              className="mt-8 bg-primary text-on-primary px-12 py-4 font-label-sm uppercase tracking-widest hover:bg-secondary-container hover:text-on-secondary-container transition-all duration-300" 
              type="submit"
            >
              הרשמה
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
