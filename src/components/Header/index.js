/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useEffect, useRef } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { SIZE } from 'baseui/button';
import { H3, Paragraph2 } from 'baseui/typography';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

// Styled Components
import { Container } from './styled';
import { StyledButton } from 'components/styled/Button';

// Components
import GenreRating from 'components/ui/GenreRating';

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
      const player = new Plyr(videoRef.current, {
        title: movie.title,
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
      });
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

  const handleCallToAction = () => {
    trackCustomEvent({ category: 'Home - Call To Action', action: 'click', value: movie.title });
  };

  const handleVideoClick = () => {
    trackCustomEvent({ category: 'Home - Trailer', action: 'play', value: movie.title });
  };

  return (
    <Container image={movie.backdrop}>
      <article>
        <H3>{movie.title}</H3>
        <GenreRating genres={movie.genres} votes={movie.votes} />

        <Paragraph2 className="description">{movie.description}</Paragraph2>

        <div className="btn-container">
          <Link to={`/peliculas/${movie.slug}`} onClick={handleCallToAction}>
            <StyledButton size={SIZE.large}>Comprar entradas</StyledButton>
          </Link>
        </div>
      </article>

      <figure onClick={handleVideoClick}>
        <video ref={videoRef} preload="auto" />
      </figure>
    </Container>
  );
};

export default Header;
