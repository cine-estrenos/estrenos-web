import React from 'react';
import { navigate, graphql } from 'gatsby';

// Components
import SEO from 'components/ui/Seo';
import Layout from 'components/ui/Layout';
// import Header from 'components/Header';
import Billboard from 'components/Billboard';

const HomePage = () => (
  <Layout>
    <SEO title="Home" />
    {/* <Header /> */}
    <Billboard />
  </Layout>
);

export const query = graphql`
  query {
    ESTRENOS {
      movies {
        id
        title
      }
    }
  }
`;

export default HomePage;
