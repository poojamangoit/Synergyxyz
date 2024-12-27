/**
 * Defines the base URL and various API endpoints for the application.
 * 
 * The `BASE_URL` is derived from the `NEXT_PUBLIC_DOMAIN_URL` environment variable.
 * 
 * The `URL` object contains the following API endpoints:
 */
export const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN_URL;

export const URL = {
  // layout of application
  websiteConfig: `${BASE_URL}/api/website-configuration`,

  // home page
  homeAPI: `${BASE_URL}/api/home-page`,
  servicesAPI: `${BASE_URL}/api/services-page`,

  // bmap method page
  bmapMethod: `${BASE_URL}/api/bmap-method`,

  // about us page
  aboutUsAPI: `${BASE_URL}/api/about-us`,

  // contact us page
  contactUsAPI: `${BASE_URL}/api/contact-us`,

  //Info page
  privacyPolicyAPI: `${BASE_URL}/api/privacy-and-policy`,
  termsOfServiceAPI: `${BASE_URL}/api/terms-of-service`,
};
