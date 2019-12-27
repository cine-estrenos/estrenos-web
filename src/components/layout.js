import React from 'react'
import useDarkMode from 'use-dark-mode'
import { ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'

// Styles
import { GlobalStyle } from 'utils/styles/global'
import { darkTheme, lightTheme } from 'utils/styles/theme'

// Components
import Nav from './Nav'

const Layout = ({ children }) => {
  const darkMode = useDarkMode(false)

  return (
    <ThemeProvider theme={darkMode.value ? darkTheme : lightTheme}>
      <GlobalStyle />
      <div className='container'>
        <Nav />
        <button onClick={darkMode.toggle}>change</button>
        <main>{children}</main>
        {/* <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href='https://www.gatsbyjs.org'>Gatsby</a>
        </footer> */}
      </div>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
