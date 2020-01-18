import styled from 'styled-components';
import { rem } from 'polished';

// Styles
import { media } from 'utils/styles/media';

export const Container = styled.header`
  display: grid;
  grid-gap: ${rem('20px')};

  @media ${media.desktop} {
    grid-gap: ${rem('100px')};
    grid-template-columns: ${rem('400px')} 1fr;
  }

  @media ${media.tablet} {
    grid-gap: ${rem('40px')};
  }

  article {
    @media ${media.tablet} {
      padding-top: ${rem('36px')};
    }

    h2 {
      font-weight: 600;
      margin-bottom: ${rem('12px')};

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      @media ${media.tablet} {
        font-size: ${rem('52px')};
      }
    }

    .info {
      display: flex;
      align-items: center;

      font-weight: 600;
      font-size: ${rem('12px')};

      text-transform: uppercase;
      margin-bottom: ${rem('16px')};

      @media ${media.tablet} {
        margin-bottom: ${rem('38px')};
      }

      .category {
        font-weight: 600;
        display: inline-block;
      }

      svg {
        transition: all 400ms ease;
      }
    }

    .description {
      margin-bottom: ${rem('32px')};

      overflow: hidden;
      display: -webkit-box;

      line-clamp: 3;
      -webkit-line-clamp: 3;
      box-orient: vertical;
      -webkit-box-orient: vertical;

      @media ${media.tablet} {
        margin-bottom: ${rem('56px')};
      }
    }

    .btn-container {
      display: flex;
      height: ${rem('57px')};

      @media ${media.tablet} {
        display: block;
      }

      button {
        flex: 1;
      }
    }
  }

  figure {
  }
`;
