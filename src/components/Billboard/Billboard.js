/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useState } from 'react';
import { navigate } from 'gatsby';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { H5, Label3 } from 'baseui/typography';
import { Flipper, Flipped } from 'react-flip-toolkit';

// Components
import ScrollableSelect from 'components/ui/ScrollableSelect';

// Styled Components
import { Container, Header, Body, Overlay } from './styled';
import Loader from './Loader';

const BILLBOARD_MOVIES = gql`
  query launchList($cinemaId: String) {
    cinemas {
      id
      name
      chain
    }
    movies(cinemaId: $cinemaId) {
      id
      title
      poster
      cast {
        directors
      }
    }
  }
`;

const Billboard = () => {
  const [hoveredMovieId, setHoveredMovieId] = useState('');
  const [selectedCinema, setSelectedCinema] = useState(null);
  const { data, loading: isLoading, error: hasError } = useQuery(BILLBOARD_MOVIES, {
    variables: { cinemaId: selectedCinema !== null ? selectedCinema.id : '' },
  });

  const handleChangeCinema = ({ value }) => setSelectedCinema(value[0]);

  if (hasError) return <div>error...</div>;
  if (isLoading) return <Loader isLoading={isLoading} />;

  const { movies, cinemas } = data;

  const chains = [...new Set(cinemas.map(({ chain }) => chain))];
  const options = chains.reduce(
    (acc, chain) => ({ ...acc, [chain]: cinemas.filter(({ chain: cinemaChain }) => chain === cinemaChain) }),
    {},
  );

  return (
    <Container>
      <Header>
        <div className="cinema-container">
          <H5 className="title">En cartelera</H5>
          <ScrollableSelect
            labelKey="name"
            options={options}
            placeholder="Selecciona tu cine"
            value={selectedCinema}
            valueKey="name"
            onChange={handleChangeCinema}
          />
        </div>

        <div className="filters-container">
          <Label3>Filtrar por</Label3>
        </div>
      </Header>

      <Body>
        <Flipper flipKey={selectedCinema}>
          {movies.map((movie) => (
            <Flipped key={movie.id} flipId={movie.id}>
              <figure
                className={hoveredMovieId === '' ? '' : hoveredMovieId === movie.id ? 'focus' : 'blur'}
                onClick={() => navigate(`/peliculas/${movie.id}`)}
                onMouseEnter={() => setHoveredMovieId(movie.id)}
                onMouseLeave={() => setHoveredMovieId('')}
              >
                <div>
                  <img alt={movie.title} src={movie.poster} />
                  <Overlay />
                </div>
                <figcaption>
                  <Label3>{movie.title}</Label3>
                </figcaption>
              </figure>
            </Flipped>
          ))}
        </Flipper>
      </Body>
    </Container>
  );
};

export default Billboard;
