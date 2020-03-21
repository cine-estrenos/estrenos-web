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
    justify-content: space-between;
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
    @media ${media.tablet} {
    }

    span {
      cursor: pointer;
    }
  }

  .user-actions {
    display: flex;
    align-items: center;

    flex-basis: ${rem('280px')};

    > div {
      flex-basis: ${rem('240px')};
      margin-right: ${rem('16px')};
    }
  }
`;
