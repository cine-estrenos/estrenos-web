import React from 'react';
import { navigate, graphql, useStaticQuery } from 'gatsby';
import { Select, TYPE } from 'baseui/select';
import { H1, Label2 } from 'baseui/typography';

// Styled Components
import { Container } from './styled';

const query = graphql`
  query DropdownMovies {
    estrenos {
      movies {
        title
        slug
      }
    }
  }
`;

const Nav = ({ handleToggleDarkMode }) => {
  const {
    estrenos: { movies },
  } = useStaticQuery(query);

  return (
    <Container>
      <H1 role="presentation" onClick={handleToggleDarkMode}>
        Estrenos
      </H1>

      <div className="links-search">
        <ul>
          <li>
            <Label2>Home</Label2>
          </li>
          <li>
            <Label2>Películas</Label2>
          </li>
          <li>
            <Label2>Cine</Label2>
          </li>
          <li>
            <Label2>Contacto</Label2>
          </li>
        </ul>

        <Select
          labelKey="title"
          maxDropdownHeight="180px"
          options={movies}
          placeholder="Busca por película"
          type={TYPE.search}
          valueKey="slug"
          onChange={({ value }) => navigate(`/peliculas/${value[0].slug}`)}
        />
      </div>
    </Container>
  );
};

export default Nav;
