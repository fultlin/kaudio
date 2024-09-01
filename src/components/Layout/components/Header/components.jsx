import { NavLink, Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { observer } from "mobx-react-lite";

const Header = observer(({ auth, onLogout }) => {
  return (
    <header>
      <div className={styles.wrapper}>
        <nav>
          <ul className={styles.nav}>
            <li>
              <NavLink to="/" className={styles.nav__links}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/music" className={styles.nav__links}>
                Music
              </NavLink>
            </li>
          </ul>

          {auth ? (
            <div className={styles.nav}>
              <span>{window.localStorage.getItem("login")}</span>
              <button onClick={onLogout} className={styles.button__header}>
                Logout
              </button>
            </div>
          ) : (
            <ul className={styles.nav}>
              <li>
                <Link to="/register" className={styles.nav__links}>
                  Register
                </Link>
              </li>
              <li>
                <Link to="/auth" className={styles.nav__links}>
                  Auth
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
});

export default Header;
