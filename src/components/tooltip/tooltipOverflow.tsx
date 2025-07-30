import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { useMeasureElement } from '../../helpers/hookHelpers';

/*
 * Props.
 */

interface TooltipOverflowProps {
  /** Children that could overflow to render. */
  children: React.ReactNode;
  /** When the condition changes, this will update with that latest overflow information. */
  onConditionChange: (isConditionPassed: boolean) => void;
}

/*
 * Style.
 */

const StyledTooltipOverflowDiv = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/*
 * Component.
 */

export const TooltipOverflow: FC<TooltipOverflowProps> = (props) => {
  const { children, onConditionChange } = props;
  const overflowHTMLRef = useRef<HTMLDivElement | null>(null);
  const [overflowRef, { width }] = useMeasureElement();

  useEffect(() => {
    const currentOverflow = overflowHTMLRef.current;
    if (!currentOverflow) {
      onConditionChange(false);
      return;
    }
    onConditionChange(currentOverflow.scrollWidth > currentOverflow.offsetWidth);
  }, [onConditionChange, overflowRef, width]);

  return (
    <StyledTooltipOverflowDiv
      ref={(ref) => {
        overflowRef(ref);
        overflowHTMLRef.current = ref;
      }}>
      {children}
    </StyledTooltipOverflowDiv>
  );
};
