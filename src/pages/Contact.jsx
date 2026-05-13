import React, { useEffect, useState } from 'react';

const Contact = () => {
  useEffect(() => {
    document.title = 'צור קשר | לאה עתיר';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-32 pb-20 max-w-container-max mx-auto px-margin-edge animate-fade-in">
      <header className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-label-sm text-on-surface-variant uppercase tracking-widest">04</span>
          <div className="w-12 h-px bg-outline-variant"></div>
          <span className="font-label-sm text-primary uppercase tracking-widest">צור קשר</span>
        </div>
        <h1 className="font-h1 text-5xl lg:text-6xl text-primary mb-6">נשמח לשמוע ממך</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7">
          <form 
            action="https://formspree.io/f/leaatir@walla.com" 
            method="POST" 
            className="space-y-8"
          >
            {/* Formspree Configuration */}
            <input type="hidden" name="_subject" value="פנייה חדשה מאתר לאה עתיר" />
            <input type="hidden" name="_next" value={window.location.origin + "/success"} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="name" className="font-label-sm uppercase tracking-wider text-primary/70">שם מלא</label>
                <input 
                  type="text" 
                  id="name" 
                  name="שם" 
                  required 
                  className="w-full bg-surface-container-low border-b border-outline-variant py-4 px-2 focus:border-primary outline-none transition-colors text-on-surface"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="font-label-sm uppercase tracking-wider text-primary/70">טלפון</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="טלפון" 
                  required 
                  className="w-full bg-surface-container-low border-b border-outline-variant py-4 px-2 focus:border-primary outline-none transition-colors text-on-surface"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="font-label-sm uppercase tracking-wider text-primary/70">אימייל</label>
              <input 
                type="email" 
                id="email" 
                name="אימייל" 
                required 
                className="w-full bg-surface-container-low border-b border-outline-variant py-4 px-2 focus:border-primary outline-none transition-colors text-on-surface"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="font-label-sm uppercase tracking-wider text-primary/70">סיבת הפנייה / הודעה</label>
              <textarea 
                id="message" 
                name="הודעה" 
                rows="5" 
                required 
                className="w-full bg-surface-container-low border-b border-outline-variant py-4 px-2 focus:border-primary outline-none transition-colors text-on-surface resize-none"
              ></textarea>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                type="submit" 
                className="inline-flex items-center gap-4 bg-primary text-on-primary px-12 py-5 font-label-sm uppercase tracking-[0.2em] hover:bg-secondary transition-all"
              >
                שלח הודעה
                <span className="material-symbols-outlined text-lg" data-icon="send">send</span>
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-start space-y-12">
          <div className="space-y-6">
            <h3 className="font-h3 text-2xl text-secondary">פרטי התקשרות</h3>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              לבירורים נוספים, רכישת עבודות או תיאום ביקור בסטודיו, ניתן ליצור קשר גם באופן ישיר.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 flex items-center justify-center bg-surface-container rounded-full text-primary">
                <span className="material-symbols-outlined" data-icon="mail">mail</span>
              </div>
              <div>
                <p className="font-label-xs uppercase tracking-widest text-primary/50">אימייל</p>
                <a href="mailto:leaatir@walla.com" className="font-body-lg text-lg hover:text-primary transition-colors">leaatir@walla.com</a>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-12 h-12 flex items-center justify-center bg-surface-container rounded-full text-primary">
                <span className="material-symbols-outlined" data-icon="call">call</span>
              </div>
              <div>
                <p className="font-label-xs uppercase tracking-widest text-primary/50">טלפון נייד</p>
                <a href="tel:0544911985" className="font-body-lg text-lg hover:text-primary transition-colors" dir="ltr">054-4911985</a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-surface-variant/30">
            <p className="font-label-sm italic text-secondary/60 uppercase tracking-wider">
              "האמנות היא גשר בין אנשים"
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
