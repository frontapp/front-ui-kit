import {range} from 'lodash';
import {DateTime} from 'luxon';
import React, {FC, MouseEventHandler} from 'react';
import styled from 'styled-components';

import {Icon} from '../../elements/icon/icon';
import {greys} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../helpers/fontHelpers';
import {Button} from '../button/button';

/*
 * Props.
 */

interface DatePickerHeaderProps {
  value: DateTime;
  onFocusPreviousMonth: MouseEventHandler;
  onFocusNextMonth: MouseEventHandler;
}

/*
 * Style.
 */

const StyledCalendarHeader = styled.header`
  width: inherit;
  background: ${greys.white};
  padding: 4px 0px;
  display: grid;
  grid-auto-columns: auto;
  grid-template-rows: auto;
  justify-content: center;
  justify-items: center;
  align-items: center;
`;

const StyledLeftButtonDiv = styled.div`
  grid-column: 1;
  grid-row: 1;
`;

const StyledRightButtonDiv = styled.div`
  grid-column: 3;
  grid-row: 1;
`;

const StyledTitleDiv = styled.div`
  font-family: ${fonts.system};
  font-size: ${fontSizes.medium};
  font-weight: ${fontWeights.normal};
  line-height: 16px;
  grid-column: 2;
  grid-row: 1;
  margin: 0 5px;
  color: ${greys.shade70};
  text-transform: capitalize;
`;

const StyledInvisibleDiv = styled(StyledTitleDiv)`
  opacity: 0;
`;

/*
 * Component.
 */

export const DatePickerHeader: FC<DatePickerHeaderProps> = (props) => {
  const {value = DateTime.now(), onFocusPreviousMonth, onFocusNextMonth} = props;
  return (
    <StyledCalendarHeader>
      <StyledLeftButtonDiv>
        <Button type="icon" onClick={onFocusPreviousMonth}>
          <Icon name="ChevronLeft" />
        </Button>
      </StyledLeftButtonDiv>
      {renderAllMonths(value)}
      <StyledTitleDiv data-testid="value">{renderMonth(value)}</StyledTitleDiv>
      <StyledRightButtonDiv>
        <Button type="icon" onClick={onFocusNextMonth}>
          <Icon name="ChevronRight" />
        </Button>
      </StyledRightButtonDiv>
    </StyledCalendarHeader>
  );
};

/*
 * Helpers
 */

/** Render all months in the year at opacity 0 for spacing. */
function renderAllMonths(focusedMonth: DateTime) {
  return range(1, 13).map((m) => {
    const month = focusedMonth.set({month: m});
    return <StyledInvisibleDiv key={m}>{renderMonth(month)}</StyledInvisibleDiv>;
  });
}

function renderMonth(month: DateTime) {
  return `${month.monthLong} ${month.year}`;
}
