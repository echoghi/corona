import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Heading = styled.h1`
    span {
        color: #6135fc;
        font-size: 35px;
        margin-right: 2rem;
        font-weight: bold;
    }

    font-size: 30px;
    margin: 2rem 0;
    color: #1a1053;
    font-weight: normal;
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
                    Global Trend
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
