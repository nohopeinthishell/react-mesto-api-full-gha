import React from "react";
import { useForm } from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import * as auth from "../utils/Auth";

function Login({ handleLogin }) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { email, password } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          handleLogin(email);
          setValues({ email: "", password: "" });
          localStorage.setItem("token", data.token);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="original">
      <form className="original__form" onSubmit={handleSubmit}>
        <h1 className="original__text">Вход</h1>
        <input
          value={email || ""}
          type="email"
          name="email"
          required=""
          onChange={handleChange}
          className="original__input original__input_email"
          placeholder="Email"
        />
        <input
          value={password || ""}
          type="password"
          name="password"
          required=""
          onChange={handleChange}
          className="original__input original_input_password"
          placeholder="Пароль"
        />
        <button className="original__button">Войти</button>
      </form>
    </div>
  );
}

export default Login;
