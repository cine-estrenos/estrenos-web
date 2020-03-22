import React from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

// Styled components
import { GlobalStyle, Container } from 'ui/layouts/MainLayout/styled/Global';

// Components
import Nav from 'ui/layouts/MainLayout/components/Nav';
import SEO from 'ui/layouts/MainLayout/components/Seo';
import Footer from 'ui/layouts/MainLayout/components/Footer';

// Providers
import { Provider as SessionProvider } from 'modules/session/context';

// Styles
import { lightTheme } from 'utils/styles/theme';

const MainLayout = ({ children, title }) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <SessionProvider>
        <Container>
          <Nav />
          <main>{children}</main>
          <Footer />
          <GlobalStyle />
          <SEO title={title} />
        </Container>
      </SessionProvider>
    </ThemeProvider>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default MainLayout;
