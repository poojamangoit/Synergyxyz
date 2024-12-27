/**
 * Renders a Next.js SEO component with structured data for a web page.
 *
 * @param url - The canonical URL of the web page.
 * @param title - The title of the web page.
 * @param description - The description of the web page.
 * @returns A React component that renders the Next.js SEO and WebPageJsonLd components.
 */
import { NextSeo, WebPageJsonLd } from 'next-seo';

interface SchemaOrgProps {
  url: string;
  title: string;
  description: string;
}

const SchemaOrg: React.FC<SchemaOrgProps> = ({ url, title, description }) => (
  <>
    <NextSeo canonical={url} />
    <WebPageJsonLd
      id={url}
      url={url}
      name={title}
      description={description}
    />
  </>
);

export default SchemaOrg;
