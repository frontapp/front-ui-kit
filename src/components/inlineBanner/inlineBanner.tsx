import React, {FC, PropsWithChildren, ReactNode} from 'react';
import styled, {css} from 'styled-components';

import {Icon, IconName} from '../../elements/icon/icon';
import {greys, palette} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights, VisualSizesEnum} from '../../helpers/fontHelpers';
import {makeSizeConstants} from '../../helpers/styleHelpers';
import {IconButton} from '../button/iconButton';

/*
 * Props.
 */

export type InlineBannerTypes = 'info' | 'success' | 'error' | 'warning';

interface InlineBannerProps {
  /** Type of banner */
  type: InlineBannerTypes;
  /** Size of the banner */
  size: VisualSizesEnum;
  /** Title to render for the banner. */
  title: ReactNode;
  onClose?: () => void;
}

interface BannerConstants {
  iconColor: string;
  backgroundColor: string;
  icon: IconName;
}

const bannerConstants: Record<InlineBannerTypes, BannerConstants> = {
  info: {
    backgroundColor: palette.blue.shade20,
    iconColor: palette.blue.shade40,
    icon: 'InfoFilled'
  },
  success: {
    backgroundColor: palette.green.shade20,
    iconColor: palette.green.shade40,
    icon: 'CheckmarkCircle'
  },
  error: {
    backgroundColor: palette.red.shade20,
    iconColor: palette.red.shade40,
    icon: 'WarningFilled'
  },
  warning: {
    backgroundColor: palette.orange.shade20,
    iconColor: palette.orange.shade50,
    icon: 'WarningFilled'
  }
};

/*
 * Style.
 */

interface BannerInlineActionStyleProps {
  $hasInlineActionsWithClose?: boolean;
}

interface BannerIconStyleProps {
  $type: InlineBannerTypes;
}
interface BannerInsideCardStyleProps {
  $hasSmallBorderRadius?: boolean;
  $hasColorfulText?: boolean;
  $isNewDesign?: boolean;
}
interface BannerSizeStyleProps {
  $size: VisualSizesEnum;
}
interface BannerStyleProps
  extends BannerIconStyleProps,
    BannerInsideCardStyleProps,
    BannerSizeStyleProps,
    BannerInlineActionStyleProps {
  $hasImage?: boolean;
  $hasContent?: boolean;
  $hasInlineActions?: boolean;
  $hasCloseInSmall?: boolean;
  $hasTitle?: boolean;
}

const bannerFontSizes = makeSizeConstants(fontSizes.verySmall, fontSizes.medium);
const bannerLineHeights = makeSizeConstants('18px', '20px');
const bannerBorderRadii = makeSizeConstants('8px', '16px');

const StyledBannerDiv = styled.div<BannerStyleProps>`
  ${p => css`
    font-family: ${fonts.system};
    background-color: ${bannerConstants[p.$type].backgroundColor};
    color: ${bannerConstants[p.$type].iconColor};
    position: relative;

    grid-column-gap: 9px;
    align-items: flex-start;
    ${addGridStyles(p)};
    ${addPaddingStyles(p)};
    ${addBorderRadiusStyles(p)}
    ${p.$hasCloseInSmall &&
    css`
      padding-right: 36px;
    `}
  `}
`;

function addGridStyles(props: BannerStyleProps) {
  if (props.$hasImage)
    return css`
      display: grid;
      grid-template-columns: auto 1fr 40%;
      grid-template-areas:
        'icon title image'
        '. content image'
        'footer footer image';
    `;

  if (props.$hasInlineActionsWithClose)
    return css`
      display: flex;
      align-items: center;
      flex-flow: row;
      flex-wrap: wrap;
    `;

  if (props.$hasInlineActions)
    return css`
      display: grid;
      align-items: center;
      grid-template-columns: auto 1fr auto;
      grid-template-areas:
        'icon title actions'
        '. content .';
    `;

  if (!props.$hasTitle)
    return css`
      display: grid;
      grid-template-columns: auto 1fr max-content;
      grid-template-areas:
        'icon content content'
        '. content content'
        'footer footer .';
    `;

  return css`
    display: grid;
    grid-template-columns: auto 1fr max-content;
    grid-template-areas:
      'icon title title'
      '. content .'
      'footer footer .';
  `;
}

