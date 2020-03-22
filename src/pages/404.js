import React from 'react';
import { Typography } from 'antd';

// Components
import BackTo from 'ui/components/BackTo';
import MainLayout from 'ui/layouts/MainLayout';

// Constants
const { Title, Paragraph } = Typography;

const NotFoundPage = () => (
  <MainLayout title="Ruta no encontrada">
    <Title level={2}>Lo lamentamos</Title>
    <Paragraph>Llegate a una ruta inexistente...</Paragraph>
    <BackTo route="/">Volver a todas las películas</BackTo>
  </MainLayout>
);

export default NotFoundPage;
