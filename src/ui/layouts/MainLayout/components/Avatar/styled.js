import styled from 'styled-components';
import { rgba, rem } from 'polished';

export const Container = styled.img`
  width: ${rem('32px')};
  height: ${rem('32px')};
  border: 1px solid ${({ theme }) => rgba(theme.text, 0.2)};
  border-radius: 50%;
  cursor: pointer;
`;
