import React from "react";
import { useLocation } from "react-router-dom";
import { LinkStyled, NavList } from "./Nav.styled";

const Links = [
  { to: "/", text: "Home" },
  { to: "/starred", text: "starred" },
];

const Nav = () => {
  const location = useLocation();

  return (
    <div>
      <NavList>
        {Links.map((items) => (
          <li key={items.to}>
            <LinkStyled
              to={items.to}
              className={items.to === location.pathname ? "active" : ""}
            >
              {items.text}
            </LinkStyled>
          </li>
        ))}
      </NavList>
    </div>
  );
};

export default Nav;
