import React from 'react';

// Styled
import { StyledSelect } from 'components/styled/Select';

const Select = ({ children, ...props }) => <StyledSelect {...props}>{children}</StyledSelect>;

export default Select;
