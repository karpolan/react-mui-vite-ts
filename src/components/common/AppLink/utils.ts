import { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { ReactNode } from "react";

export const EXTERNAL_LINK_PROPS = {
  target: "_blank",
  rel: "noopener noreferrer",
};

export interface AppLinkProps extends MuiLinkProps {
  activeClassName?: string;
  children: ReactNode;
  to?: string;
  href?: string;
  openInNewTab?: boolean;
}