function addBorderRadiusStyles(props: BannerStyleProps) {
  if (props.$hasSmallBorderRadius)
    return css`
      border-radius: ${bannerBorderRadii.small};
    `;

  return css`
    border-radius: ${bannerBorderRadii.medium};
  `;
}

function addPaddingStyles(props: BannerStyleProps) {
  if (props.$size === VisualSizesEnum.MEDIUM || props.$size === VisualSizesEnum.LARGE)
    return css`
      padding: 20px;
    `;

  if (props.$hasInlineActions)
    return css`
      padding: 6px 12px;
    `;

  return css`
    padding: 9px 12px;
  `;
}

interface BannerTitleStyleProps
  extends BannerInsideCardStyleProps,
    BannerSizeStyleProps,
    BannerInlineActionStyleProps {
  $isBold?: boolean;
}
const StyledTitleDiv = styled.div<BannerTitleStyleProps>`
  ${p => css`
    grid-area: title;
    color: ${greys.shade80};
    font-weight: ${p.$isBold ? fontWeights.bold : fontWeights.normal};
    line-height: 20px;
    font-size: ${bannerFontSizes[p.$size]};
  `}

  ${p =>
    p.$hasInlineActionsWithClose &&
    css`
      flex: 1;
      min-width: 65%;
    `}
`;

interface BannerContentProps extends BannerInsideCardStyleProps, BannerSizeStyleProps {
  $hasTitle: boolean;
}
const StyledContentDiv = styled.div<BannerContentProps>`
  ${p => css`
    grid-area: content;
    line-height: ${bannerLineHeights[p.$size]};
    color: ${greys.shade80};
    font-size: ${bannerFontSizes[p.$size]};
    margin-top: 8px;

    ul,
    ol {
      padding: 0;
      margin-top: 0;
      margin-bottom: 0;
    }
  `}
`;

const StyledIconDiv = styled.div<BannerIconStyleProps>`
  grid-area: icon;
  color: ${p => bannerConstants[p.$type].iconColor};
  margin-top: 2px;
`;

const StyledCloseButton = styled(IconButton)`
  position: absolute;
  top: 5px;
  right: 5px;

  &:hover svg {
    color: ${greys.shade80};
  }
`;

/*
 * Component.
 */

export const InlineBanner: FC<PropsWithChildren<InlineBannerProps>> = props => {
  const hasMoreThanTitle = Boolean(props.title && props.children);
  const actualSize = props.size;
  const hasInlineActions = false;
  const hasInlineActionsWithClose = hasInlineActions && Boolean(props.onClose);

  return (
    <StyledBannerDiv
      $size={actualSize}
      $type={props.type}
      $hasContent={hasMoreThanTitle}
      $hasColorfulText={false}
      $hasSmallBorderRadius
      $hasInlineActions={hasInlineActions}
      $hasInlineActionsWithClose={hasInlineActionsWithClose}
      $hasImage={false}
      $hasCloseInSmall={props.onClose && actualSize === VisualSizesEnum.SMALL}
      $hasTitle={Boolean(props.title)}
    >
      {props.onClose && (
        <StyledCloseButton onClick={props.onClose} iconColor={greys.shade80}>
          <Icon name="Close" />
        </StyledCloseButton>
      )}
      <StyledIconDiv $type={props.type}>
        <Icon color={bannerConstants[props.type].iconColor} name={bannerConstants[props.type].icon} />
      </StyledIconDiv>
      {props.title && (
        <StyledTitleDiv
          $size={actualSize}
          $hasColorfulText={false}
          $hasSmallBorderRadius
          $isBold={hasMoreThanTitle}
          $hasInlineActionsWithClose={hasInlineActionsWithClose}
        >
          {props.title}
        </StyledTitleDiv>
      )}
      {props.children && (
        <StyledContentDiv
          $size={actualSize}
          $hasColorfulText={false}
          $hasSmallBorderRadius
          $hasTitle={Boolean(props.title)}
        >
          {props.children}
        </StyledContentDiv>
      )}
    </StyledBannerDiv>
  );
};
