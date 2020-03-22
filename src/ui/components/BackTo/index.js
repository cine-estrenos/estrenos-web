import React from 'react';

// Gatsby
import { Link } from 'gatsby';

// Antd
import { Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

// Styled Components
import { Container } from './styled';

// Constants
const { Text } = Typography;

const BackTo = ({ route, children }) => (
  <Link to={route}>
    <Container>
      <ArrowLeftOutlined />
      <Text strong>{children}</Text>
    </Container>
  </Link>
);

export default BackTo;
