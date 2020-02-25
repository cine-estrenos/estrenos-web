import styled from 'styled-components';
import { rem } from 'polished';

// Styles
import { media } from 'utils/styles/media';

export const Container = styled.div`
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
`;
