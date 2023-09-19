import React from "react";
import { Header } from "./Header";
import { Link } from "react-router-dom";
export function Register(props){
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  function emailChange(e) {
    setEmail(e.target.value);
  }
  function passwordChange(e) {
    setPassword(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister(email, password);
  };

  return (
    <div className="sing-div">
      <Header>
      <Link className="header__link" to="/sign-in">
          Войти
        </Link>
        </Header>
    <div className="sign">
      <h1 className="sign__title">Регистрация</h1>
      <form className="sign__form" onSubmit={handleSubmit}>
        <input className="sign__input" value={email} onChange={emailChange} type="Email" placeholder="Email"></input>
        <input className="sign__input" value={password} onChange={passwordChange} type="password" placeholder="Пароль"></input>
        <button className="sign__button" type="submit">Зарегистрироваться</button>
      </form>
      <Link className="sign__link" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
    </div>
    </div>
  );
}