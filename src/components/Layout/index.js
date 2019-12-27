import React from 'react'
import useDarkMode from 'use-dark-mode'
import { ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'

// Styles
import { GlobalStyle } from 'utils/styles/global'
import { darkTheme, lightTheme } from 'utils/styles/theme'

// Components
import Nav from 'components/Nav'
import Footer from 'components/Footer'

const Layout = ({ children }) => {
  const darkMode = useDarkMode(true)

  return (
    <ThemeProvider theme={darkMode.value ? darkTheme : lightTheme}>
      <GlobalStyle />
      <div className='container'>
        <Nav />

        <button onClick={darkMode.toggle}>Toggle</button>
        <main>{children}</main>

        <Footer />
      </div>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
