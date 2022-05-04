import React, {FC, useMemo} from 'react';
import styled, {css} from 'styled-components';

import {greys, palette, PaletteColorsEnum} from '../../helpers/colorHelpers';
import {fonts, fontSizes, VisualSizesEnum} from '../../helpers/fontHelpers';
import {makeSizeConstants} from '../../helpers/styleHelpers';

/*
 * Constants.
 */

const avatarSizes = makeSizeConstants(16, 20, 30, 48);
const lineHeights = makeSizeConstants(16, 20, 30, 48);
const avatarFontSizes = makeSizeConstants(fontSizes.tiny, fontSizes.tiny, fontSizes.small, fontSizes.large);
const characterLimits = makeSizeConstants(1, 2);

/*
 * Props.
 */

interface AvatarProps {
  /** The name to use for the avatar. */
  name: string;
  /** If specified, we will render the image instead of initials. */
  imgSrc?: string;
  /** The size of the avatar. Defaults to VisualSizesEnum.LARGE. */
  size?: VisualSizesEnum;
}

/*
 * Style.
 */

interface StyledAvatarWrapperDivProps {
  $color: string;
  $size: VisualSizesEnum;
  $imgSrc?: string;
}

const StyledAvatarWrapperDiv = styled.div<StyledAvatarWrapperDivProps>`
  font-family: ${fonts.system};
  width: ${p => `${avatarSizes[p.$size]}px`};
  height: ${p => `${avatarSizes[p.$size]}px`};
  line-height: ${p => `${lineHeights[p.$size]}px`};
  font-size: ${p => avatarFontSizes[p.$size]};
  background: ${p => p.$color};
  border-radius: 50%;
  text-align: center;
  color: ${greys.white};

  ${p => addImageSrcStyles(p.$imgSrc)};
`;

function addImageSrcStyles(imgSrc?: string) {
  if (!imgSrc)
    return '';
  return css`
    background: transparent;
    background-image: url(${imgSrc});
    background-size: cover;
    background-position: center center;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  `;
}

/*
 * Component.
 */

export const Avatar: FC<AvatarProps> = props => {
  const {name, imgSrc, size = VisualSizesEnum.LARGE} = props;
  const avatarColor = useMemo(() => computeColorFromName(name.trim()), [name]);
  const initials = useMemo(() => computeInitialsFromName(name.trim(), size), [name, size]);

  return <StyledAvatarWrapperDiv $color={avatarColor} $size={size} $imgSrc={imgSrc}>{!imgSrc && initials}</StyledAvatarWrapperDiv>;
};

/*
 * Helpers.
 */

function computeColorFromName(name: string) {
  if (name.length === 0)
    return palette.blue.shade40;
  // Count the list of available colors and remove 1 since we do not allow grey as a default color.
  const availableColorsCount = Object.keys(palette).length - 1;
  const selectedColorIndex = ((name.length * name.charCodeAt(0) * name.charCodeAt(name.length - 1)) % availableColorsCount) + 1;

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const selectedColorPalette = Object.keys(palette)[selectedColorIndex] as PaletteColorsEnum;
  return palette[selectedColorPalette].shade40;
}

function computeInitialsFromName(name: string, size: VisualSizesEnum) {
  const initialLimits = characterLimits[size];
  return name.split(' ').map(word => word[0]).slice(0, initialLimits).join('');
}
