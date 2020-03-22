import styled from 'styled-components';
import { rem } from 'polished';

// Styles
import { media } from 'utils/styles/media';

export const Container = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${rem('40px')} 0;

  @media ${media.tablet} {
    align-items: center;
    flex-direction: row;
  }

  span {
    margin-bottom: ${rem('16px')};

    @media ${media.tablet} {
      margin-bottom: 0;
    }
  }

  .links-media {
    display: grid;
    grid-auto-flow: row;
    align-items: center;
    grid-gap: ${rem('16px')};

    @media ${media.tablet} {
      grid-auto-flow: column;
      grid-gap: ${rem('32px')};
    }

    ul {
      display: grid;
      grid-auto-flow: row;
      margin-bottom: 0;

      @media ${media.tablet} {
        grid-auto-flow: column;
        grid-gap: ${rem('32px')};
      }

      li {
        font-size: ${rem('14px')};
      }
    }

    .media {
      display: flex;

      .github,
      .twitter {
        font-size: ${rem('24px')};
        transition: all 400ms ease;

        :hover {
          opacity: 0.8;
        }
      }

      .github {
        margin-left: ${rem('20px')};
      }
    }
  }
`;
