import React from 'react';
import { useDarkMode } from '@context';
import { Container } from './styles';

const Footer = () => {
    const { darkMode } = useDarkMode();

    return (
        <Container darkMode={darkMode}>
            <div>
                <p>&copy; {new Date().getFullYear()}, Emile Choghi</p>
            </div>
        </Container>
    );
};

export default Footer;
