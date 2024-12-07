import { FunctionComponent, useMemo, PropsWithChildren } from 'react';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { CssBaseline } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useDarkMode } from '@/hooks';
import DARK_THEME from './dark';
import LIGHT_THEME from './light';

function getThemeForLightAndDarkMode() {
  const themeForLightAndDarkWithCssVariables = createTheme({
    colorSchemes: {
      dark: DARK_THEME,
      light: LIGHT_THEME,
    },
    cssVariables: {
      colorSchemeSelector: 'class', // Must be same as <InitColorSchemeScript attribute="xxx" /> in the Layout
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
      <InitColorSchemeScript attribute="class" defaultMode={muiMode} />
      <CssBaseline enableColorScheme />
      {children}
    </MuiThemeProvider>
  );
};

/*
MUI v5 version of the AppThemeProvider

function getThemeByDarkMode(darkMode: boolean) {
  return darkMode ? createTheme(DARK_THEME) : createTheme(LIGHT_THEME);
}


const AppThemeProviderV5: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true); // True until the component is mounted
  const [state] = useAppStore();

  useEffect(() => setLoading(false), []); // Set .loading to false when the component is mounted

  const currentTheme = useMemo(
    () => getThemeByDarkMode(state.darkMode),
    [state.darkMode] // Observe AppStore and re-create the theme when .darkMode changes
  );

  if (loading) return null; // Don't render anything until the component is mounted

  return (
    <EmotionThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </EmotionThemeProvider>
  );
};
*/

export default ThemeProvider;
