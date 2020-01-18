/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useEffect, useRef } from 'react';
import { navigate, graphql, useStaticQuery } from 'gatsby';
import { Button, SIZE } from 'baseui/button';
import { H2, Paragraph2, Label4 } from 'baseui/typography';

// Styled Components
import { Container } from './styled';

// Components
import Rating from 'components/ui/Rating';

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
        trailer {
          href
          type
        }
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
  const videoRef = useRef(null);

  const [movie] = movies;

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const Plyr = require('plyr');
      const player = new Plyr(videoRef.current, { title: movie.title });
      const sources = [
        {
          src: movie.trailer.href,
          ...(movie.trailer.type === 'file' && { type: 'video/mp4' }),
          ...(movie.trailer.type === 'youtube' && { provider: 'youtube' }),
        },
      ];
      player.source = { type: 'video', poster: movie.backdrop, sources };
    }
  }, [videoRef]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container image={movie.backdrop}>
      <article>
        <H2>{movie.title}</H2>

        <div className="info">
          <Label4 className="category">
            {movie.genres.length && movie.genres[0].value}
            {movie.genres.length && movie.votes !== '0' && ' | '}
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
        <video ref={videoRef} preload="auto" />
      </figure>
    </Container>
  );
};

export default Header;
