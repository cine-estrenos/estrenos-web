import React from 'react';

import User from 'components/ui/Icons/User';

// Styled components
import { Container } from './styled';

const Avatar = ({ src, ...props }) => (src ? <Container src={src} {...props} /> : <User {...props} />);

export default Avatar;
