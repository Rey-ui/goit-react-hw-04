import { NavLink } from "react-router-dom";
import clsx from "clsx";

import css from "./App.module.css";

const getNavLinkClassNames = ({ isActive }) =>
  clsx(css.headerLink, {
    [css.active]: isActive,
  });

const Layout = ({ children }) => {
  return (
    <div className={css.headerContainer}>
      <header className={css.header}>
        <NavLink className={getNavLinkClassNames} to="/">
          Home
        </NavLink>
        <NavLink className={getNavLinkClassNames} to="/movies">
          Movies
        </NavLink>
      </header>

      <main>{children}</main>
    </div>
  );
};

export default Layout;
