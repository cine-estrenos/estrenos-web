const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const folderPaths = ['pages', 'utils', 'components', 'images'];
const rootImportOptions = folderPaths.reduce(
  (acc, folderPath) => ({
    ...acc,
    [folderPath]: path.join(__dirname, `src/${folderPath}`),
  }),
  {},
);

module.exports = {
  siteMetadata: {
    title: 'Estrenos Web',
    description: '-',
    author: 'Leonardo Galante, Hugo Farji, Gonzalo Pozzo, Juan Gomez',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-use-dark-mode',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-eslint',
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'ESTRENOS',
        fieldName: 'estrenos',
        url: process.env.GATSBY_API_URL,
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: rootImportOptions,
    },
    {
      resolve: 'gatsby-plugin-styletron',
      options: { prefix: '_' },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#FFFFFF',
        theme_color: '#FFFFFF',
        display: 'minimal-ui',
        icon: 'src/images/icon.png',
      },
    },
  ],
};
