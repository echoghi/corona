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
    height: 100vh;
    width: 100vw;
    text-align: center;
    justify-content: center;
    text-align: center;
`;

const Spinner = styled(FontAwesomeIcon)`
    animation: ${rotate} 2s linear infinite;
`;

export default function LoadingSpinner() {
    return (
        <Container>
            <Spinner icon={faVirus} color="#6dd428" size="5x" />
        </Container>
    );
}
