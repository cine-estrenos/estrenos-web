import React from 'react'

// Styled Components
import { Container } from './styled'

// Components
import Search from '../Search'

const Nav = () => (
  <Container>
    <h2>Estrenos</h2>

    <div className='links-search'>
      <ul>
        <li>Home</li>
        <li>Películas</li>
        <li>Cine</li>
        <li>Contacto</li>
      </ul>

      <Search />
    </div>
  </Container>
)

export default Nav
