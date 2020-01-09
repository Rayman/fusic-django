module.exports = {
  siteMetadata: {
    title: `Fusic`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/radios/*`] },
    },
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      options: {
        disable: !process.env.ANALYSE_BUNDLE,
      },
    },
  ],
};
