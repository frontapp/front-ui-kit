import {FC, PropsWithChildren} from 'react';
import styled, {css} from 'styled-components';

import {Icon, IconName} from '../../elements/icon/icon';
import {greys, palette} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../helpers/fontHelpers';
import {GridAreaItem} from '../../layout/grid';
import {Button} from '../button/button';
import {TopBannersEnum} from './topBannersContext';

/*
 * Props.
 */

interface TopBannerProps {
  type: TopBannersEnum;
  onDismissClick: () => void;
}

/*
 * Style.
 */

interface BannerConstants {
  iconColor: string;
  backgroundColor: string;
  icon: IconName;
}
const bannerConstants: {[k in TopBannersEnum]: BannerConstants} = {
  [TopBannersEnum.INFO]: {
    backgroundColor: palette.blue.shade20,
    iconColor: palette.blue.shade40,
    icon: 'InfoFilled'
  },
  [TopBannersEnum.LOADING]: {
    backgroundColor: greys.shade40,
    iconColor: greys.shade40,
    icon: 'InfoFilled'
  },
  [TopBannersEnum.SUCCESS]: {
    backgroundColor: palette.green.shade20,
    iconColor: palette.green.shade40,
    icon: 'CheckmarkCircle'
  },
  [TopBannersEnum.ERROR]: {
    backgroundColor: palette.red.shade20,
    iconColor: palette.red.shade40,
    icon: 'WarningFilled'
  },
  [TopBannersEnum.WARNING]: {
    backgroundColor: palette.orange.shade20,
    iconColor: palette.orange.shade40,
    icon: 'WarningFilled'
  }
};

const StyledDiv = styled.div<{$styles: BannerConstants}>`
  border-radius: 18px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  left: 50%;
  top: 16px;
  position: absolute;
  transform: translateX(-50%);
  font-family: ${fonts.system};

  display: inline-grid;
  grid-template-areas: '. icon . text . close .';
  grid-template-columns: 12px 16px 10px auto 4px auto 4px;
  align-items: center;

  ${(p) => css`
    background-color: ${p.$styles.backgroundColor};
  `}
`;

const StyledTextDiv = styled.div`
  grid-area: text;
  font-size: ${fontSizes.verySmall};
  font-weight: ${fontWeights.medium};
  color: ${greys.shade80};
  padding: 9px 0;
  line-height: 1.4;
`;

/*
 * Component.
 */

export const TopBanner: FC<PropsWithChildren<TopBannerProps>> = (props) => {
  const bannerStyles = bannerConstants[props.type];

  return (
    <StyledDiv $styles={bannerStyles}>
      <GridAreaItem area="icon">
        <Icon name={bannerStyles.icon} color={bannerStyles.iconColor} />
      </GridAreaItem>
      <StyledTextDiv>{props.children}</StyledTextDiv>
      <GridAreaItem area="close">
        <Button type="icon" onClick={props.onDismissClick} isRounded>
          <Icon name="Close" />
        </Button>
      </GridAreaItem>
    </StyledDiv>
  );
};
