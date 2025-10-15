import { FC } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { palette,PaletteColorsEnum } from '../../helpers/colorHelpers';
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
const borderWidths = makeSizeConstants(2, 2, 3);

const colors = {
  [PaletteColorsEnum.BLUE]: palette[PaletteColorsEnum.BLUE].shade60,
  [PaletteColorsEnum.GREY]: palette[PaletteColorsEnum.GREY].shade60
};

interface LoaderStyleProps {
  $size: VisualSizesEnum;
  $variant: PaletteColorsEnum.GREY | PaletteColorsEnum.BLUE;
  $isEnabled: boolean;
}

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledLoaderDiv = styled.div<LoaderStyleProps>`
  width: ${(p) => sizes[p.$size]}px;
  height: ${(p) => sizes[p.$size]}px;
  padding: ${(p) => borderWidths[p.$size]}px;
  border-radius: 50%;
  background: ${(p) => colors[p.$variant]};
  -webkit-mask: conic-gradient(transparent 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask-composite: source-out;
  mask: conic-gradient(transparent 10%, #000), linear-gradient(#000 0 0) content-box;
  mask-composite: subtract;

  ${(p) => maybeAnimate(p.$isEnabled)};
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
