'use client';

import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";   // SunIcon and MoonIcon are Chakra UI icons

const ThemeToggleButton = () => {
    return (
        <IconButton aria-label="Toggle theme"
            colorScheme={useColorModeValue("purple", "orange")}
            icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
            onClick={toggleColorMode}
        />
    )
}

export default ThemeToggleButton