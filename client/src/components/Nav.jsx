import { NavLink, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import icon from "../assets/icon.png";
import styles from "../styles/Nav.module.css";
import Filters from "./Filters";
import { useState } from "react";

function Nav() {
  const [active, setActive] = useState({
    filters: false,
    mobileMenu: false,
  });
  const { pathname } = useLocation();
  const inLanding = pathname === "/" && true;
  const handleClick = () => {
    setActive({ ...active, filters: !active.filters });
  };

  const handleMenu = () => {
    setActive({ ...active, mobileMenu: !active.mobileMenu });
  };

  return (
    <>
      <nav className={inLanding ? styles.disable : styles.navContainer}>
        <div
          className={
            active.navItems
              ? `${styles.navItems} ${styles.active}`
              : styles.navItems
          }
        >
          <NavLink to="/home" activeClassName={`${styles.active}`}>
            <img src={icon} className={styles.logo} alt="logo" />
          </NavLink>
          <NavLink to="/favs" activeClassName={`${styles.active}`}>
            Favourites
          </NavLink>

          <NavLink to="/dog" activeClassName={`${styles.active}`}>
            Create
          </NavLink>
          <SearchBar />
          <button onClick={handleClick} className={styles.filter}>
            +
          </button>
        </div>
        {/*---------------------------- NAV MOBILE ----------------------------------------*/}
        <div className={styles.navMobile}>
          <button onClick={handleMenu} className={styles.menuIcon}>
            +
          </button>
          <NavLink to="/home" activeClassName={`${styles.active}`}>
            <img src={icon} className={styles.logo} alt="logo" />
          </NavLink>
          <button onClick={handleClick} className={styles.filter}>
            +
          </button>
        </div>
      </nav>
      <div
        className={
          active.mobileMenu ? styles.mobileMenuActive : styles.mobileMenu
        }
      >
        <NavLink to="/favs" activeClassName={`${styles.active}`}>
          Favourites
        </NavLink>

        <NavLink to="/dog" activeClassName={`${styles.active}`}>
          Create
        </NavLink>
        <SearchBar />
      </div>
      {active.filters && (
        <div className={styles.containerFilters}>
          <Filters />
        </div>
      )}
    </>
  );
}

export default Nav;
