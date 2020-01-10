import React from 'react';
import nanoid from 'nanoid';
import { H5, Label3 } from 'baseui/typography';

import ScrollableSelect from 'components/ui/ScrollableSelect';
import { Skeleton } from 'components/ui/Skeletons';

import { Container, Header, Body } from './styled';

const Loader = ({ isLoading }) => (
  <Container>
    <Header>
      <div className="cinema-container">
        <H5 className="title">En cartelera</H5>
        <ScrollableSelect disabled isLoading={isLoading} placeholder="Selecciona tu cine" />
      </div>

      <div className="filters-container">
        <Label3>Filtrar por:</Label3>
      </div>
    </Header>

    <Body>
      <div>
        {Array.from({ length: 18 }, () => (
          <div key={nanoid()} className="container-skeleton">
            <Skeleton ariaLabel="Cargando poster..." className="movie-skeleton" />
            <Skeleton ariaLabel="Cargando título..." className="title-skeleton" />
          </div>
        ))}
      </div>
    </Body>
  </Container>
);

export default Loader;
