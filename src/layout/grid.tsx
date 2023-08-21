import React, {FC, PropsWithChildren} from 'react';
import styled from 'styled-components';

/*
 * Props.
 */
interface GridAreaItemProps {
  area: string;
}

/*
 * Style.
 */

const GridAreaItemDiv = styled.div<{$area: string}>`
  grid-area: ${(p) => p.$area};
`;

/*
 * Component.
 */

export const GridAreaItem: FC<PropsWithChildren<GridAreaItemProps>> = (props) => (
  <GridAreaItemDiv $area={props.area}>{props.children}</GridAreaItemDiv>
);
