import {render} from '@testing-library/react';
import React from 'react';

import {palette} from '../../../helpers/colorHelpers';
import {Paragraph} from '../paragraph';

describe('<Paragraph /> Spec', () => {
  describe('Snapshots', () => {
    it('should render a paragraph with defaults', () => {
      const view = render(
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at mattis lorem, id varius sem. Praesent commodo
          eu ex sit amet cursus
        </Paragraph>
      );
      expect(view.container).toMatchSnapshot();
    });

    it('should render a paragraph with a bold font', () => {
      const view = render(
        <Paragraph isBold>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at mattis lorem, id varius sem. Praesent commodo
          eu ex sit amet cursus
        </Paragraph>
      );
      expect(view.container).toMatchSnapshot();
    });

    it('should render a paragraph with a colored font', () => {
      const view = render(
        <Paragraph color={palette.green.shade40}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at mattis lorem, id varius sem. Praesent commodo
          eu ex sit amet cursus
        </Paragraph>
      );
      expect(view.container).toMatchSnapshot();
    });
  });
});
