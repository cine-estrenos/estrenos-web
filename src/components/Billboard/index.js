/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useState } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { H5, Label3 } from 'baseui/typography';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import delve from 'dlv';

// Components
import Select from 'components/ui/Select';

// Styled Components
import { Container, Header, Body } from './styled';

// Selectors
import { getMoviesByGenres, getAvailableGenres, filterMoviesByGenre } from './selectors';

// Query
const query = graphql`
  query BillboardMovies {
    estrenos {
      movies {
        id
        slug
        title
        poster
        genres {
          value
        }
      }
    }
  }
`;

const Billboard = () => {
  // Gatsby hooks
  const { estrenos } = useStaticQuery(query);

  // React hooks
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [hoveredMovieId, setHoveredMovieId] = useState('');

  // Constants
  const { movies } = estrenos;
  const genre = delve(selectedGenre, '0.genre', '');
  const moviesByGenre = getMoviesByGenres(movies);
  const availableGenres = getAvailableGenres(moviesByGenre);
  const filteredMoviesByGenre = filterMoviesByGenre(movies, genre);

  // Handlers
  const handleChangeCinema = ({ value }) => {
    setSelectedGenre(value);
  };

  const handlePosterClick = (movieTitle) => {
    trackCustomEvent({ category: 'Home - Poster', action: 'click', value: movieTitle });
  };

  return (
    <Container>
      <Header>
        <div className="cinema-container">
          <H5 className="title">En cartelera</H5>
        </div>

        <div className="filters-container">
          <Select
            labelKey="genre"
            options={availableGenres}
            placeholder={'Filtrar por género'}
            searchable={false}
            value={selectedGenre}
            valueKey="genre"
            onChange={handleChangeCinema}
          />
        </div>
      </Header>

      <Body>
        <Flipper flipKey={genre} spring="veryGentle">
          {filteredMoviesByGenre.map(({ id, slug, title, poster }) => (
            <Flipped key={id} flipId={id}>
              <Link to={`/peliculas/${slug}`} onClick={() => handlePosterClick(title)}>
                <figure
                  className={hoveredMovieId === '' ? '' : hoveredMovieId === id ? 'focus' : 'blur'}
                  onMouseEnter={() => setHoveredMovieId(id)}
                  onMouseLeave={() => setHoveredMovieId('')}
                >
                  <div>
                    <img alt={title} src={poster} />
                  </div>
                  <figcaption>
                    <Label3>{title}</Label3>
                  </figcaption>
                </figure>
              </Link>
            </Flipped>
          ))}
        </Flipper>
      </Body>
    </Container>
  );
};

export default Billboard;
