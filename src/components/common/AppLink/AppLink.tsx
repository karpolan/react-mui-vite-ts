import { forwardRef, useMemo } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { APP_LINK_COLOR, APP_LINK_UNDERLINE } from '@/components/config';
import { EXTERNAL_LINK_PROPS } from './utils';

export interface AppLinkProps extends MuiLinkProps {
  activeClassName?: string;
  // children: ReactNode;
  to?: string;
  href?: string;
  openInNewTab?: boolean;
}

/**
 * Restyled Link for navigation in the App, support internal links by "to" prop and external links by "href" prop
 * @component AppLink
 * @param {object|function} children - content to wrap with <a> tag
 * @param {string} [to] - internal link URI
 * @param {string} [href] - external link URI
 * @param {boolean} [openInNewTab] - link will be opened in new tab when true
 */
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const AppLink = forwardRef<any, AppLinkProps>(
  (
    {
      activeClassName = 'active', // This class is applied to the Link component when the router.pathname matches the href/to prop
      children,
      color = APP_LINK_COLOR,
      className: customClassName,
      underline = APP_LINK_UNDERLINE,
      to,
      href,
      openInNewTab, // Note: all external links are open in new Tab by default
      ...restOfProps
    },
    ref
  ) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const destination = to || href || ''; // Note: Don't use ?? here!!!

    const className = useMemo(
      () => [customClassName, destination == currentPath && activeClassName].filter(Boolean).join(' '),
      [customClassName, activeClassName, destination, currentPath]
    );

    const isExternal = useMemo(
      () =>
        destination.startsWith('http') ||
        destination.startsWith('//') ||
        destination.startsWith('mailto:') ||
        destination.startsWith('tel:'),
      [destination]
    );

    const propsToRender = {
      className,
      color,
      underline, // 'hover' | 'always' | 'none'
      ...((openInNewTab || (isExternal && openInNewTab !== false)) && EXTERNAL_LINK_PROPS), // Open external links in new tab
      ...restOfProps,
    };

    return isExternal ? (
      <MuiLink ref={ref} href={destination} {...propsToRender}>
        {children}
      </MuiLink>
    ) : (
      <MuiLink ref={ref} component={RouterLink} to={destination} {...propsToRender}>
        {children}
      </MuiLink>
    );
  }
);

export default AppLink;
