import styled from 'styled-components';
import { rem } from 'polished';

// Styles
import { media } from 'utils/styles/media';

export const Container = styled.section``;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  padding: ${rem('40px')} 0;

  @media ${media.tablet} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .cinema-container {
    display: grid;
    grid-auto-flow: row;
    grid-gap: ${rem('20px')};
    margin-bottom: ${rem('20px')};

    @media ${media.tablet} {
      margin-bottom: 0;
      place-items: center;
      grid-template-columns: auto ${rem('195px')};
    }
  }

  .filters-container {
  }
`;

export const Body = styled.div`
  display: grid;
  grid-row-gap: ${rem('32px')};
  grid-column-gap: ${rem('24px')};
  justify-content: center;
  grid-template-columns: repeat(auto-fill, ${rem('140px')});

  @media ${media.tablet} {
    grid-template-columns: repeat(auto-fill, ${rem('180px')});
  }

  figure {
    cursor: pointer;
    transition: all 400ms ease-in-out;

    &.focus {
      img {
        opacity: 1;
        transform: scale(1.1);
      }
    }

    &.blur {
      img {
        opacity: 0.3;
      }

      figcaption {
        opacity: 0.8;
      }
    }

    > div {
      overflow: hidden;
      position: relative;
      height: ${rem('230px')};
      margin-bottom: ${rem('8px')};

      @media ${media.tablet} {
        height: ${rem('270px')};
      }

      img {
        width: ${rem('140px')};
        height: ${rem('230px')};

        object-fit: cover;
        transition: all 400ms ease-in-out;

        @media ${media.tablet} {
          width: ${rem('180px')};
          height: ${rem('270px')};
        }
      }
    }

    figcaption {
      div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;
