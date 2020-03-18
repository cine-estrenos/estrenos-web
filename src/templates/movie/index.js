import React, { useState, useEffect } from 'react';

import { Layer, Feature, Popup } from 'react-mapbox-gl';
import { H2, Label1, Label2, Paragraph2 } from 'baseui/typography';
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
  StyledPopup,
} from './styled';

// Components
import SEO from 'components/ui/Seo';
import Map from 'components/ui/Map';
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

// Constants
const defaultMapPosition = [-58.4515826, -34.6076124];

const Movie = ({ pageContext: { cinemas, movie, shows } }) => {
  // React hooks - cinemas
  const [selectedCinema, setSelectedCinema] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState([]);

  // React hooks - dates
  const [selectedDate, setSelectedDate] = useState(null);
  const [includeDates, setIncludeDates] = useState([]);

  // React hooks - shows
  const [showsToFilter, setShowsToFilter] = useState(shows);
  const [selectedShowId, setSelectedShowId] = useState(null);
  const [selectedShowLink, setSelectedShowLink] = useState(null);
  const [selectedShowSeats, setSelectedShowSeats] = useState(null);

  // React hooks - maps
  const [mapCenter, setMapCenter] = useState(defaultMapPosition);

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

  // Effects - Change shows to display when cinema branch changes or a date it's selected
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

  // Effects - Change map center when branch changes
  useEffect(() => {
    if (!selectedBranch.length) return;

    const [{ lat, lon }] = selectedBranch;
    setMapCenter([lon, lat]);
  }, [selectedBranch]);

  // Effects - Clear selected show when there's no date, cinema or branch selected
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

  // Effects - Clear selected branch when a cinema changes
  useEffect(() => {
    setSelectedBranch([]);
  }, [selectedCinema]);

  // Effects - Clear selected data when a cinema or branch changes
  useEffect(() => {
    setSelectedDate(null);
  }, [selectedCinema, selectedBranch]);

  // Handlers - Dropdowns
  const handleChangeCinema = ({ value }) => setSelectedCinema(value);

  const handleChangeBranch = ({ value }) => setSelectedBranch(value);

  const handleChangeDate = ({ date }) => setSelectedDate(date);

  // Handlers - Table
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

  // Handlers - Map
  const handleMapToggleHover = ({ map }, cursor) => Object.assign(map._canvas.style, { cursor });

  const handleMapCinemaClick = (cinema) => {
    const newSelectedCinema = [{ chain: cinema.chain }];
    const newSelectedBranch = [cinema];

    handleChangeCinema({ value: newSelectedCinema });
    handleChangeBranch({ value: newSelectedBranch });
  };

  return (
    <Layout>
      <SEO title={movie.title} />
      <BackTo route="/">Volver a todas las películas</BackTo>

      <Container>
        <div>
          <Poster alt={movie.title} src={movie.poster.replace('300', '500')} />
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
                      selectable={selectedBranch.length ? 'true' : ''}
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

        <div className="map-container">
          <Label1 className="label">Mapa</Label1>
          <Paragraph2 className="description">También podes elegir tu cine desde el mapa:</Paragraph2>

          {Map && (
            <Map
              center={mapCenter}
              containerStyle={{ width: '100%', height: '100%' }}
              style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line react/style-prop-object
              zoom={[12]}
            >
              <Layer id="marker" layout={{ 'icon-image': 'marker-15', 'icon-size': 2 }} type="symbol">
                {availableCinemas.map((availableCinema) => {
                  return (
                    <Feature
                      key={availableCinema.id}
                      coordinates={[availableCinema.lon, availableCinema.lat]}
                      onClick={() => handleMapCinemaClick(availableCinema)}
                      onMouseEnter={(mapBox) => handleMapToggleHover(mapBox, 'pointer')}
                      onMouseLeave={(mapBox) => handleMapToggleHover(mapBox, '')}
                    />
                  );
                })}
              </Layer>
              {selectedBranch.length && (
                <Popup key={selectedBranch[0].id} coordinates={[selectedBranch[0].lon, selectedBranch[0].lat]}>
                  <StyledPopup>
                    <h3>
                      {selectedBranch[0].chain} {selectedBranch[0].name}
                    </h3>
                    <p>
                      Funciones desde el {dayjs(showsToFilter[0].date).format('DD[/]MM')} hasta el{' '}
                      {dayjs(showsToFilter[showsToFilter.length - 1].date).format('DD[/]MM')}
                    </p>
                  </StyledPopup>
                </Popup>
              )}
            </Map>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default Movie;
