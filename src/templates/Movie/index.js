import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';

import { H2, Label2, Paragraph2 } from 'baseui/typography';
import { StyledTable, StyledBody, StyledCell } from 'baseui/table';

import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

// Styled Components
import {
  Container,
  Poster,
  Header,
  Body,
  Footer,
  TableContainer,
  TableHead,
  TableRow,
  HeaderCell,
  VersionCell,
  VersionHeadCell,
  TimeHeadCell,
  TimeCell,
  FormatHeadCell,
  FormatCell,
} from './styled';

// Components
import SEO from 'components/ui/Seo';
import Layout from 'components/ui/Layout';
import BackTo from 'components/ui/BackTo';
import Select from 'components/ui/Select';
import Button from 'components/ui/Button';
import DatePicker from 'components/ui/DatePicker';
import GenreRating from 'components/ui/GenreRating';

// Utils
import { parseDate } from 'utils';

// Selectors
import { getChainIds, getAvailableCinemas, getChainsNames, getAvailableBranches } from './selectors';

// Setup dayjs locale
dayjs.locale('es');

const Movie = ({ data: { estrenos }, pageContext: { cinemas } }) => {
  const { movie, shows } = estrenos;

  const [selectedCinema, setSelectedCinema] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [includeDates, setIncludeDates] = useState([]);

  const [selectedShowId, setSelectedShowId] = useState(null);
  const [selectedShowLink, setSelectedShowLink] = useState(null);
  const [selectedShowSeats, setSelectedShowSeats] = useState(null);

  const [showsToFilter, setShowsToFilter] = useState(shows);

  // Constants
  const chainIds = getChainIds(cinemas);
  const availableCinemas = getAvailableCinemas(cinemas, shows);

  const chains = getChainsNames(availableCinemas);
  const branches = getAvailableBranches(selectedCinema, availableCinemas);

  const DATA = showsToFilter.map((show) => [
    parseDate(show.date),
    show.version,
    show.time,
    show.format,
    show.link,
    show.id,
    show.seats,
  ]);

  // Effects
  useEffect(() => {
    if (selectedCinema.length && !selectedBranch.length) {
      const selectedChain = selectedCinema[0].chain;
      const selectedChainIds = chainIds[selectedChain];

      const filteredShows = shows.filter(({ cinemaId }) => selectedChainIds.includes(cinemaId));
      setShowsToFilter(filteredShows);
    }

    if (selectedBranch.length) {
      const filteredShows = shows.filter(({ cinemaId }) => cinemaId === selectedBranch[0].id);
      const includeDates = filteredShows.map(({ date }) => dayjs(date).toDate());

      setIncludeDates(includeDates);
      setShowsToFilter(filteredShows);
    }

    if (selectedDate) {
      setShowsToFilter((prevShows) =>
        prevShows.filter(({ date }) => date === dayjs(selectedDate).format('YYYY-MM-DD')),
      );
    }
  }, [selectedCinema, selectedBranch, selectedDate]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!selectedDate || !selectedCinema.length || !selectedBranch.length) {
      setSelectedShowId(null);
      setSelectedShowLink(null);
      setSelectedShowSeats(null);
    }

    if (!selectedCinema.length) {
      setShowsToFilter(shows);
    }
  }, [selectedDate, selectedBranch, selectedCinema]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handlers
  const handleChangeCinema = ({ value }) => {
    setSelectedBranch([]);
    setSelectedCinema(value);
  };

  const handleChangeBranch = ({ value }) => setSelectedBranch(value);

  const handleChangeDate = ({ date }) => setSelectedDate(date);

  const handleClickRow = (row) => {
    if (!selectedBranch.length) return;

    setSelectedShowLink(row[4]);
    setSelectedShowId(row[5]);
    setSelectedShowSeats(row[6]);
  };

  const handleClickBuyTicket = () => {
    trackCustomEvent({
      action: 'click',
      category: 'Movie - Ticket buy',
      value: `Cinema: ${selectedCinema[0].name} - Branch: ${selectedBranch[0].name} - Show: ${selectedShowId}`,
    });

    window.open(selectedShowLink);
  };

  return (
    <Layout>
      <SEO title={movie.title} />
      <BackTo route="/">Volver a todas las películas</BackTo>

      <Container>
        <div>
          <Poster src={movie.poster.replace('300', '500')} />
        </div>

        <div>
          <div className="main">
            <H2>{movie.title}</H2>
            <GenreRating genres={movie.genres} votes={movie.votes} />
            <Paragraph2 className="description">{movie.description}</Paragraph2>

            <div className="info">
              <div>
                <Label2 className="info-title">Clasificación</Label2>
                <Label2 className="info-value">{movie.minAge}</Label2>
              </div>
              <div>
                <Label2 className="info-title">Puntuación</Label2>
                <Label2 className="info-value">{movie.votes} / 10</Label2>
              </div>

              <div>
                <Label2 className="info-title">Duración</Label2>
                <Label2 className="info-value">{movie.length.replace('m', ' minutos')}</Label2>
              </div>

              <div>
                <Label2 className="info-title">Director</Label2>
                <Label2 className="info-value">{movie.cast.directors.join(', ')}</Label2>
              </div>

              <div className="actors">
                <Label2 className="info-title">Elenco</Label2>
                <Label2 className="info-value">{movie.cast.actors.join(', ')}</Label2>
              </div>
            </div>
          </div>

          <Header>
            <div>
              <Label2 className="label">1. Selecciona tu cine</Label2>
              <Select
                labelKey="chain"
                options={chains}
                placeholder={chains[0].chain}
                value={selectedCinema}
                valueKey="chain"
                onChange={handleChangeCinema}
              />
            </div>

            <div>
              <Label2 className="label">2. Selecciona tu sucursal</Label2>
              <Select
                disabled={!Boolean(selectedCinema.length)}
                labelKey="name"
                options={branches}
                placeholder={(branches[0] && branches[0].name) || 'Belgrano'}
                value={selectedBranch}
                valueKey="id"
                onChange={handleChangeBranch}
              />
            </div>

            <div>
              <Label2 className="label">3. Selecciona tu día</Label2>
              <DatePicker
                clearable
                disabled={!Boolean(selectedBranch.length)}
                includeDates={includeDates}
                value={selectedDate}
                onChange={handleChangeDate}
              />
            </div>
          </Header>

          <Body>
            <Label2 className="label">4. Selecciona tu función</Label2>
            <TableContainer>
              <StyledTable>
                <TableHead>
                  <HeaderCell>Fecha</HeaderCell>
                  <VersionHeadCell>Idioma</VersionHeadCell>
                  <TimeHeadCell>Horario</TimeHeadCell>
                  <FormatHeadCell>Formato</FormatHeadCell>
                </TableHead>

                <StyledBody>
                  {DATA.map((row, index) => (
                    <TableRow
                      key={index}
                      selectable={Boolean(selectedBranch.length)}
                      selected={selectedShowId === row[5]}
                      onClick={() => handleClickRow(row)}
                    >
                      <StyledCell>{row[0]}</StyledCell>
                      <VersionCell>{row[1]}</VersionCell>
                      <TimeCell>{row[2]}</TimeCell>
                      <FormatCell>{row[3]}</FormatCell>
                    </TableRow>
                  ))}
                </StyledBody>
              </StyledTable>
            </TableContainer>
          </Body>

          <Footer>
            <Button disabled={!Boolean(selectedShowLink)} onClick={handleClickBuyTicket}>
              Comprar entradas
            </Button>

            {selectedShowSeats && (
              <Label2 className="label">
                Asientos disponibles: {selectedShowSeats.available} / {selectedShowSeats.total}
              </Label2>
            )}
          </Footer>
        </div>
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    estrenos {
      movie(id: $id) {
        id
        title
        minAge
        votes
        length
        poster
        description
        cast {
          actors
          directors
        }
        genres {
          emoji
          value
        }
      }
      shows(movieId: $id) {
        id
        time
        date
        link
        format
        version
        cinemaId
        seats {
          total
          available
        }
      }
    }
  }
`;

export default Movie;
