import styled from 'styled-components';
import { rgba, rem } from 'polished';

// Styles
import { media } from 'utils/styles/media';

export const Container = styled.header`
  display: grid;
  grid-gap: ${rem('20px')};
  grid-template-rows: auto ${rem('290px')};

  @media ${media.desktop} {
    grid-gap: ${rem('100px')};
    grid-template-rows: ${rem('428px')};
    grid-template-columns: ${rem('400px')} 1fr;
  }

  @media ${media.tablet} {
    grid-gap: ${rem('40px')};
  }

  article {
    @media ${media.tablet} {
      padding-top: ${rem('36px')};
    }

    h3 {
      margin-bottom: ${rem('12px')};
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
    .plyr {
      border-radius: 4px;
      transition: all 400ms ease;
      box-shadow: 0 2px 15px ${({ theme }) => rgba(theme.text, 0.1)};
    }
  }
`;
