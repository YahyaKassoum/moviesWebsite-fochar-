import React, { 
  createContext, 
  useState, 
  useContext, 
  ReactNode 
} from 'react';

// Supported languages
export const LANGUAGES = {
  ENGLISH: 'en',
  ARABIC: 'ar',
  SPANISH: 'es',
  FRENCH: 'fr',
  GERMAN: 'de'
} as const;

type Language = keyof typeof LANGUAGES;

// Translation Context Type
interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (text?: string) => Promise<string>;
}

// Create Context with a default value
const TranslationContext = createContext<TranslationContextType>({
  language: 'en',
  setLanguage: () => {},
  translate: async (text) => text || ''
});

// Translation Provider Component
export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Simple mock translation (replace with actual translation service)
  const translate = async (text?: string): Promise<string> => {
    if (!text || language === 'en') return text;

    // Mock translation logic
    const translations: Record<Language, (text: string) => string> = {
      en: (t) => t,
      ar: (t) => `[AR] ${t}`,
      es: (t) => `[ES] ${t}`,
      fr: (t) => `[FR] ${t}`,
      de: (t) => `[DE] ${t}`
    };

    return translations[language](text);
  };

  return (
    <TranslationContext.Provider value={{ 
      language, 
      setLanguage, 
      translate 
    }}>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </TranslationContext.Provider>
  );
};

// Custom hook for translation
export const useTranslation = () => {
  return useContext(TranslationContext);
};

// Language Selector Component
export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center space-x-2 bg-gray-800 p-2 rounded-lg">
      {Object.entries(LANGUAGES).map(([key, code]) => (
        <button 
          key={code}
          onClick={() => setLanguage(code as Language)}
          className={`px-3 py-1 rounded text-sm ${
            language === code 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {key}
        </button>
      ))}
    </div>
  );
};

export default TranslationProvider;