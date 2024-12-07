import { Breakpoint, useMediaQuery, useTheme } from '@mui/material';

/**
 * Hook to detect isMobile vs. isDesktop using Media Query
 * @param {Breakpoint} [downBreakpoint] - Breakpoint to detect isMobile. Default is 'sm'
 * @returns {boolean} true when on isMobile, false when on onDesktop
 */
export function useIsMobile(downBreakpoint: Breakpoint | number = 'sm') {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(downBreakpoint));
}

/**
 * Hook to detect Wide Screen (lg, xl) using Media Query
 * @returns {boolean} true when the screen is wide enough
 */
export function useIsWideScreen() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up('md'));
}
