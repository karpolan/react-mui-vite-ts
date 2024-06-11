// SVG assets
import LogoIcon from './icons/YellowPlanIcon';
// MUI Icons
import DefaultIcon from '@mui/icons-material/MoreHoriz';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DayNightIcon from '@mui/icons-material/Brightness4';
import NightIcon from '@mui/icons-material/Brightness3';
import DayIcon from '@mui/icons-material/Brightness5';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined';
import DangerousIcon from '@mui/icons-material/Dangerous';

/**
 * List of all available Icon names
 */
export type IconName = keyof typeof ICONS;

/**
 * How to use:
 * 1. Import all required React, MUI or other SVG icons into this file.
 * 2. Add icons with "unique lowercase names" into ICONS object. Lowercase is a must!
 * 3. Use icons everywhere in the App by their names in <Icon icon="xxx" /> component
 * Important: properties of ICONS object MUST be lowercase!
 * Note: You can use camelCase or UPPERCASE in the <Icon icon="someIconByName" /> component
 */
export const ICONS /* Note: Setting type disables property autocomplete :( was - : Record<string, ComponentType> */ = {
  default: DefaultIcon,
  logo: LogoIcon,
  close: CloseIcon,
  menu: MenuIcon,
  settings: SettingsIcon,
  visibilityon: VisibilityIcon,
  visibilityoff: VisibilityOffIcon,
  daynight: DayNightIcon,
  night: NightIcon,
  day: DayIcon,
  search: SearchIcon,
  info: InfoIcon,
  home: HomeIcon,
  account: AccountCircle,
  signup: PersonAddIcon,
  login: PersonIcon,
  logout: ExitToAppIcon,
  notifications: NotificationsIcon,
  error: DangerousIcon,
};
