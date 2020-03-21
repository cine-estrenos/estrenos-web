import React from 'react';
import { Label2 } from 'baseui/typography';

// Styled Components
import { Container } from './styled';

// Components
import GitHub from 'components/ui/Icons/GitHub';
import Twitter from 'components/ui/Icons/Twitter';

const Footer = () => (
  <Container>
    <Label2>Estrenos © {new Date().getFullYear()} - Todos los derechos reservados.</Label2>

    <div className="links-media">
      <ul>
        <li>
          <Label2>Política de Privacidad</Label2>
        </li>
        <li>
          <Label2>Términos y Condiciones</Label2>
        </li>
      </ul>

      <div className="media">
        <a href="https://twitter.com/cine-estrenos" rel="noreferrer noopener">
          <Twitter />
        </a>
        <a href="https://github.com/cine-estrenos" rel="noreferrer noopener">
          <GitHub />
        </a>
      </div>
    </div>
  </Container>
);

export default Footer;
