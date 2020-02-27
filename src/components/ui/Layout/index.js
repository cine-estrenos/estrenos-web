import React from 'react';
import useDarkMode from 'use-dark-mode';
import { ThemeProvider } from 'styled-components';
import { LightTheme, DarkTheme, BaseProvider } from 'baseui';
import PropTypes from 'prop-types';

// Styles
import { GlobalStyle } from 'utils/styles/global';
import { darkTheme, lightTheme } from 'utils/styles/theme';

// Components
import Nav from 'components/ui/Nav';
import Footer from 'components/ui/Footer';
import { Provider as SessionProvider } from 'session/context';

const Layout = ({ children }) => {
  const darkMode = useDarkMode(true);

  return (
    <BaseProvider theme={darkMode.value ? DarkTheme : LightTheme}>
      <ThemeProvider theme={darkMode.value ? darkTheme : lightTheme}>
        <SessionProvider>
          <div className="container">
            <Nav handleToggleDarkMode={darkMode.toggle} />
            <main>{children}</main>
            <Footer />
            <GlobalStyle />
          </div>
        </SessionProvider>
      </ThemeProvider>
    </BaseProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
