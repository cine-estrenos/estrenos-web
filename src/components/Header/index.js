/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useRef, useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import useMedia from 'use-media';

// Styled Components
import { Container, Overlay } from './styled';

// Components
import Button from 'components/ui/Button';
import Rating from 'components/ui/Rating';
import Play from 'components/ui/Icons/Play';
import { Skeleton, ResponsiveSkeleton } from 'components/ui/Skeletons';

// Utils
import { truncateUntilFirstDot } from 'utils/helpers';

// Styles
import { media } from 'utils/styles/media';

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

const Loader = ({ isTablet }) => (
  <Container>
    <article>
      <Skeleton width={isTablet ? 240 : 85} height={isTablet ? 78 : 28} ariaLabel="Cargando título..." />

      <div className="info loader">
        <Skeleton width={147} height={18} ariaLabel="Cargando género y puntuación..." />
      </div>

      <p className={`description ${isTablet ? '' : 'loader'}`}>
        {isTablet ? (
          <Skeleton width={400} height={72} ariaLabel="Cargando descripción..." />
        ) : (
          <ResponsiveSkeleton ariaLabel="Cargando descripción..." />
        )}
      </p>

      <div className="btn-container">
        {isTablet ? (
          <Skeleton width={164} height={57} ariaLabel="Cargando botón de compra..." />
        ) : (
          <ResponsiveSkeleton ariaLabel="Cargando botón de compra..." />
        )}
      </div>
    </article>

    <figure>
      <ResponsiveSkeleton ariaLabel="Cargando trailer..." />
    </figure>
  </Container>
);

const Header = () => {
  const videoRef = useRef();
  const isTablet = useMedia(media.tablet);

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
  if (isLoading) return <Loader isTablet={isTablet} />;

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
