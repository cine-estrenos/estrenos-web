import React from 'react';
import { withTheme } from 'styled-components';

const User = ({ theme, ...props }) => (
  <svg height={36} viewBox="0 0 1000 1000" width={36} {...props}>
    <path
      d="M500 10C228.8 10 10 228.8 10 500c0 271.3 218.8 490 490 490 271.3 0 490-218.8 490-490S771.3 10 500 10zm304.5 812C794 657.5 619 613.8 619 613.8s106.8-71.8 68.3-217c-19.3-75.3-91-131.3-189-131.3s-169.7 56-189 131.3c-38.5 145.2 68.2 217 68.2 217S202.5 652.3 192 822C109.7 739.7 57.3 626 57.3 500 57.3 255 255 57.3 500 57.3S942.8 255 942.8 500c0 126-52.6 239.7-138.3 322z"
      fill={theme.text}
    />
  </svg>
);

export default withTheme(User);
