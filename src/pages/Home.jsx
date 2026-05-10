import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    document.title = 'לאה עתיר - גלריה לאומנות';
  }, []);

  return (
    <main className="pt-24 pb-12 max-w-container-max mx-auto px-margin-edge">
      {/* Hero Gallery Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Navigation Context */}
        <div className="lg:col-span-12 mb-8 flex justify-start">
          <div className="flex items-center gap-4">
            <span className="font-label-sm text-on-surface-variant uppercase tracking-widest">01</span>
            <div className="w-12 h-px bg-outline-variant"></div>
            <span className="font-label-sm text-primary uppercase tracking-widest">אודות האמנית</span>
          </div>
        </div>
        {/* Profile Illustration */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 pr-0 lg:pr-12 mb-8 lg:mb-0">
          <div className="relative overflow-hidden aspect-[3/4] w-1/2 lg:w-full mx-auto lg:mx-0 bg-surface-container-low group reveal-image">
            <img 
              alt="לאה עתיר" 
              className="object-cover w-full h-full transition-all duration-[2000ms] ease-out scale-105 group-hover:scale-100" 
              src="/about-portrait.jpg"
            />
          </div>
          <div className="mt-8 text-center lg:text-right">
            <p className="font-label-sm text-on-surface-variant/60 uppercase italic">פורטרט מאת לאה עתיר, פחם על נייר, 2020</p>
          </div>
        </div>
        {/* Narrative Content */}
        <div className="lg:col-span-8 mt-4 lg:mt-0 pl-0 lg:pl-12">
          <h2 className="font-h1 text-4xl lg:text-5xl text-primary mb-8 leading-[1.05]">יצירה מתוך השקט <br/>&amp; התבוננות פנימית</h2>
          <div className="space-y-6 text-on-surface">
            <p className="font-body-lg text-body-lg leading-relaxed first-letter:text-7xl first-letter:font-serif first-letter:ml-4 first-letter:float-right first-letter:mt-2">
              לאה עטיר היא אמנית רב-תחומית הפועלת בירושלים. עבודתה מתמקדת בממתח שבין המופשט למוחשי, תוך שימוש בחומרים טבעיים וטכניקות מסורתיות הנשזרות לתוך קומפוזיציות מודרניות. הקריירה שלה משתרעת על פני שני עשורים, במהלכם הציגה בתערוכות יחיד וקבוצתיות בגלריות הנחשבות בארץ ובעולם.
            </p>
            <p className="font-body-md text-on-surface-variant max-w-xl">
              המסע האמנותי של לאה החל בלימודי עיצוב ואדריכלות, רקע המשתקף בדיוק המבני ובמשחקי האור והצל המאפיינים את יצירותיה. לאורך השנים, פיתחה שפה חזותית ייחודית המשלבת מינימליזם צורני עם עומק רגשי רב, המזמינה את המתבונן לרגע של שהות ומחשבה.
            </p>
            {/* Large Quote / Artist Statement */}
            <div className="py-8 border-y border-surface-variant/50 relative">
              <span className="material-symbols-outlined text-6xl text-secondary-container/40 absolute -top-8 right-0" data-icon="format_quote" style={{fontVariationSettings: "'FILL' 1"}}>format_quote</span>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                  <h3 className="font-label-sm uppercase tracking-widest text-primary">הצהרת אמן</h3>
                </div>
                <div className="lg:col-span-3">
                  <p className="font-h3 text-xl lg:text-2xl italic leading-snug text-secondary mb-2">
                    "האמנות עבורי היא תהליך של זיקוק. אני מחפשת את הנקודה שבה החומר מפסיק להיות רק נוכחות פיזית והופך לרגש. בעולם רועש, אני שואפת ליצור מרחבים של שקט."
                  </p>
                </div>
              </div>
            </div>
            {/* Details Section */}
            <div className="pt-8 max-w-xl">
              <div className="space-y-6">
                <h4 className="font-label-sm text-on-surface-variant border-b border-outline-variant/30 pb-2">תערוכות נבחרות</h4>
                <ul className="font-body-md space-y-4">
                  <li className="flex justify-between items-baseline gap-4">
                    <Link to="/gallery/gallery_3" className="text-primary font-medium hover:text-secondary transition-colors underline decoration-outline-variant/30 underline-offset-4">ש.ב.ר רמות מנשה גלריה לאומנות</Link>
                    <span className="text-on-surface-variant text-sm tabular-nums">2026</span>
                  </li>
                  <li className="flex justify-between items-baseline gap-4">
                    <Link to="/gallery/transparent" className="text-primary font-medium hover:text-secondary transition-colors underline decoration-outline-variant/30 underline-offset-4">שקופים</Link>
                    <span className="text-on-surface-variant text-sm tabular-nums">2020</span>
                  </li>
                  <li className="flex justify-between items-baseline gap-4">
                    <Link to="/gallery/gallery_7" className="text-primary font-medium hover:text-secondary transition-colors underline decoration-outline-variant/30 underline-offset-4">וריאציות על נושא</Link>
                    <span className="text-on-surface-variant text-sm tabular-nums">1995</span>
                  </li>
                  <li className="flex justify-between items-baseline gap-4">
                    <Link to="/gallery/gallery_1" className="text-primary font-medium hover:text-secondary transition-colors underline decoration-outline-variant/30 underline-offset-4">מבטים של יום יום</Link>
                    <span className="text-on-surface-variant text-sm tabular-nums">2003</span>
                  </li>
                  <li className="flex justify-between items-baseline gap-4">
                    <Link to="/gallery/gallery_1" className="text-primary font-medium hover:text-secondary transition-colors underline decoration-outline-variant/30 underline-offset-4">גלריה לאומנות קסטרא חיפה</Link>
                    <span className="text-on-surface-variant text-sm tabular-nums">2003</span>
                  </li>
                  <li className="flex justify-between items-baseline gap-4">
                    <Link to="/gallery/silver" className="text-primary font-medium hover:text-secondary transition-colors underline decoration-outline-variant/30 underline-offset-4">כסף</Link>
                    <span className="text-on-surface-variant text-sm tabular-nums">2026</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Visual: Process/Behind the Scenes */}
      <section className="mt-section-gap">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch overflow-hidden border border-surface-variant/30">
          <div className="lg:col-span-8 bg-surface-container-highest aspect-[16/9]">
            <img 
              alt="קטלוג ציורים של לאה עתיר" 
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-[3000ms]" 
              src="/galleries/קטלוג.PNG"
            />
          </div>
          <div className="lg:col-span-4 flex flex-col justify-center p-8 lg:p-12 bg-black text-white">
            <span className="font-label-sm text-white/60 mb-8 uppercase tracking-widest">מאחורי הקלעים</span>
            <h3 className="font-h2 text-h2 text-white mb-6">תהליך היצירה</h3>
            <p className="font-body-md text-white/80 mb-6">הסטודיו הוא מרחב של ניסוי וטעייה, מקום שבו המחשבות הופכות לצבע וצורה. השהות בו מאפשרת זיקוק של הרעיון לכדי חומר.</p>
            <Link to="/galleries" className="inline-flex items-center gap-4 font-label-sm uppercase tracking-[0.2em] group border-b border-white/20 pb-2 w-fit hover:border-white transition-all text-white">
              לצפייה בגלריות
              <span className="material-symbols-outlined text-lg group-hover:-translate-x-2 transition-transform" data-icon="arrow_back">arrow_back</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
