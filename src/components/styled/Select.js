import React from 'react';
import styled from 'styled-components';
import { Select, StyledRoot, StyledControlContainer, StyledDropdownContainer, StyledDropdown } from 'baseui/select';
import { rgba } from 'polished';

const StyledComponentRoot = styled(StyledRoot)`
  background-color: transparent;
`;

const StyledComponentControlContainer = styled(StyledControlContainer)`
  display: flex;
  border-radius: 6px;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.grey};
  box-shadow: 0px 2px 4px ${({ theme }) => rgba(theme.text, 0.05)};
`;

const StyledComponentDropdownContainer = styled(StyledDropdownContainer)`
  background-color: transparent;
`;

const StyledComponentDropdown = styled(StyledDropdown)`
  border-radius: 6px;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.grey};
  box-shadow: 0px 2px 4px ${({ theme }) => rgba(theme.text, 0.05)};
`;

export const StyledSelect = (props) => (
  <Select
    {...props}
    overrides={{
      Root: StyledComponentRoot,
      ControlContainer: StyledComponentControlContainer,
      DropdownContainer: StyledComponentDropdownContainer,
      Dropdown: StyledComponentDropdown,
      Popover: {
        props: {
          overrides: {
            Body: { style: { backgroundColor: 'transparent' } },
            Inner: { style: { backgroundColor: 'transparent' } },
          },
        },
      },
    }}
  />
);
