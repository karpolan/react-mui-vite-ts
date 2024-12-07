import { IconName } from '../components/common/AppIcon/config';

// Helper to read object's properties as obj['name']
export type ObjectPropByName<T = unknown> = Record<string, T>;

/**
 * Data for "Page Link" in SideBar adn other UI elements
 */
export type LinkToPage = {
  icon?: IconName; // Icon name to use as <AppIcon icon={icon} />
  path?: string; // URL to navigate to
  title?: string; // Title or primary text to display
  subtitle?: string; // Sub-title or secondary text to display
};
