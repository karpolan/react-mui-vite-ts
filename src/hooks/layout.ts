import { useMediaQuery, useTheme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

/**
 * Hook to detect onMobile vs. onDesktop using "resize" event listener
 * @returns {boolean} true when on onMobile, false when on onDesktop
 */
export function useIsMobileByTrackingWindowsResize() {
  const theme = useTheme();
  const [onMobile, setOnMobile] = useState(false);

  const handleResize = useCallback(() => {
    setOnMobile(window.innerWidth < theme.breakpoints.values.sm); // sx, sm are "onMobile"
  }, [theme.breakpoints.values.sm]);

  useEffect(() => {
    window.addEventListener("resize", handleResize); // Set resize listener

    return () => {
      window.removeEventListener("resize", handleResize); // Remove resize listener
    };
  }, [handleResize]);

  return onMobile;
}

/**
 * Hook to detect onMobile vs. onDesktop using Media Query
 * @returns {boolean} true when on onMobile, false when on onDesktop
 */
export function useIsMobileByMediaQuery() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down("sm"));
}

/**
 * Hook to detect Wide Screen (lg, xl) using Media Query
 * @returns {boolean} true when on screen is wide enough
 */
export function useIsWideScreen() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up("md"));
}

// export const useOnMobile = useOnMobileByTrackingWindowsResize;
export const useIsMobile = useIsMobileByMediaQuery;
