import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import {Textarea} from '../textarea';

describe('<Textarea /> Spec', () => {
  describe('Snapshots', () => {
    it('should render an empty and disabled textarea', () => {
      const view = render(<Textarea rows={5} isDisabled id="id" placeholder="Placeholder" />);
      expect(view.container).toMatchSnapshot();
    });

    it('should render a filled and disabled textarea', () => {
      const view = render(<Textarea rows={5} isDisabled id="id" value="Test" />);
      expect(view.container).toMatchSnapshot();
    });

    it('should render a filled textarea', () => {
      const view = render(<Textarea rows={5} id="id" value="Test" />);
      expect(view.container).toMatchSnapshot();
    });

    it('should render a textarea with an error', () => {
      const view = render(<Textarea rows={5} isErred id="id" value="Test" />);
      expect(view.container).toMatchSnapshot();
    });

    it('should render a textarea which is resizable', () => {
      const view = render(<Textarea rows={5} shouldAllowResize id="id" value="Test" />);
      expect(view.container).toMatchSnapshot();
    });
  });

  it('should issue an onFocus when the textarea is clicked', async () => {
    const user = userEvent.setup();
    const onFocusMock = jest.fn();
    const view = render(<Textarea rows={5} id="id" placeholder="Placeholder" onFocus={onFocusMock} />);
    await user.click(view.getByRole('textbox'));
    expect(onFocusMock).toBeCalled();
  });

  it('should issue an onBlur when some part of the screen is clicked after the textarea is focused', async () => {
    const user = userEvent.setup();
    const onBlurMock = jest.fn();
    const view = render(<Textarea rows={5} id="id" placeholder="Placeholder" shouldFocus onBlur={onBlurMock} />);
    await user.click(view.container);
    expect(onBlurMock).toBeCalled();
  });

  it('should not issue an onFocus or an onBlur if the textarea is disabled', async () => {
    const user = userEvent.setup();
    const onFocusMock = jest.fn();
    const onBlurMock = jest.fn();
    const view = render(<Textarea rows={5} id="id" isDisabled placeholder="Placeholder" onFocus={onFocusMock} onBlur={onBlurMock} />);
    await user.click(view.getByRole('textbox'));
    expect(onFocusMock).not.toBeCalled();
    await user.click(view.container);
    expect(onBlurMock).not.toBeCalled();
  });

  it('should issue an onChange when the user types into the textarea', async () => {
    const user = userEvent.setup();
    const onChangeMock = jest.fn();
    const view = render(<Textarea rows={5} id="id" placeholder="Placeholder" onChange={onChangeMock} />);
    await user.type(view.getByRole('textbox'), "t");
    expect(onChangeMock).toBeCalled();
    expect(onChangeMock.mock.lastCall[0]).toBe("t");
  });

  it('should not issue an onChange when the user types into the textarea if the textarea is disabled', async () => {
    const user = userEvent.setup();
    const onChangeMock = jest.fn();
    const view = render(<Textarea rows={5} id="id" isDisabled placeholder="Placeholder" onChange={onChangeMock} />);
    await user.type(view.getByRole('textbox'), "t");
    expect(onChangeMock).not.toBeCalled();
  });
});
