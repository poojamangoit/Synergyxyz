module.exports = {
  i18n: {
    locales: [
      "en-th",
      "th",
      "en-ms",
      "ms",
      "en-vi",
      "vi",
      "en-id",
      "id",
      "en-sg",
    ],
    defaultLocale: "en-th",
    localeDetection: false,
    domains: [
      {
        domain: "th.synergyxyz.com",
        defaultLocale: "en-th",
        locales: ["th", "en-th"],
      },
      {
        domain: "my.synergyxyz.com",
        defaultLocale: "en-ms",
        locales: ["ms", "en-ms"],
      },
      {
        domain: "vn.synergyxyz.com",
        defaultLocale: "en-vi",
        locales: ["vi", "en-vi"],
      },
      {
        domain: "id.synergyxyz.com",
        defaultLocale: "en-id",
        locales: ["id", "en-id"],
      },
      {
        domain: "sg.synergyxyz.com",
        defaultLocale: "en-sg",
        locales: ["en-sg"],
      },
    ],
  },
};