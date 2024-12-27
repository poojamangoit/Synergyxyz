/**
 * The main layout component for the application.
 *
 * This component renders the header, footer, and main content area of the page.
 * It also sets up the background image and applies the necessary styles.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The main content to be rendered.
 * @param {ConfigResponse | null} props.websiteConfig - The website configuration data.
 * @param {boolean} props.hideHeaderFooter - Whether to hide the header and footer.
 * @returns {JSX.Element} The rendered layout component.
 */
import { ReactNode, useEffect } from "react";
import { useSEO } from "@/contexts/SEOContext";
import Head from "next/head";
import { ConfigResponse } from "@/types/layout.type";
import dynamic from "next/dynamic";

const DynamicNavbar = dynamic(() => import("./Navbar"), {
  ssr: false,
  loading: () => <p></p>,
});
const DynamicFooter = dynamic(() => import("./Footer"), {
  ssr: false,
  loading: () => <p></p>,
});

interface LayoutProps {
  children: ReactNode;
  websiteConfig: ConfigResponse | null;
  hideHeaderFooter: boolean;
}
const Layout: React.FC<LayoutProps> = ({
  children,
  websiteConfig,
  hideHeaderFooter,
}) => {
  const { seoData } = useSEO();
  useEffect(() => {
    const timer = setTimeout(() => {
      const backgroundElement = document.getElementById("background");
      if (backgroundElement) {
        backgroundElement.style.opacity = "1";
      }
    }, 500); // 7500 milliseconds = 7.5 seconds

    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <meta name="title" content={seoData.title} />
        <title>{seoData.title}</title>
      </Head>
      {!hideHeaderFooter && <DynamicNavbar websiteConfig={websiteConfig} />}

      <div className="fixed body-bg-fixed">
        <div id="background" className="background">
          <span>
            <link
              rel="preload"
              as="image"
              href="/assets/images/Rectangle.webp"
            />
            <img
              src="/assets/images/Rectangle.webp"
              alt="Background supporting"
            />
          </span>
          <span>
            <link
              rel="preload"
              as="image"
              href="/assets/images/Rectangle_2.webp"
            />
            <img
              src="/assets/images/Rectangle_2.webp"
              alt="Background supporting"
            />
          </span>
        </div>
      </div>
      <main className="relative top-[31px] main-div">{children}</main>
      {/* <CookieConsentBanner /> */}
      {!hideHeaderFooter && <DynamicFooter websiteConfig={websiteConfig} />}
    </>
  );
};

export default Layout;
