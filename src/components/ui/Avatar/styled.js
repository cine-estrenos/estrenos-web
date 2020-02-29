import styled from 'styled-components';
import { rem } from 'polished';

export const Container = styled.img`
  width: ${rem('36px')};
  height: ${rem('36px')};
  border: 2px solid ${({ theme }) => theme.text};
  border-radius: 50%;
`;
