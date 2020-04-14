import React from 'react';
import styled, { keyframes } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVirus } from '@fortawesome/free-solid-svg-icons';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
    position: relative;
    display: grid;
    align-items: center;
    align-content: center;
    height: ${props => (props.fullPage ? '100vh' : 'auto')};
    width: ${props => (props.fullPage ? '100vw' : 'auto')};
    text-align: center;
    justify-content: center;
    text-align: center;
`;

const Spinner = styled(FontAwesomeIcon)`
    animation: ${rotate} 2s linear infinite;
`;

export default function LoadingSpinner({ fullPage, ...props }) {
    return (
        <Container fullPage={fullPage} {...props}>
            <Spinner icon={faVirus} color="#6dd428" size="5x" />
        </Container>
    );
}
