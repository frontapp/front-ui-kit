import { FC } from 'react';
import styled, { css, keyframes } from 'styled-components';

import loader from '../../assets/images/loader.png';
import loaderGrey from '../../assets/images/loaderGrey.png';
import loaderGreySmall from '../../assets/images/loaderGreySmall.png';
import loaderSmall from '../../assets/images/loaderSmall.png';
import { PaletteColorsEnum } from '../../helpers/colorHelpers';
import { VisualSizesEnum } from '../../helpers/fontHelpers';
import { makeSizeConstants } from '../../helpers/styleHelpers';

/*
 * Props.
 */

interface LoaderProps {
  className?: string;
  /** Size of the loader. */
  size?: VisualSizesEnum;
  /** Color scheme of the loader. */
  color?: PaletteColorsEnum.GREY | PaletteColorsEnum.BLUE;
  /** Whether or not the loader rotates. */
  isAnimated?: boolean;
}

const defaultProps = {
  size: VisualSizesEnum.LARGE,
  color: PaletteColorsEnum.BLUE,
  isAnimated: true
} as const;

/*
 * Style.
 */

const sizes = makeSizeConstants(16, 20, 40);
const images = {
  [PaletteColorsEnum.BLUE]: makeSizeConstants(loaderSmall, loaderSmall, loader),
  [PaletteColorsEnum.GREY]: makeSizeConstants(loaderGreySmall, loaderGreySmall, loaderGrey)
};

interface LoaderStyleProps {
  $size: VisualSizesEnum;
  $variant: PaletteColorsEnum.GREY | PaletteColorsEnum.BLUE;
  $isEnabled: boolean;
}
const StyledLoaderDiv = styled.div<LoaderStyleProps>`
  width: ${(p) => sizes[p.$size]}px;
  height: ${(p) => sizes[p.$size]}px;
  background-image: url(${(p) => images[p.$variant][p.$size]});
  background-size: ${(p) => sizes[p.$size]}px;

  ${(p) => maybeAnimate(p.$isEnabled)};
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

function maybeAnimate(isEnabled: boolean) {
  if (!isEnabled) return '';

  return css`
    animation: ${rotate360} 0.6s linear infinite;
  `;
}

/*
 * Component.
 */

export const Loader: FC<LoaderProps> = (props) => (
  <StyledLoaderDiv
    $size={props.size ?? defaultProps.size}
    $variant={props.color ?? defaultProps.color}
    $isEnabled={props.isAnimated ?? defaultProps.isAnimated}
    className={props.className}
    data-testid="loader"
  />
);
