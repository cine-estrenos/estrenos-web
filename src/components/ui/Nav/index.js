import React from 'react';

import { navigate, graphql, useStaticQuery } from 'gatsby';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

import { TYPE } from 'baseui/select';
import { H1, Label2 } from 'baseui/typography';

// Components
import Select from 'components/ui/Select';
import Avatar from 'components/ui/Avatar';

// Styled Components
import { Container } from './styled';
import { Link } from 'components/styled/Link';

// Hooks
import { useUser, useSession } from 'session/hooks';

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
  // Gatsby hooks
  const {
    estrenos: { movies },
  } = useStaticQuery(query);

  // Custom hooks
  const user = useUser();
  const { signIn, signOut } = useSession();

  // Handlers
  const handleSelectChange = ({ value }) => {
    trackCustomEvent({ category: 'Nav - Movie Dropdown', action: 'click', value: value[0].title });
    navigate(`/peliculas/${value[0].slug}`);
  };

  return (
    <Container>
      <H1 role="presentation" onClick={handleToggleDarkMode}>
        Estrenos
      </H1>

      <div className="links-search">
        <Label2>
          <Link to="/">Inicio</Link>
        </Label2>
      </div>

      <div className="user-actions">
        <Select
          labelKey="title"
          maxDropdownHeight="180px"
          options={movies}
          placeholder="Busca por película"
          type={TYPE.search}
          valueKey="slug"
          onChange={handleSelectChange}
        />

        {user ? (
          <Avatar alt="Foto de perfíl del usuario" src={user.photoURL} onClick={signOut} />
        ) : (
          <span onClick={signIn}>Login</span>
        )}
      </div>
    </Container>
  );
};

export default Nav;
