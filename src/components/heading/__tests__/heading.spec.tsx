import {render} from '@testing-library/react';
import React from 'react';

import {VisualSizesEnum} from '../../../helpers/fontHelpers';
import {Heading} from '../heading';

describe('<Heading /> Spec', () => {
  describe('Snapshots', () => {
    it('should render a small heading', () => {
      const view = render(<Heading size={VisualSizesEnum.SMALL}>Small Heading</Heading>);
      expect(view.container).toMatchSnapshot();
    });

    it('should render a medium heading', () => {
      const view = render(<Heading size={VisualSizesEnum.MEDIUM}>Medium Heading</Heading>);
      expect(view.container).toMatchSnapshot();
    });

    it('should render a large heading', () => {
      const view = render(<Heading size={VisualSizesEnum.LARGE}>Large Heading</Heading>);
      expect(view.container).toMatchSnapshot();
    });

    it('should render a extra large heading', () => {
      const view = render(<Heading size={VisualSizesEnum.EXTRA_LARGE}>Extra Large Heading</Heading>);
      expect(view.container).toMatchSnapshot();
    });
  });
});
