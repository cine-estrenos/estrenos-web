const path = require('path');
const dotenv = require('dotenv');

const { getFirebaseCredentials } = require('./src/utils/firebase/credentials-node');

// Dotenv
dotenv.config();

// Firebase
const firebaseCredentials = getFirebaseCredentials();

// Environment
const { NODE_ENV, GATSBY_API_URL, GATSBY_SENTRY_DSN, GATSBY_ANALYTICS_TRACKING_ID } = process.env;

//Authors
const authors = [
  'Hugo Farji',
  'Juan Gomez',
  'Gonzalo Pozzo',
  'Leonardo Galante',
  'Rosario Maldonado',
  'Antonela Bianculli',
];

// Absolute Import
const folderPaths = ['pages', 'utils', 'components', 'modules', 'ui', 'images'];
const rootImportOptions = folderPaths.reduce(
  (acc, folderPath) => ({ ...acc, [folderPath]: path.join(__dirname, `src/${folderPath}`) }),
  {},
);

// Metadata
const siteMetadata = {
  title: 'Estrenos',
  author: authors.join(', '),
  description: 'Encontrá todos los últimos estrenos y las funciones en todos los cines!',
};

// Plugins
const plugins = [
  'gatsby-plugin-antd',
  'gatsby-plugin-eslint',
  'gatsby-plugin-netlify',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-styled-components',

  // GraphQL Estrenos API
  {
    resolve: 'gatsby-source-graphql',
    options: {
      typeName: 'ESTRENOS',
      fieldName: 'estrenos',
      url: `${GATSBY_API_URL}/graphql`,
    },
  },

  // Absolute Imports
  {
    resolve: 'gatsby-plugin-root-import',
    options: rootImportOptions,
  },

  // Firebasee
  {
    resolve: 'gatsby-plugin-firebase',
    options: { credentials: firebaseCredentials },
  },

  // Analytics
  {
    resolve: 'gatsby-plugin-google-analytics',
    options: { trackingId: GATSBY_ANALYTICS_TRACKING_ID },
  },

  // Sentry Error Logging
  {
    resolve: 'gatsby-plugin-sentry',
    options: { environment: NODE_ENV, dsn: GATSBY_SENTRY_DSN },
  },

  // PWA Manifest
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: 'Estrenos',
      start_url: '/',
      display: 'minimal-ui',
      short_name: 'Estrenos',
      theme_color: '#FFFFFF',
      background_color: '#FFFFFF',
      icon: 'src/images/icon.png',
    },
  },
];

module.exports = { siteMetadata, plugins };
