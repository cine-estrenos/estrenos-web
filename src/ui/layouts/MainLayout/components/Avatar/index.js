import React from 'react';
import PropTypes from 'prop-types';

// Antd
import { UserOutlined } from '@ant-design/icons';

// Styled components
import { Container } from './styled';

const Avatar = ({ src, ...props }) => (src ? <Container src={src} {...props} /> : <UserOutlined {...props} />);

Avatar.propTypes = {
  src: PropTypes.string,
};

export default Avatar;
