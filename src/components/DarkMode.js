import React from "react";
import styled from "styled-components";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import theme from "@theme";
import { useDarkMode } from "@context";

const Container = styled.div`
    grid-column-start: 2;
`;

const Icon = styled(FontAwesomeIcon)`
    display: block;
    cursor: pointer;
`;

const DarkMode = () => {
    const { darkMode, setDarkMode } = useDarkMode();
    const color = darkMode ? theme.white.primary : theme.dark.primary;
    const icon = darkMode ? faSun : faMoon;

    return (
        <Container>
            <Icon
                color={color}
                size="lg"
                icon={icon}
                onClick={() => setDarkMode(!darkMode)}
                data-testid="dark-mode-icon"
            />
        </Container>
    );
};

export default DarkMode;
