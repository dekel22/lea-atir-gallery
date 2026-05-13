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
            <p className="font-label-sm text-on-surface-variant/60 uppercase italic">דיוקן עצמי, פחם על נייר, 2020</p>
          </div>
        </div>
        {/* Narrative Content */}
        <div className="lg:col-span-8 mt-4 lg:mt-0 pl-0 lg:pl-12">
          <h2 className="font-h1 text-4xl lg:text-5xl text-primary mb-8 leading-[1.05]">לאה עתיר <br/>+50 שנים של יצירה</h2>
          <div className="space-y-6 text-on-surface">
            <p className="font-body-lg text-body-lg leading-relaxed">
              היו תקופות של שחור לבן בלבד, היו תקופות של צבע, תקופות יותר מופשטות וכאלה מאוד ריאליסטיות. לרוב הנושא הכתיב לי את דרך העבודה, היו מצבים שהיה לי ברור שזו עבודה בשחור לבן, בפחם סינטטי שחור, ולא בשום חומר אחר כמו ב"נעקרת". "ברישום ואני" השתמשתי במונוכרום בגוונים חומים ולא בצבע. כשעבדתי בנושא "בין לבין" השתמשתי בצבע שמן ובגירים שמנים. ב"פיסות נוף" השתמשתי בשמן וגרפית, (כי בנוף אני רוצה לטפל אחרת,) וכך הלאה... <br/> מה יהיה ההמשך?, אין לי מושג, אני די בטוחה שהוא יתחיל ברישום.
            </p>
            <p className="font-body-md text-on-surface-variant max-w-xl">
              סיימתי את לימודיי בתל אביב ומיד בחרתי לקחת אחריות על כל העשייה שלי. בראש ובראשונה להיות המבקרת של עצמי, להחליט מהם הנושאים,  סגנון  העבודה, בחרתי בד בבד ללמד כדי לא להיות תלויה במכירת העבודות שלי  למחיה. כך היה ככל השנים , תמיד ציירתי בלי שהתערבו לי בהחלטות. עד היום הצגתי למעלה מ23 תערוכות יחיד ומשותפות.
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
                    "לגבי אומנות ויצירה היא דרך חיים, האומנות מאז שאני זוכרת את עצמי הייתה לי עוגן ומקור לחוזק. מכל הטכניקות, ואני מכירה הרבה. הרישום בשחור לבן בחומרים הכי בסיסיים כמו עיפרון גורמים לי הנאה, הוא החומר החוקר שלי, הבסיס לרוב עבודותי, ההתחלה כמעט בכל עבודה."
                  </p>
                </div>
              </div>
            </div>
            {/* Details Section */}
            <div className="pt-8 max-w-4xl">
              <div className="space-y-6">
                <h4 className="font-label-sm text-on-surface-variant border-b border-outline-variant/30 pb-2">תערוכות נבחרות</h4>
                <ul className="font-body-md grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-3">
                  <li className="flex justify-between items-baseline gap-4 border-b border-outline-variant/10 pb-1">
                    <Link to="/gallery/gallery_3" className="text-primary font-medium hover:text-secondary transition-colors">ש.ב.ר רמות מנשה גלריה לאומנות</Link>
                    <span className="text-on-surface-variant text-sm tabular-nums">2026</span>
                  </li>
                  <li className="flex justify-between items-baseline gap-4 border-b border-outline-variant/10 pb-1">
                    <Link to="/gallery/silver" className="text-primary font-medium hover:text-secondary transition-colors">כסף</Link>
                    <span className="text-on-surface-variant text-sm tabular-nums">2026</span>
                  </li>
                  <li className="flex justify-between items-baseline gap-4 border-b border-outline-variant/10 pb-1">
                    <Link to="/gallery/transparent" className="text-primary font-medium hover:text-secondary transition-colors">שקר השקיפות</Link>
                    <span className="text-on-surface-variant text-sm tabular-nums">2020</span>
                  </li>
                  <li className="flex justify-between items-baseline gap-4 border-b border-outline-variant/10 pb-1">
                    <Link to="/gallery/gallery_0" className="text-primary font-medium hover:text-secondary transition-colors">רישום ואני</Link>
                    <span className="text-on-surface-variant text-sm tabular-nums">1998</span>
                  </li>
                  <li className="flex justify-between items-baseline gap-4 border-b border-outline-variant/10 pb-1">
                    <Link to="/gallery/gallery_1" className="text-primary font-medium hover:text-secondary transition-colors">מבטים של יום יום</Link>
                    <span className="text-on-surface-variant text-sm tabular-nums">2003</span>
                  </li>
                  <li className="flex justify-between items-baseline gap-4 border-b border-outline-variant/10 pb-1">
                    <Link to="/gallery/gallery_7" className="text-primary font-medium hover:text-secondary transition-colors">וריאציות על נושא</Link>
                    <span className="text-on-surface-variant text-sm tabular-nums">1995</span>
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

            <h3 className="font-h2 text-h2 text-white mb-6">תהליך היצירה</h3>
            <p className="font-body-md text-white/80 mb-6">יצירה היא משהו שניבנה עם עשייתה, גם אם ידוע וברור לי במחשבה מה אני הולכת לעשות תמיד קיים "פער היצירה", זהו התהליך בין ההתחלה לתוצאה.. לכן יצירה היא תהליך לא ידוע מראש.</p>
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
