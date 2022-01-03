module.exports = {
  pathPrefix: '/blood-donate-calculator',
  siteMetadata: {
    siteUrl: 'https://himanshupatil.dev',
    title: 'Blood Donation Calculator',
    description: 'A simple blood donation calculator',
    image: '/images/icon.png',
    twitterUsername: '@mehimanshupatil',
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
        name: `Blood Donation Calculator`,
        short_name: `Blood Donation Calculator`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#e6322f`,
        display: `standalone`,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-offline`,
    },
  ],
};
