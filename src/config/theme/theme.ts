import { DefaultTheme } from "styled-components";

import { COLORS } from "./colors";

const THEME: DefaultTheme = Object.freeze({
  colors: COLORS,
  responsive: {
    isDesktop: true,
    isTablet: false,
    isMobile: false,
  },
});

export { THEME };
