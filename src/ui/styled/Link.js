import { Link as GatsbyLink } from 'gatsby';
import styled from 'styled-components';

export const Link = styled(GatsbyLink)`
  color: ${({ theme }) => theme.text};

  &,
  &:active,
  &:focus {
    text-decoration: none;
  }
`;
