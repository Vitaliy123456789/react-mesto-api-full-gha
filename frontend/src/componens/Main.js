import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CurrentCardContext } from "../contexts/CurrentCardContext";
import { Header } from "./Header";
import { Link } from "react-router-dom";
export function Main(props) {
  const context = React.useContext(CurrentUserContext);
  const cards = React.useContext(CurrentCardContext);

  return (
    <div>
    <Header>
      <div className="header__user">
        <p className="header__email">{props.email}</p>
        <Link className="header__link" to="/sign-in" onClick={props.Exit}>
          Выйти
        </Link>
      </div>
    </Header>
    <main className="content">
      <section className="profile">
        <div className="profile__content">
          <div className="profile__guidance">
            <img
              src={context.avatar}
              alt="аватарка пользователя"
              className="profile__img"
              onClick={props.onEditAvatar}
            />
          </div>
          <div className="profile__info">
            <div className="profile__name">
              <h1 className="profile__title">{context.name}</h1>
              <h2 className="profile__subtitle">{context.about}</h2>
            </div>
            <button
              type="button"
              className="profile__button"
              onClick={props.onEditProfile}
            ></button>
          </div>
        </div>
        <button
          type="button"
          className="profile__addbutton"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <li className="elements">
        {cards.map((item) => (
          <Card
            card={item}
            key={item._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            currentUser={context}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </li>
    </main>
    </div>
  );
}
