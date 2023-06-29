import {
  faHome,
  faMagnifyingGlass,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { css, RuleSet } from "styled-components";

export interface NavItem {
  name: string;
  url: string;
  icon: IconDefinition;
  inactiveStyle: RuleSet<object> | null;
}

export const NAV_ITEMS: NavItem[] = [
  {
    name: "home",
    url: "/",
    icon: faHome,
    inactiveStyle: css`
      & path {
        stroke: currentColor;
        stroke-width: 60px;
        fill: transparent;
      }
    `,
  },
  {
    name: "search",
    url: "/search",
    icon: faMagnifyingGlass,
    inactiveStyle: null,
  },
];
