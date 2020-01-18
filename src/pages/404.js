import React from 'react';
import { H2, Paragraph2 } from 'baseui/typography';

// Components
import SEO from 'components/ui/Seo';
import Layout from 'components/ui/Layout';
import BackTo from 'components/ui/BackTo';

const NotFoundPage = () => (
  <Layout>
    <SEO title="Ruta no encontrada" />
    <H2>Lo lamentamos</H2>
    <Paragraph2>Llegate a una ruta inexistente...</Paragraph2>
    <BackTo route="/">Volver a todas las películas</BackTo>
  </Layout>
);

export default NotFoundPage;
