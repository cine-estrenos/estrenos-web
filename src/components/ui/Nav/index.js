import React from 'react'

// Styled Components
import { Container } from './styled'

// Components
import Search from 'components/ui/Search'

const Nav = ({ handleToggleDarkMode }) => (
  <Container>
    <h2 onClick={handleToggleDarkMode} role='presentation'>
      Estrenos
    </h2>

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
