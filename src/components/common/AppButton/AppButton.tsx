import { ElementType, FunctionComponent, ReactNode, useMemo } from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import AppIcon from '../AppIcon';
import AppLink from '../AppLink';
import { APP_BUTTON_VARIANT } from '@/components/config';
import { IconName } from '../AppIcon/config';

const MUI_BUTTON_COLORS = ['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning'];

const DEFAULT_SX_VALUES = {
  margin: 1, // By default the AppButton has theme.spacing(1) margin on all sides
};

export interface AppButtonProps extends Omit<MuiButtonProps, 'color' | 'endIcon' | 'startIcon'> {
  color?: string; // Not only 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
  endIcon?: IconName | ReactNode;
  startIcon?: IconName | ReactNode;
  // Missing props
  component?: ElementType; // Could be RouterLink, AppLink, <a>, etc.
  to?: string; // Link prop
  href?: string; // Link prop
  openInNewTab?: boolean; // Link prop
  underline?: 'none' | 'hover' | 'always'; // Link prop
}

/**
 * Application styled Material UI Button with Box around to specify margins using props
 * @component AppButton
 * @param {string} [color] - when passing MUI value ('primary', 'secondary', and so on), it is color of the button body, otherwise it is color of text and icons
 * @param {string} [children] - content to render, overrides .label and .text props
 * @param {string | ReactNode} [endIcon] - name of AppIcon or ReactNode to show after the button label
 * @param {string} [href] - external link URI
 * @param {boolean} [openInNewTab] - link will be opened in new tab when true
 * @param {string | ReactNode} [startIcon] - name of AppIcon or ReactNode to show before the button label
 * @param {Array<func| object| bool> | func | object} [sx] - additional CSS styles to apply to the button
 * @param {string} [to] - internal link URI
 * @param {string} [underline] - controls underline style when button used as link, one of 'none', 'hover', or 'always'
 * @param {string} [variant] - MUI variant of the button, one of 'text', 'outlined', or 'contained'
 */
const AppButton: FunctionComponent<AppButtonProps> = ({
  children,
  color: customColor = 'inherit',
  component: customComponent,
  endIcon,
  startIcon,
  sx: customSx,
  underline = 'none',
  variant = APP_BUTTON_VARIANT,
  ...restOfProps
}) => {
  const iconStart: ReactNode = useMemo(
    () =>
      !startIcon ? undefined : typeof startIcon === 'string' ? <AppIcon icon={startIcon as IconName} /> : startIcon,
    [startIcon]
  );

  const iconEnd: ReactNode = useMemo(
    () => (!endIcon ? undefined : typeof endIcon === 'string' ? <AppIcon icon={endIcon as IconName} /> : endIcon),
    [endIcon]
  );

  const isMuiColor = useMemo(() => MUI_BUTTON_COLORS.includes(customColor), [customColor]);

  const componentToRender =
    !customComponent && (restOfProps?.href || restOfProps?.to) ? AppLink : (customComponent ?? MuiButton);

  const colorForMuiButton = isMuiColor ? (customColor as MuiButtonProps['color']) : 'inherit';
  const sxToRender = {
    ...DEFAULT_SX_VALUES, // Default margin, padding, and so on
    ...(customSx ? customSx : {}), // Custom styles
    ...(isMuiColor ? {} : { color: customColor }), // If custom color is not MUI color, apply it as a text color
  };
  const propsToRender = {
    ...restOfProps,
    underline,
  };

  return (
    <MuiButton
      component={componentToRender}
      color={colorForMuiButton}
      endIcon={iconEnd}
      startIcon={iconStart}
      sx={sxToRender}
      variant={variant}
      {...propsToRender}
    >
      {children}
    </MuiButton>
  );
};

export default AppButton;
