const path = require('path');
const dotenv = require('dotenv');

// Dotenv
dotenv.config();

// Constants
const {
  NODE_ENV,
  GATSBY_API_URL,
  GATSBY_SENTRY_DSN,
  GATSBY_ANALYTICS_TRACKING_ID,
  GATSBY_FIREBASE_API_KEY,
  GATSBY_FIREBASE_AUTH_DOMAIN,
  GATSBY_FIREBASE_DATABASE_URL,
  GATSBY_FIREBASE_PROJECT_ID,
  GATSBY_FIREBASE_STORAGE_BUCKET,
  GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  GATSBY_FIREBASE_APP_ID,
} = process.env;

const folderPaths = ['pages', 'utils', 'components', 'session', 'images'];
const authors = [
  'Leonardo Galante',
  'Hugo Farji',
  'Gonzalo Pozzo',
  'Juan Gomez',
  'Antonela Bianculli',
  'Rosario Maldonado',
];

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
        url: `${GATSBY_API_URL}/graphql`,
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

    // Firebasee
    {
      resolve: 'gatsby-plugin-firebase',
      options: {
        credentials: {
          apiKey: GATSBY_FIREBASE_API_KEY,
          authDomain: GATSBY_FIREBASE_AUTH_DOMAIN,
          databaseURL: GATSBY_FIREBASE_DATABASE_URL,
          projectId: GATSBY_FIREBASE_PROJECT_ID,
          storageBucket: GATSBY_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: GATSBY_FIREBASE_MESSAGING_SENDER_ID,
          appId: GATSBY_FIREBASE_APP_ID,
        },
      },
    },

    // Analytics
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: GATSBY_ANALYTICS_TRACKING_ID,
      },
    },

    // Sentry Error Logging
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        environment: NODE_ENV,
        dsn: GATSBY_SENTRY_DSN,
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
