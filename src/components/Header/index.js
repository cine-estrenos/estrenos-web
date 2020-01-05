/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useRef, useState } from 'react';
import { navigate } from 'gatsby';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Button, SIZE } from 'baseui/button';
import { H2, Paragraph2, Label4 } from 'baseui/typography';

// Styled Components
import { Container, Overlay } from './styled';

// Components
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

const Loader = () => (
  <Container>
    <article>
      <Skeleton ariaLabel="Cargando título..." className="title-skeleton" />

      <div className="info loader">
        <Skeleton ariaLabel="Cargando género y puntuación..." className="genre-skeleton" />
      </div>

      <p className="description">
        <Skeleton ariaLabel="Cargando descripción..." className="description-skeleton" />
      </p>

      <div className="btn-container">
        <Skeleton ariaLabel="Cargando descripción..." className="btn-skeleton" />
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
        <H2>{movie.title}</H2>

        <div className="info">
          <Label4 className="category">
            {movie.category.value}
            {movie.votes === '0' ? '' : ' | '}
          </Label4>
          {movie.votes !== '0' && <Rating votes={movie.votes} />}
        </div>

        <Paragraph2 className="description">{truncateUntilFirstDot(movie.description)}</Paragraph2>

        <div className="btn-container">
          <Button size={SIZE.large} onClick={() => navigate(`/peliculas/${movie.id}`)}>
            Comprar entradas
          </Button>
        </div>
      </article>

      <figure>
        <video ref={videoRef} loop preload="auto">
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
