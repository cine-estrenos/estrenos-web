import React from 'react'
import { ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'

// Styles
import { theme } from 'utils/styles/theme'
import { GlobalStyle } from 'utils/styles/global'

// Components
import Nav from './Nav'

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <div className='container'>
      <Nav />
      <main>{children}</main>
      {/* <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href='https://www.gatsbyjs.org'>Gatsby</a>
        </footer> */}
    </div>
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
