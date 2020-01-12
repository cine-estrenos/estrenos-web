import React from 'react';

import { graphql, Link } from 'gatsby';
import { H2, Label2 } from 'baseui/typography';

// Styled Components
import { GoBack } from './styled';

// Components
import SEO from 'components/ui/Seo';
import Layout from 'components/ui/Layout';
import ChevronLeft from 'components/ui/Icons/ChevronLeft';

export const query = graphql`
  query($id: String!) {
    estrenos {
      movie(id: $id) {
        id
        title
      }
    }
  }
`;

const Movie = ({ data: { estrenos } }) => {
  const { movie } = estrenos;

  return (
    <Layout>
      <SEO title={movie.title} />
      <Link to="/">
        <GoBack>
          <ChevronLeft />
          <Label2>Volver a todas las películas</Label2>
        </GoBack>
      </Link>

      <H2>{movie.title}</H2>
    </Layout>
  );
};

export default Movie;
