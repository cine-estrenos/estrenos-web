import styled from 'styled-components'
import { rem, rgba } from 'polished'

// Styles
import { media } from 'utils/styles/media'

export const Form = styled.form`
  display: flex;

  @media ${media.tablet} {
    width: ${rem('290px')};
  }
`

export const Input = styled.input`
  all: unset;
  flex: 1;
  font-size: ${rem('16px')};
  padding: ${rem('18px')} ${rem('20px')};
  background-color: ${props => props.theme.grey};

  ::placeholder {
    color: ${rgba('#000', 0.3)};
  }
`
