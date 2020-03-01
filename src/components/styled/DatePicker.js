import React from 'react';
import styled from 'styled-components';
import { Datepicker, StyledInputWrapper } from 'baseui/datepicker';
import { rgba } from 'polished';

const StyledComponentInputWrapper = styled(StyledInputWrapper)`
  > div > div {
    border-radius: 6px;
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.bg};
    box-shadow: 0px 2px 4px ${({ theme }) => rgba(theme.text, 0.05)};
  }
`;

export const StyledDatePicker = (props) => (
  <Datepicker
    {...props}
    overrides={{
      InputWrapper: StyledComponentInputWrapper,
    }}
  />
);
