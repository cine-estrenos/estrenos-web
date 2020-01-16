/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useRef, useState } from 'react';
import { navigate, graphql, useStaticQuery } from 'gatsby';
import { Button, SIZE } from 'baseui/button';
import { H2, Paragraph2, Label4 } from 'baseui/typography';

// Styled Components
import { Container, Overlay } from './styled';

// Components
import Rating from 'components/ui/Rating';
import Play from 'components/ui/Icons/Play';

const query = graphql`
  query MostPopularMovie {
    estrenos {
      movies(limit: 1) {
        id
        slug
        title
        votes
        length
        poster
        backdrop
        description
        trailer
        genres {
          value
        }
      }
    }
  }
`;

const Header = () => {
  const {
    estrenos: { movies },
  } = useStaticQuery(query);

  const videoRef = useRef();
  const [displayOverlay, setDisplayOverlay] = useState(true);

  const handlePlay = () => {
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play();
      setDisplayOverlay(false);
    } else {
      videoRef.current.pause();
      setDisplayOverlay(true);
    }
  };

  const [movie] = movies;

  return (
    <Container image={movie.backdrop}>
      <article>
        <H2>{movie.title}</H2>

        <div className="info">
          <Label4 className="category">
            {movie.genres.length && `${movie.genres[0].value} | `}
            {movie.votes !== '0' && movie.votes}
          </Label4>
          {movie.votes !== '0' && <Rating votes={movie.votes} />}
        </div>

        <Paragraph2 className="description">{movie.description}</Paragraph2>

        <div className="btn-container">
          <Button size={SIZE.large} onClick={() => navigate(`/peliculas/${movie.slug}`)}>
            Comprar entradas
          </Button>
        </div>
      </article>

      <figure>
        <video ref={videoRef} loop preload="auto">
          <source src={movie.trailer} type="video/mp4" />
        </video>
        <Overlay hidden={!displayOverlay} image={movie.backdrop} onClick={handlePlay}>
          <Play />
        </Overlay>
      </figure>
    </Container>
  );
};

export default Header;
