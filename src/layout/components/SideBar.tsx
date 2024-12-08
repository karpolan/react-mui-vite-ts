import { FunctionComponent, useCallback, MouseEvent } from 'react';
import { Stack, Divider, Drawer, DrawerProps, FormControlLabel, Switch, Tooltip } from '@mui/material';
import { LinkToPage } from '@/utils';
import { useDarkMode, useEventLogout, useIsAuthenticated, useIsMobile } from '@/hooks';
import { AppIconButton, UserInfo } from '@/components';
import { SIDE_BAR_WIDTH, TOP_BAR_DESKTOP_HEIGHT } from '../config';
import SideBarNavList from './SideBarNavList';

export interface SideBarProps extends Pick<DrawerProps, 'anchor' | 'className' | 'open' | 'variant' | 'onClose'> {
  items: Array<LinkToPage>;
}

/**
 * Renders SideBar with Menu and User details
 * Actually for Authenticated users only, rendered in "Private Layout"
 * @component SideBar
 * @param {string} anchor - 'left' or 'right'
 * @param {boolean} open - the Drawer is visible when true
 * @param {string} variant - variant of the Drawer, one of 'permanent', 'persistent', 'temporary'
 * @param {function} onClose - called when the Drawer is closing
 */
const SideBar: FunctionComponent<SideBarProps> = ({ anchor, open, variant, items, onClose, ...restOfProps }) => {
  const isMobile = useIsMobile();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const isAuthenticated = useIsAuthenticated();
  const onLogout = useEventLogout();

  const isRenderedAsDrawer = variant === 'temporary';

  // Hack to close the SideBar as a Drawer when the user clicks on the link
  const closeSideBarAfterAnyClick = useCallback(
    (event: MouseEvent) => {
      if (variant === 'temporary' && typeof onClose === 'function') {
        onClose(event, 'backdropClick');
      }
    },
    [variant, onClose]
  );

  return (
    <Drawer
      aria-modal={isRenderedAsDrawer}
      anchor={anchor}
      open={open}
      variant={variant}
      closeAfterTransition={isRenderedAsDrawer} // Solves "Blocked aria-hidden on an element..." error
      PaperProps={{
        sx: {
          width: SIDE_BAR_WIDTH,
          marginTop: isMobile ? 0 : isRenderedAsDrawer ? 0 : TOP_BAR_DESKTOP_HEIGHT,
          height: isMobile ? '100%' : isRenderedAsDrawer ? '100%' : `calc(100% - ${TOP_BAR_DESKTOP_HEIGHT})`,
        },
      }}
      onClose={onClose}
    >
      <Stack
        sx={{
          height: '100%',
          padding: 2,
        }}
        {...restOfProps}
        onClick={closeSideBarAfterAnyClick}
      >
        {isAuthenticated && (
          <>
            <UserInfo showAvatar />
            <Divider />
          </>
        )}

        <SideBarNavList items={items} showIcons />

        <Divider />

        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: 2,
          }}
        >
          <Tooltip title={isDarkMode ? 'Switch to Light mode' : 'Switch to Dark mode'}>
            <FormControlLabel
              label={!isDarkMode ? 'Light mode' : 'Dark mode'}
              control={<Switch checked={isDarkMode} onChange={toggleDarkMode} />}
            />
          </Tooltip>

          {isAuthenticated && <AppIconButton icon="logout" title="Logout Current User" onClick={onLogout} />}
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default SideBar;
