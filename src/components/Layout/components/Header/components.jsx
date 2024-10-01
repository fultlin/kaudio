import { NavLink, Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { observer } from "mobx-react-lite";
import Search from "../../../Search/component";

const Header = observer(({ auth, onLogout }) => {
  return (
    <header>
      <div className={styles.wrapper}>
        <nav>
          <ul className={styles.nav}>
            <li>
              <NavLink to="/" className={styles.nav__links}>
                Kaudio
              </NavLink>
            </li>
            <li>
              <Search/>
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
