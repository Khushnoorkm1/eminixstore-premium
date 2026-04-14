import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        shop: 'Shop',
        collections: 'Collections',
        about: 'About',
        contact: 'Contact',
        blog: 'Journal',
      },
      hero: {
        title: 'Timeless Elegance, Curated for You',
        subtitle: 'Premium products handpicked with care and delivered with trust',
        shopNow: 'Shop Now',
        explore: 'Explore Collections',
      },
      sections: {
        newArrivals: 'New Arrivals',
        featured: 'Featured Masterpieces',
        subscribe: 'Subscribe & Save',
        blog: 'Eminix Journal',
      },
      footer: {
        tagline: 'Timeless Elegance, Curated with Trust',
        shop: 'Shop',
        support: 'Support',
        company: 'Company',
        newsletter: 'Stay Updated',
        rights: 'All Rights Reserved.',
      },
      product: {
        addToCart: 'Add to Cart',
        tryOn: 'Try On with AR',
        reviews: 'Reviews',
        description: 'Description',
        specifications: 'Specifications',
      }
    }
  },
  hi: {
    translation: {
      nav: {
        home: 'होम',
        shop: 'शॉप',
        collections: 'कलेक्शन',
        about: 'हमारे बारे में',
        contact: 'संपर्क',
        blog: 'जर्नल',
      },
      hero: {
        title: 'कालातीत लालित्य, आपके लिए क्यूरेट किया गया',
        subtitle: 'सावधानी से चुने गए और विश्वास के साथ वितरित प्रीमियम उत्पाद',
        shopNow: 'अभी खरीदें',
        explore: 'कलेक्शन देखें',
      },
      sections: {
        newArrivals: 'नया आगमन',
        featured: 'चुनिंदा उत्कृष्ट कृतियाँ',
        subscribe: 'सब्सक्राइब करें और बचाएं',
        blog: 'एमिनिक्स जर्नल',
      },
      footer: {
        tagline: 'कालातीत लालित्य, विश्वास के साथ क्यूरेट किया गया',
        shop: 'शॉप',
        support: 'सहायता',
        company: 'कंपनी',
        newsletter: 'अपडेट रहें',
        rights: 'सर्वाधिकार सुरक्षित।',
      },
      product: {
        addToCart: 'कार्ट में जोड़ें',
        tryOn: 'AR के साथ आजमाएं',
        reviews: 'समीक्षाएं',
        description: 'विवरण',
        specifications: 'विशेषताएं',
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
