import { ComponentType, FunctionComponent, SVGAttributes } from 'react';
import { APP_ICON_SIZE } from '@/components/config';
import { IconName, ICONS } from './config';

/**
 * Props of the AppIcon component, also can be used for SVG icons
 */
export interface AppIconProps extends SVGAttributes<SVGElement> {
  color?: string;
  icon: IconName;
  size?: string | number;
  title?: string;
}

/**
 * Renders SVG icon by given Icon name
 * @component AppIcon
 * @param {string} [color] - color of the icon as a CSS color value
 * @param {string} icon - name of the Icon to render
 * @param {string} [title] - title/hint to show when the cursor hovers the icon
 * @param {string | number} [size] - size of the icon, default is ICON_SIZE
 */
const AppIcon: FunctionComponent<AppIconProps> = ({ color, icon, size = APP_ICON_SIZE, style, ...restOfProps }) => {
  let ComponentToRender: ComponentType = ICONS[icon];
  if (!ComponentToRender) {
    console.warn(`AppIcon: icon "${icon}" not found!`);
    ComponentToRender = ICONS.default; // ICONS['default'];
  }

  const propsToRender = {
    height: size,
    color,
    fill: color && 'currentColor', // If color is set, fill the icon with the 'currentColor'
    size,
    style: { ...style, color },
    width: size,
    ...restOfProps,
  };

  return <ComponentToRender data-icon={icon} {...propsToRender} />;
};

export default AppIcon;
