import {render} from '@testing-library/react';
import React from 'react';

import {VisualSizesEnum} from '../../../helpers/fontHelpers';
import {Avatar} from '../avatar';

describe('<Avatar /> Spec', () => {
  describe('Snapshots', () => {
    it('should render avatar with name and color should always be the same', () => {
      const view = render(<Avatar name="John Doe" />);
      expect(view.container).toMatchSnapshot();
    });

    it('should render small avatar with a single initial', () => {
      const view = render(<Avatar name="John Doe" size={VisualSizesEnum.SMALL} />);
      expect(view.container).toMatchSnapshot();
    });

    it('should render large avatar', () => {
      const view = render(<Avatar name="John Doe" size={VisualSizesEnum.LARGE} />);
      expect(view.container).toMatchSnapshot();
    });

    it('should render an image avatar', () => {
      const view = render(<Avatar name="John Doe" imgSrc="https://picsum.photos/id/1062/200/200" />);
      expect(view.container).toMatchSnapshot();
    });
  });
});
