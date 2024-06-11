import { SVGAttributes } from 'react';

/**
 * Props to use with custom SVG icons, similar to AppIcon's Props
 */
export interface IconProps extends SVGAttributes<SVGElement> {
  color?: string;
  icon?: string;
  size?: string | number;
  title?: string;
}
