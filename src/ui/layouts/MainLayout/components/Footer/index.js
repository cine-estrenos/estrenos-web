import React from 'react';

// Antd
import { Typography } from 'antd';
import { TwitterCircleFilled, GithubFilled } from '@ant-design/icons';

// Styled Components
import { Container } from './styled';

// Constants
const { Text } = Typography;

const Footer = () => (
  <Container>
    <Text>Estrenos © {new Date().getFullYear()} - Todos los derechos reservados.</Text>

    <div className="links-media">
      <ul>
        <li>
          <Text>Política de Privacidad</Text>
        </li>
        <li>
          <Text>Términos y Condiciones</Text>
        </li>
      </ul>

      <div className="media">
        <a href="https://twitter.com/cine-estrenos" rel="noreferrer noopener">
          <TwitterCircleFilled className="github" />
        </a>
        <a href="https://github.com/cine-estrenos" rel="noreferrer noopener">
          <GithubFilled className="github" />
        </a>
      </div>
    </div>
  </Container>
);

export default Footer;
