import React from 'react';
import { Typography } from 'antd';

// Styled Components
import { Container } from './styled';

// Components
import Rating from './components/Rating';

// Contants
const { Text } = Typography;

const GenreRating = ({ genres, votes }) => (
  <Container>
    <Text className="category">
      {genres.length && genres[0].value}
      {genres.length && votes !== '0' && ' | '}
    </Text>

    {votes !== '0' && <Rating votes={votes} />}
  </Container>
);

export default GenreRating;
