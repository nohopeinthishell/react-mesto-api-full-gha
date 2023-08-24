import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/Auth";
import { useForm } from "../hooks/useForm";

function Register({ onInfoTooltip }) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });
  const { email, password } = values;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .register(email, password)
      .then((res) => {
        onInfoTooltip(true);
      })
      .then(() => {
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        onInfoTooltip(false);
        console.log(err);
      });
  };

  return (
    <div className="original">
      <form className="original__form" onSubmit={handleSubmit}>
        <h1 className="original__text">Регистрация</h1>
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
          autoComplete="new-password"
          value={password || ""}
          type="password"
          name="password"
          required=""
          onChange={handleChange}
          className="original__input original_input_password"
          placeholder="Пароль"
        />
        <button className="original__button">Зарегистрироваться</button>
        <p className="original__registered-text">
          Уже зарегистрированы?{" "}
          <Link className="original__link" to="/signin">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
