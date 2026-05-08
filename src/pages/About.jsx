import React, { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    document.title = 'אודות | לאה עתיר';
  }, []);

  return (
    <main className="pt-24 pb-20 max-w-container-max mx-auto px-margin-edge animate-fade-in">
      <header className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-label-sm text-on-surface-variant uppercase tracking-widest">03</span>
          <div className="w-12 h-px bg-outline-variant"></div>
          <span className="font-label-sm text-primary uppercase tracking-widest">אודות האמנית</span>
        </div>
        <h1 className="font-h1 text-5xl lg:text-6xl text-primary mb-6">לאה עתיר</h1>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4">
          <div className="aspect-[3/4] bg-surface-container-low reveal-image">
            <img 
              src="/about-portrait.jpg" 
              alt="לאה עתיר" 
              className="w-full h-full object-cover grayscale-0"
            />
          </div>
        </div>
        
        <div className="lg:col-span-8 space-y-8 text-on-surface">
          <div className="space-y-6">
            <h2 className="font-h2 text-3xl text-secondary">חיים של אמנות ויצירה</h2>
            <p className="font-body-lg text-body-lg leading-relaxed">
              לאה עטיר היא אמנית רב-תחומית שיצירתה שזורה עמוק בנופי הארץ ובחיי הרוח שלה. לאורך עשרות שנים, פיתחה לאה שפה אמנותית המשלבת בין חומר לרוח, בין המופשט למוחשי.
            </p>
            <p className="font-body-md text-on-surface-variant">
              עבודותיה של לאה מוצגות בגלריות נבחרות ובמוזיאונים, ונוגעות במגוון רחב של נושאים - החל מרישומים אינטימיים של טבע ודמויות ועד לעיצוב תפאורות במה רחבות היקף. הסטודיו שלה הוא מקום של שקט, התבוננות וזיקוק הרגש לכדי צבע וצורה.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-surface-variant/30">
            <div>
              <h3 className="font-label-sm uppercase tracking-widest text-primary mb-4">תחומי עיסוק</h3>
              <ul className="space-y-2 font-body-md text-on-surface-variant">
                <li>• רישום בפחם ועיפרון</li>
                <li>• ציור בשמן ואקריליק</li>
                <li>• עיצוב תפאורה לתיאטרון</li>
                <li>• אמנות רב-תחומית</li>
              </ul>
            </div>
            <div>
              <h3 className="font-label-sm uppercase tracking-widest text-primary mb-4">השכלה ורקע</h3>
              <p className="font-body-md text-on-surface-variant">
                בוגרת לימודי אמנות ועיצוב. הרקע האדריכלי והעיצובי שלה משתקף בדיוק המבני של עבודותיה ובמשחקי האור והצל הייחודיים לה.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
