import styled from 'styled-components';
import { rem } from 'polished';
import { Link } from 'gatsby';

// Styles
import { media } from 'utils/styles/media';

const Button = styled(Link)`
  font-weight: 600;
  font-size: ${rem('14px')};

  width: 100%;
  display: block;

  text-align: center;
  transition: all 400ms ease;
  padding: ${rem('18px')} ${rem('24px')};

  color: #fff;
  background-color: ${(props) => props.theme.blue};

  &:hover {
    transform: translate3d(0px, -1px, 0px);
  }

  @media ${media.desktop} {
    width: auto;
    display: inline-block;
  }
`;

export default Button;
