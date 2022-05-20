import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import {Input} from '../input';

describe('<Checkbox /> Spec', () => {
  describe('Snapshots', () => {
    it('should render an empty and disabled input', () => {
      const view = render(<Input isDisabled id="id" placeholder="Placeholder" />);
      expect(view.container).toMatchSnapshot();
    });

    it('should render a filled and disabled input', () => {
      const view = render(<Input isDisabled id="id" value="Test" />);
      expect(view.container).toMatchSnapshot();
    });

    it('should render an input with an error', () => {
      const view = render(<Input isErred id="id" value="Test" />);
      expect(view.container).toMatchSnapshot();
    });

    it('should render an input with an icon', () => {
      const view = render(<Input iconName="CheckmarkBox" id="id" value="Test" />);
      expect(view.container).toMatchSnapshot();
    });

    it('should render an input of type number', () => {
      const view = render(<Input iconName="CheckmarkBox" id="id" type="number" value={3} />);
      expect(view.container).toMatchSnapshot();
    });

    it('should render an input of type email', () => {
      const view = render(<Input iconName="CheckmarkBox" id="id" type="email" value="hello@gmail.com" />);
      expect(view.container).toMatchSnapshot();
    });
  });

  it('should issue an onFocus when the input is clicked', async () => {
    const user = userEvent.setup();
    const onFocusMock = jest.fn();
    const view = render(<Input id="id" placeholder="Placeholder" onFocus={onFocusMock} />);
    await user.click(view.getByRole('textbox'));
    expect(onFocusMock).toBeCalled();
  });

  it('should issue an onBlur when some part of the screen is clicked after the input is focused', async () => {
    const user = userEvent.setup();
    const onBlurMock = jest.fn();
    const view = render(<Input id="id" placeholder="Placeholder" shouldFocus onBlur={onBlurMock} />);
    await user.click(view.container);
    expect(onBlurMock).toBeCalled();
  });

  it('should not issue an onFocus or an onBlur if the input is disabled', async () => {
    const user = userEvent.setup();
    const onFocusMock = jest.fn();
    const onBlurMock = jest.fn();
    const view = render(<Input id="id" isDisabled placeholder="Placeholder" onFocus={onFocusMock} onBlur={onBlurMock} />);
    await user.click(view.getByRole('textbox'));
    expect(onFocusMock).not.toBeCalled();
    await user.click(view.container);
    expect(onBlurMock).not.toBeCalled();
  });

  it('should issue an onChange when the user types into the input', async () => {
    const user = userEvent.setup();
    const onChangeMock = jest.fn();
    const view = render(<Input id="id" placeholder="Placeholder" onChange={onChangeMock} />);
    await user.type(view.getByRole('textbox'), "t");
    expect(onChangeMock).toBeCalled();
    expect(onChangeMock.mock.lastCall[0]).toBe("t");
  });

  it('should not issue an onChange when the user types into the input if the input is disabled', async () => {
    const user = userEvent.setup();
    const onChangeMock = jest.fn();
    const view = render(<Input id="id" isDisabled placeholder="Placeholder" onChange={onChangeMock} />);
    await user.type(view.getByRole('textbox'), "t");
    expect(onChangeMock).not.toBeCalled();
  });
});
