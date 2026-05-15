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
            <p className="font-body-lg text-body-lg leading-relaxed">
              סיימתי את לימודיי בתל אביב ומיד בחרתי לקחת אחריות על כל העשייה שלי. בראש ובראשונה להיות המבקרת של עצמי, להחליט מהם הנושאים,  סגנון  העבודה, בחרתי בד בבד ללמד כדי לא להיות תלויה במכירת העבודות שלי  למחיה. כך היה ככל השנים , תמיד ציירתי בלי שהתערבו לי בהחלטות. עד היום הצגתי למעלה מ23 תערוכות יחיד ומשותפות.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-surface-variant/30">
            <div>
              <h3 className="font-label-sm uppercase tracking-widest text-primary mb-4">תחומי עיסוק</h3>
              <ul className="space-y-2 font-body-md text-on-surface-variant">
                <li>• ציור במגוון חומרים וטכניקות</li>
                <li>• רישום בפחם ועיפרון</li>
                <li>• עיצוב תפאורות במה</li>
                <li>• פיסול בחימר</li>
                <li>• הוראת אומנות</li>
                <li>• אוצרות תערוכות</li>
                <li>• הוראת השתלמויות למורים לאומנות</li>
              </ul>
            </div>
            <div>
              <h3 className="font-label-sm uppercase tracking-widest text-primary mb-4">השכלה ורקע</h3>
              <p className="font-body-md text-on-surface-variant">
                אני אמנית, מורה לאמנות, אמא לשלושה וסבתא לשמונה. את הכשרתי המקצועית רכשתי בארבע שנות לימוד בבית הספר הגבוה לציור ע"ש מרגושילסקי (קלישר), ובהמשך בהשתלמות באמנות הרנסנס בפירנצה, איטליה. משנת 1975 אני חברה באגודת האמנים הארצית. לאורך השנים הצגתי את עבודותי בלמעלה מ -23 תערוכות יחיד ובתערוכות משותפות בארץ ובגרמניה, ולצד הציור אני עוסקת בעיצוב תפאורות לתיאטרון, פיסול ואוצרות. הוראת האמנות היא שליחות חיים עבורי. מאז 1971 ועד היום אני זוכה ללמד ולשנות חיים דרך יצירה. בנוסף, הרקע המקצועי שלי כולל שני עשורים כמורה לאמנות בחטיבת הביניים "דפנה", הנחיית השתלמויות מורים ברשת אורט, חוגי מבוגרים ואוצרות תערוכות לתלמידיי. מתוך אמונה בכוחה המרפא של האמנות, אני מתנדבת לאורך השנים בהוראת אמנות לקבוצות עם מוגבלויות ובמסגרת ארגון "בני ברית".
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 pt-10 border-t border-surface-variant/30">
        <h2 className="font-h2 text-3xl text-secondary mb-6">למה אתר?</h2>
        <div className="max-w-4xl space-y-4 text-on-surface-variant font-body-lg text-lg leading-relaxed">
          <p>
            מעבר לרצון לתת מידע אודותיך, מעבר לנגישות שאני נותנת לכל העולם לעבודותיי, מעבר לסיבה הרגילה של "אם אין לך אתר אתה לא קיים" גיליתי על עצמי דרך התבוננות לאחור דברים שחידדו לי מה מתאים לי לעשות בהמשך. בזכות בנית אתר, זו פעם שניה, (הראשונה הייתה לפני 10 שנים) הגעתי למסקנה שטובה בכל תחום בחיים, למען עתיד טוב ככל האפשר, כדאי לבדוק מדי פעם מה עשיתי בעבר.
          </p>
          <p>
            מה שלא עשיתי בעבר הוא לתעד, היום בעידן הטלפון זה לא היה קורה, אבל לפני 40- 50 שנים, בזמן של גידול ילדים , עבודה, בלי לוותר על יצירה אישית, בתקופות עומס , היה חשוב לי ליצור בכל זמן שהיה ברשותי ולא ייחסתי חשיבות לתיעוד. מאות עבודות שלא צולמו, בעיקר תערוכות ראשונות, ואם צילמתי לא תמיד פיתחתי את הפילם, נשארתי עם הידיעה על תערוכה שהצגתי לא זכור לי בדיוק אלו עבודות הוצגו בהן, חלקן נמכרו ולא ברשותי, קטעי עיתונות, הזמנות לתערוכות , שחלקן שמרתי. כל אלה מתחברים לאט לאט ומוצאים את מקומם.
          </p>
          <p>
            כמובן שתערוכות גדולות יותר וקרובות יותר בזמן זכורות לי. היה לי רושם למשל שחשבתי שאני עוברת בחדות מעבודה לעבודה , התברר לי הקשר , הרצף, הזרימה בעבודה שלי, גם אם שיניתי גישה, חומר או צורת עבודה.
          </p>
          <p>
            פרספקטיבה של זמן מאפשרת לראות את העשייה במבט ברור יותר, אנאליטי יותר, אני קוראת דברים שכתבתי בעבר על תערוכות ובוחנת האם הם נכונים לי גם היום. דברים שנגעתי בהם בזהירות, לא מספיק באומץ היום אני נוגעת. ועדיין תוהה אם מספיק. עברתי מתקופות יצירה של רישום בשחור לבן ,לצבע , שילבתי ביניהם, התרחקתי מהמציאות, ואז התקרבתי, חזרתי לעבוד בצבע ברמה אחרת.
          </p>
          <p>
            תמיד ידעתי על נטייתי החזקה לרישום, ראיתי עד כמה הרישום הוא בסיס לעבודה שלי, כל הזמן, כולל בצבע.
          </p>
          <blockquote className="border-r-4 border-primary/30 pr-6 py-2 my-8 italic text-2xl text-secondary">
            "בניית אתר הוא ראשית לכל בחינת עצמך."
          </blockquote>
        </div>
      </section>
    </main>
  );
};

export default About;
