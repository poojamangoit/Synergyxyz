/**
 * Provides a React context for managing the application's language.
 * 
 * The `LanguageProvider` component wraps the application and provides the
 * `language` and `setLanguage` values to its descendants via the
 * `LanguageContext`.
 * 
 * The `useLanguage` hook can be used to access the current language and
 * update it within the component tree.
 */

// src/context/LanguageContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextProps {
  language: string;
  setLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en'); // default to 'en' or fetch from env

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};