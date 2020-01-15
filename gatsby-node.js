exports.createPages = async function({ actions, graphql }) {
  try {
    const { data } = await graphql(`
      query {
        estrenos {
          movies {
            id
            slug
          }
        }
      }
    `);

    data.estrenos.movies.forEach((edge) => {
      const { id, slug } = edge;

      actions.createPage({
        context: { id, slug },
        path: `/peliculas/${slug}`,
        component: require.resolve(`./src/templates/Movie/index.js`),
      });
    });
  } catch (error) {
    console.log('Error in static page creation', error);
  }
};
