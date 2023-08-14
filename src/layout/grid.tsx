import styled from 'styled-components';

interface GridAreaItemProps {
  area: string;
}
export const GridAreaItem = styled.div<GridAreaItemProps>`
  grid-area: ${p => p.area};
`;
