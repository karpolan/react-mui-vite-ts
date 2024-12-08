import { FunctionComponent, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Stack, StackProps } from '@mui/material';
import { IS_DEBUG } from '@/config';
import { AppIconButton, ErrorBoundary } from '@/components';
import { useDarkMode, useIsMobile } from '@/hooks';
import { LinkToPage } from '@/utils';
import { TopBar } from './components';
import SideBar, { SideBarProps } from './components/SideBar';
import {
  SIDE_BAR_DESKTOP_ANCHOR,
  SIDE_BAR_MOBILE_ANCHOR,
  SIDE_BAR_WIDTH,
  TOP_BAR_DESKTOP_HEIGHT,
  TOP_BAR_MOBILE_HEIGHT,
} from './config';

interface Props extends StackProps {
  sidebarItems: Array<LinkToPage>;
  title: string;
  variant: 'sidebarAlwaysTemporary' | 'sidebarPersistentOnDesktop' | 'sidebarAlwaysPersistent';
}

/**
 * Renders "TopBar and SideBar" composition
 * @layout TopBarAndSideBarLayout
 */
const TopBarAndSideBarLayout: FunctionComponent<Props> = ({ children, sidebarItems, title, variant }) => {
  const isMobile = useIsMobile();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [sidebarVisible, setSidebarVisible] = useState(false); // TODO: Verify is default value is correct

  const sidebarProps = useMemo((): Partial<SideBarProps> => {
    const anchor = isMobile ? SIDE_BAR_MOBILE_ANCHOR : SIDE_BAR_DESKTOP_ANCHOR;
    let open = sidebarVisible;
    let sidebarVariant: SideBarProps['variant'] = 'temporary';
    switch (variant) {
      case 'sidebarAlwaysTemporary':
        break;
      case 'sidebarPersistentOnDesktop':
        open = isMobile ? sidebarVisible : true;
        sidebarVariant = isMobile ? 'temporary' : 'persistent';
        break;
      case 'sidebarAlwaysPersistent':
        open = true;
        sidebarVariant = 'persistent';
        break;
    }
    return { anchor, open, variant: sidebarVariant };
  }, [isMobile, sidebarVisible, variant]);

  const stackStyles = useMemo(
    () => ({
      minHeight: '100vh', // Full screen height
      paddingTop: isMobile ? TOP_BAR_MOBILE_HEIGHT : TOP_BAR_DESKTOP_HEIGHT,
      paddingLeft:
        sidebarProps.variant === 'persistent' && sidebarProps.open && sidebarProps?.anchor?.includes('left')
          ? SIDE_BAR_WIDTH
          : undefined,
      paddingRight:
        sidebarProps.variant === 'persistent' && sidebarProps.open && sidebarProps?.anchor?.includes('right')
          ? SIDE_BAR_WIDTH
          : undefined,
    }),
    [isMobile, sidebarProps]
  );

  const onSideBarOpen = () => {
    if (!sidebarVisible) setSidebarVisible(true); // Don't re-render Layout when SideBar is already open
  };

  const onSideBarClose = () => {
    if (sidebarVisible) setSidebarVisible(false); // Don't re-render Layout when SideBar is already closed
  };

  const LogoButton = (
    <AppIconButton
      icon="logo"
      title={sidebarProps.open ? undefined : 'Open Sidebar'}
      to={sidebarProps.open ? '/' : undefined} // Navigate to Home only when SideBar is closed
      onClick={sidebarProps.open ? undefined : onSideBarOpen} // Open SideBar only when it's closed
    />
  );

  const DarkModeButton = (
    <AppIconButton
      icon={isDarkMode ? 'day' : 'night'} // Variant 1
      // icon="dayNight" // Variant 2
      title={isDarkMode ? 'Switch to Light mode' : 'Switch to Dark mode'}
      onClick={toggleDarkMode}
    />
  );

  // Note: useMemo() is not needed for startNode, endNode. We need respect store.darkMode and so on.
  const { startNode, endNode } = sidebarProps?.anchor?.includes('left')
    ? { startNode: LogoButton, endNode: DarkModeButton }
    : { startNode: DarkModeButton, endNode: LogoButton };

  IS_DEBUG &&
    console.log('Re-render <TopBarAndSideBarLayout/>', {
      isMobile,
      isDarkMode,
      sidebarProps,
    });

  return (
    <Stack sx={stackStyles}>
      <Stack component="header">
        <TopBar startNode={startNode} title={title} endNode={endNode} />
        <SideBar items={sidebarItems} onClose={onSideBarClose} {...sidebarProps} />
      </Stack>

      <Stack
        component="main"
        flexGrow={1} // Takes all possible space
        justifyContent="space-between" // Push children content (Footer, StatusBar, etc.) to the bottom
        paddingLeft={1}
        paddingRight={1}
        paddingTop={1}
      >
        <ErrorBoundary name="Content">
          {/* Always Render Router's Outlet*/}
          <Outlet />
          {/* Also render children when it is provided */}
          {children}
        </ErrorBoundary>
      </Stack>
    </Stack>
  );
};

export default TopBarAndSideBarLayout;
