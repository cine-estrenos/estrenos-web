import React from 'react';
import { Label4 } from 'baseui/typography';

// Styled Components
import { Container } from './styled';

// Components
import Rating from 'components/ui/Rating';

const GenreRating = ({ genres, votes }) => (
  <Container>
    <Label4 className="category">
      {genres.length && genres[0].value}
      {genres.length && votes !== '0' && ' | '}
    </Label4>
    {votes !== '0' && <Rating votes={votes} />}
  </Container>
);

export default GenreRating;
