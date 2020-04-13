import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Heading = styled.h1`
    color: #6135fc;
    font-size: 35px;
    margin: 2rem 0;
    font-weight: bold;

    align-items: center;

    display: flex;

    @media (max-width: 767px) {
        font-size: 20px;
    }
`;

const Container = styled.div`
    grid-column-start: 2;
`;

const Header = () => {
    return (
        <header>
            <Container>
                <Heading>
                    <span>Covid-19</span>
                </Heading>
                {/* <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/page-2/">Page 2</Link>
                    </li>
                </ul> */}
            </Container>
        </header>
    );
};

export default Header;
