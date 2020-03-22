import styled from 'styled-components';
import { rem } from 'polished';

export const Container = styled.span`
  display: inline-block;
  padding-top: ${rem('2px')};
  padding-left: ${rem('4px')};

  svg {
    width: ${rem('15px')};
  }
`;
