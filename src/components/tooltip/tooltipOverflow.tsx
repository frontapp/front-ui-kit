import React, {FC, useLayoutEffect, useRef} from 'react';
import styled from 'styled-components';

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

export const TooltipOverflow: FC<TooltipOverflowProps> = props => {
  const {children, onConditionChange} = props;
  const overflowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const currentOverflow = overflowRef.current;
    if (!currentOverflow) {
      onConditionChange(false);
      return;
    }

    onConditionChange(currentOverflow.scrollWidth > currentOverflow.offsetWidth);
  }, [onConditionChange, overflowRef]);

  return <StyledTooltipOverflowDiv ref={overflowRef}>{children}</StyledTooltipOverflowDiv>;
};
