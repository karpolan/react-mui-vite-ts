import { FunctionComponent, useMemo, PropsWithChildren, useState, useEffect } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useAppStore } from '@/store';
import DARK_THEME from './dark';
import LIGHT_THEME from './light';

function getThemeByDarkMode(darkMode: boolean) {
  return darkMode ? createTheme(DARK_THEME) : createTheme(LIGHT_THEME);
}

/**
 * Renders everything needed to get MUI theme working
 * The Light or Dark themes applied depending on global .darkMode state
 */
const AppThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
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
      <CssBaseline /* MUI Styles */ />
      {children}
    </EmotionThemeProvider>
  );
};

export default AppThemeProvider;
