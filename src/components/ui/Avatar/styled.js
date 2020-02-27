import styled from 'styled-components';

export const Container = styled.img`
  width: 36px;
  height: 36px;
  border: 2px solid ${({ theme }) => theme.text};
  border-radius: 50%;
`;
