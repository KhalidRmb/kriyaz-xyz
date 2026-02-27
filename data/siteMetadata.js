/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'kriyaz',
  author: 'Khalid Riyaz',
  headerTitle: 'kriyaz',
  description: 'Writing on AI, technology, and ideas worth thinking about.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://kriyaz.xyz',
  siteRepo: 'https://github.com/kriyaz/kriyaz-xyz',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  email: 'hi@kriyaz.xyz',
  github: 'https://github.com/kriyaz',
  x: 'https://twitter.com/kriyaz',
  locale: 'en-US',
  stickyNav: false,
  analytics: {
    // Uncomment and add your Plausible domain when ready:
    // plausibleAnalytics: {
    //   plausibleDataDomain: 'kriyaz.xyz',
    // },
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata
