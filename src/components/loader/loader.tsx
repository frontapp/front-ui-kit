import React, {FC} from 'react';
import styled, {css, keyframes} from 'styled-components';

import loader from '../../assets/images/loader.png';
import loaderGrey from '../../assets/images/loaderGrey.png';
import loaderGreySmall from '../../assets/images/loaderGreySmall.png';
import loaderSmall from '../../assets/images/loaderSmall.png';
import {VisualSizesEnum} from '../../helpers/fontHelpers';
import {makeSizeConstants} from '../../helpers/styleHelpers';

/*
 * Props.
 */

export enum LoaderColorVariantsEnum {
  BLUE = 'BASE',
  GREY = 'GREY'
}

interface LoaderProps {
  className?: string;
  /** Size of the loader. */
  size?: VisualSizesEnum;
  /** Color scheme of the loader. */
  color?: LoaderColorVariantsEnum;
  /** Whether or not the loader rotates. */
  isEnabled?: boolean;
}

const defaultProps = {
  size: VisualSizesEnum.LARGE,
  variant: LoaderColorVariantsEnum.BLUE,
  isEnabled: true
};

/*
 * Style.
 */

const sizes = makeSizeConstants(16, 20, 40);
const images = {
  [LoaderColorVariantsEnum.BLUE]: makeSizeConstants(loaderSmall, loaderSmall, loader),
  [LoaderColorVariantsEnum.GREY]: makeSizeConstants(loaderGreySmall, loaderGreySmall, loaderGrey)
};

interface LoaderStyleProps {
  $size: VisualSizesEnum;
  $variant: LoaderColorVariantsEnum;
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
    $variant={props.color ?? defaultProps.variant}
    $isEnabled={props.isEnabled ?? defaultProps.isEnabled}
    className={props.className}
    data-testid="loader"
  />
);
