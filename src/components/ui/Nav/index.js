import React, { useState, useEffect, useContext } from 'react';
import ContentLoader from 'react-content-loader';

// Gatsby
import { FirebaseContext } from 'gatsby-plugin-firebase';
import { navigate, graphql, useStaticQuery, Link } from 'gatsby';

// BaseUI
import { Avatar } from 'baseui/avatar';
import { Button } from 'baseui/button';
import { Select, TYPE } from 'baseui/select';
import { H1, Label2 } from 'baseui/typography';
import { toaster, ToasterContainer, PLACEMENT } from 'baseui/toast';

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

const Nav = ({ handleToggleDarkMode, location }) => {
  const {
    estrenos: { movies },
  } = useStaticQuery(query);
  const firebase = useContext(FirebaseContext);
  const [userLogged, setUserLogged] = useState(null);
  const [isLoadingLogin, setIsLoadingLogin] = useState(true);

  useEffect(() => {
    if (firebase) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user && !userLogged) {
          const { displayName, photoURL, email, uid } = user;
          setUserLogged({ displayName, photoURL, email, uid });
          setIsLoadingLogin(false);
        } else if (!user) setIsLoadingLogin(false);

        if (!user && location.pathname.includes('user')) navigate('/');
      });
    }
  }, [firebase, location.pathname, userLogged]);

  const handleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { displayName, photoURL, email, uid } = result.user;
        setUserLogged({ displayName, photoURL, email, uid });
        setIsLoadingLogin(false);
      })
      .catch(() => toaster.negative('No te pudimos loguear'));
  };

  return (
    <Container>
      <ToasterContainer placement={PLACEMENT.bottomRight}>
        <H1 role="presentation" onClick={handleToggleDarkMode}>
          Estrenos
        </H1>

        <div className="links-search">
          <Link to="/">
            <Label2>Inicio</Label2>
          </Link>

          <Select
            labelKey="title"
            maxDropdownHeight="180px"
            options={movies}
            placeholder="Busca por película"
            type={TYPE.search}
            valueKey="slug"
            onChange={({ value }) => navigate(`/peliculas/${value[0].slug}`)}
          />

          <div className="login">
            {isLoadingLogin ? (
              <ContentLoader ariaLabel="Cargando inicio de sesión" className="loader" />
            ) : userLogged ? (
              <Link to="/user">
                <Avatar name={userLogged.displayName} size="scale1200" src={userLogged.photoURL} />
              </Link>
            ) : (
              <Button onClick={handleLogin}>Login</Button>
            )}
          </div>
        </div>
      </ToasterContainer>
    </Container>
  );
};

export default Nav;
