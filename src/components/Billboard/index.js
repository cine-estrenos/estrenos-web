/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useState } from 'react';
import { navigate } from 'gatsby';
import nanoid from 'nanoid';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { H5, Label3 } from 'baseui/typography';

// Styled Components
import { Container, Header, Body } from './styled';

// Components
import { Skeleton } from 'components/ui/Skeletons';
import ScrollableSelect from 'components/ui/ScrollableSelect';

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

const Loader = ({ isLoading }) => (
  <Container>
    <Header>
      <div className="cinema-container">
        <H5 className="title">En cartelera</H5>
        <ScrollableSelect disabled isLoading={isLoading} placeholder="Selecciona tu cine" />
      </div>

      <div className="filters-container">
        <Label3>Filtrar por:</Label3>
      </div>
    </Header>

    <Body>
      {Array.from({ length: 18 }, () => (
        <div className="container-skeleton" key={nanoid()}>
          <Skeleton className="movie-skeleton" ariaLabel="Cargando poster..." />
          <Skeleton className="title-skeleton" ariaLabel="Cargando título..." />
        </div>
      ))}
    </Body>
  </Container>
);

const Billboard = () => {
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
            valueKey="name"
            value={selectedCinema}
            options={options}
            onChange={handleChangeCinema}
            placeholder="Selecciona tu cine"
          />
        </div>

        <div className="filters-container">
          <Label3>Filtrar por</Label3>
        </div>
      </Header>

      <Body>
        {movies.map((movie) => (
          <figure key={movie.id} onClick={() => navigate(`/peliculas/${movie.id}`)}>
            <div>
              <img src={movie.poster} alt={movie.title} />
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