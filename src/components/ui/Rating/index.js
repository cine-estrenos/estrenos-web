import React from 'react';
import nanoid from 'nanoid';
import PropTypes from 'prop-types';

// Styled Components
import { Container } from './styled';

// Components
import { EmptyStar, HalfStar, FilledStar } from 'components/ui/Icons/Stars';

const Rating = ({ votes }) => {
  const MAX_STARS = 5;

  const votesNumber = Number(Number(votes) / 2);
  const votesNumberInt = votesNumber.toFixed();

  const decimalVotes = votesNumber - votesNumber.toFixed();
  const resultDecimal = decimalVotes >= 0.25 ? 1 : 0;
  const hasDecimalVotes = Boolean(resultDecimal);

  const positiveVotes = Array.from({ length: votesNumberInt });
  const votesEmpty = Array.from({ length: MAX_STARS - votesNumberInt - resultDecimal });

  return (
    <Container>
      {positiveVotes.map(() => (
        <FilledStar key={nanoid()} />
      ))}
      {hasDecimalVotes && <HalfStar />}
      {votesEmpty.map(() => (
        <EmptyStar key={nanoid()} />
      ))}
    </Container>
  );
};

Rating.propTypes = {
  votes: PropTypes.string,
};

export default Rating;
