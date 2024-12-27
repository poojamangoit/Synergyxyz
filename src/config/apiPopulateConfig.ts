/**
 * Configuration object for API populate parameters.
 * This object defines the populate parameters for various API endpoints in the application.
 */
export const API_POPULATE = {
  // layout of application
  websiteConfig:
    "populate=socialMediaLinks,nav,navButton,footer.buttons,footer.pageLinks,logo",

  // home page
  homeAPI:
    "populate[banner][populate]=image,backImage,video&populate[ourStory][populate]=videos,buttons&populate[ourMethod][populate]=image,buttons,video&populate[ourExpertise][populate]=buttons&populate[seo][populate]",
  servicesAPI:
    "populate[0]=heading.image,heading.buttons&populate[1]=heading.imageDetail&populate[2]=card&populate[3]=differentiator.differentiator&populate[4]=buttons&populate[5]=seo&populate[6]=coreFeatures.differentiator",
  ourExpertiseService: "populate=body.buttons,backImage,seo",

  // bmap method page
  bmapMethod:
    "populate[0]=advantage.card.image&populate[1]=bmapSolves.differentiator&populate[2]=image&populate[3]=image2&populate[4]=backImage&populate[5]=video&populate[6]=seo",

  // about us page
  aboutUsAPI:
    "populate[0]=image,backImage&populate[1]=body.card,body.image,body.video&populate[2]=seo",

  // contact us page
  contactUsAPI:
    "populate[0]=backImage&populate[1]=social.links&populate[2]=contactInfo&populate[3]=seo",

  //Info page
  termsOfServiceAPI: "populate=*",
  privacyPolicyAPI: "populate=*",
};
