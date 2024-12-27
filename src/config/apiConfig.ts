/**
 * This module exports various configuration constants for the API used in the application.
 * 
 * The `BASE_URL` and `BASE_DOMAIN_URL` constants are loaded from environment variables and represent the base URLs for the API and the application domain, respectively.
 * 
 * The `locale` constant is also loaded from an environment variable and represents the default locale for the application.
 * 
 * The `API` object contains various endpoints for different parts of the application, such as the home page, services, BM-P method, about us, contact us, and information pages. Each endpoint is constructed by combining the `BASE_URL` with a specific path.
 */
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const BASE_DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL;
export const locale = process.env.NEXT_PUBLIC_LOCALE

export const API = {
  // layout of application
  websiteConfig: `${BASE_URL}/api/website-configuration`,

  // home page
  homeAPI: `${BASE_URL}/api/home-page`,
  servicesAPI: `${BASE_URL}/api/services`,
  ourExpertiseService: `${BASE_URL}/api/services-page`,

  // bmap method page
  bmapAPI: `${BASE_URL}/api/bm-p-method`,

  // about us page
  aboutUsAPI: `${BASE_URL}/api/about-us`,

  // contact us page
  contactUsAPI: `${BASE_URL}/api/contact-us`,
  contactForm:`${BASE_URL}/api/contact-forms`,

  //Info page
  privacyPolicyAPI: `${BASE_URL}/api/privacy-and-policy`,
  termsOfServiceAPI: `${BASE_URL}/api/terms-of-service`,
};
