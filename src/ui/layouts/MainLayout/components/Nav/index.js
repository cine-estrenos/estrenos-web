import React from 'react';

// Gatsby
import { navigate, graphql, useStaticQuery } from 'gatsby';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

// Antd
import { Select, Typography } from 'antd';

// Styled Components
import { Container } from './styled';

// Components
import Avatar from 'ui/layouts/MainLayout/components/Avatar';

// Hooks
import { useUser, useSession } from 'modules/session/hooks';

// Queries
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

// Constants
const { Option } = Select;
const { Title } = Typography;

const Nav = () => {
  // Gatsby hooks
  const {
    estrenos: { movies },
  } = useStaticQuery(query);

  // Custom hooks
  const user = useUser();
  const { signIn, signOut } = useSession();

  // Handlers
  const handleSelectChange = (slug) => {
    trackCustomEvent({ category: 'Nav - Movie Dropdown', action: 'click', value: slug });
    navigate(`/peliculas/${slug}`);
  };

  return (
    <Container>
      <Title level={1} role="presentation">
        Estrenos
      </Title>

      <div className="user-actions">
        <Select listHeight={180} placeholder="Busca por película" size="large" onChange={handleSelectChange}>
          {movies.map(({ slug, title }) => (
            <Option key={slug} value={slug}>
              {title}
            </Option>
          ))}
        </Select>

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
