import { Breakpoint, useMediaQuery, useTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

/**
 * Hook to detect isMobile vs. onDesktop using "resize" event listener
 * @returns {boolean} true when on isMobile, false when on onDesktop
 */
export function useIsMobileByTrackingWindowsResize() {
  const theme = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < theme.breakpoints.values.sm); // sx, sm are "isMobile"
  }, [theme.breakpoints.values.sm]);

  useEffect(() => {
    window.addEventListener('resize', handleResize); // Set resize listener

    return () => {
      window.removeEventListener('resize', handleResize); // Remove resize listener
    };
  }, [handleResize]);

  return isMobile;
}

/**
 * Hook to detect isMobile vs. onDesktop using Media Query
 * @param {Breakpoint} [downBreakpoint] - Breakpoint to detect isMobile. Default is 'sm'
 * @returns {boolean} true when on isMobile, false when on onDesktop
 */
export function useIsMobileByMediaQuery(downBreakpoint: Breakpoint | number = 'sm') {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(downBreakpoint));
}

/**
 * Hook to detect Wide Screen (lg, xl) using Media Query
 * @returns {boolean} true when on screen is wide enough
 */
export function useIsWideScreen() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up('md'));
}

// export const useIsMobile = useIsMobileByTrackingWindowsResize;
export const useIsMobile = useIsMobileByMediaQuery;
