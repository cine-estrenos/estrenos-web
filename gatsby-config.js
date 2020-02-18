const path = require('path');
const dotenv = require('dotenv');

// Dotenv
dotenv.config();

// Constants
const folderPaths = ['pages', 'utils', 'components', 'images'];
const authors = ['Leonardo Galante', 'Hugo Farji', 'Gonzalo Pozzo', 'Juan Gomez', 'Antonela Bianculli', 'Rosario'];

const rootImportOptions = folderPaths.reduce(
  (acc, folderPath) => ({
    ...acc,
    [folderPath]: path.join(__dirname, `src/${folderPath}`),
  }),
  {},
);

module.exports = {
  siteMetadata: {
    title: 'Estrenos',
    author: authors.join(', '),
    description: 'Encontrá todos los últimos estrenos y las funciones en todos los cines!',
  },
  plugins: [
    'gatsby-plugin-eslint',
    'gatsby-plugin-netlify',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-use-dark-mode',
    'gatsby-plugin-styled-components',

    // GraphQL Estrenos API
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'ESTRENOS',
        fieldName: 'estrenos',
        url: `${process.env.GATSBY_API_URL}/graphql`,
      },
    },

    // Absolute Imports
    {
      resolve: 'gatsby-plugin-root-import',
      options: rootImportOptions,
    },

    // Styletron used by BaseWeb
    {
      resolve: 'gatsby-plugin-styletron',
      options: { prefix: '_' },
    },

    // Analytics
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GATSBY_ANALYTICS_TRACKING_ID,
      },
    },

    // PWA Manifest
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Estrenos',
        short_name: 'Estrenos',
        start_url: '/',
        background_color: '#FFFFFF',
        theme_color: '#FFFFFF',
        display: 'minimal-ui',
        icon: 'src/images/icon.png',
      },
    },
  ],
};
