import React from "react";
import { Header } from "./Header";
import { Link } from "react-router-dom";
export function Login(props){
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
    props.onLogin(email, password);
  };
  return (
  <div>
    <Header>
    <Link className="header__link" to="/sign-up">
          Регистрация
        </Link>
    </Header>
    <div className="sign">
      <h1 className="sign__title">Вход</h1>
      <form className="sign__form" onSubmit={handleSubmit}>
        <input className="sign__input" value={email} onChange={emailChange} type="Email" placeholder="Email"></input>
        <input className="sign__input" value={password} onChange={passwordChange} type="password" placeholder="Пароль"></input>
        <button className="sign__button">Войти</button>
      </form>
    </div>
    </div>
  );
}