import styled from 'styled-components';
import { StyledHead, StyledHeadCell, StyledRow, StyledCell } from 'baseui/table';
import { rgba, rem } from 'polished';

// Styles
import { media } from 'utils/styles/media';

export const Container = styled.div`
  display: grid;
  margin: ${rem('20px')} 0;

  @media ${media.desktop} {
    grid-gap: ${rem('65px')};
    grid-template-rows: 1fr 1fr;
    grid-template-columns: ${rem('500px')} 1fr;
  }

  .main {
    max-width: ${rem('440px')};
  }

  h2 {
    margin-bottom: ${rem('12px')};
  }

  .description {
    margin-bottom: ${rem('11px')};

    @media ${media.tablet} {
      margin-bottom: ${rem('21px')};
    }
  }

  .info {
    display: grid;
    margin-bottom: ${rem('16px')};
    grid-template-columns: repeat(2, minmax(${rem('120px')}, auto));

    @media ${media.tablet} {
      grid-row-gap: ${rem('28px')};
      grid-column-gap: ${rem('65px')};
      margin-bottom: ${rem('38px')};
    }

    .info-title {
      font-size: ${rem('12px')};
      text-transform: uppercase;
      margin-bottom: ${rem('9px')};
      color: ${({ theme }) => rgba(theme.text, 0.8)};
    }

    .info-value {
      font-size: ${rem('14px')};
      color: ${({ theme }) => theme.text};
    }

    .actors {
      grid-area: 3 / 1 / 4 / 3;
    }
  }

  .label {
    margin-bottom: ${rem('10px')};
  }

  .map-container {
    grid-area: 2 / 1 / 3 / 3;
    height: ${rem('600px')};
  }
`;

export const Header = styled.div`
  display: grid;
  grid-gap: ${rem('15px')};
  margin: ${rem('20px')} 0;

  @media ${media.tablet} {
    grid-template-columns: ${rem('210px')};
  }
`;

export const Body = styled.div`
  margin-bottom: ${rem('16px')};
`;

export const Poster = styled.img`
  border-radius: 6px;
`;

export const TableContainer = styled.div`
  height: ${rem('296px')};
`;

export const TableRow = styled(StyledRow)`
  cursor: ${({ selectable }) => (selectable ? 'pointer' : 'not-allowed')};

  &:hover {
    background-color: ${({ theme, selected }) => (selected ? 'auto' : theme.grey)};
  }

  ${({ theme, selected }) => {
    if (selected) return;

    return `
      background-color: ${selected ? theme.text : 'transparent'};
      [role='gridcell'] {
        color: ${selected ? theme.bg : theme.text};
      };
    `;
  }}
`;

export const TableHead = styled(StyledHead)`
  text-transform: uppercase;
`;

export const HeaderCell = styled(StyledHeadCell)`
  font-size: ${rem('10px')};

  @media ${media.tablet} {
    font-size: ${rem('12px')};
  }
`;

export const TimeHeadCell = styled(HeaderCell)`
  max-width: ${rem('110px')};
`;

export const TimeCell = styled(StyledCell)`
  max-width: ${rem('110px')};
`;

export const VersionHeadCell = styled(HeaderCell)`
  max-width: ${rem('130px')};
`;

export const VersionCell = styled(StyledCell)`
  max-width: ${rem('130px')};
`;

export const FormatHeadCell = styled(HeaderCell)`
  max-width: ${rem('130px')};
`;

export const FormatCell = styled(StyledCell)`
  max-width: ${rem('130px')};
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;

  .label {
    margin-bottom: 0;
    margin-top: ${rem('14px')};
  }
`;

export const StyledPopup = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.bg};
  border-radius: 2px;
  padding: ${rem('5px')};
`;
