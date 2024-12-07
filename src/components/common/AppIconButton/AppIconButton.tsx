import { ElementType, FunctionComponent, useMemo } from 'react';
import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
  Tooltip as MuiTooltip,
  TooltipProps as MuiTooltipProps,
} from '@mui/material';
import { alpha } from '@mui/material';
import { AppIcon, AppLink } from '@/components';
import { IconName } from '../AppIcon/config';
import { AppIconProps } from '../AppIcon/AppIcon';
import { MUI_ICON_BUTTON_COLORS } from './utils';

export interface AppIconButtonProps extends Omit<MuiIconButtonProps, 'color'> {
  color?: string; // Not only 'inherit' | 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
  icon: IconName;
  iconProps?: Partial<AppIconProps>;
  // Missing props
  component?: ElementType; // Could be RouterLink, AppLink, <a>, etc.
  to?: string; // Link prop
  href?: string; // Link prop
  openInNewTab?: boolean; // Link prop
  tooltipProps?: Partial<MuiTooltipProps>;
}

/**
 * Renders MUI IconButton with SVG image by given Icon name
 * @param {string} [color] - color of background and hover effect. Non MUI values is also accepted.
 * @param {boolean} [disabled] - the IconButton is not active when true, also the Tooltip is not rendered.
 * @param {string} [href] - external link URI
 * @param {string} icon - name of Icon to render inside the IconButton
 * @param {object} [iconProps] - additional props to pass into the AppIcon component
 * @param {boolean} [openInNewTab] - link will be opened in new tab when true
 * @param {string} [size] - size of the button: 'small', 'medium' or 'large'
 * @param {Array<func| object| bool> | func | object} [sx] - additional CSS styles to apply to the button
 * @param {string} [title] - when set, the IconButton is rendered inside Tooltip with this text
 * @param {string} [to] - internal link URI
 * @param {object} [tooltipProps] - additional props to pass into the Tooltip component
 */
const AppIconButton: FunctionComponent<AppIconButtonProps> = ({
  color = 'default',
  component,
  children,
  disabled,
  icon,
  iconProps,
  sx,
  title,
  tooltipProps,
  ...restOfProps
}) => {
  const componentToRender =
    !component && (restOfProps?.href || restOfProps?.to)
      ? AppLink // Use AppLink when href or to is set
      : (component ?? MuiIconButton); // Use MuiIconButton when component is not set

  const isMuiColor = useMemo(() => MUI_ICON_BUTTON_COLORS.includes(color), [color]);

  const iconButtonToRender = useMemo(() => {
    const colorToRender = isMuiColor ? (color as MuiIconButtonProps['color']) : 'default';
    const sxToRender = {
      ...sx,
      ...(!isMuiColor && {
        color: color,
        ':hover': {
          backgroundColor: alpha(color, 0.04),
        },
      }),
    };
    return (
      <MuiIconButton
        component={componentToRender}
        color={colorToRender}
        disabled={disabled}
        sx={sxToRender}
        {...restOfProps}
      >
        <AppIcon icon={icon} {...iconProps} />
        {children}
      </MuiIconButton>
    );
  }, [color, componentToRender, children, disabled, icon, isMuiColor, sx, iconProps, restOfProps]);

  // When title is set, wrap the IconButton with Tooltip.
  // Note: when IconButton is disabled the Tooltip is not working, so we don't need it
  return title && !disabled ? (
    <MuiTooltip title={title} {...tooltipProps}>
      {iconButtonToRender}
    </MuiTooltip>
  ) : (
    iconButtonToRender
  );
};

export default AppIconButton;
