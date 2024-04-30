import { useTheme } from "@mui/material";
import { useIsWideScreen } from "@/hooks";

/**
 * Returns the width of the dialog's body based on the screen size
 * @returns {number} width of the dialog's body
 */
export function useDialogMinWidth() {
  const theme = useTheme();
  const onWideScreen = useIsWideScreen();
  const paperMinWidth = onWideScreen
    ? theme.breakpoints.values.md / 2
    : theme.breakpoints.values.sm / 2;
  return paperMinWidth;
}
