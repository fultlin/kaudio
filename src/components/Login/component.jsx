import React, { useState } from "react";
import examplar from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import newTestStore from "../../stores/testStore";

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
      console.log(res)
      window.localStorage.setItem("token", res.data.data.token);
      window.localStorage.setItem('login', res.data.data.login)
      newTestStore.setAuth(true); // Устанавливаем auth через action
      navigate("/");
    } catch (error) {
      console.error("Ошибка при авторизации:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Логин:
        <input type="text" name="login" value={login} onChange={handleChange} />
      </label>
      <br />
      <label>
        Пароль:
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </label>
      <br />
      <input type="submit" value="Отправить" />
    </form>
  );
};

export default LoginForm;
