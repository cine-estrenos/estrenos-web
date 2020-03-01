import React from 'react';
import PropTypes from 'prop-types';

import User from 'components/ui/Icons/User';

// Styled components
import { Container } from './styled';

const Avatar = ({ src, ...props }) => (src ? <Container src={src} {...props} /> : <User {...props} />);

Avatar.propTypes = {
  src: PropTypes.string,
};

export default Avatar;
