/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useState } from 'react';
import { navigate, graphql, useStaticQuery } from 'gatsby';
import { H5, Label3 } from 'baseui/typography';

// Styled Components
import { Container, Header, Body } from './styled';

const query = graphql`
  query BillboardMovies {
    estrenos {
      movies {
        id
        title
        poster
        cast {
          directors
        }
      }
    }
  }
`;

const Billboard = () => {
  const {
    estrenos: { movies },
  } = useStaticQuery(query);
  const [hoveredMovieId, setHoveredMovieId] = useState('');

  return (
    <Container>
      <Header>
        <div className="cinema-container">
          <H5 className="title">En cartelera</H5>
        </div>

        <div className="filters-container">
          <Label3>Filtrar por</Label3>
        </div>
      </Header>

      <Body>
        {movies.map((movie) => (
          <figure
            key={movie.id}
            className={hoveredMovieId === '' ? '' : hoveredMovieId === movie.id ? 'focus' : 'blur'}
            onClick={() => navigate(`/peliculas/${movie.id}`)}
            onMouseEnter={() => setHoveredMovieId(movie.id)}
            onMouseLeave={() => setHoveredMovieId('')}
          >
            <div>
              <img alt={movie.title} src={movie.poster} />
            </div>
            <figcaption>
              <Label3>{movie.title}</Label3>
            </figcaption>
          </figure>
        ))}
      </Body>
    </Container>
  );
};

export default Billboard;
