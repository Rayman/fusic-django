module.exports = {
  siteMetadata: {
    title: `Fusic`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/radios/*`] },
    },
  ],
};
