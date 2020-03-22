import React, { useState, useEffect } from 'react';
import { Layer, Feature, Popup } from 'react-mapbox-gl';

// Antd
import { Typography, Select, DatePicker, Button, Table } from 'antd';

// Gatsby
// import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

// Libs
import delve from 'dlv';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/es';

// Styled Components
import { Container, Poster, Header, Body, Footer, StyledPopup, TableContainer } from 'modules/movie/styled/Layout';

// Global Components
import Layout from 'ui/layouts/MainLayout';
import BackTo from 'ui/components/BackTo';
import GenreRating from 'ui/components/GenreRating';

// Module components
import Map from 'modules/movie/components/Map';

// Utils
import { parseDate } from 'modules/movie/utils/dates';

// Selectors
import { getChainIds, getAvailableCinemas, getChainsNames, getAvailableBranches } from 'modules/movie/utils/selectors';

// Setup dayjs
dayjs.locale('es');
dayjs.extend(isBetween);

// Constants
const { Option } = Select;
const { Title, Text, Paragraph } = Typography;
const defaultMapPosition = [-58.4515826, -34.6076124];

const Movie = ({ pageContext: { cinemas, movie, shows } }) => {
  // React hooks - cinemas
  const [selectedCinema, setSelectedCinema] = useState(undefined);
  const [selectedBranch, setSelectedBranch] = useState(undefined);

  // React hooks - dates
  const [selectedDate, setSelectedDate] = useState(null);
  const [includeDates, setIncludeDates] = useState(shows.map(({ date }) => dayjs(date).toDate()));

  // React hooks - shows
  const [rowElement, setRowElement] = useState(null);
  const [showsToFilter, setShowsToFilter] = useState(shows);

  // FIXME: use selectedShowId
  const [, setSelectedShowId] = useState(null);
  const [selectedShowLink, setSelectedShowLink] = useState(null);
  const [selectedShowSeats, setSelectedShowSeats] = useState(null);

  // React hooks - maps
  const [mapCenter, setMapCenter] = useState(defaultMapPosition);

  // Constants
  const chainIds = getChainIds(cinemas);
  const availableCinemas = getAvailableCinemas(cinemas, shows);

  const chains = getChainsNames(availableCinemas);
  const branches = getAvailableBranches(selectedCinema, availableCinemas);

  //   Constants - Table
  const tableColumns = [
    {
      key: 'date',
      title: 'Fecha',
      dataIndex: 'date',
      width: 165,
    },
    {
      key: 'version',
      title: 'Idioma',
      dataIndex: 'version',
      width: 130,
    },
    {
      key: 'time',
      title: 'Horario',
      dataIndex: 'time',
      width: 110,
    },
    {
      key: 'format',
      title: 'Formato',
      dataIndex: 'format',
      width: 80,
    },
  ];
  const tableData = showsToFilter.map((show) => ({ ...show, date: parseDate(show.date), key: show.id }));

  // Effects - Change shows to display when cinema branch changes or a date it's selected
  useEffect(() => {
    if (selectedCinema && !selectedBranch) {
      const selectedChain = selectedCinema;
      const selectedChainIds = chainIds[selectedChain];

      const filteredShows = shows.filter(({ cinemaId }) => selectedChainIds.includes(cinemaId));
      setShowsToFilter(filteredShows);
    }

    if (selectedBranch) {
      const filteredShows = shows.filter(({ cinemaId }) => cinemaId === selectedBranch.id);
      const includeDates = filteredShows.map(({ date }) => dayjs(date).toDate());

      setIncludeDates(includeDates);
      setShowsToFilter(filteredShows);
    }

    if (selectedDate) {
      const parsedSelectedDate = selectedDate.format('YYYY-MM-DD');
      setShowsToFilter((prevShows) => prevShows.filter(({ date }) => date === parsedSelectedDate));
    }
  }, [selectedCinema, selectedBranch, selectedDate]); // eslint-disable-line react-hooks/exhaustive-deps

  // Effects - Change map center when branch changes
  useEffect(() => {
    if (!selectedBranch) return;

    const { lat, lon } = selectedBranch;
    setMapCenter([lon, lat]);
  }, [selectedBranch]);

  // Effects - Clear selected show when there's no date, cinema or branch selected
  useEffect(() => {
    if (!selectedDate || !selectedCinema || !selectedBranch) {
      setSelectedShowId(null);
      setSelectedShowLink(null);
      setSelectedShowSeats(null);
    }

    if (!selectedCinema) setShowsToFilter(shows);
  }, [selectedDate, selectedBranch, selectedCinema]); // eslint-disable-line react-hooks/exhaustive-deps

  // Effects - Clear selected branch when a cinema changes
  useEffect(() => {
    setSelectedBranch(undefined);
  }, [selectedCinema]);

  // Effects - Clear selected data when a cinema or branch changes
  useEffect(() => {
    setSelectedDate(null);
  }, [selectedCinema, selectedBranch]);

  // Handlers - Dropdowns
  const handleChangeCinema = (value) => setSelectedCinema(value);

  const handleChangeBranch = (value) => setSelectedBranch(value);

  const handleChangeDate = (date) => setSelectedDate(date);

  const handleDisableDate = (current) => {
    if (!(current || includeDates.length)) return false;
    return !current.isBetween(includeDates[0], includeDates[includeDates.length - 1]);
  };

  // Handlers - Table
  const handleClickRow = (row, { target }) => {
    // FIXME: Uncomment this code:
    // if (!selectedBranch) return;

    const newRowElement = target.parentElement;
    setRowElement(newRowElement);

    if (rowElement) rowElement.classList.remove('ant-table-row-selected');
    newRowElement.classList.add('ant-table-row-selected');

    setSelectedShowId(row.id);
    setSelectedShowLink(row.link);
    setSelectedShowSeats(row.seats);
  };

  const handleClickBuyTicket = () => {
    // FIXME: Uncomment this code:

    // trackCustomEvent({
    //   action: 'click',
    //   category: 'Movie - Ticket buy',
    //   value: `Cinema: ${selectedCinema[0].name} - Branch: ${selectedBranch[0].name} - Show: ${selectedShowId}`,
    // });

    window.open(selectedShowLink);
  };

  // Handlers - Map
  const handleMapToggleHover = ({ map }, cursor) => Object.assign(map._canvas.style, { cursor });

  const handleMapCinemaClick = (cinema) => {
    handleChangeCinema(cinema.chain);

    // FIXME: Uncomment this code:
    // handleChangeBranch(cinema);
  };

  return (
    <Layout title={movie.title}>
      <BackTo route="/">Volver al inicio</BackTo>

      <Container>
        <div>
          <Poster alt={movie.title} src={movie.poster.replace('300', '500')} />
        </div>

        <div>
          <div className="main">
            <Title level={2}>{movie.title}</Title>
            <GenreRating genres={movie.genres} votes={movie.votes} />
            <Paragraph className="description">{movie.description}</Paragraph>

            <div className="info">
              <div>
                <Text strong className="info-title">
                  Clasificación
                </Text>
                <Paragraph className="info-value">{movie.minAge}</Paragraph>
              </div>
              <div>
                <Text strong className="info-title">
                  Puntuación
                </Text>
                <Paragraph className="info-value">{movie.votes} / 10</Paragraph>
              </div>

              <div>
                <Text strong className="info-title">
                  Duración
                </Text>
                <Paragraph className="info-value">{movie.length.replace('m', ' minutos')}</Paragraph>
              </div>

              <div>
                <Text strong className="info-title">
                  Director
                </Text>
                <Paragraph className="info-value">{movie.cast.directors.join(', ')}</Paragraph>
              </div>

              <div className="actors">
                <Text strong className="info-title">
                  Elenco
                </Text>
                <Paragraph className="info-value">{movie.cast.actors.join(', ')}</Paragraph>
              </div>
            </div>
          </div>

          <Header>
            <div>
              <Paragraph strong className="label">
                Selecciona tu cine
              </Paragraph>
              <Select placeholder={chains[0]} size="large" value={selectedCinema} onChange={handleChangeCinema}>
                {chains.map((chain) => (
                  <Option key={chain} value={chain}>
                    {chain}
                  </Option>
                ))}
              </Select>
            </div>

            <div>
              <Paragraph strong className="label">
                Selecciona tu sucursal
              </Paragraph>
              <Select
                placeholder={delve(branches, '[0].name', 'Belgrano')}
                size="large"
                value={selectedBranch}
                onChange={handleChangeBranch}
              >
                {branches.map(({ id, name }) => (
                  <Option key={id} value={id}>
                    {name}
                  </Option>
                ))}
              </Select>
            </div>

            <div>
              <Paragraph strong className="label">
                Selecciona tu día
              </Paragraph>
              <DatePicker
                clearable
                // disabled={!Boolean(selectedBranch)}
                defaultPickerValue={dayjs().month(dayjs(delve(shows, '0.date')).month())}
                disabledDate={handleDisableDate}
                includeDates={includeDates}
                placeholder="Fecha"
                size="large"
                value={selectedDate}
                onChange={handleChangeDate}
              />
            </div>
          </Header>

          <Body>
            <Paragraph strong className="label">
              Selecciona tu función
            </Paragraph>
            <TableContainer>
              <Table
                bordered
                columns={tableColumns}
                dataSource={tableData}
                pagination={false}
                scroll={{ y: 296 }}
                onRow={(record) => ({ onClick: (event) => handleClickRow(record, event) })}
              />
            </TableContainer>
          </Body>

          <Footer>
            <Button disabled={!Boolean(selectedShowLink)} type="primary" onClick={handleClickBuyTicket}>
              Comprar entradas
            </Button>

            {selectedShowSeats && (
              <Text strong className="label">
                Asientos disponibles: {selectedShowSeats.available} / {selectedShowSeats.total}
              </Text>
            )}
          </Footer>
        </div>

        <div className="map-container">
          <Text strong className="label">
            Mapa
          </Text>
          <Paragraph className="description">También podes elegir tu cine desde el mapa:</Paragraph>

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
              {selectedBranch && (
                <Popup key={selectedBranch.id} coordinates={[selectedBranch.lon, selectedBranch.lat]}>
                  <StyledPopup>
                    <h3>
                      {selectedBranch.chain} {selectedBranch.name}
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
