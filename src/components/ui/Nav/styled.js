import styled from 'styled-components';
import { rem } from 'polished';

// Styles
import { media } from 'utils/styles/media';

export const Container = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${rem('40px')} 0;

  @media ${media.tablet} {
    align-items: center;
    flex-direction: row;
  }

  h1 {
    font-weight: 600;
    font-size: ${rem('24px')};
    text-transform: uppercase;
    margin-bottom: ${rem('16px')};

    @media ${media.tablet} {
      margin-bottom: 0;
    }
  }

  .links-search {
    display: grid;
    grid-auto-flow: row;
    align-items: center;
    grid-gap: ${rem('16px')};

    @media ${media.tablet} {
      grid-auto-flow: column;
      grid-gap: ${rem('32px')};
      grid-template-columns: auto ${rem('230px')};
    }

    ul {
      display: grid;
      grid-auto-flow: row;

      @media ${media.tablet} {
        grid-auto-flow: column;
        grid-gap: ${rem('32px')};
      }
    }
  }
`;
