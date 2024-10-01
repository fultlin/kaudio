import React, { useState } from "react";
import examplar from "../../axios/axios";
import { useNavigate, NavLink } from "react-router-dom";
import newTestStore from "../../stores/testStore";
import styles from "./Login.module.scss";

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "login") setLogin(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await examplar.post("users/auth", {
        login,
        password,
      });
      console.log(res);
      window.localStorage.setItem("token", res.data.data.token);
      window.localStorage.setItem("login", res.data.data.login);
      newTestStore.setAuth(true); // Устанавливаем auth через action
      navigate("/");
    } catch (error) {
      console.error("Ошибка при авторизации:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.login__form}>Login form</h2>
      <label>
        Логин:
        <br />
        <input
          type="text"
          name="login"
          value={login}
          onChange={handleChange}
          className={styles.input}
        />
      </label>
      <br />
      <label>
        Пароль:
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          className={styles.input}
        />
      </label>
      <br />
      <input type="submit" value="Отправить" className={styles.button} />
      <span>
        <NavLink to='/register' className={styles.register__link}>Регистрация</NavLink>
      </span>
    </form>
  );
};

export default LoginForm;
