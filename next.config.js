
const { i18n } = require("./next-i18next.config.js");
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.NEXT_PUBLIC_ANALYZE === "true",
});

const DEPLOY_DOMAIN = process.env.NEXT_PUBLIC_DEPLOY_DOMAIN;

const domainConfig =
  i18n.domains.find((d) => d.domain === DEPLOY_DOMAIN) || i18n.domains[0];

  module.exports = withPlugins([[withBundleAnalyzer]],{
  distDir: "build", // Replace 'build' with your desired path
  i18n: {
    ...i18n,
    defaultLocale: domainConfig.defaultLocale,
    locales: domainConfig.locales,
  },
  reactStrictMode: true,
  images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "cdn.synergyxyz.com",
            port: "",
            pathname: "/**",
          },
        ],
      },
});
