import styled from 'styled-components';
import ContentLoader from 'react-content-loader';

export const Skeleton = styled(ContentLoader)`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};

  rect {
    clip-path: none;
  }
`;

export const ResponsiveSkeleton = styled(ContentLoader)`
  width: 100%;
  height: 100%;

  rect {
    clip-path: none;
  }
`;
