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
          cinemas {
            id
            name
            chain
          }
        }
      }
    `);

    if (results.errors) {
      console.error('Result errors in createPage', results.errors);
    }

    results.data.estrenos.movies.forEach((edge) => {
      const { id, slug } = edge;

      createPage({
        path: `/peliculas/${slug}`,
        component: require.resolve(`./src/templates/movie/index.js`),
        context: { id, slug, cinemas: results.data.estrenos.cinemas },
      });
    });

    createRedirect({ fromPath: '/peliculas', toPath: '/', isPermanent: true });
  } catch (error) {
    console.error('Error in static page creation', error);
  }
};
