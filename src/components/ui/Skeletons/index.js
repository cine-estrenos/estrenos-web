import styled from 'styled-components';
import ContentLoader from 'react-content-loader';

export const Skeleton = styled(ContentLoader).attrs(({ theme }) => ({
  primaryColor: theme.skeleton,
  secondaryColor: theme.bg,
}))`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};

  rect {
    width: 100%;
    height: 100%;
    clip-path: none;
  }
`;

export const ResponsiveSkeleton = styled(ContentLoader).attrs(({ theme }) => ({
  primaryColor: theme.skeleton,
  secondaryColor: theme.bg,
}))`
  width: 100%;
  height: 100%;

  rect {
    clip-path: none;
  }
`;
