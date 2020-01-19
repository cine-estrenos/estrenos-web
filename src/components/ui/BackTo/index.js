import React from 'react';
import { Link } from 'gatsby';
import { Label2 } from 'baseui/typography';

// Styled Components
import { Container } from './styled';

// Components
import ChevronLeft from 'components/ui/Icons/ChevronLeft';

const BackTo = ({ route, children }) => {
  return (
    <Link to={route}>
      <Container>
        <ChevronLeft />
        <Label2>{children}</Label2>
      </Container>
    </Link>
  );
};

export default BackTo;
