import React from "react";
import { Link } from "react-router-dom";

const Links = [
  { to: "/", text: "Home" },
  { to: "/starred", text: "starred" },
];

const Nav = () => {
  return (
    <div>
      <ul>
        {Links.map((items) => (
          <li key={items.to}>
            <Link to={items.to}>{items.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
