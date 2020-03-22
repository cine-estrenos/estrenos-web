import React, { useState } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';

// Gatsby
import { graphql, useStaticQuery, Link } from 'gatsby';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

// Antd
import { Typography, Select } from 'antd';

// Libs
import delve from 'dlv';

// Styled Components
import { Container, Header, Body } from './styled';

// Selectors
import { getMoviesByGenres, getAvailableGenres, filterMoviesByGenre } from 'modules/movies/utils/selectors';

// Queries
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

// Constants
const { Option } = Select;
const { Title, Text } = Typography;

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
  const handleChangeCinema = (value) => {
    setSelectedGenre(value);
  };

  const handlePosterClick = (movieTitle) => {
    trackCustomEvent({ category: 'Home - Poster', action: 'click', value: movieTitle });
  };

  return (
    <Container>
      <Header>
        <div className="cinema-container">
          <Title level={4}>En cartelera</Title>
        </div>

        <div className="filters-container">
          <Select
            allowClear
            placeholder="Filtrar por género"
            size="large"
            value={selectedGenre}
            onChange={handleChangeCinema}
          >
            {availableGenres.map(({ genre }) => (
              <Option key={genre} value={genre}>
                {genre}
              </Option>
            ))}
          </Select>
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
                    <Text strong>{title}</Text>
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
