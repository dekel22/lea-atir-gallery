import React from 'react';
import { Link } from 'react-router-dom';
import { galleries } from '../data/galleries';

const Home = () => {
  return (
    <main className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-edge min-h-[calc(100vh-64px)] flex flex-col py-4 animate-fade-in">
      {/* Hero Gallery Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Profile Illustration: Compacted */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 pr-0 lg:pr-12">
          <div className="relative overflow-hidden aspect-square bg-surface-container-low group reveal-image max-w-[300px] mx-auto lg:mr-0">
            <img 
              alt="לאה עטיר" 
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-[2000ms] ease-out scale-105 group-hover:scale-100" 
              data-alt="A detailed charcoal sketch portrait of the artist, showing expressive lines and deep shadows, reflecting an artistic and creative persona." 
              src="/about-portrait.jpg"
            />
          </div>
          <div className="mt-4">
            <p className="font-label-sm text-on-surface-variant/60 uppercase italic text-xs">פורטרט מאת לאה עתיר, פחם על נייר, 2020</p>
          </div>
        </div>
        {/* Narrative Content: Tightened Spacing */}
        <div className="lg:col-span-7 mt-8 lg:mt-0 pl-0 lg:pl-12">
          <h2 className="font-h1 text-h1 text-primary leading-[1.05] text-3xl mb-4">יצירה מתוך השקט <br/>&amp; התבוננות פנימית</h2>
          <div className="text-on-surface">
            <p className="font-body-lg text-body-lg leading-relaxed first-letter:font-serif first-letter:ml-4 first-letter:float-right first-letter:mt-1 first-letter:text-4xl">
              לאה עטיר היא אמנית רב-תחומית הפועלת בירושלים. עבודתה מתמקדת בממתח שבין המופשט למוחשי, תוך שימוש בחומרים טבעיים וטכניקות מסורתיות הנשזרות לתוך קומפוזיציות מודרניות. הקריירה שלה משתרעת על פני שני עשורים, במהלכם הציגה בתערוכות יחיד וקבוצתיות בגלריות הנחשבות בארץ ובעולם.
            </p>
            <p className="font-body-md text-on-surface-variant max-w-xl mt-4">
              המסע האמנותי של לאה החל בלימודי עיצוב ואדריכלות, רקע המשתקף בדיוק המבני ובמשחקי האור והצל המאפיינים את יצירותיה. לאורך השנים, פיתחה שפה חזותית ייחודית המשלבת מינימליזם צורני עם עומק רגשי רב.
            </p>
            {/* Large Quote / Artist Statement: Tightened */}
            <div className="border-y border-surface-variant/50 relative mt-8">
              <span className="material-symbols-outlined text-5xl text-secondary-container/40 absolute -top-6 right-0" data-icon="format_quote" style={{fontVariationSettings: "'FILL' 1"}}>format_quote</span>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 py-6">
                <div className="lg:col-span-1">
                  <h3 className="font-label-sm uppercase tracking-widest text-primary">הצהרת אמן</h3>
                </div>
                <div className="lg:col-span-3">
                  <p className="font-h3 italic leading-snug text-secondary">
                    "האמנות עבורי היא תהליך של זיקוק. אני מחפשת את הנקודה שבה החומר מפסיק להיות רק נוכחות פיזית והופך לרגש. בעולם רועש, אני שואפת ליצור מרחבים של שקט."
                  </p>
                </div>
              </div>
            </div>
            {/* Details Grid */}
            <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-12 gap-8">
              <div className="space-y-4">
                <h4 className="font-label-sm text-on-surface-variant border-b border-outline-variant/30 pb-2">תערוכות נבחרות</h4>
                <ul className="font-body-md space-y-2">
                  <li className="flex justify-between items-baseline gap-4">
                    <span className="text-primary font-medium">מוזיאון ישראל</span>
                    <span className="text-on-surface-variant text-sm tabular-nums">2022</span>
                  </li>
                  <li className="flex justify-between items-baseline gap-4">
                    <span className="text-primary font-medium">גלריה קונטמפוררי</span>
                    <span className="text-on-surface-variant text-sm tabular-nums">2020</span>
                  </li>
                  <li className="flex justify-between items-baseline gap-4">
                    <span className="text-primary font-medium">הביאנלה לאומנויות</span>
                    <span className="text-on-surface-variant text-sm tabular-nums">2018</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-label-sm text-on-surface-variant border-b border-outline-variant/30 pb-2">פרסים ומלגות</h4>
                <ul className="font-body-md space-y-2">
                  <li className="flex justify-between items-baseline gap-4">
                    <span className="text-primary font-medium">פרס שרת התרבות</span>
                    <span className="text-on-surface-variant text-sm tabular-nums">2021</span>
                  </li>
                  <li className="flex justify-between items-baseline gap-4">
                    <span className="text-primary font-medium">מלגת שהות, פריז</span>
                    <span className="text-on-surface-variant text-sm tabular-nums">2019</span>
                  </li>
                  <li className="flex justify-between items-baseline gap-4">
                    <span className="text-primary font-medium">קרן יהושע רבינוביץ'</span>
                    <span className="text-on-surface-variant text-sm tabular-nums">2017</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Textual Gallery Links Section */}
      <section className="mt-32 pt-16 border-t border-outline-variant/30 lg:pr-12 lg:col-span-7 lg:col-start-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {galleries.map((gallery) => (
            <div key={gallery.id} className="group">
              <Link to={`/gallery/${gallery.id}`} className="block hover:bg-surface-container-low p-6 -m-6 rounded transition-colors duration-500">
                <h3 className="font-h3 text-primary group-hover:text-secondary transition-colors mb-3">{gallery.title}</h3>
                <p className="font-body-md text-on-surface-variant line-clamp-3">
                  {gallery.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-label-sm uppercase tracking-widest">לצפייה בגלריה</span>
                  <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'wght' 300"}}>arrow_back</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
