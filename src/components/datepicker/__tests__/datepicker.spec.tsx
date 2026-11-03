import {fireEvent, render, screen} from '@testing-library/react';
import React from 'react';

import {DatePicker} from '../datepicker';

function selectDayAndClickDone(day: string, value: Date, minDate?: Date, maxDate?: Date) {
  const onChange = jest.fn();
  render(
    <DatePicker
      type="dateAndTime"
      value={value}
      minDate={minDate}
      maxDate={maxDate}
      onChange={onChange}
      onRequestClose={() => {}}
    />
  );
  fireEvent.click(screen.getByText(day));
  fireEvent.click(screen.getByText('Done'));
  return onChange;
}

describe('<DatePicker /> Spec', () => {
  it('should select a day that starts before minDate, using minDate as the time', () => {
    const minDate = new Date(2026, 5, 17, 15, 0);
    const onChange = selectDayAndClickDone('17', new Date(2026, 5, 10, 9, 0), minDate);
    expect(onChange).toHaveBeenCalledWith(minDate);
  });

  it('should select a day that ends after maxDate, using maxDate as the time', () => {
    const maxDate = new Date(2026, 5, 20, 9, 0);
    const onChange = selectDayAndClickDone('20', new Date(2026, 5, 10, 18, 0), undefined, maxDate);
    expect(onChange).toHaveBeenCalledWith(maxDate);
  });

  it('should keep the selected time when it is inside the range', () => {
    const minDate = new Date(2026, 5, 17, 8, 0);
    const onChange = selectDayAndClickDone('17', new Date(2026, 5, 10, 9, 30), minDate);
    expect(onChange).toHaveBeenCalledWith(new Date(2026, 5, 17, 9, 30));
  });

  it('should ignore days entirely before minDate', () => {
    const minDate = new Date(2026, 5, 17, 15, 0);
    const value = new Date(2026, 5, 10, 9, 0);
    const onChange = selectDayAndClickDone('16', value, minDate);
    expect(onChange).toHaveBeenCalledWith(value);
  });
});
