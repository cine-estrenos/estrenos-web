const got = require('got');
const path = require('path');
const dotenv = require('dotenv');

// Dotenv
dotenv.config();

// Constants
const { GATSBY_API_URL } = process.env;
const movieTemplate = path.resolve(`src/templates/movie/index.js`);

exports.createPages = async function({ actions, graphql }) {
  const { createPage, createRedirect } = actions;

  try {
    const results = await graphql(`
      query {
        estrenos {
          movies {
            id
            slug
          }
        }
      }
    `);

    if (results.errors) {
      console.error('Result errors in createPage', results.errors);
    }

    const { movies } = results.data.estrenos;
    const cinemas = await got(`${GATSBY_API_URL}/cinemas`).json();

    for await (const edge of movies) {
      const { id, slug } = edge;

      const [movie, shows] = await Promise.all([
        got(`${GATSBY_API_URL}/movies/${id}`).json(),
        got(`${GATSBY_API_URL}/shows/${id}`).json(),
      ]);

      createPage({
        component: movieTemplate,
        path: `/peliculas/${slug}`,
        context: { id, slug, cinemas, movie, shows },
      });
    }

    createRedirect({ fromPath: '/peliculas', toPath: '/', isPermanent: true });
  } catch (error) {
    console.error('Error in static page creation', error);
  }
};
