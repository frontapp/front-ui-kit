import React, {FC, ReactNode} from 'react';
import styled from 'styled-components';

import {VisualSizesEnum} from '../../helpers/fontHelpers';

/*
 * Props.
 */

export type InfoBannerTypes = 'info' | 'success' | 'error' | 'warning';

interface InfoBannerProps {
  /** Type of banner */
  type: InfoBannerTypes;
  /** Size of the banner */
  size?: VisualSizesEnum;
  /** Title to render for the banner. */
  title: ReactNode;
  onClose?: () => void;
}

/*
 * Style.
 */

const StyledDiv = styled.div``;

/*
 * Component.
 */

export const InfoBanner: FC<InfoBannerProps> = (props) => <StyledDiv>Hello World</StyledDiv>;
