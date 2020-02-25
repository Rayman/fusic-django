module.exports = {
  siteMetadata: {
    title: 'Fusic',
    description: 'Realtime Social Music Collaboration',
    author: '@gatsbyjs',
  },
  proxy: [
    {
      prefix: '/api',
      url: 'http://127.0.0.1:8000',
    },
    {
      prefix: '/admin',
      url: 'http://127.0.0.1:8000',
    },
    {
      prefix: '/static',
      url: 'http://127.0.0.1:8000',
    },
  ],
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: { prefixes: ['/radios/*'] },
    },
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      options: {
        disable: !process.env.ANALYSE_BUNDLE,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
};
