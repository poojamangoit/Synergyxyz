import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { SEOProvider } from "@/contexts/SEOContext";
import Layout from "@/components/Layout/Index";
import "@/styles/globals.css";
import "@/styles/layout.css";
import { URL } from "@/config/webConfig";
import { ConfigResponse } from "@/types/layout.type";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LanguageProvider } from "@/contexts/LocaleContext"
import { DefaultSeo } from "next-seo";
import { BASE_DOMAIN_URL } from "@/config/apiConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import Script from "next/script";

const DynamicCustomCursor = dynamic(
  () => import("@/components/Common/CustomCursor"),
  { ssr: false, loading: () => <p></p> }
);
const DynamicLoader = dynamic(
  () => import("@/components/Common/Loader"),
  { ssr: false, loading: () => <p></p> }
);

const App = ({ Component, pageProps }: AppProps) => {
  const [websiteConfig, setWebsiteConfig] = useState<ConfigResponse | null>(
    null
  );
  const router = useRouter();
  const hideHeaderFooter = router.pathname === "/404";

  useEffect(() => {
    const fetchWebsiteConfig = async () => {
      let language = router.locale || process.env.NEXT_PUBLIC_LOCALE;
      if (language && language.includes("-")) {
        language = "en";
      }

      try {
        const response = await fetch(`${URL.websiteConfig}?locale=${language}`);
        if (!response.ok) {
          throw new Error("Failed to fetch website configuration");
        }

        const data = await response.json();
        setWebsiteConfig(data);
      } catch (error) {
        console.error("Error fetching website configuration:", error);
      }
    };

    fetchWebsiteConfig();
  }, [router.asPath, router.locale]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const route = url.split("/").pop() || "home";
      document.body.className = route;
    };

    handleRouteChange(router.pathname); // Initial call on mount

    router.events.on("routeChangeComplete", handleRouteChange); // Listen for route changes
    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange); // Cleanup
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  const logoUrl = websiteConfig?.data.attributes.logo.data.attributes.url;

  if (!websiteConfig) return <DynamicLoader />;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-HRKVGR7TLQ`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HRKVGR7TLQ');
        `}
      </Script>

      <SEOProvider>
        <DefaultSeo
          titleTemplate="%s | SYNERGY XYZ"
          defaultTitle="SYNERGY XYZ - Digital Marketing Agency"
          description="Digital Marketing Agency in Kuala Lumpur, Malaysia. Expert in copywriting services, graphic design, corporate video production, seo services & social media management."
          openGraph={{
            type: "website",
            locale: "en_US",
            url: `${BASE_DOMAIN_URL}`,
            siteName: "SYNERGY XYZ",
            images: [
              {
                url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}${logoUrl}`,
                width: 1200,
                height: 630,
                alt: "SYNERGY XYZ Logo",
              },
            ],
          }}
          twitter={{
            handle: "@synergyxyz",
            site: "@synergyxyz",
            cardType: "summary_large_image",
          }}
        />
        <LanguageProvider>
          <Layout
            websiteConfig={websiteConfig}
            hideHeaderFooter={hideHeaderFooter}
          >
            <Component {...pageProps} websiteConfig={websiteConfig} />
            <DynamicCustomCursor />
            <ToastContainer />
          </Layout>
        </LanguageProvider>
      </SEOProvider>
    </>
  );
};

export default appWithTranslation(App);