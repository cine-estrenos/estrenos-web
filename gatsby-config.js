const path = require('path')

const folderPaths = ['pages', 'utils', 'components', 'images']

const rootImportOptions = folderPaths.reduce(
  (acc, folderPath) => ({ ...acc, [folderPath]: path.join(__dirname, `src/${folderPath}`) }),
  {}
)

module.exports = {
  siteMetadata: {
    title: 'Estrenos Web',
    description: '-',
    author: 'cine-estrenos team',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-use-dark-mode',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-root-import',
      options: rootImportOptions,
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
  ],
}
