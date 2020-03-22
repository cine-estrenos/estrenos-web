import React, { useEffect, useRef } from 'react';

// Gatsby
import { graphql, useStaticQuery, Link } from 'gatsby';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

// Antd
import { Typography, Button } from 'antd';

// Styled Components
import { Container } from './styled';

// Components
import GenreRating from 'ui/components/GenreRating';

// Queries
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

// Constants
const { Title, Paragraph } = Typography;

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
  }, [videoRef, movie]);

  const handleCallToAction = () => {
    trackCustomEvent({ category: 'Home - Call To Action', action: 'click', value: movie.title });
  };

  const handleVideoClick = () => {
    trackCustomEvent({ category: 'Home - Trailer', action: 'play', value: movie.title });
  };

  return (
    <Container image={movie.backdrop}>
      <article>
        <Title level={2}>{movie.title}</Title>
        <GenreRating genres={movie.genres} votes={movie.votes} />

        <Paragraph className="description">{movie.description}</Paragraph>

        <div className="btn-container">
          <Link to={`/peliculas/${movie.slug}`} onClick={handleCallToAction}>
            <Button size="large" type="primary">
              Comprar entradas
            </Button>
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
