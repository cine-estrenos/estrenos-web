import React from 'react';
import styled from 'styled-components';
import { Button, StyledBaseButton } from 'baseui/button';
import { rgba, rem } from 'polished';

const StyledComponentBaseButton = styled(StyledBaseButton)`
  border-radius: 6px;
  text-transform: uppercase;

  font-size: ${rem('16px')};
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.bg};

  background-color: ${({ theme }) => theme.text};
  box-shadow: 0px 2px 4px ${({ theme }) => rgba(theme.bg, 0.05)};
`;

export const StyledButton = (props) => (
  <Button
    {...props}
    overrides={{
      BaseButton: StyledComponentBaseButton,
    }}
  />
);
