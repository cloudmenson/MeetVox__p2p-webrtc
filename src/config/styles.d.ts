import "styled-components";

import { COLORS } from "./theme/colors";

declare module "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: typeof COLORS;
    responsive: {
      isTablet: boolean;
      isMobile: boolean;
      isDesktop: boolean;
    };
  }
}
