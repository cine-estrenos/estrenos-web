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
      console.log('TCL: results.errors', results.errors);
    }

    results.data.estrenos.movies.forEach((edge) => {
      const { id, slug } = edge;

      createPage({
        context: { id, slug },
        path: `/peliculas/${slug}`,
        component: require.resolve(`./src/templates/Movie/index.js`),
      });
    });

    createRedirect({ fromPath: '/peliculas', toPath: '/', isPermanent: true });
  } catch (error) {
    console.log('Error in static page creation', error);
  }
};
