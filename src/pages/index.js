import React from 'react';

// Components
import SEO from 'components/ui/Seo';
import Layout from 'components/ui/Layout';
import Header from 'components/Header';
import Billboard from 'components/Billboard';

const HomePage = () => (
  <Layout>
    <SEO title="Home" />
    <Header />
    <Billboard />
  </Layout>
);

export default HomePage;
