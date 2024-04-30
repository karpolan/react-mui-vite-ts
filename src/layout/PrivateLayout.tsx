import { FunctionComponent, PropsWithChildren } from "react";
import { IS_DEBUG } from "@/config";
import { LinkToPage } from "@/utils";
import TopbarAndSidebarLayout from "./TopbarAndSidebarLayout";

const TITLE_PRIVATE = "Creator App"; // Title for pages after authentication

/**
 * SideBar navigation items with links for Private Layout
 */
const SIDE_BAR_ITEMS: Array<LinkToPage> = [
  {
    title: "Home",
    path: "/",
    icon: "home",
  },
  {
    title: "My Profile",
    path: "/me",
    icon: "profile",
  },
  {
    title: "404",
    path: "/wrong-url",
    icon: "error",
  },
  {
    title: "About",
    path: "/about",
    icon: "about",
  },
];

// Add debug links
IS_DEBUG &&
  SIDE_BAR_ITEMS.push({
    title: "[Debug Tools]",
    path: "/dev",
    icon: "settings",
  });

/**
 * Renders "Private Layout" composition
 * @layout PrivateLayout
 */
const PrivateLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const title = TITLE_PRIVATE;
  document.title = title; // Also Update Tab Title  // TODO: Do we need this? Move it to useEffect()?

  return (
    <TopbarAndSidebarLayout
      sidebarItems={SIDE_BAR_ITEMS}
      title={title}
      variant="sidebarPersistentOnDesktop"
    >
      {children}
      {/* <Stack component="footer">Copyright &copy; </Stack> */}
    </TopbarAndSidebarLayout>
  );
};

export default PrivateLayout;
