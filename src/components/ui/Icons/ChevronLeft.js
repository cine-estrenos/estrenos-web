import React from 'react';
import { withTheme } from 'styled-components';

const ChevronLeft = (props) => {
  return (
    <svg
      className="chevron-left"
      fill="none"
      height={24}
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width={24}
      {...props}
    >
      <path d="M15 18l-6-6 6-6" stroke={props.theme.text} />
    </svg>
  );
};

export default withTheme(ChevronLeft);
