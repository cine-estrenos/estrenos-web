import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { Table } from 'baseui/table';
import { H2 } from 'baseui/typography';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

// Components
import ScrollableSelect from 'components/ui/ScrollableSelect';

// Styled Components
import { Header, TableContainer } from './styled';

// Components
import SEO from 'components/ui/Seo';
import Layout from 'components/ui/Layout';
import BackTo from 'components/ui/BackTo';

export const query = graphql`
  query($id: String!) {
    estrenos {
      movie(id: $id) {
        id
        title
      }
      cinemas {
        id
        name
        chain
      }
      shows(movieId: $id) {
        cinemaId
        time
        date
        format
        version
      }
    }
  }
`;

const Movie = ({ data: { estrenos } }) => {
  const { movie, cinemas, shows } = estrenos;
  const [showsToFilter, setShowsToFilter] = useState(shows);
  const [selectedCinemaId, setSelectedCinemaId] = useState(null);

  useEffect(() => {
    if (!selectedCinemaId) return;
    setShowsToFilter(shows.filter(({ cinemaId }) => cinemaId === selectedCinemaId[0].id));
  }, [selectedCinemaId, shows]);

  // Handlers
  const handleChangeCinema = ({ value }) => {
    trackCustomEvent({
      action: 'click',
      category: 'Movie - Cinema Dropdown',
      value: `${value[0].chain}${value[0].name}`,
    });

    setSelectedCinemaId(value);
  };

  // Helpers
  const findCinema = (id) => cinemas.find(({ id: cinemaId }) => cinemaId === id);

  // Select Options
  const chains = [...new Set(cinemas.map(({ chain }) => chain))];
  const options = chains.reduce(
    (acc, chain) => ({
      ...acc,
      [chain]: cinemas
        .filter(({ chain: cinemaChain }) => chain === cinemaChain)
        .filter((cinema) => shows.some(({ cinemaId }) => cinemaId === cinema.id)),
    }),
    {},
  );

  // Table constants
  const DATA = showsToFilter.map((show) => {
    const cinema = findCinema(show.cinemaId);
    return [cinema.chain, cinema.name, show.date, show.time, show.format, show.version];
  });

  const COLUMNS = ['Cadena', 'Cine', 'Fecha', 'Hora', 'Formato', 'Version'];

  return (
    <Layout>
      <SEO title={movie.title} />
      <BackTo route="/">Volver a todas las películas</BackTo>

      <H2>{movie.title}</H2>

      <Header>
        <ScrollableSelect
          labelKey="name"
          options={options}
          placeholder="Selecciona tu cine"
          value={selectedCinemaId}
          valueKey="id"
          onChange={handleChangeCinema}
        />
      </Header>

      <TableContainer>
        <Table columns={COLUMNS} data={DATA} />
      </TableContainer>
    </Layout>
  );
};

export default Movie;
