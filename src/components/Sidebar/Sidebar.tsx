import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import { NAV_ITEMS, NavItem as INavItem } from "./constants";
import { ToStyledProps } from "@/types/utils";

function Sidebar() {
  const location = useLocation();

  return (
    <Layout>
      <NavList>
        {NAV_ITEMS.map(({ name, url, icon, inactiveStyle }) => (
          <NavItem key={name} $active={location.pathname === url}>
            <NavLink to={url}>
              <NavIcon
                icon={icon}
                size="lg"
                $isActive={location.pathname === url}
                $inactiveStyle={inactiveStyle}
              />
              <span className="link-text">{name}</span>
            </NavLink>
          </NavItem>
        ))}
      </NavList>
    </Layout>
  );
}

export default Sidebar;

const Layout = styled.nav`
  width: 280px;
  height: 100%;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const NavList = styled.ul`
  padding: 8px 12px;
  list-style: none;
`;

const NavItem = styled.li<{ $active: boolean }>`
  padding: 4px 12px;
  color: ${({ $active, theme }) => ($active ? "#fff" : theme.colors.grayText)};

  &:hover {
    color: #fff;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 20px;
  height: 40px;

  & .link-text {
    font-size: 1rem;
    font-weight: 700;
    text-transform: capitalize;
    transition: color 0.3s ease;
  }
`;

const NavIcon = styled(FontAwesomeIcon)<
  { $isActive: boolean } & ToStyledProps<Pick<INavItem, "inactiveStyle">>
>`
  padding: 5px;
  transition: all 0.3s ease;
  ${({ $isActive, $inactiveStyle }) => (!$isActive ? $inactiveStyle : null)}
`;
