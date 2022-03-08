import {  NavLink, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import icon from "../assets/icon.png";
import styles from "../styles/Nav.module.css";
import Filters from "./Filters";
import { useState } from "react";

function Nav() {
  const [active, setActive] = useState({
    filters: false,
    navItems: false,
  });
  const { pathname } = useLocation();
  const inLanding = pathname === "/" && true;
  const handleClick = () => {
    setActive({ ...active, filters: !active.filters });
  };

  const handleMenu = () => {
    setActive({ ...active, navItems: !active.navItems });
    console.log(active.navItems);
  };

  return (
    <>
      <nav className={inLanding ? styles.disable : styles.navContainer}>
        <button onClick={handleMenu} className={styles.menuIcon}>
          +
        </button>
        <div
          className={
            active.navItems ? `${styles.navItems} active` : styles.navItems
          }
        >
          <NavLink to="/home" activeClassName={`${styles.active}`}>
            <img src={icon} className={styles.logo} alt='logo'/>
          </NavLink>
          <NavLink to="/favs" activeClassName={`${styles.active}`}>
            Favourites
          </NavLink>

          <NavLink to="/dog" activeClassName={`${styles.active}`}>
            Create
          </NavLink>
          <SearchBar />
        </div>
        <button type="submit" className={styles.searchResponsive}>
          +
        </button>

        <button onClick={handleClick} className={styles.filter}>
          +
        </button>
      </nav>
      {active.filters && (
        <div className={styles.container}>
          <Filters />
        </div>
      )}
    </>
  );
}

export default Nav;
