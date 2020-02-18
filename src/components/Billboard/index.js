/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useState } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { H5, Label3 } from 'baseui/typography';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

// Styled Components
import { Container, Header, Body } from './styled';

const query = graphql`
  query BillboardMovies {
    estrenos {
      movies {
        id
        slug
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

  const handlePosterClick = (movie) => {
    trackCustomEvent({ category: 'Home - Poster', action: 'click', value: movie.title });
  };

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
          <Link key={movie.id} to={`/peliculas/${movie.slug}`} onClick={() => handlePosterClick(movie)}>
            <figure
              className={hoveredMovieId === '' ? '' : hoveredMovieId === movie.id ? 'focus' : 'blur'}
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
          </Link>
        ))}
      </Body>
    </Container>
  );
};

export default Billboard;
