import React, {FC} from 'react';
import {animated, useTransition} from 'react-spring';
import styled from 'styled-components';

import {TopBanner} from './topBanner';
import {useTopBanners} from './topBannersContext';

/*
 * Props.
 */

interface TopBannersHostProps {}

/*
 * Style.
 */

const StyledDiv = styled.div`
  position: absolute;
  top: 16px;
  width: 100%;
  z-index: 1;
`;

/*
 * Component.
 */

export const TopBannersHost: FC<TopBannersHostProps> = (props) => {
  const {currentBanner, dismissBanner} = useTopBanners();
  const transitions = useTransition(currentBanner, {
    from: {opacity: 0, transform: 'translateY(-44px)'},
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0}
  });

  return (
    <StyledDiv>
      {transitions(
        (styles, banner) =>
          banner && (
            <animated.div key={banner.type} style={styles}>
              <TopBanner type={banner.type} onDismissClick={dismissBanner}>
                {banner.message}
              </TopBanner>
            </animated.div>
          )
      )}
    </StyledDiv>
  );
};
