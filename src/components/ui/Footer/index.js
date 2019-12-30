import React from 'react';

// Styled Components
import { Container } from './styled';

// Components
import GitHub from 'components/ui/Icons/GitHub';
import Twitter from 'components/ui/Icons/Twitter';

const Footer = () => (
  <Container>
    <span>Estrenos © {new Date().getFullYear()} - Todos los derechos reservados.</span>

    <div className="links-media">
      <ul>
        <li>Contacto</li>
        <li>Política de Privacidad</li>
        <li>Términos y Condiciones</li>
      </ul>

      <div className="media">
        <Twitter />
        <GitHub />
      </div>
    </div>
  </Container>
);

export default Footer;
