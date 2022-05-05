import React, {FC} from 'react';
import styled, {css, keyframes} from 'styled-components';

import {greys} from '../../helpers/colorHelpers';

/*
 * Constants.
 */

const skeletonColorSchemes = {
  light: [greys.shade10, greys.shade20],
  dark: [greys.shade30, greys.shade40]
};

/*
 * Props.
 */

type SkeletonVariantTypes = 'light' | 'dark';

interface SkeletonProps {
  /** Class name to custom styling of the component. */
  className?: string;
  /** Width of the skeleton in px. Default is 100%. */
  width?: number;
  /** Height of the skeleton in px. Default is 16px. */
  height?: number;
  /** The color for the skeleton. Default is 'light' */
  variant?: SkeletonVariantTypes;
  /** Controls the border-radius of the skeleton. Default is 8px. */
  borderRadius?: string;
}

/*
 * Style.
 */

const skeletonKeyFrames = keyframes`
  from {
    left: -200px;
  }
  to {
    left: 100%;
  }
`;

interface StyledSkeletonDivProps {
  $width?: number;
  $height?: number;
  $borderRadius?: string;
  $variant: SkeletonVariantTypes;
}

const StyledSkeletonDiv = styled.div<StyledSkeletonDivProps>`
  position: relative;
  width: ${p => (p.$width ? `${p.$width}px` : '100%')};
  height: ${p => (p.$height ? `${p.$height}px` : '16px')};
  border-radius: ${p => (p.$borderRadius ? p.$borderRadius : '8px')};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 200px;
    height: 100%;
    background-size: 200px 100%;
    background-repeat: no-repeat;
    animation: ${skeletonKeyFrames} 1.5s ease-in-out infinite;
  }
  ${p => addSchemeStyles(p.$variant)};
`;

function addSchemeStyles(variant: SkeletonVariantTypes) {
  const [firstShade, secondShade] = skeletonColorSchemes[variant];

  return css`
    background-color: ${firstShade};

    &::before {
      background-image: linear-gradient(90deg, ${firstShade}, ${secondShade}, ${firstShade});
    }
  `;
}

/*
 * Component.
 */

export const Skeleton: FC<SkeletonProps> = props => {
  const {className, width, height, variant, borderRadius} = props;
  return <StyledSkeletonDiv className={className} $width={width} $height={height} $variant={variant || 'light'} $borderRadius={borderRadius} />;
};
