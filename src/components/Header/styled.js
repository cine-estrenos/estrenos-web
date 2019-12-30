import styled from 'styled-components'
import { rem, rgba } from 'polished'

// Styles
import { media } from 'utils/styles/media'

export const Container = styled.header`
  display: grid;
  grid-gap: ${rem('20px')};
  grid-template-rows: minmax(0, auto) ${rem('290px')};

  @media ${media.desktop} {
    grid-gap: ${rem('100px')};
    grid-template-rows: ${rem('400px')};
    grid-template-columns: ${rem('400px')} 1fr;
  }

  @media ${media.tablet} {
    grid-gap: ${rem('40px')};
  }

  h2 {
    @media ${media.tablet} {
      font-size: ${rem('52px')};
    }
  }

  article {
    .info {
      font-weight: 600;
      font-size: ${rem('12px')};

      text-transform: uppercase;
      margin-bottom: ${rem('16px')};

      @media ${media.tablet} {
        margin-bottom: ${rem('38px')};
      }

      :not(.loader) {
        display: flex;
        align-items: center;
      }

      svg {
        transition: all 400ms ease;
      }
    }

    .description {
      height: auto;
      margin-bottom: ${rem('32px')};

      @media ${media.tablet} {
        margin-bottom: ${rem('56px')};
      }

      &.loader {
        height: ${rem('96px')};
      }
    }

    .btn-container {
      height: ${rem('57px')};
    }
  }

  figure {
    position: relative;

    &:hover {
      .overlay {
        background: url(${props => props.image}) ${props => rgba(props.theme.text, 0.1)};
        background-size: cover;

        .play {
          transform: scale(1.1);
        }
      }
    }

    video,
    .overlay {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      position: absolute;
    }

    video {
      object-fit: cover;
    }
  }
`

export const Overlay = styled.div.attrs({ className: 'overlay' })`
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 1;
  z-index: 1;
  cursor: pointer;
  transition: all 400ms ease;

  ${props => (props.hidden ? `opacity: 0;` : null)};
  background: url(${props => props.image}) ${props => rgba(props.theme.text, 0.2)};
  background-size: cover;
  background-blend-mode: color;

  .play {
    width: ${rem('120px')};
    transition: all 400ms ease;

    fill: ${props => rgba(props.theme.bg, 0.8)};
    ${props => (props.hidden ? `width: ${rem('100px')}` : null)};
  }
`
