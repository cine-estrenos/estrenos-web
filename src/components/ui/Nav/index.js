import React from 'react';
import { Input } from 'baseui/input';
import { H1, Label2 } from 'baseui/typography';

// Styled Components
import { Container } from './styled';

// Components

const Nav = ({ handleToggleDarkMode }) => (
  <Container>
    <H1 onClick={handleToggleDarkMode} role="presentation">
      Estrenos
    </H1>

    <div className="links-search">
      <ul>
        <li>
          <Label2>Home</Label2>
        </li>
        <li>
          <Label2>Películas</Label2>
        </li>
        <li>
          <Label2>Cine</Label2>
        </li>
        <li>
          <Label2>Contacto</Label2>
        </li>
      </ul>

      <Input placeholder="Buscá por película o cine" />
    </div>
  </Container>
);

export default Nav;
