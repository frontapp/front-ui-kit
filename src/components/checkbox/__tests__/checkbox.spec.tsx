import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import {Checkbox} from '../checkbox';

describe('<Checkbox /> Spec', () => {
  describe('Snapshots', () => {
    it('should render an empty and disabled checkbox', () => {
      const view = render(<Checkbox onChange={jest.fn()} isChecked={false} isDisabled />);
      expect(view.container).toMatchSnapshot();
    });

    it('should render a checked and disabled checkbox', () => {
      const view = render(<Checkbox onChange={jest.fn()} isChecked isDisabled />);
      expect(view.container).toMatchSnapshot();
    });

    it('should render an indeterminate and disabled checkbox', () => {
      const view = render(<Checkbox onChange={jest.fn()} isChecked={false} isIndeterminate isDisabled />);
      expect(view.container).toMatchSnapshot();
    });

    it('should render an empty checkbox', () => {
      const view = render(<Checkbox onChange={jest.fn()} isChecked={false} />);
      expect(view.container).toMatchSnapshot();
    });

    it('should render a checked checkbox', () => {
      const view = render(<Checkbox onChange={jest.fn()} isChecked />);
      expect(view.container).toMatchSnapshot();
    });

    it('should render an indeterminate checkbox', () => {
      const view = render(<Checkbox onChange={jest.fn()} isIndeterminate isChecked={false} />);
      expect(view.container).toMatchSnapshot();
    });

    it('should render a checkbox with a label', () => {
      const view = render(<Checkbox onChange={jest.fn()} isChecked={false}>Label</Checkbox>);
      expect(view.container).toMatchSnapshot();
    });
  });

  it('should issue an onChange event with an argument "true" when the checkbox is unchecked', async () => {
    const user = userEvent.setup();
    const onChangeMock = jest.fn();
    const view = render(<Checkbox onChange={onChangeMock} isChecked={false}>Label</Checkbox>);
    await user.click(view.getByRole('checkbox'));
    expect(onChangeMock).toBeCalled();
    expect(onChangeMock.mock.lastCall[0]).toBe(true);
  });

  it('should issue an onChange event with an argument "false" when the checkbox is checked', async () => {
    const user = userEvent.setup();
    const onChangeMock = jest.fn();
    const view = render(<Checkbox onChange={onChangeMock} isChecked>Label</Checkbox>);
    await user.click(view.getByRole('checkbox'));
    expect(onChangeMock).toBeCalled();
    expect(onChangeMock.mock.lastCall[0]).toBe(false);
  });

  it('should issue an onChange event with an argument "true" when the checkbox is indeterminate', async () => {
    const user = userEvent.setup();
    const onChangeMock = jest.fn();
    const view = render(<Checkbox onChange={onChangeMock} isChecked={false} isIndeterminate>Label</Checkbox>);
    await user.click(view.getByRole('checkbox'));
    expect(onChangeMock).toBeCalled();
    expect(onChangeMock.mock.lastCall[0]).toBe(true);
  });

  it('should not issue an onChange event when the checkbox is disabled', async () => {
    const user = userEvent.setup();
    const onChangeMock = jest.fn();
    const view = render(<Checkbox onChange={onChangeMock} isChecked isDisabled>Label</Checkbox>);
    await user.click(view.getByRole('checkbox'));
    expect(onChangeMock).not.toBeCalled();
  });
});
