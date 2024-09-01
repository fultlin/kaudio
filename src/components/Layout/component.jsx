import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header/components";
import styles from "./Layout.module.scss";
import newTestStore from "../../stores/testStore";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

const Layout = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    newTestStore
      .checkAuth()
      .then((res) => {
        if (res) {
          console.log("Authentication successful:", res.data);
          const login = res.login || res.data.login || null;
          if (login) {
            window.localStorage.setItem("login", login);
          } else {
            console.error("Login field not found in response:", res);
          }
        }
      })
      .catch((error) => {
        console.error("Authentication failed:", error);
      });
  }, []);

  const handleLogout = () => {
    newTestStore.logout();
    navigate("/auth");
  };

  return (
    <>
      <Header auth={newTestStore.isAuthenticated} onLogout={handleLogout} />
      <main>
        <div className={styles.wrapper}>
          <Outlet />
        </div>
      </main>
    </>
  );
});

export default Layout;
