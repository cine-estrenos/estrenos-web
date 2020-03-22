import React from 'react';

// Global components
import MainLayout from 'ui/layouts/MainLayout';

// Movies components
import Header from 'modules/movies/components/Header';
import Billboard from 'modules/movies/components/Billboard';

const Movies = () => (
  <MainLayout title="Inicio">
    <Header />
    <Billboard />
  </MainLayout>
);

export default Movies;
