import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC} from 'react';
import styled from 'styled-components';

import {DropdownItem} from '../../../..';
import {Button} from '../../../../components/button/button';
import {Dropdown} from '../../../../components/dropdown/dropdown';
import {DropdownCoordinator} from '../../../../components/dropdown/dropdownCoordinator';
import {DropdownItemIcon} from '../../../../components/dropdown/dropdownItemIcon';
import {Icon} from '../../../../components/icon/icon';
import {greys, palette} from '../../../../helpers/colorHelpers';
import {DefaultStyleProvider} from '../../../../utils/defaultStyleProvider';
import {PluginFooter} from '../pluginFooter';
import {PluginHeader} from '../pluginHeader';
import {PluginLayout} from '../pluginLayout';

/*
 * Component.
 */

const StyledLayoutWrapperDiv = styled.div`
  width: 400px;
  height: 600px;
  background: ${greys.white};
`;

const StyledPluginContentDiv = styled.div`
  padding: 16px;
  white-space: pre-wrap;
`;

const ShowcaseComponent: FC = props => (
  <DefaultStyleProvider>
    <StyledLayoutWrapperDiv>
      <PluginLayout>
        <PluginHeader
          onBackClick={() => console.log('On back click')}
          actions={(
            <DropdownCoordinator
              placement="bottom-end"
              renderButton={isDropdownOpen => (
                <Button type="icon" isActive={isDropdownOpen}>
                  <Icon name="EllipsisHorizontal" />
                </Button>
              )}
              renderDropdown={() => (
                <Dropdown maxHeight={70} maxWidth={175}>
                  <DropdownItem>
                    <DropdownItemIcon iconName="Checkmark" color={palette.green.shade40} />
                    Approve Request
                  </DropdownItem>
                  <DropdownItem>
                    <DropdownItemIcon iconName="Close" color={palette.red.shade40} />
                    Cancel Request
                  </DropdownItem>
                </Dropdown>
              )}
            />
          )}
        >
          Sub-level Plugin Page
        </PluginHeader>
        <StyledPluginContentDiv>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at mattis lorem, id varius sem. Praesent commodo
          eu ex sit amet cursus. Sed condimentum tortor urna, ut dapibus odio vehicula a. Quisque nec odio lorem. In hac habitasse
          platea dictumst. Mauris dictum varius ultrices. Morbi sed lacus auctor, blandit enim ac, dignissim libero. Praesent a
          massa augue. Sed turpis dui, accumsan sed tristique in, tincidunt nec metus. In nec vehicula est. Maecenas venenatis
          tincidunt congue. Ut at fermentum urna. Sed vestibulum mattis dapibus.
          <br /><br />
          Donec dictum ut odio at auctor. In laoreet nisi id quam pharetra, in porttitor quam finibus. Donec risus eros,
          fermentum ac metus at, lobortis facilisis nunc. Nulla facilisi. Nam vitae elementum tellus. Integer tristique tincidunt
          libero non tristique. Nulla porttitor, leo ut sagittis varius, neque metus fermentum ligula, sit amet bibendum tortor
          dolor et lorem. Maecenas vestibulum tristique efficitur. Integer vel malesuada dui. Morbi et fermentum lectus. Vivamus
          imperdiet, magna ac convallis tincidunt, ipsum sapien lacinia erat, et sollicitudin felis diam sit amet justo. Donec
          est magna, porttitor sed rhoncus ac, malesuada mollis erat. Suspendisse potenti. Sed ullamcorper iaculis porta.
          <br /><br />
          Duis fringilla, turpis sed suscipit imperdiet, felis libero laoreet sem, a semper eros purus vel sem. Quisque tincidunt
          ex at est tincidunt, lobortis ullamcorper metus lobortis. Sed hendrerit posuere erat. Donec quis risus ligula. Morbi
          maximus lacus turpis, ac gravida neque gravida ac. Cras vel sem tortor. Nam sed erat eu mi imperdiet gravida non ut dui.
          Integer non massa lobortis, ornare risus sit amet, rutrum orci. Suspendisse potenti. Pellentesque pulvinar, metus ut tempor
          interdum, lacus turpis pharetra magna, quis viverra purus dolor vitae felis. Sed ullamcorper risus ut ante fermentum, non
          rutrum magna euismod. Quisque id scelerisque erat.
          <br /><br />
          Sed gravida ullamcorper nisl. Donec tempus tempus dolor, vel auctor odio gravida iaculis. Ut facilisis sem et sem
          faucibus, sed ultricies justo tempus. Vestibulum vulputate vestibulum dui ut cursus. Nullam interdum vehicula consequat.
          Nulla gravida volutpat orci ac rhoncus. Nulla sagittis ante a libero viverra porttitor. Fusce et porttitor sem. Proin
          odio tellus, ornare eu euismod at, accumsan vel turpis. Curabitur congue, quam sed pretium pharetra, sem erat auctor libero,
          placerat aliquam enim eros sed lectus. Sed tincidunt magna vitae tortor auctor vestibulum.
        </StyledPluginContentDiv>
        <PluginFooter>
          Plugin Footer
        </PluginFooter>
      </PluginLayout>
    </StyledLayoutWrapperDiv>
  </DefaultStyleProvider>
);

/*
 * Storybook.
 */

export default {
  title: 'Misc/Plugin Layout',
  component: ShowcaseComponent
} as ComponentMeta<typeof ShowcaseComponent>;

const Template: ComponentStory<typeof ShowcaseComponent> = () => <ShowcaseComponent />;
export const SubLevel = Template.bind({});
SubLevel.parameters = {
  controls: {hideNoControlsWarning: true}
};
