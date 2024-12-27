/**
 * Provides a React context for managing SEO data (title, description, keywords) across the application.
 *
 * The `SEOProvider` component wraps the application and provides the `seoData` and `setSEOData` values to its children through the `SEOContext`.
 * The `useSEO` hook can be used by child components to access the SEO data and update it as needed.
 */
import React, { createContext, useContext, useState } from "react";

interface SEOData {
  title: string;
  description: string;
  keywords: string;
}

interface SEOContextType {
  seoData: SEOData;
  setSEOData: (data: SEOData) => void;
}

const SEOContext = createContext<SEOContextType | undefined>(undefined);

export const SEOProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [seoData, setSEOData] = useState<SEOData>({
    title: "",
    description: "",
    keywords: "",
  });

  return (
    <SEOContext.Provider value={{ seoData, setSEOData }}>
      {children}
    </SEOContext.Provider>
  );
};

export const useSEO = () => {
  const context = useContext(SEOContext);
  if (!context) {
    throw new Error("useSEO must be used within a SEOProvider");
  }

  return context;
};
