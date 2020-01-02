import styled from 'styled-components';
import { rem } from 'polished';

// Styles
import { media } from 'utils/styles/media';

export const Container = styled.section``;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${rem('40px')} 0;

  .cinema-container {
    display: grid;
    grid-gap: ${rem('20px')};

    @media ${media.tablet} {
      place-items: center;
      grid-template-columns: auto ${rem('190px')};
    }
  }

  .filters-container {
  }
`;

export const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, ${rem('140px')});
  grid-row-gap: ${rem('32px')};
  grid-column-gap: ${rem('24px')};

  @media ${media.tablet} {
    grid-template-columns: repeat(auto-fill, ${rem('180px')});
  }

  figure {
    cursor: pointer;

    &:hover {
      img {
        transform: scale(1.1);
      }
    }

    > div {
      overflow: hidden;
      height: ${rem('230px')};
      margin-bottom: ${rem('8px')};

      @media ${media.tablet} {
        height: ${rem('270px')};
      }

      img {
        width: ${rem('140px')};
        height: ${rem('230px')};

        object-fit: cover;
        transition: all 400ms ease;

        @media ${media.tablet} {
          width: ${rem('180px')};
          height: ${rem('270px')};
        }
      }
    }

    figcaption {
      transition: all 400ms ease;

      div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .container-skeleton {
    .movie-skeleton {
      width: ${rem('180px')};
      height: ${rem('270px')};
      margin-bottom: ${rem('8px')};
    }

    .title-skeleton {
      width: 100%;
      height: ${rem('18px')};
    }
  }
`;
