import React from 'react';

// Styled
import { StyledButton } from 'components/styled/Button';

const Button = ({ children, ...props }) => <StyledButton {...props}>{children}</StyledButton>;

export default Button;
