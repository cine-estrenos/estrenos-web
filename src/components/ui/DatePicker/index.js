import React from 'react';

// Styled
import { StyledDatePicker } from 'components/styled/DatePicker';

const DatePicker = ({ children, ...props }) => <StyledDatePicker {...props}>{children}</StyledDatePicker>;

export default DatePicker;
