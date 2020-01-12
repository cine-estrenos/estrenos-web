exports.createPages = async function({ actions, graphql }) {
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
      path: `/peliculas/${slug}`,
      context: { id: id, slug: slug },
      component: require.resolve(`./src/templates/Movie/index.js`),
    });
  });
};
