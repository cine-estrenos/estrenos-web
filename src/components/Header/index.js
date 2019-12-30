/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useRef, useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

// Styled Components
import { Container, Overlay } from './styled';

// Components
import Button from 'components/ui/Button';
import Rating from 'components/ui/Rating';
import Play from 'components/ui/Icons/Play';
import { Skeleton, ResponsiveSkeleton } from 'components/ui/Skeletons';

// Utils
import { truncateUntilFirstDot } from 'utils/helpers';

const MOST_POPULAR_MOVIE = gql`
  {
    movies(limit: 1) {
      id
      title
      votes
      length
      poster
      backdrop
      description
      amazonTrailerUrl
      category {
        value
      }
    }
  }
`;

const Loader = ({ isTablet = true }) => (
  <Container>
    <article>
      <Skeleton className="title-skeleton" ariaLabel="Cargando título..." />

      <div className="info loader">
        <Skeleton className="genre-skeleton" ariaLabel="Cargando género y puntuación..." />
      </div>

      <p className="description">
        <Skeleton className="description-skeleton" ariaLabel="Cargando descripción..." />
      </p>

      <div className="btn-container">
        <Skeleton className="btn-skeleton" ariaLabel="Cargando descripción..." />
      </div>
    </article>

    <figure>
      <ResponsiveSkeleton ariaLabel="Cargando trailer..." />
    </figure>
  </Container>
);

const Header = () => {
  const videoRef = useRef();
  const [displayOverlay, setDisplayOverlay] = useState(true);
  const { data, loading: isLoading, error: hasError } = useQuery(MOST_POPULAR_MOVIE);

  const handlePlay = () => {
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play();
      setDisplayOverlay(false);
    } else {
      videoRef.current.pause();
      setDisplayOverlay(true);
    }
  };

  if (hasError) return <div>error!</div>;
  if (isLoading) return <Loader />;

  const [movie] = data.movies;

  return (
    <Container image={movie.backdrop}>
      <article>
        <h2>{movie.title}</h2>

        <div className="info">
          <span className="category">
            {movie.category.value}
            {movie.votes === '0' ? '' : ' | '}
          </span>
          {movie.votes !== '0' && <Rating votes={movie.votes} />}
        </div>

        <p className="description">{truncateUntilFirstDot(movie.description)}</p>

        <div className="btn-container">
          <Button to={`/peliculas/${movie.id}`}>Comprar entradas</Button>
        </div>
      </article>

      <figure>
        <video loop preload="auto" ref={videoRef}>
          <source src={movie.amazonTrailerUrl} type="video/mp4" />
        </video>
        <Overlay hidden={!displayOverlay} image={movie.backdrop} onClick={handlePlay}>
          <Play />
        </Overlay>
      </figure>
    </Container>
  );
};

export default Header;
