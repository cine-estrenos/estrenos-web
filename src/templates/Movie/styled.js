import styled from 'styled-components';
import { rem } from 'polished';

export const Header = styled.header`
  display: grid;
  grid-template-columns: ${rem('210px')};

  margin: ${rem('20px')} 0;
`;

export const TableContainer = styled.div`
  height: ${rem('400px')};
`;
