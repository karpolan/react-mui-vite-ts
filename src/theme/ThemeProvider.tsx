import { FunctionComponent, useMemo, PropsWithChildren } from 'react';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { CssBaseline } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useDarkMode } from '@/hooks';
import DARK_THEME from './dark';
import LIGHT_THEME from './light';

const COLOR_SCHEME_SELECTOR = 'class'; // Must be same in cssVariables and in <InitColorSchemeScript attribute="xxx" />

function getThemeForLightAndDarkMode() {
  const themeForLightAndDarkWithCssVariables = createTheme({
    colorSchemes: {
      dark: DARK_THEME,
      light: LIGHT_THEME,
    },
    cssVariables: {
      colorSchemeSelector: COLOR_SCHEME_SELECTOR,
    },
  });
  const responsiveTheme = responsiveFontSizes(themeForLightAndDarkWithCssVariables); // Make the Typography responsive
  return responsiveTheme;
}

/**
 * Renders everything needed to get MUI theme working
 * The Light or Dark themes applied depending on global .darkMode state
 */
const ThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { muiMode } = useDarkMode();

  const dualModeTheme = useMemo(() => getThemeForLightAndDarkMode(), []); // Create the theme only once

  return (
    <MuiThemeProvider
      // disableTransitionOnChange // Uncomment this line if you need faster theme switching
      noSsr // @see https://mui.com/material-ui/customization/dark-mode/#disable-double-rendering
      theme={dualModeTheme}
      defaultMode={muiMode}
    >
      <InitColorSchemeScript attribute={COLOR_SCHEME_SELECTOR} defaultMode={muiMode} />
      <CssBaseline
        // Note: Must be rendered inside the ThemeProvider, otherwise it won't work when the DarkMode changes
        enableColorScheme
      />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
