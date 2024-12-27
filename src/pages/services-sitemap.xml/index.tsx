/**
 * Generates the sitemap XML for the website, including the home page and all service pages.
 *
 * This function is executed on the server-side during build time to generate the sitemap XML file.
 * It fetches the necessary data from the API, constructs the sitemap fields, and returns the generated sitemap.
 *
 * @param {GetServerSideProps} ctx - The Next.js server-side props context.
 * @returns {Promise<{ props: {} }>} - An empty props object, as the sitemap is generated and written directly to the response.
 */
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { API, BASE_DOMAIN_URL } from '@/config/apiConfig';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const [homeResponse, servicesResponse] = await Promise.all([
    fetch(`${API.homeAPI}?populate=*`),
    fetch(`${API.servicesAPI}?populate=*`)
  ]);

  const [homeData, servicesData] = await Promise.all([
    homeResponse.json(),
    servicesResponse.json()
  ]);
  const homeFields: ISitemapField[] = [
    {
      loc: `${BASE_DOMAIN_URL}`,
      lastmod: new Date(homeData.data.attributes.updatedAt).toISOString(),
    }
  ];
  
  const serviceFields: ISitemapField[] = servicesData.data.map((service:any) => ({
    loc: `${BASE_DOMAIN_URL}${service.attributes.slug}`, 
    lastmod: new Date(service.attributes.updatedAt).toISOString(),
  }));
  
  const fields = [...homeFields, ...serviceFields];

  // Generate the sitemap XML
  const sitemap = await getServerSideSitemap(fields, ctx);

  // Convert the sitemap to a string
  const sitemapString = await sitemap.text();

  ctx.res.setHeader('Content-Type', 'application/xml');
  ctx.res.write(sitemapString);
  ctx.res.end();

  return {
    props: {},
  };
};

export default function Sitemap() {}
